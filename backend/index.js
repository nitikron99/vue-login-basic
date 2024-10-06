const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRound = 10

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nitikron',
  password: '212224236',
  database: 'vue-login-basic',
  port: 3306
})

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})

app.get('/', (req, res) => {
  console.log('root')
  res.send('root')
})

app.post('/authenticatorLogin', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  db.query(`SELECT * FROM users WHERE BINARY us_username = '${username}'`, (err, userInfo) => {
    if (err) {
      console.log(err)
    } else {
      if (userInfo.length > 0) {
        bcrypt.compare(password, userInfo[0].us_password, function (err, result) {
          if (err) {
            console.log(err)
          } else {
            if (result) {
              res.send(result)
            } else {
              res.send('Username or Password is incorrect.')
            }
          }
        })
      } else {
        res.send('Username or Password is incorrect.')
      }
    }
  })
})