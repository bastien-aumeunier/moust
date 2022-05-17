import {useNavigate, useLocation} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = props => {

    const navigation = useNavigate()
    const location = useLocation()
    
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [userInfo, setUserInfo] = useState({})
    const [userScore, setUserScore] = useState([])
    const [isRequest, setIsRequest] = useState(false)
    const [newMail, setNewMail] = useState("")
    const [viewnewMail, setViewnewMail] = useState(false)


    const getUserInfo = async(id) => {
        try {
            let req = await axios.get(`http://172.27.48.1:9000/auth/account/user/${id}`)
            setUserInfo(req.data)
            let req2 = await axios.get(`http://172.27.48.1:9000/api/score/${id}`)
            setUserScore(req2.data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteAccount = async(e) => {
        e.preventDefault()
        try {
            console.log('enter')
            await axios.delete(`http://172.27.48.1:9000/auth/account/${userId}`)
            navigation("/")
        } catch (e) {
            console.log(e)
        }
        
    }

    const showScore = () => {
        if(userScore.length !== 0){
            return (
                <div>
                    <h1>Top Score : </h1>
                    {userScore.map((score) => (
                        <li>{score.score} Mots trouvés</li>
                    ))}
                </div>
            )
         } else {
             return <h3>Vous n'avez pas encore de score</h3>
         }
    }



    useEffect(() => {
        if(location.state !== null){
            setUserId(location.state.id)
            setUserName(location.state.username)
            getUserInfo(location.state.id)
        }
    }, [location])


    if (isRequest === false) {
        getUserInfo()
        setIsRequest(true)
       return(
           <h1>Chargement ..</h1>
       ) 
    }else{
        return(
            <div>
                <h1>Profile</h1>
                <h4>Username : {userName}</h4>
                <button onClick={()=> navigation('/edit/username', { state: { id: userId, username: userName} })}>Modifier l'username</button>
                <h4>Mail : {userInfo.mail}</h4>
                <button onClick={()=> navigation('/edit/mail', { state: { id: userId, username: userName, mail: userInfo.mail} })}>Modifier le mail</button>
                <br />
                <br />
                <button onClick={()=> navigation('/edit/password', { state: { id: userId, username: userName} })}>Modifier le mot de passe</button>
                    {showScore()}
                <br />
                <button onClick={()=> navigation('/', { state: { id: userId, username: userName} })}>Retour</button>
                <br />
                <br />
                <button onClick={()=> navigation('/')}>Déconnexion</button>
                <button onClick={deleteAccount}>Supprimer le compte</button>
            </div>
        )

    }



}

export default Profile;