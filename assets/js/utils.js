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

export function httpPost(url, data) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  });
}
