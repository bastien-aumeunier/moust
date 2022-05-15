const Liste = require('../../../file/liste.json')

const GenerateWord = async (lenght) => {
    const wordList = Liste[lenght];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

module.exports = GenerateWord