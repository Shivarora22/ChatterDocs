const fs = require('fs');
const pdf = require('pdf-parse')

async function extractTextFromPDF(filePath){
    const databuffer = fs.readFileSync(filePath);
    const data = await pdf(databuffer);
    return data.text;
}

async function chunkText(text,chunkSize){
    const size = Math.ceil(text.length/chunkSize);
    const chunkedArray = Array(size);
    let offset =0;

    for(let i=0;i<size;i++){
        chunkedArray[i] = text.substr(offset,chunkSize);
        offset+= chunkSize;
    }
    return chunkedArray;

}

function preProcessText(text){
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g,' ')
        .trim();
}

function tokenize(text){
    return preProcessText(text).split(' ').filter(word=>word.length>2);
}

function calculateTF(tokens){
    const tf ={};
    const totalToken = tokens.length;

    for(const token of tokens){
        tf[token] = (tf[token]||0)+1;
    }

    for(const token in tf){
        tf[token] = tf[token]/totalToken;
    }
    return tf;
}

async function saveEmbedding(filePath){
    const text = await extractTextFromPDF(filePath);
    const chunkedArray = await chunkText(text,100);

    let db =[];
    if(fs.existsSync('embeddings/embedding.json')){
        db = JSON.parse(fetch.readFileSync('embeddings/embeddings.json','utf8'));
    }

    chunkedArray.forEach((chunk,index) =>{
        const tokens = tokenize(chunk);
        const tf = calculateTF(tokens);

        db.push({
            id : `${filePath}_chunk_${index}`,
            chunkIndex : index,
            text : chunk,
            tokens : tokens,
            tf: tf,
            tokenCount : tokens.length
        });
    });

    calculateIDF(db);
    fs.writeFileSync('embeddings/embeddings.json', JSON.stringify(db,null,2));
    console.log(`Saved embedding for ${filePath}`);
}

function calculateIDF(documents){
    const documentCount = documents.length;
    const wordDocumentCount = {};

    for(const doc of documents){
        const uniqueWords = new Set(doc.tokens);
        for(const word of uniqueWords){
            wordDocumentCount[word] = (wordDocumentCount[word]||0)+1;
        }
    }

    for(doc of documents){
        doc.idf ={};
        doc.tfidf ={};
        
        for(const word of doc.tokens){
            if(!doc.idf[word]){
                doc.idf[word] = Math.log(documentCount/ (wordDocumentCount[word]||1));
                doc.tfidf[word] = doc.tf[word]*doc.idf[word];
            }
        }
    }
}

module.exports = {saveEmbedding}