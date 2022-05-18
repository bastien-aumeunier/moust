import {useEffect, useState} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import axios from "axios"
import Grid from '../Game/Grid'
import Generate from '../utils/Generate'

const Solo = () => {

    const navigation = useNavigate()

    const location = useLocation()
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [count, setCount] = useState(0)
    const [loose, setLoose] = useState(false)
    const [generateWord, setGenerateWord] = useState("")
    const [startWord, setStartWord] = useState(false)
    const [difficulty, setDifficulty] = useState(5)
    
    
    useEffect(() => {
        if(location.state !== null){
            setUserId(location.state.id)
            setUserName(location.state.username)
        }
    }, [location])

    const addScore = async() => {
        try {
            const payload ={
                idUser: userId,
                score: count
            }
            await axios.post(`http://172.27.48.1:9000/api/score/`, payload)
        } catch (error) {
            console.log('erreur')
        }
    }

    const lookdifficulty = () => {
        console.log('lookdifficulty')
        if (count%5 === 0 && count !== 0) {
            if (difficulty === 10) {
                setDifficulty(5)
            } else{
                setDifficulty(difficulty + 1)
            }

        }
    }

    const iswin = (e) =>{
        if (!e) {
            setLoose(true)
            addScore()
        } else {
            setCount(count+1)
            setStartWord(false)
        }
    }

    const generate = async(length) => {
        console.log('generation ...')
        let req = await Generate(length)
        setGenerateWord(req)
        return req
    }

    const start = async() => {
        if(!startWord){
            setStartWord(true)
            lookdifficulty()
            console.log(await generate(difficulty))

        }
    }
    const gotoMenu = () => {
        navigation('/', { state: { id: userId, username: userName} })
    }


    const gamePlay = () => {
        start()
        if (generateWord.length === 0) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return(
                <div>
                    <Grid iswin={iswin} word={generateWord}/>
                </div>
            )
            
        }
    }

    if (loose) {
        return(
            <div>
                <h1>Vous avez perdu</h1>
                <h4>Votre score est de {count}</h4>
                <button onClick={gotoMenu}>Retourner au menu</button>
            </div>
        )
    }
    return (
        <div>
            <h2>Mode Solo {userName} </h2>
            <h4>Mot trouvé: {count}</h4>
            {gamePlay()}
        </div>
    )
}

export default Solo;