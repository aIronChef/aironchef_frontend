const OpenAI = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

const callChatgptApi = async (messages) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        return response.choices[0].message.content;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Rate limit exceeded. Please check your OpenAI usage and try again later.');
        } else {
            console.error('Failed to start AI review:', error.message);
        }
    }
};

module.exports = {
    callChatgptApi
};