import React, { useState } from 'react';
import './App.css';

function App() {

  const [pakka, setPakka] = useState([])
  const [osallistujat, setOsallistujat] = useState([])
  const maat = ['spades', 'hearts', 'diamonds', 'clubs']

  const teePakka = () => {
    let ukkelit = []
    for (let i = 1; i < pelaajamaara + 1; i++) {
      ukkelit.push(i)
    }
    setOsallistujat(ukkelit)
    let valipakka = []
    for (let m of maat) {
      for (let i = 2; i < 15; i++) {
        valipakka.push({
          maa: m,
          nro: i
        })
      }
    }
    let j, x, i;
    for (i = valipakka.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = valipakka[i];
      valipakka[i] = valipakka[j];
      valipakka[j] = x;
    }
    console.log(valipakka)
    setPakka(valipakka)
  }

  const hankiKuva = (kortti) => {
    return '/img/' + kortti.nro.toString() + kortti.maa.charAt(0).toUpperCase() + '.png'
  }
  const PelaajaKortti = ({ pelaaja, kortit }) => {
    const pelaajaKuva = '/elainkuvat/' + pelaaja.toString() + '.png'
    const pelaajaCSS = 'pelaaja' + pelaaja.toString()
    return (
      <>
      <div className={pelaajaCSS}>
        <img src={pelaajaKuva} className="kuvat" />
        {kortit.map(k =>
          <img src={hankiKuva(k)} className="kuvat" />
        )}
        <br />
        </div>
      </>
    )
  }
  const pelaajamaara = 10

  return (
    <div className="App">
      <header className="App-header">
      <h2 className="box">FLIPPIVIIDAKKO</h2>
        <button onClick={() => teePakka()}>FLIPPAA</button>
        <div className="dada">
          {pakka.length > 4 ?
            <>
              
              <div className="pelaajat">
              <p id="pelaajat">testipesti</p>
              </div>

              {osallistujat.map(o =>
                <PelaajaKortti
                  pelaaja={o}
                  kortit={pakka.slice(5+(o*4), 5+(o*4)+4)}
                  key={o}
                />
              )}
              <h4 className="boardi">BOARDI:</h4>
              <div className="poyta">
              {pakka.slice(0, 5).map(k =>
                <img src={hankiKuva(k)} className="kuvat" />
              )} </div>
            </> :
            null}

        </div>
      </header>
    </div>
  );
}

export default App;
