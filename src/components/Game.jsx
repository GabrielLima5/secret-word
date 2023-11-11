import { useState, useRef } from 'react'
import './Game.css'

export default function Game({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, guesses, wrongLetters, score }){
    
    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLetter('')

        verifyLetter(letter)
        letterInputRef.current.focus()
    }
    return(
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Guess The Word</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="word-container">
            {letters.map((letter, index) => (
                guessedLetters.includes(letter) ? (
                    <span key={index} className="letter">{letter}</span>
                ) : (
                    <span key={index} className="blank-square"></span>
                )
            ))}
            </div>
            <div className="letter-container">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input ref={letterInputRef} type="text" name="letter" value={letter} onChange={(e) => setLetter(e.target.value)} maxLength="1" required />
                    <button type="submit">Jogar</button>
                </form>
            </div>
            <div className={`${wrongLetters.length ? 'wrong-letter-container' : 'hide'}`}>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, index) => (
                    <span key={index} style={{marginLeft: '10px'}}>{letter}</span>
                ))}
            </div>
        </div>
    )
}