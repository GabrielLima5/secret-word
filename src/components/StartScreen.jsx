import './StartScreen.css'

export default function StartScreen({ firstStarting }){
    return(
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={firstStarting}>Começar o jogo</button>
        </div>
    )
}