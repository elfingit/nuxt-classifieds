
const jwt = require('jsonwebtoken')

const verify_token = (token) => {
  
  let payload = null

  try {
    payload = jwt.verify(token, process.env.APP_SECRET_KEY)
  } catch(err) {
    console.error(err)
  }

  return payload

}

const gen_token = (payload) => {
  return jwt.sign(payload, process.env.APP_SECRET_KEY)
}

module.exports = { verify_token, gen_token }