const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
const {Socket} = require('socket.io')
const cors = require("cors");
const login = require('./src/routes/users/Login')
const register = require('./src/routes/users/Register')
const GenerateWord = require('./src/routes/word/Generate')
const verifExist = require('./src/routes/word/Verif')
const GetUser = require('./src/routes/users/GetUser')
const PostScore = require('./src/routes/score/Post')
const GetScore = require('./src/routes/score/Get')
const DeleteUser = require('./src/routes/users/Remove')
const UpdateUser = require('./src/routes/users/UpdateUser')
const UpdatePass = require('./src/routes/users/UpdatePass')
const UpdateMail = require('./src/routes/users/UpdateMail')

const app = express();
const port = 9000;
const http = require('http').createServer(app);

const io = require('socket.io')(http);


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
app.use(cors())




app.post('/auth/login', async (req, res) =>{
  let re = await login(req.body)
  res.status(re[0]).send(re[1])
})

app.post('/auth/register', async (req, res) => {
  res.sendStatus(await register(req.body))
})

app.get('/auth/account/user/:idUser', async (req, res) => {
  let re = await GetUser(req.params.idUser)
  res.status(re[0]).send(re[1])
})

app.delete('/auth/account/:idUser', async (req, res)  => {
  res.sendStatus(await DeleteUser(req.params.idUser))
})

app.patch('/auth/account/editusername', async (req, res) => {
  res.sendStatus(await UpdateUser(req.body))
})

app.patch('/auth/account/editpassword', async (req, res) => {
  res.sendStatus(await UpdatePass(req.body))
})

app.patch('/auth/account/editmail', async (req, res) => {
  res.sendStatus(await UpdateMail(req.body))
})

app.get('/api/generate/:size', async (req, res) => {
    res.send(await GenerateWord(req.params.size))

})

app.get('/api/verif/:word', (req, res) => {
    res.sendStatus(verifExist(req.params.word))
})

app.post('/api/score', async (req, res) => {
  res.sendStatus(await PostScore(req.body))
})

app.get('/api/score/:idUser', async (req, res) => {
  let re = await GetScore(req.params.idUser)
  res.status(re[0]).send(re[1])
})

app.get('/multi/lobby', (req, res) => {

})



