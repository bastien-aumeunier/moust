const fs = require("fs")
const Liste = require('../../../file/WordList')


const verifExist = (word) => {
    console.log(word)
    if (Liste.find(element => element === word)) {
        return 200
    }
    return 403;
}

module.exports = verifExist