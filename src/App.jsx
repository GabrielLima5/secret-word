// CSS
import './App.css'

// React
import { useCallback, useState, useEffect } from 'react'

// Data
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])
  
  const guessesQty = 3
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
    // picking random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]
    
    // picking a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    
    return [word, category]
  }, [words])

  const firstStarting = () => {
    setGameStage(stages[1].name)
    startGame()
  }

  const startGame = useCallback(() => {
    clearLetterStates()
    const [word, category] = pickWordAndCategory()
    const wordLetters = word.split('').map(l => l.toLowerCase())
    
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0){
      setGameStage(stages[2].name)
      clearLetterStates()
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    
    if (guessedLetters.length === uniqueLetters.length){
      setScore(actualScore => actualScore += 100)
      startGame()
    }

  }, [guessedLetters, letters, startGame])

  const tryAgain = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen firstStarting={firstStarting} />}
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      guesses={guesses}
      wrongLetters={wrongLetters}
      score={score} />}
      {gameStage === 'end' && <GameOver tryAgain={tryAgain} score={score} />}
    </div>
  )
}

export default App
