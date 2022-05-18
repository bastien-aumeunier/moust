import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io} from "socket.io-client";
import { set } from "vue/types/umd";
import Grid from '../Game/Grid'


const Multi = () => {

    const navigation = useNavigate()
    const location = useLocation()
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [isStarted, setIsStarted] = useState(false)
    const [socketJoin, setSocketJoin] = useState(null)
    const [doRequest, setDoRequest] = useState(true)
    const [socket2, setSocket2] = useState(null)
    const [adversair, setAdversair] = useState()
    const calledOnce = useRef(false);
    const [count, setCount] = useState(0)
    const [loose, setLoose] = useState(false)
    const [lobbyId, setLobbyId] = useState("")
    const [generateWord, setGenerateWord] = useState("")
    const [isfinished, setIsfinished] = useState(false)
    
    const player = {
        id: "",
        username: "",
        socketId: "",
        lobbyId: "",
    }

    useEffect(() => {
        if(location.state !== null){
            setUserId(location.state.id)
            setUserName(location.state.username)
        }
        console.log(doRequest)
        if (calledOnce.current) {
            return         
        }
        if(doRequest){
            setDoRequest(doRequest+1)
            const socket = io('ws://localhost:9000', {transports: ['websocket']})
            setSocket2(socket)
            player.id = location.state.id
            player.username = location.state.username
            player.socketId = socket.id
            console.log(player)
            socket.emit('playerData', player)
            calledOnce.current = true;
        }
    },[])

    useEffect(() => {
        if(!socket2){
            return
        }
        socket2.on('join lobby', (arg) => {
            console.log(arg)
            setSocketJoin(arg)
        })
        socket2.on('start game', (arg) => {
            console.log(arg)
            setAdversair(arg.players)
            setGenerateWord(arg.word)
            setLobbyId(arg.id)
            setIsStarted(true)
        })
    })

    const iswin = (e) =>{
        if (!e) {
            setLoose(true)
        } else {
            if(count === 2){
                setIsfinished(true)
            }else{
                setCount(count+1)
            }
        }
    }
 


    

    if (socket2!== null) {
        if (isStarted) {
            let newTab = adversair.filter(player => player.id !== userId)
            return (
                <div>
                    <h1>Multi</h1>
                    <h2>In game</h2>
                    <h3>Adversaire</h3>
                    {newTab.map((player, index) => (
                        <li key={index}>{player.username}</li>
                    ))}
                    <div>
                        <Grid iswin={iswin} word={generateWord[count]}/>
                    </div>
                </div>
            )
        } else {
            console.log(socketJoin)
            if(socketJoin !== ""){
                return <div>En attente d'autre joueur</div>
            } else{
                return <div>En attente du serveur</div>
            }
        }
    } else {
        return <div>Erreur</div>
    }
}

export default Multi