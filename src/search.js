const { error } = require('console');
const fs = require('fs');

function preprocessText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenize(text) {
    return preprocessText(text).split(' ').filter(word => word.length > 2);
}

function calculateQueryTFIDF(query,documents){
    const queryTokens = tokenize(query);
    const queryTF ={};

    for(const token of queryTokens){
        queryTF[token] = (queryTF[token] || 0 )+1; 
    }

    for (const token in queryTF) {
        queryTF[token] = queryTF[token] / queryTokens.length;
    }

    const documentCount = documents.length;
    const queryTFIDF = {};

    for(const token of queryTokens){
        const docContaining = documents.filter(doc=> doc.tokens && doc.tokens.includes(token)).length;

        const idf = docContaining > 0 ? Math.log(documentCount / docContaining) : 0;
        queryTFIDF[token] = queryTF[token] * idf;
    }

    return { queryTFIDF, queryTokens};
   
}  

function cosineSimilarity(vec1,vec2, tokens){
        let dotProduct =0;
        let norm1=0,norm2 =0;

        for(let token of tokens){
            const val1 = vec1[token] || 0;
            const val2 = vec2[token] || 0;

            dotProduct += val1 *val2;
            norm1 += val1*val1;
            norm2 += val2*val2;
        }

        if(norm1 ===0 || norm2 ===0) return 0;
        return dotProduct/(Math.sqrt(norm1)*Math.sqrt(norm2));

}

async function findBestMatches(query, topK = 3){
    try{
    if(!fs.existsSync("embeddings/embeddings.json")){
        console.log("No embeddings file found !");
        return [];
    }

    const db = JSON.parse(fs.readFileSync("embeddings/embeddings.json",'utf8'));

    if(db.length === 0){
        console.log("No Embedding Data found");
        return [];
    }

    const { queryTFIDF, queryTokens} = calculateQueryTFIDF(query,db);

    const result = [];

    for(let doc of db){
        if(!doc.tfidf || !doc.tokens) continue ; 

        const allTokens = new Set([...queryTokens,...doc.tokens]);

        const similarity = cosineSimilarity(queryTFIDF,doc.tfidf, allTokens);

        if(similarity>0){
            result.push({
                ...doc,
                similarity:similarity
            });
        }
    }
    result.sort((a,b) => b.similarity-a.similarity);
    return result.slice(0,topK);

} catch{error}{
    console.log("Error occured:",error);
    return [];
}


}
module.exports = {findBestMatches};