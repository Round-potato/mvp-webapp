const express = require("express");
const cors = require("cors");
const { PORT } = require('./config/environment'); // Ensure your environment config is correctly set up
const geminiRouter = require('./routes/gemini');
const classifyRouter = require('./routes/classify');
const errorHandler = require('./middleware/errorHandler');


const app = express();

// Middleware to dynamically set the CORS origin

app.use(cors())
app.use(express.json());

// Route handling
app.use("/api/gemini", geminiRouter);
app.use("/api/classify", classifyRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));