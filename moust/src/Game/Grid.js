
import { useEffect, useState } from 'react';
import Line from './Line';

const Grid = props => {
    const [nbEssaie, setNbEssaie] = useState(0);
    const [essaie1, setEssaie1] = useState("");
    const [essaie2, setEssaie2] = useState("");
    const [essaie3, setEssaie3] = useState("");
    const [essaie4, setEssaie4] = useState("");
    const [viewViewWord, setViewViewWord] = useState(false);
    const [viewWord, setViewWord] = useState("Clique pour la réponse");
    const word = props.word
    const length = word.length
    var finalword = word[0]+'_'.repeat(length-1)
    const [final, setFinal] = useState("");

    const setFinalWord = () => {
        if (final[0] !== word[0]) {
            setFinal(word[0]+'_'.repeat(length-1));
        }
        return <h5>Mot final : {final}</h5>
    }


    const testLetter = (w) => {
        let test = final.split('')
        for (let index = 1; index < length; index++) {
            if(w[index] === word[index]){
                test[index] = w[index];
            }
        }
        setFinal(test.join(''))
    }


    const neword=(neword) =>{
        if(neword === word){
            setEssaie1("")
            setEssaie2("")
            setEssaie3("")
            setEssaie4("")
            setFinal(finalword)
            setViewWord("Clique pour la réponse")
            setViewViewWord(false)
            setNbEssaie(0)
            props.iswin(true)
        }else{
            testLetter(neword);
            setNbEssaie(nbEssaie+1)
            switch(nbEssaie){
                case 0:
                    setEssaie1(neword)
                    break;
                case 1:
                    setEssaie2(neword)
                    break;
                case 2:
                    setEssaie3(neword)
                    break;
                case 3:
                    setEssaie4(neword)
                    break;
                case 4:
                    props.iswin(false)
                    break;
                default:
                    break;
            }
        }
    }

    const Essaie1 = () => {
        if(essaie1 === ""){
            return "";
        }else{
            return <div><strong>Essaie 1 : </strong>{essaie1}</div>
        }
    }

    const Essaie2 = () => {
        if(essaie2 === ""){
            return "";
        }else{
            return <div><strong>Essaie 2 : </strong>{essaie2}</div>
        }
    }

    const Essaie3 = () => {
        if(essaie3 === ""){
            return "";
        }else{
            return <div><strong>Essaie 3 : </strong>{essaie3}</div>
        }
    }

    const Essaie4 = () => {
        if(essaie4 === ""){
            return "";
        }else{
            return <div> <strong>Essaie 4 : </strong>{essaie4}</div>
        }
    }

    const lastwords = () =>{
        return(
            <div>
                {Essaie1()}
                {Essaie2()}
                {Essaie3()}
                {Essaie4()}
                <br />
            </div>
        )
    }

    const viewWord2 = (e) => {
        e.preventDefault();
        setViewViewWord(!viewViewWord)
        if(!viewViewWord){   
            setViewWord(word)
        } else{
            setViewWord("Clique pour la réponse")
        }
    }

    if (word === '') {
        console.log('wait')
        return <h5>Wait</h5>
    } else {
        return (
            <div>
                <form onSubmit={viewWord2}>
                    <input type="submit" value={viewWord} />
                </form>
                    <h5>Taille du mot : {length}</h5>
                    {setFinalWord()}
                    {lastwords()}
                    <Line word={word} neword={neword}/>
            </div>
        )

    }


}
export default Grid