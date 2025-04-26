const express = require('express');
const {findBestMatch} = require('./search');
const {askOlama} = require('./ollama');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/ask',async (req,res)=>{
    try{
        console.log(req.body);
        const {question} = req.body;
        console.log(question);
        const bestMatch = findBestMatch(question);
        console.log(bestMatch);
        console.log("response");
        if(!bestMatch){
            return res.json({
                answer: "Sorry, Couldn't find a relevant information"
            });
        }
        const answer = await askOlama(bestMatch.text,question);
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