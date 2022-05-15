const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
const login = require('./src/routes/users/Login')
const register = require('./src/routes/users/Register')
 
const app = express();
const port = 9000;

mongoose.connect('mongodb://localhost:27017/motus', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connexion à la base OK");
});

app.listen(port, () => {
    console.log('Lancement du server sur le port : ' + port);
});

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.post('/auth/login', async (req, res) =>{
  console.log('tt')
  let re = await login(req.body)
  res.status(re[0]).send(re[1])
})

app.post('/auth/register', async (req, res) => {
  res.sendStatus(await register(req.body))
})

