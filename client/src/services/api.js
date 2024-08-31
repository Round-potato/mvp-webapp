const URL = process.env.REACT_APP_API_URL
console.log("printing URL in api.js", URL)


export const sendMessage = async (chatHistory, value) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ 
      history: chatHistory, 
      message: value }),
    headers: { "Content-Type": "application/json" }
  };
  
  console.log("printing options in api.js", options)
 

  const response = await fetch(`http://localhost:2002/api/gemini`, options);
  const data = await response.text();
  console.log("this is data ", data);
  return data.replace(/\n/g, '<br />');
};
