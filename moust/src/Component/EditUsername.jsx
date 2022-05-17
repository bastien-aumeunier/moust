import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"

const EditUsername = () => {

    const navigation = useNavigate()
    
    const location = useLocation()


    const [id, setId] = useState("");
    const [pastUsername, setPastUsername] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(location.state !== null){
            setId(location.state.id)
            setPastUsername(location.state.username)
        }
    }, [location])

    const dbEdit = async (e) => {
        e.preventDefault();
        if(userName === pastUsername){
            setError("Vous ne pouvez pas utiliser votre nom d'utilisateur actuel")
        } else {
            const payload = {
                id: id,
                username: userName
            }
            try {
                await axios.patch('http://172.27.48.1:9000/auth/account/editusername', payload)
                navigation('/profile', { state: { id: id, username: userName} })
            } catch (error) {
                setError("erreur de modification")
            }
        }
    }
    
    const Erreur = () => {
        if (error !== '') {
            return(
                <div>
                    <p>Erreur : {error}</p>
                </div>
            )
        }
    }
        

    return(
        <div>
            <h1>Changement du nom d'utilisateur</h1>
            {Erreur()}
            <form onSubmit={dbEdit}>
                <label>Nouveau Username</label>
                <br />
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder={pastUsername} required/>
                <br />
                <br />
                <input type="submit" value="Changer" />
            </form>
            <br />
            <button onClick={()=>navigation('/profile', { state: { id: id, username: pastUsername} })}>Retour</button>
        </div>
    )
}

export default EditUsername
