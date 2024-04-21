function CallBackend(uri, callbackOnResponse, method = "get", requestBody = undefined) {
  const callSupportData = {
    method: method,
  }
  if(requestBody) 
  {
    callSupportData.headers = {
      "Content-Type": "application/json",
    };
    callSupportData.body = JSON.stringify(requestBody);
  }
  fetch(uri, callSupportData)
    .then(async (response) => {
      const responseJson = await response.json();
      callbackOnResponse(responseJson)
    })
    .catch(async (response) => {
      callbackOnResponse({})
    })
  ;
}

export default CallBackend;