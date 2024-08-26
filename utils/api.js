const axios = require('axios');

const API_BASE_URL = 'https://your-ai-server.com/api';  // 실제 AI 서버의 URL로 변경

exports.sendToAIServer = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error communicating with AI server:', error.message);
    throw error;
  }
};
