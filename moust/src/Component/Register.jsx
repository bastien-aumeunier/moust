import { useState } from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios";

const Register = () => {

    const navigation = useNavigate()


    const [userName, setUserName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    const verifyform = () => {
        if(password === passwordConfirm){
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(re.test(mail)) {
                return true
            } else { 
                setError("Votre adresse mail n'est pas valide")
                return false
            }
        }else{
            setError("Les mots de passe ne correspondent pas")
            return false
        }
    }

    const dbRegister = async (e) => {
        e.preventDefault();
        if(verifyform()){
            const payload = {
                username: userName,
                mail: mail,
                password: password
            }
            try {
                await axios.post('http://172.27.48.1:9000/auth/register', payload)
                navigation('/login')
            } catch (error) {
                if (error.response.status === 409) {
                    console.clear()
                    setError('Votre adresse mail est déjà utilisée')
                } else {
                    console.clear()
                    setError('Erreur de connexion' )
        
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
            <h1>Inscription</h1>
            {Erreur()}
            <form onSubmit={dbRegister}>
                <label>UserName : </label>
                <br />
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                <br />
                <label>Mail : </label>
                <br />
                <input type="text" value={mail} onChange={e => setMail(e.target.value)} />
                <br />
                <label>Password : </label>
                <br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <label>Confirm Password : </label>
                <br />
                <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                <br />
                <input type="submit" value="Incription" />
                <div>Vous avez deja un compte ? <button onClick={()=>navigation("/login")}>Connexion</button></div>

            </form>
        </div>
    )

}

export default Register