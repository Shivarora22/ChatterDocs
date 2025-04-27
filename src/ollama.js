const axios = require('axios');

async function askOllama(context, question) {
    const prompt = `
Use the following context to answer the question:
${context}

Question: ${question}
    `;

    const response = await axios({
        method: 'post',
        url: 'http://localhost:11434/api/chat',
        data: {
            model: 'llama2',
            messages: [{
                role: "user",
                content: prompt
            }],
            stream: false
        }
    });

    const messageContent = response.data.message.content;

    return messageContent;
}

module.exports = { askOllama };
