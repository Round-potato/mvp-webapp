import React, { useRef, useEffect } from 'react';
import useTypewriter from '../hooks/useTypewriter';

const ChatDisplay = ({ chatDisplay }) => {
  const chatRefs = useRef([]);
  const typeWriter = useTypewriter();

  useEffect(() => {
    chatRefs.current = chatRefs.current.slice(0, chatDisplay.length);
  }, [chatDisplay]);

  useEffect(() => {
    if (chatDisplay.length > 0) {
      const lastIndex = chatDisplay.length - 1;
      if (chatDisplay[lastIndex].role === "model") {
        typeWriter(chatDisplay[lastIndex].parts, chatRefs.current[lastIndex], 20);
      }
      if (chatDisplay[lastIndex].role === "user") {
        typeWriter(chatDisplay[lastIndex].parts, chatRefs.current[lastIndex], 5);
      }
    }
  }, [chatDisplay, typeWriter]);

  return (
    <div className="search-result">
      {chatDisplay.map((chatItem, index) => (
        <div key={index}>
          <p ref={el => chatRefs.current[index] = el} className="answer"></p>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
