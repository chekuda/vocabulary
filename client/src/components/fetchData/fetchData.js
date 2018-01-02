
const builEndPoint = endpoint => {
  return 'http://localhost:5000' + endpoint
}

export const Post = (endPoint, headers = {}, body) => {
  const rightEnpoint = builEndPoint(endPoint)

  return fetch(rightEnpoint, {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
          })
          .then(res => res.json())
          .catch(err => console.log(err))
}

export const Get = endPoint => {
  const rightEnpoint = builEndPoint(endPoint)

  return fetch(rightEnpoint)
    .then(res => res.json())
    .catch(err => console.log(err))
}