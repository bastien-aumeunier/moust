const axios = require('axios');
const rl = require('readline-sync')

let erreur = ''

const Register = async (username1, mail1, password1) => {
    const payload = {
        username: username1,
        mail: mail1,
        password: password1
    }
    try {
        await axios.post('http://172.27.48.1:9000/auth/register', payload)
    } catch (error) {
        if (error.response.status === 409) {
            console.clear()
            erreur ='Ce compte existe déjà' 
            RegisterMenu()
        } else {
            console.clear()
            erreur = 'Erreur de connexion' 
            RegisterMenu()

        }
    }
}

const RegisterMenu = async () => {
        if(erreur !== ''){
            console.log(erreur)
            erreur = ''
        }
        let answer = rl.question('Choisir une option : \n 1 - Register \n 2 - Quitter \n')
        switch(answer){
            case '1':
                await RegisterPrompt()
                break
            case '2':
                break
            default:
                console.log('Erreur de saisie !');
                RegisterMenu();
        }
}

const RegisterPrompt = async () => {
    console.log('Inscription')
    const username = rl.question('Nom d\'utilisateur : ')
    const mail = rl.question('Adresse mail : ')
    const password = rl.question('Mot de passe : ')
    const passwordConfirm = rl.question('Confirmer le mot de passe : ')
    if(password !== passwordConfirm){
        erreur = 'Les mots de passe ne correspondent pas'
    } else {
        await Register(username, mail, password)
    }
}

module.exports = RegisterMenu