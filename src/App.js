import React, { useState } from 'react';
import './App.css';

function App() {

  const [deck, setDeck] = useState([])
  const [participants, setParticipants] = useState([])
  const [flipState, setFlipState] = useState(0)
  const suits = ['spades', 'hearts', 'diamonds', 'clubs']
  const [numberOfPlayers, setNumberOfPlayers] = useState(2)
  const plrselect = [2, 3, 4, 5, 6, 7, 8, 9, 10]

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
  const getButtonText = (cur) => {
    switch (cur) {
      case 0: return 'DEAL CARDS';
      case 1: return 'DEAL FLOP';
      case 2: return 'DEAL TURN';
      case 3: return 'DEAL RIVER';
      case 4: return 'DEAL AGAIN';
      default: return -1
    }
  }
  const handleClick = () => {
    if (flipState < 1) {
      createDeck()
      setFlipState(1)
    }
    else if (flipState < 4) setFlipState(flipState + 1)
    else setFlipState(0)
  }
  const getPicture = (card) => {
    return '/img/' + card.nmbr.toString() + card.suit.charAt(0).toUpperCase() + '.png'
  }
  const PlayerCard = ({ player, cards }) => {
    const playerImage = '/elainkuvat/' + player.toString() + '.png'
    const playerCSS = 'pelaaja' + player.toString()
    return (
      <>
        <div className={playerCSS}>
          <img src={playerImage} className="kuvat" />
          {cards.map(k =>
            <>
              {flipState > 0 ?
                <img src={getPicture(k)} className="kuvat" /> :
                <img src='/img/blue_back.png' className="kuvat" />} </>
          )}
          <br />
        </div>
      </>
    )
  }
  const flopCards = () => {
    if (flipState < 2) {
      return (
        <>
          {deck.slice(0, 3).map(k =>
            <img src='/img/blue_back.png' className="kuvat" />
          )}
        </>
      )
    }
    else {
      return (
        <>
          {deck.slice(0, 3).map(k =>
            <img src={getPicture(k)} className="kuvat" />
          )} </>
      )
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="box">FLIPPIVIIDAKKO</h2>
        {/* <label>How many players?
        <select options={selectoptions} onChange={handleSelect} />
        </label> */}
        <button onClick={() => handleClick()}>{getButtonText(flipState)}</button>
        <div className="dada">
          {deck.length > 4 ?
            <>
              <h4 className="boardi">BOARDI:</h4>
              <div className="poyta">
                {flopCards()}
                {flipState < 3 ?
                  <img src='/img/blue_back.png' className="kuvat" /> :
                  <img src={getPicture(deck[3])} className="kuvat" />
                }
                {flipState < 4 ?
                  <img src='/img/blue_back.png' className="kuvat" /> :
                  <img src={getPicture(deck[4])} className="kuvat" />
                }
              </div>
              <div className="pelaajat">
                <p id="pelaajat">testipesti</p>
              </div>
              {participants.map(o =>
                <PlayerCard
                  player={o}
                  cards={deck.slice(5 + (o * 4), 5 + (o * 4) + 4)}
                  key={o}
                />
              )}

            </> :
            null}

        </div>
      </header>
    </div>
  );
}

export default App;
