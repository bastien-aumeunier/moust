const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
const { Socket } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
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
const server = require('http').createServer(app);


const io = require('socket.io')(server);




mongoose.connect('mongodb://localhost:27017/motus', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connexion à la base OK");
});

server.listen(port, () => {
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

let lobbys = []

io.on('connection', async (socket) => {
  console.log('a user connected ' + socket.id);
  socket.on('playerData', async(player) => {
    console.log('test')
    console.log(`[playerData] ${player.username} - ${player.id}`)
      let lobby = null
      if (player.lobbyId === '') {
          lobby = lobbys.find(lobby => lobby.status === 'waiting')
          if (lobby === undefined) {
            lobby = createLobby(player)
          } else {
            console.log('lobby found', lobby.id)
            lobby.players.push(player)
            player.lobbyId = lobby.id
          }
      }
      socket.join(lobby.id)

      io.to(socket.id).emit('join lobby', lobby)
      console.log(`[player] ${player.username} - ${player.id} joined lobby ${lobby.id}`)
      if (lobby.players.length === 2) {
        console.log(`[lobby] ${lobby.id} - ${lobby.players[0].username}  and ${lobby.players[1].username} start game`)
        lobby.status = 'playing'
        lobby.word.push(await GenerateWord(5))
        lobby.word.push(await GenerateWord(6))
        lobby.word.push(await GenerateWord(7))
        io.to(lobby.id).emit('start game', lobby)
      }
  })
  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id + ' - ' + socket.username);
    let lobby = lobbys.find(lobby => lobby.id === socket.lobbyId)
    if (lobby !== undefined) {
      lobby.players = lobby.players.filter(player => player.id !== socket.id)
    }

  })
  socket.on('finish', (player) => {
    console.log(`[player] ${player.username} - ${player.id} finished game`)
    let lobby = lobbys.find(lobby => lobby.id === player.lobbyId)
    lobby.classement.push(player.username)
    io.to(socket.id).emit('finish game', lobby)
    if (lobby.classement.length === lobby.players.length) {
      console.log(`[lobby] ${lobby.id} - game finished`)
      lobby.status = 'finish'
    }
  })
})





const createLobby = (player) => {
  const lobby = {id: uuidv4(), players: [], status: 'waiting', classement : [], word:[]}
  player.lobbyId = lobby.id
  lobby.players.push(player)
  lobbys.push(lobby)
  console.log(`[player] ${player.username} - ${player.id} created lobby ${lobby.id}`)
  return lobby
}



