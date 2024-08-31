import React from 'react';
import InputArea from './InputArea';
import ChatDisplay from './ChatDisplay';
import useChatState from '../hooks/useChatState';

const ChatInterface = () => {
  const {
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
  } = useChatState();

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory.length}> Surprise me</button>
      </p>
      <InputArea
        value={value}
        setValue={setValue}
        error={error}
        getResponse={getResponse}
        clearAll={clearAll}
        clearInput={clearInput}
        handleKeyPress={handleKeyPress}
      />
      {error && <p>{error}</p>}
      <ChatDisplay chatDisplay={chatDisplay} />
    </div>
  );
};

export default ChatInterface;
