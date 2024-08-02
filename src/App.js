//import logo from './logo.svg';
import userEvent from '@testing-library/user-event';
import './App.css';
import { useState, useRef, useEffect } from "react";

const App = () => {

  //Setting states for variables
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatDisplay, setChatDisplay] = useState([]);
  //const [possibleRecipe, setPossibleRecipe] = useState("");
  //const [recipeHistory, setRecipeHistory] = useState([]);
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

  //reference point for chat interface
  const chatRefs = useRef([])

  //typewriter function
  const typeWriter = (htmlContent, index, t) => {
    let i = 0
    const speed = t
    const tempElement = document.createElement('div')
    tempElement.innerHTML = htmlContent

    const textContent = Array.from(tempElement.childNodes).reduce((acc, node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return acc + node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        return acc + '\n'
      }
      return acc
    }, '')

    const type = () => {
      if (i < textContent.length) {
        if (textContent.charAt(i) === '\n') {
          chatRefs.current[index].innerHTML += '<br/>'
        } else {
          chatRefs.current[index].innerHTML += textContent.charAt(i)
        }
        i++
        setTimeout(type, speed)
      }
    }
    type()
  }

  //combining the chatref with the typing effect
  useEffect(() => {
    chatRefs.current = chatRefs.current.slice(0, chatDisplay.length)
  }, [chatDisplay])

  //Automatic suggested chat options
  const surpriseOptions = [
    "What's your favourite food?",
    "Who's the famous TV celebrity known for their works in the show Hell's Kitchen?",
    "Where can you traditionally find wasabi?"
  ]

  //Automatic suggested function
  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  //handle inputs
  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    if (value.toLowerCase() === "clear") {
      setError("Clear all history?");
      return;
    }
    
    //Seperate chat display => ignore the prepromt for the chat
    setChatDisplay(oldChatDisplay => [
      ...oldChatDisplay,
      {
        role: "user",
        parts: value
      }
    ])

    //define post request
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

      //getting response from serperate server with the post request
      const response = await fetch('http://localhost:2000/gemini', options);
      const data = await response.text();

      //formatting data to include line breaks in output
      const formattedData = data.replace(/\n/g, '<br />');

      //setting the chathistory for input
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
      ]);

      //setting the chat display
      setChatDisplay(oldChatDisplay => [
        ...oldChatDisplay,
        {
          role: "model",
          parts: formattedData
        }
      ]);

      //resetting the input to empty
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  //function to clear all
  const clearAll = () => {
    setValue("");
    setError("");
    setChatHistory([]);
    setChatDisplay([]);
  };

  //function to clear input only
  const clearInput = () => {
    setError("");
    setValue("");
  };

  //function to handle enter as a key press - alt to clicking button
  const handleKeyPress = (event) => {
    if (!error && event.key === 'Enter') {
      getResponse();
    }
    if (error === "Something went wrong" && event.key === 'Enter') {
      clearAll();
    }
    if (error === "Error! Please ask a question!" && event.key === 'Enter') {
      clearInput();
    }
    if (error === "Clear all history?" && event.key === 'Enter') {
      clearAll();
    }
  };

  //utilizing the typing effect with the output display
  useEffect(() => {
    if (chatDisplay.length > 0) {
      const lastIndex = chatDisplay.length - 1;
      if (chatDisplay[lastIndex].role === "model") {
        typeWriter([chatDisplay[lastIndex].parts], lastIndex, 20);
      }
      if (chatDisplay[lastIndex].role === "user") {
        typeWriter([chatDisplay[lastIndex].parts], lastIndex, );
      }
    }
  }, [chatDisplay]);

  //returns wthe set
  return (
    <div className="header">
      <h1>House</h1>
      <div className="app">
        <p>What do you want to know? 
           <button className="suprise" onClick={surprise} disabled={!chatHistory.length}>Surprise me</button>
        </p>

        <div className="input-container">
          <input
            value={value}
            placeholder="When is Christmas...?"
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {!error && <button onClick={getResponse}>Ask me</button>}
          {error === "Something went wrong" && <button onClick={clearAll}>Clear</button>}
          {error === "Error! Please ask a question!" && <button onClick={clearInput}>Reset</button>}
          {error === "Clear all history?" && <button onClick={clearAll}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          {chatDisplay.map((chatItem, index) => (
            <div key={index}>
              <p
                ref={el => chatRefs.current[index] = el}
                className="answer"
              ></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;