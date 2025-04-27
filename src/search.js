const fs = require('fs');

function findBestMatch(query){
    const db = JSON.parse(fs.readFileSync('../embeddings/embeddings.json','utf8'));
    let best = null;
    let bestScore = -1;

    for(let item of db){
        const matches = item.text.split(' ').filter(word=>query.includes(word)).length;
        if(matches > bestScore){
            best = item;
            bestScore = matches;
        }
    }
    return best;
}
module.exports = {findBestMatch};