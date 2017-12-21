export const Post = (endPoint, headers = {}, body) => {
  return fetch(endPoint, {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
          })
          .then(res => res.json())
          .catch(err => console.log(err))
}

export const Get = endPoint => {
  return fetch(endPoint)
    .then(res => res.json())
    .catch(err => console.log(err))
}