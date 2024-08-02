//setting up for the server

const PORT = 2000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

//supplying the api key with a dotenv file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//defineing the gemini port 
app.post("/gemini", async (req, res) => {
    try {
        console.log("Received request with history:", req.body.history);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat({ history: req.body.history });
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

//defineing the classify port
app.post("/classify", async (req, res) => {
    try {
        console.log("Received request with history:", req.body.history);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat({ history: req.body.history });
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

//add listener for this port 
app.listen(PORT, () => console.log("Listening on port", PORT));
