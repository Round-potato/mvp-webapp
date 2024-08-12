const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const {API_KEY} = require('../config/environment');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);

router.post('/', async (req, res) => {
  console.log("Received request at /gemini")
  try {
    console.log(`This is key ${API_KEY}`)
    console.log("Received request with history:", req.body.history);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({ history: req.body.history });
    console.log("this is the chat created", chat)
    const msg = req.body.message;
    console.log("Sending message to Gemini API:", msg);
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    if (response.candidates[0].safetyRating === 'BLOCKED') {
        throw new Error('Response blocked due to safety concerns.');
    }

    res.send(text);
} catch (error) {
    if (error.message.includes('SAFETY')) {
        console.error("Safety error with Google Gemini API:", error.message);
        res.status(403).send("Response blocked due to safety concerns.");
    } else {
        console.error("Error with Google Gemini API:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

});

module.exports = router;
