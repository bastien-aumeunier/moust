const rl = require('readline-sync')
const fs = require("fs")
const Liste = require('./liste.json')
const User = require('./User.json')
const register = require('./src/users/Register.js')
const login = require('./src/users/Login')

let loose = false
let count = 0

let idUser = ""


const start = async () => {
    console.clear()
    console.log('Lancement de Moust\n\n')
    idUser = User.id
    mainMenu()

}



const mainMenu = async() => {
    if (idUser === "") {
        let answer = rl.question('Choisir une option : \n 1 - Inscription \n 2 - Login \n 3 - Quitter \n ')
        switch(answer){
            case '1':
                console.clear()
                await register()
                mainMenu();
            case '2':
                console.clear()
                await login()
                start()
            case '3':
                console.log('Au revoir');
                process.exit();
            default:
                console.log('Erreur de saisie !');
                mainMenu();
                
        }
    } else {
        let answer = rl.question('Choisir une option : \n 1 - Jouer en solo \n 2 - Jouer en multijoueur \n 3 - Profile \n 4 - Quitter \n ')
    switch(answer){
        case '1':
            console.clear()
            soloGame();
        case '2':
            console.clear()
            multiplayer()
        case '3':
            console.clear()
            profile()
        case '4':
            console.log('Au revoir');
            process.exit();
        default:
            console.log('Erreur de saisie !');
            mainMenu();
            
    }
    }
    
}

const multiplayer = () => {
    console.log('Mode Multijoueur \n\n')
}

const profile = () => {
    console.log('Profile \n\n')
}

const soloGame = () => {
    console.log('Mode Solo \n\n')
    boucleGame()
    
}

const boucleGame = () => {
    console.clear()
    if(loose){
        console.log('Partie terminée !')
        console.log('Nombre de partie gagnées : ' + count +'\n\n')
        mainMenu()
    }
    gamePlay()
}

const gamePlay = async () => {
    const word = generateWord(5)
    const length = word.length
    console.log(length)
    console.log(word[0], word[1])

    let essaie = 1;
    while(essaie < 6){
        let answer = rl.question('Entrer un mot : ')
        if(answer.length!= length || answer[0] != word[0]){
            if(findDictionary(answer)){
                console.clear()
                console.log('Mot trouvé !')
                count++
                boucleGame()
            }
            console.log('Mot inexistant !')
        }
        console.log('Mot invalide !')
    }
    loose = true   
}


const findDictionary = (word) => {
    const list = fs.readFileSync('./WordList.txt', 'UTF-8');
    list.split(/\r?\n/).forEach((line) => {
        if(line === word){
            return true
        }
    })
    return false;
}

const generateWord = (lenght) => {
    const wordList = Liste[lenght];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

start()

