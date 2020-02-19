import React, { useState } from 'react';
import './App.css';

function App() {

  const [deck, setDeck] = useState([])
  const [participants, setParticipants] = useState([])
  const [flipState, setFlipState] = useState(0)
  const suits = ['spades', 'hearts', 'diamonds', 'clubs']

  const createDeck = () => {
    let plrs = []
    for (let i = 1; i < numberOfPlayers + 1; i++) {
      plrs.push(i)
    }
    setParticipants(plrs)
    let temporaryDeck = []
    for (let m of suits) {
      for (let i = 2; i < 15; i++) {
        temporaryDeck.push({
          suit: m,
          nmbr: i
        })
      }
    }
    let j, x, i;
    for (i = temporaryDeck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = temporaryDeck[i];
      temporaryDeck[i] = temporaryDeck[j];
      temporaryDeck[j] = x;
    }
    setDeck(temporaryDeck)
  }

  const getPicture = (card) => {
    return '/img/' + card.nmbr.toString() + card.suit.charAt(0).toUpperCase() + '.png'
  }
  const PlayerCard = ({ player, cards }) => {
    const playerImage = '/elainkuvat/' + player.toString() + '.png'
    const playerCSS = 'player' + player.toString()
    return (
      <>
      <div className={playerCSS}>
        <img src={playerImage} className="kuvat" />
        {cards.map(k =>
          <img src={getPicture(k)} className="kuvat" />
        )}
        <br />
        </div>
      </>
    )
  }
  const numberOfPlayers = 10

  return (
    <div className="App">
      <header className="App-header">
      <h2 className="box">FLIPPIVIIDAKKO</h2>
        <button onClick={() => createDeck()}>FLIPPAA</button>
        <div className="dada">
          {deck.length > 4 ?
            <>
              
              <div className="pelaajat">
              <p id="pelaajat">testipesti</p>
              </div>

              {participants.map(o =>
                <PlayerCard
                  pelaaja={o}
                  cards={deck.slice(5+(o*4), 5+(o*4)+4)}
                  key={o}
                />
              )}
              <h4 className="boardi">BOARDI:</h4>
              <div className="poyta">
              {deck.slice(0, 5).map(k =>
                <img src={getPicture(k)} className="kuvat" />
              )} </div>
            </> :
            null}

        </div>
      </header>
    </div>
  );
}

export default App;
