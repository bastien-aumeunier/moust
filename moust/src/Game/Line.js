import { useState } from "react";
import axios from "axios";

const Line = props => {
    const word = props.word;
    const length = word.length;
    const [newWord, setNewWord] = useState("");
    const [error, setError] = useState("");

    const submitTest = async() => {
        let finalword = word[0]+newWord;
        if (finalword.length === length) {
            if(await verifExist(finalword)){
                setError("");
                setNewWord("")
                props.neword(finalword);
            } else{
                setError('Mot inexistant dans le dictionnaire') 
            }
        } else{
            setError('Mot pas assez long')
        }
    }

    const verifExist = async(word) => {
        try {
            let req = await axios.get(`http://172.27.48.1:9000/api/verif/${word}`);
            if (req.status === 200) {
                return true;
            }
            return false
        } catch (error) {
            return false
        }
    }
    
    return (
        <div>
            {error}
            <div>
                {word[0]}
                <input type="text" maxLength={length-1} value={newWord} onChange={e => setNewWord(e.target.value)}/>
                <button onClick={submitTest}>Tester</button>
            </div>
        </div>
    )
}

export default Line