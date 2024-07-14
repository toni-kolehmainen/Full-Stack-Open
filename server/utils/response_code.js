
/**
 * @param {Response} res The date
 * 
 */
const success = (res) => {
  res.status(200).send()
}

const accountCreated = (res) => {
  res.status(201).send()
}

const noContent = (res) => {
  res.status(204).send()
}

const errorBadRquest = (res) => {
  res.status(400).send()
}

const errorUnauthorized = (res) => {
  res.status(401).send()
}

const errorForbidden = (res) => {
  res.status(403).send()
}


const errorInternal = (res) => {
  res.status(500).send()
}

module.exports = {
  success, error
}