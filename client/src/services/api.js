const API_URL = process.env.REACT_APP_API_URL;


export const sendMessage = async (chatHistory, value) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ 
      history: chatHistory, 
      message: value }),
    headers: { "Content-Type": "application/json" }
  };

  console.log("printing options in api.js", options)

  const response = await fetch(`${API_URL}/gemini`, options);
  const data = await response.text();
  console.log("this is data ", data);
  return data.replace(/\n/g, '<br />');
};
