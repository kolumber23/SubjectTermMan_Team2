import UserContext from "../AuthProvider";
import React, { useContext, useState } from "react";

function CallBackendWithCallback(uri, callbackOnResponse, method = "get", requestBody = undefined) {
  const callSupportData = {
    method: method,
  }
  if (requestBody) {
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
    .catch(async (error) => {
    });
}

async function CallBackendAsync(uri, token, method = "get", requestBody = undefined) {
  
  const callSupportData = {
    method: method,
  }
  if (requestBody) {

    callSupportData.headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      callSupportData.headers['Authorization'] = 'Bearer ' +token;
    }
    callSupportData.body = JSON.stringify(requestBody);
  }
  return await fetch(uri, callSupportData)
    .then(async (response) => {
      return await response.json();
    })
    .catch(async (error) => {
      return { error: error.message }
    });

}

export { CallBackendWithCallback, CallBackendAsync };