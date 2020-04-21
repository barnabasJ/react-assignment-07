import * as React from "react"
import { isEmpty } from "lodash"
import { render } from "react-dom"
import { CardGame, Card, Suit, Rank, Guess } from './card-game'
import { observer } from 'mobx-react'

enum ActionType {
  GUESS,
  PLAY,
  INIT_GAME,
}

const App = observer(({game}: React.PropsWithChildren<{game: CardGame}>): React.ReactElement => {
    React.useEffect(() => {
        game.shuffle()
        game.playCard() 
      }, 
      []
    )
    return (
      <main>
        <h1>Card Game</h1>
        <h2>{game.correctGuesses} right guess(es)</h2>
        <CardView card={game.currentCard} />
        { game.currentGuess && <p>Current Guess: {game.currentGuess}</p>}
        {!isEmpty(game.remainingCards) && (
          <>
            <button onClick={(): void => game.guess(Guess.HIGHER)}>Higher</button>
            <button onClick={(): void => game.guess(Guess.EQUAL)}>Equal</button>
            <button onClick={(): void => game.guess(Guess.LOWER)}>Lower</button>
            <button onClick={(): Card => game.playCard()}>PlayCard</button>
          </>
        )}
        <button onClick={(): void => {game.newGame()}}>New Game</button>
      </main>
    )
})

const rankString = {
  [Rank.ACE]: 'ACE',
  [Rank.TWO]: '2',
  [Rank.THREE]: '3',
  [Rank.FOUR]: '4',
  [Rank.FIVE]: '5',
  [Rank.SIX]: '6', 
  [Rank.SEVEN]: '7',
  [Rank.EIGHT]: '8',
  [Rank.NINE]: '9',
  [Rank.TEN]: '10',
  [Rank.JACK]: 'JACK',
  [Rank.QUEEN]: 'QUEEN',
  [Rank.KING]: 'KING',
}

const suitColor = {
  [Suit.SPADES]: 'black',
  [Suit.HEARTS]: 'red',
  [Suit.DIAMONDS]: 'red',
  [Suit.CLUBS]: 'black'
}

const suitSymbols = {
  [Suit.SPADES]: '\u2660',
  [Suit.HEARTS]: '\u2665',
  [Suit.DIAMONDS]: '\u2666',
  [Suit.CLUBS]: '\u2663'
}

function CardView({ card }: React.PropsWithChildren<{ card: Card }>): React.ReactElement {
  return card ? (
    <h3 style={{color: suitColor[card.suit]}}>{`${rankString[card.rank]} ${suitSymbols[card.suit]}`}</h3>
  ) : null
}

const game = new CardGame()

render(<App game={game}/>, document.getElementById("root"))
