const { GoogleGenerativeAI } = require("@google/generative-ai");
const { API_KEY } = require('../config/environment');

const genAI = new GoogleGenerativeAI(API_KEY);

const sendMessage = async (chatHistory, value) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ 
      history: chatHistory, 
      message: value }),
    headers: { "Content-Type": "application/json" }
  };
  
  const response = await fetch(`http://localhost:2000/gemini`, options);
  const data = await response.text();
  return data.replace(/\n/g, '<br />');


};

module.exports = { sendMessage };
