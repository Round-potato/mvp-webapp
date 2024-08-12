const express = require("express");
const cors = require("cors");
const {PORT} = require('./config/environment');
const geminiRouter = require('./routes/gemini');
const classifyRouter = require('./routes/classify');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/gemini", geminiRouter);
app.use("/classify", classifyRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
