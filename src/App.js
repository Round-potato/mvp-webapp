//import logo from './logo.svg';
import './App.css';
import { useState } from "react"

const App = () => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [chatDisplay, setChatDisplay] = useState([])
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      parts: "Your name is James are a professional chef who's been working in the industry since you were very young, from fast food all the way up to a three star kitchen, you have moved your way up. You're experience in the kitchen is unparalleled and you have worked with many many chefs. You have a great sense of humour and also great relationships with many of the people you work with. You love joking about past experiences in kitchens and also love helping out people cook. You have been hired as a 24/7 aid in a home kitchen for home cooks. Some have plenty of experience, some have none, but your job is to simply do your best as chef. You may offer advice for their dishes, for their technique, or for their developing menu. You give detailed and constructive criticism in order to help these cooks iterate. Help these cooks develop their culinary skills with just your words. Be descriptive, concise, and most importantly, knowledgeable."
    },
    {
      role: "model",
      parts: "Hey there, what's up home cook! My name is James and I love cookin. I've been in the kitchen since I was 16 and I am now 38. I worked my way up from the very bottom, and I'm now a chef de cuisine at my very own restaurant in Norway. It's a beautiful country by the way. I'm here to help you in any way with my knowledge and experience."
    }
  ])

  const surpriseOptions = [
    "What's your favourite food?",
    "Who's the famous TV celebrity known for their works in the show Hell's Kitchen?",
    "Where can you traditionally find wasabi?"
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!")
      return
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const response = await fetch('http://localhost:2000/gemini', options)
      const data = await response.text()
      console.log("this is data", data)
      
      // Replace newlines with <br /> tags
      const formattedData = data.replace(/\n/g, '<br />');

      setChatHistory(oldChatHistory => [
        ...oldChatHistory, 
        {
          role: "user",
          parts: value
        },
        {
          role: "model",
          parts: formattedData
        }
      ])
      
      setChatDisplay(oldChatDisplay => [
        ...oldChatDisplay, 
        {
          role: "user",
          parts: value
        },
        {
          role: "model",
          parts: formattedData
        }
      ])

      setValue("")

    } catch (error) {
      console.error(error)
      setError("Something went wrong")
    }
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }
  
  return (
    <div className="header">
      <h1>BLANK</h1>
      <div className="app">
        <h1>one liner</h1>
        <p>What do you want to know? 
           <button className="suprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
        </p>

        <div className="input-container">
          <input
            value={value}
            placeholder="When is Christmas...?"
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Ask me</button>}
          {error && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          {chatDisplay.map((chatItem, _index) => (
            <div key={_index}>
              <p
                id="container"
                className="answer"
                dangerouslySetInnerHTML={{ __html: chatItem.parts }}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
