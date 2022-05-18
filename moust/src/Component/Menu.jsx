import {useNavigate, useLocation } from "react-router-dom"
import {useEffect, useState} from "react"

const Menu = () => {
    const navigation = useNavigate()
    const location = useLocation()
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    
    
    useEffect(() => {
        if(location.state !== null){
            setUserId(location.state.id)
            setUserName(location.state.username)
        }
    }, [location])
    if(userId!==""){
        return(
            <div>
                <h1>Bonjour {userName}</h1>
                <div>
                    <button onClick={() => navigation("/solo",{state: {id: userId, username: userName}})}>Jouer en Solo</button>
                    <br />
                    <button onClick={() => navigation("/multi",{state: {id: userId, username: userName}})}>Jouer en Multi</button>
                    <br />
                    <button onClick={() => navigation("/profile", {state: {id: userId, username: userName}})}>Profile</button>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <button onClick={()=>navigation("/login")}>Connexion</button>
                <button onClick={()=>navigation("/register")}>Inscription</button>
            </div>
        )
    }
}

export default Menu;