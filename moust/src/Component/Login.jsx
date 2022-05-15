import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigation = useNavigate()


    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dbLogin = async (e) => {
        e.preventDefault();
        const payload = {
            mail: mail,
            password: password
        }
        try {
            let req = await axios.post('http://172.27.48.1:9000/auth/login', payload)
            let user = {
                id: req.data.id,
                username: req.data.username,
            }
            console.log('bye')
            navigation('/', { state: { user: user } })
        } catch (error) {
            if (error.response.status === 403) {
                setError('Information incorrectes')
            } else {
                setError('Erreur de connexion')
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
            <h1>Connexion</h1>
            {Erreur()}
            <form onSubmit={dbLogin}>
                <label>Mail : </label>
                <br />
                <input type="text" value={mail} onChange={e => setMail(e.target.value)} />
                <br />
                <label>Password : </label>
                <br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <input type="submit" value="Connexion" />
            </form>
            <div> Vous n'avez pas de compte ? <button onClick={()=>navigation("/register")}>Inscription</button> </div>
        </div>
    )
}

export default Login
