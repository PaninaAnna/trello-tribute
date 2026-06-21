import React from 'react';

export function renderErrorsFor(errors, field) {
  if (!errors) return null;
  
  const error = errors.find(e => e[field]);
  if (error) {
    return <div className="error">{error[field]}</div>;
  }
  return null;
}

export function setDocumentTitle(title) {
  document.title = `Trello Tribute - ${title}`;
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    return response.json().then(err => { throw err; });
  }
}

function parseJSON(response) {
  return response.json();
}

function getHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export function httpPost(url, data) {
  // Не отправляем токен для регистрации и входа
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (!url.includes('/registrations') && !url.includes('/sessions')) {
    const token = localStorage.getItem('phoenixAuthToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpGet(url) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpDelete(url) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    method: 'DELETE',
    headers: headers,
  })
  .then(checkStatus)
  .then(parseJSON);
}
