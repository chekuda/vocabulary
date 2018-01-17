
const builEndPoint = endpoint => {
  return process.env.REACT_APP_DEV_ENV ? 'http://localhost:5000' + endpoint : endpoint
}

export const Post = (endPoint, headers = {}, body) => {
  const rightEnpoint = builEndPoint(endPoint)

  return fetch(rightEnpoint, {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
          })
          .then(res => res.json())
          .catch(({ msg }) => console.log(msg))
}

export const Get = endPoint => {
  const rightEnpoint = builEndPoint(endPoint)

  return fetch(rightEnpoint)
    .then(res => res.json())
    .catch(({ msg }) => console.log(msg))
}