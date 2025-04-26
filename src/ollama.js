const axios = require('axios');

async function askOllama(context,question){
    const prompt = `
    Use the following context to asnwer the question:
    ${context}

    Question: ${Question}
    `;

    const response = await axios.post('http:localhost:11434/api/chat',{
        model:'llama2',
        messages: [{
            role:"user",
            content:prompt
        }]
    });

    return response.data.messages.content;
}

module.exports = {askOllama};