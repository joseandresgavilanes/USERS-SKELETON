const { loginUser } = require("./auth.controller")
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const login = (req, res) => {
  const { email, password } = req.body

  if(!email || !password) return res.status(400).json({message: 'Missing data'})

  loginUser(email, password).then(response=> {
    if(response){
      const token = jwt.sign({
        id: response.id,
        email: response.email,
        role: response.role
      }, jwtSecret)

      res.status(200).json({
        message: 'Correct Credentials',
        token
      })
    }else res.status(401).json({message: 'Invalid Credentials'})
  }).catch(error=> res.status(400).json({message: error.message}))
}

module.exports = { login }