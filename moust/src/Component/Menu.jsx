import {useNavigate, useLocation } from "react-router-dom"
import {useEffect, useState} from "react"

const Menu = props => {
    const navigation = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("")
    
    
    useEffect(() => {
        if(location.state !== null){
            setUser(location.state.user)
        }
    }, [location])

    console.log(user)
    if(user!==""){
        return(
            <h1>Bonjour {user.username}</h1>
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