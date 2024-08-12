import React from 'react';

const InputArea = ({ value, setValue, error, getResponse, clearAll, clearInput, handleKeyPress }) => (
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
);

export default InputArea;
