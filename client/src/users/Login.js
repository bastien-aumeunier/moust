const rl = require('readline-sync')
const fs = require('fs')
const axios = require('axios');

let erreur = ''

const setUser = (idUser) => {
    const donnee = {
        id: idUser
    }
    let file = JSON.stringify(donnee)
    fs.writeFileSync('User.json', file)
}

const Login = async (mail, password) => {
    const payload = {
        mail: mail,
        password: password
    }
    try {
        let req = await axios.post('http://172.27.48.1:9000/auth/login', payload)
        console.log(req.data)
        setUser(req.data)
    } catch (error) {
        if (error.response.status === 403) {
            console.clear()
            erreur = 'Information incorrectes'
            LoginMenu()
        } else {
            console.clear()
            erreur = 'Erreur de connexion'
            LoginMenu()
        }
    }
}

const LoginMenu = async () => {
    if(erreur !== ''){
        console.log(erreur)
        erreur = ''
    }
    let answer = rl.question('Choisir une option : \n 1 - Login \n 2 - Quitter \n')
    switch(answer){
        case '1':
            await LoginPrompt()
            break
        case '2':
            break
        default:
            console.log('Erreur de saisie !');
            LoginMenu();
    }
}

const LoginPrompt = async () => {
console.log('Connection')
const mail = rl.question('Adresse mail : ')
const password = rl.question('Mot de passe : ')
await Login(mail, password)
}


module.exports = LoginMenu