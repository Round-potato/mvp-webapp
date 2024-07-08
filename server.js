const PORT = 2000
const express =  require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
require("dotenv").config()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

app.post("/gemini", async (req, res) => {
    //console.log(req.body)
    console.log("the history", req.body.history)
    //console.log(req.body.message)
    const model = genAI.getGenerativeModel({model: "gemini-pro"})
    //console.log(model)

    //console.log("this was chat" , req.body.history)
    const chat = model.startChat({
        history: req.body.history
    })
    //console.log("this is chat", chat)
    const msg = req.body.message
    console.log("this is msg", msg)
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    res.send(text)
    
})


app.listen(PORT, () => console.log("listening on port", PORT))
