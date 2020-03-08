import React, { useState } from 'react';
// import './css/main.css';
import './Santunkokeilu2.css'
import { omahahand, compareHighcards, filterLosers, filterWinners } from './tools'


function App() {

  const [deck, setDeck] = useState([])
  const [participants, setParticipants] = useState([])
  const [flipState, setFlipState] = useState(0)
  const [numberOfPlayers, setNumberOfPlayers] = useState(6)
  const [winningPlayer, setWinningPlayer] = useState([])
  const [losingPlayer, setLosingPlayer] = useState([])

  const getWinner = () => {
    const players = participants.map(plr => omahahand(deck.slice(5 + (plr * 4), 5 + (plr * 4) + 4), plr, deck)).sort((a, b) => b.handValue - a.handValue)
    let winners = players.filter(hand => hand.handValue >= players[0].handValue)
    winners = winners.sort((a, b) => 0 - compareHighcards(a.highcards, b.highcards))
    winners = winners.filter(h => filterWinners(winners[0], h))
    setWinningPlayer(winners.map(p => p.player))
    let losers = players.filter(hand => hand.handValue <= players[players.length - 1].handValue)
    losers = losers.sort((a, b) => compareHighcards(a.highcards, b.highcards) - 0)
    losers = losers.filter(h => filterLosers(losers[0], h))
    setLosingPlayer(losers.map(p => p.player))
  }

  const createDeck = () => {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs']
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
    // SHUFFLE
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
      case 4: return 'LISÄÄ JAKOJA';
      default: return -1
    }
  }
  const handleClick = () => {
    if (flipState < 1) {
      createDeck()
      setFlipState(1)
    }
    else if (flipState < 3) setFlipState(flipState + 1)
    else if (flipState < 4) {
      getWinner()
      setFlipState(flipState + 1)
    }
    else {
      setFlipState(0)
      setWinningPlayer([])
      setLosingPlayer([])
    }
  }
  const getPicture = (card) => {
    return '/img/' + card.nmbr.toString() + card.suit.charAt(0).toUpperCase() + '.png'
  }
  const PlayerCard = ({ player, cards }) => {
    const playerImage = '/elainkuvat/' + player.toString() + '.png'
    const win = winningPlayer.includes(player) ? 'winner' : ''
    const lose = losingPlayer.includes(player) ? 'loser' : ''
    const playerCSS = 'pelaaja' + player.toString() + ' kaikkipelaajat'
    const playerID = win + lose
    return (
      <>
        <div className={playerCSS} >
          <img alt="player" src={playerImage} className="pelaajakuva kuvat" id={playerID} />

          <div className="kortit">
            {cards.map((k, i) =>
              <>
                {flipState > 0 ?
                  <img alt="card" key={i} src={getPicture(k)} className="card kuvat" /> :
                  <img alt="card" key={i} src='/img/blue_back.png' className="kuvat" />}  </>
            )}
          </div>
          <br />
        </div>
      </>
    )
  }
  const FlopCards = () => {
    if (flipState < 2) {
      return (
        <>
          {deck.slice(0, 3).map((k, i) =>
            <img alt="card" key={i} src='/img/blue_back.png' className="kuvat" />
          )}
        </>
      )
    }
    else {
      return (
        <>
          {deck.slice(0, 3).map((k, i) =>
            <img alt="card" key={i} src={getPicture(k)} className="kuvat" />
          )} </>
      )
    }
  }


  return (
    <div className="App">
      <header className="App-header">Flippiviidakko
      </header>
      <main>
        {flipState === 0 ?
          <div className="start-page">

            <img alt="logo" className="logo" src='/img/testilogo.png' />
            <div>
              {numberOfPlayers > 2 ?
                <button className="btn-minus" onClick={() => setNumberOfPlayers(numberOfPlayers - 1)} >-</button> :
                <button className="btn-minus">-</button>
              }
              {numberOfPlayers}
              {numberOfPlayers < 10 ?
                <button className="btn-plus" onClick={() => setNumberOfPlayers(numberOfPlayers + 1)}>+</button> :
                <button className="btn-plus">+</button>}
              <div>
                <button className="deal" onClick={() => handleClick()}>{getButtonText(flipState)}</button>
              </div> </div>
          </div>
          :

          <>

            <div className="playmode-page">
              {deck.length > 1 ?
                <>
                  <div className="poyta">
                    <FlopCards />
                    {flipState < 3 ?
                      <img alt="card" src='/img/blue_back.png' className="kuvat" /> :
                      <img alt="card" src={getPicture(deck[3])} className="kuvat" />
                    }
                    {flipState < 4 ?
                      <img alt="card" src='/img/blue_back.png' className="kuvat" /> :
                      <img alt="card" src={getPicture(deck[4])} className="kuvat" />
                    }
                    <button className="postflop-btn" onClick={() => handleClick()}>{getButtonText(flipState)}</button>
                  </div>

                  {participants.map((o, i) =>
                    <PlayerCard
                      key={i}
                      player={o}
                      cards={deck.slice(5 + (o * 4), 5 + (o * 4) + 4)}
                    />
                  )}

                </> :
                null}
            </div>
          </>}
      </main>
    </div>
  );
}

export default App;
