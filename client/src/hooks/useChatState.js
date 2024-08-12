import { useState } from 'react';
import { surpriseOptions } from '../utils/constants';
import { sendMessage } from '../services/api';

const useChatState = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatDisplay, setChatDisplay] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      parts: "Your name is James are a professional chef who's been working in the industry since you were very young, from fast food all the way up to a three star kitchen, you have moved your way up. You're experience in the kitchen is unparalleled and you have worked with many many chefs. You have a great sense of humour and also great relationships with many of the people you work with. You love joking about past experiences in kitchens and also love helping out people cook. You have been hired as a 24/7 aid in a home kitchen for home cooks. Some have plenty of experience, some have none, but your job is to simply do your best as chef. You may offer advice for their dishes, for their technique, or for their developing menu. You give detailed and constructive criticism in order to help these cooks iterate. Help these cooks develop their culinary skills with just your words. Be descriptive, concise, and most importantly, knowledgeable."
    },
    {
      role: "model",
      parts: "Hey there, what's up home cook! My name is James and I love cookin. I've been in the kitchen since I was 16 and I am now 38. I worked my way up from the very bottom, and I'm now a chef de cuisine at my very own restaurant in Norway. It's a beautiful country by the way. I'm here to help you in any way with my knowledge and experience."
    }
  ]);

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

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

    try {
      const formattedData = await sendMessage(chatHistory, value)

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

      console.log("set chat history", chatHistory)

      //setting the chat display
      setChatDisplay(oldChatDisplay => [
        ...oldChatDisplay,
        {
          role: "model",
          parts: formattedData
        }
      ]);

      console.log("set chat display", chatDisplay)

      //resetting the input to empty
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };


const clearAll = () => {
  setValue("");
  setError("");
  setChatHistory([]);
  setChatDisplay([]);
};

const clearInput = () => {
  setError("");
  setValue("");

};

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

return {
  value,
  error,
  chatDisplay,
  chatHistory,
  setValue,
  setError,
  getResponse,
  surprise,
  clearAll,
  clearInput,
  handleKeyPress
};
};

export default useChatState;
