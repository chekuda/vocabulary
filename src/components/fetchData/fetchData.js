export default (endPoint) => {
  return fetch(endPoint)
          .then(res => res.json())
          .catch(e => console.log(e))
}