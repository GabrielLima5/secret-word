import './GameOver.css'

export default function GameOver({ tryAgain, score }){
    return(
        <div className="game-over">
            <h1>Você perdeu!</h1>
            <h2>Sua pontuação foi <span>{score}</span></h2>
            <button onClick={tryAgain}>Tentar de novo</button>
        </div>
    )
}