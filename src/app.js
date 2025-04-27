const express = require('express');
const {findBestMatch} = require('./search');
const {askOllama} = require('./ollama');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/ask',async (req,res)=>{
    try{
        const {question} = req.body;
        const bestMatch = findBestMatch(question);

        if(!bestMatch){
            return res.json({
                answer: "Sorry, Couldn't find a relevant information"
            });
        }
        const answer = await askOllama(bestMatch.text,question);
        res.json({answer});
    } catch (error){
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
});

app.listen(3000,()=>{
    console.log('Server running');
});