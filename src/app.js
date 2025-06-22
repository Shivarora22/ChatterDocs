const express = require('express');
const {findBestMatches} = require('./search');
const {askOllama} = require('./ollama');
const { saveEmbedding } = require('./embed');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(express.json());

const upload = multer({ dest: 'data/' });
app.use(express.urlencoded({ extended: true }));

app.post('/ask',async (req,res)=>{
    try{
        const {question} = req.body;
        const bestMatch = await findBestMatches(question);

        if(!bestMatch){
            return res.json({
                answer: "Sorry, Couldn't find a relevant information"
            });
        }
        
        const answer = await askOllama(bestMatch,question);
        res.json({answer});
    } catch (error){
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
});

app.post('/embed', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', req.file.filename);

    await saveEmbedding(filePath); // run your function 

    res.status(200).json({ success: true, message: 'Embedding saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to process file' });
  }
});


app.listen(3000,()=>{
    console.log('Server running');
});