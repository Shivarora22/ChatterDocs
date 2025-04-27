const fs = require('fs');
const pdf = require('pdf-parse')

async function extractTextFromPDF(filePath){
    const databuffer = fs.readFileSync(filePath);
    const data = await pdf(databuffer);
    return data.text;
}

async function saveEmbedding(filePath){
    const text = await extractTextFromPDF(filePath);

    let db =[];
    if(fs.existsSync('embeddings/embedding.json')){
        db = JSON.parse(fetch.readFileSync('embeddings/embeddings.json','utf8'));
    }

    db.push({
        id: filePath,
        text: text
    });

    fs.writeFileSync('embeddings/embeddings.json', JSON.stringify(db,null,2));
    console.log(`Saved embedding for ${filePath}`);
}

module.exports = {saveEmbedding}