import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"

const EditPassword = () => {

    const navigation = useNavigate()
    
    const location = useLocation()


    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(location.state !== null){
            setId(location.state.id)
            setUserName(location.state.username)
        }
    }, [location])

    const dbEdit = async (e) => {
        e.preventDefault();
        if(password === confirmPassword){
            const payload = {
                id: id,
                password: password
            }
            try {
                await axios.patch('http://172.27.48.1:9000/auth/account/editpassword', payload)
                navigation('/profile', { state: { id: id, username: userName} })
            } catch (error) {
                setError("erreur de modification")
            }
        }else{
            setError("les mots de passe ne correspondent pas")
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
            <h1>Changement de mot de passe</h1>
            {Erreur()}
            <form onSubmit={dbEdit}>
                <label>Nouveau Mot de passe</label>
                <br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={"Nouveau mot de passe"} required/>
                <br />
                <label>Confirmation Mot de passe</label>
                <br />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={"Confirmer le mot de passe"} required/>
                <br />
                <br />
                <input type="submit" value="Changer" />
            </form>
            <br />
            <button onClick={()=>navigation('/profile', { state: { id: id, username: userName} })}>Retour</button>
        </div>
    )
}

export default EditPassword
