import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"

const EditUsername = () => {

    const navigation = useNavigate()
    
    const location = useLocation()


    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const [mail, setMail] = useState("");
    const [newMail, setNewMail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(location.state !== null){
            setId(location.state.id)
            setMail(location.state.mail)
            setUserName(location.state.username)
        }
    }, [location])

    const dbEdit = async (e) => {
        e.preventDefault();
        if(mail === newMail){
            setError("Vous ne pouvez pas utiliser votre mail actuel")
        }else{
            const payload = {
                id: id,
                mail: mail
            }
            try {
                await axios.patch('http://172.27.48.1:9000/auth/account/editmail', payload)
                navigation('/profile', { state: { id: id, username: userName} })
            } catch (error) {
                if (error.response.status === 409) {
                    setError("Ce mail est déjà utilisé")
                }else{    
                    setError("erreur de modification")
                }
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
            <h1>Changement de mail</h1>
            {Erreur()}
            <form onSubmit={dbEdit}>
                <label>Nouveau Mail</label>
                <br />
                <input type="text" value={newMail} onChange={e => setNewMail(e.target.value)} placeholder={mail} required/>
                <br />
                <br />
                <input type="submit" value="Changer" />
            </form>
            <br />
            <button onClick={()=>navigation('/profile', { state: { id: id, username: userName} })}>Retour</button>
        </div>
    )
}

export default EditUsername
