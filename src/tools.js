
function poker(hand) {
    let handNumbers = hand.map(c => c.nmbr).sort((a, b) => b - a)
    const diffCards = new Set(handNumbers).size
    let handValue
    function countInArray(array, value) {
      return array.reduce((n, x) => n + (x === value), 0)
    }
    switch (diffCards) {
      case 2:
        if (countInArray(handNumbers, handNumbers[0]) < 4) handValue = 6
        else handValue = 7
        break
      case 3:
        let maksi = 0
        for (const c of handNumbers) maksi = Math.max(maksi, countInArray(handNumbers, c))
        if (maksi < 3) handValue = 2
        else handValue = 3
        break
      case 4:
        handValue = 1
        break
      case 5:
        const straight = handNumbers[0] - handNumbers[4] === 4 ? true : false
        const flush = new Set(hand.map(c => c.suit)).size < 2 ? true : false
        if (straight && flush) handValue = 8
        else if (straight) handValue = 4
        else if (flush) handValue = 5
        else handValue = 0
        break
      default:
        handValue = 'error'
    }
    if (handValue > 0 && handValue < 4) handNumbers.sort((a, b) => countInArray(handNumbers, b) - countInArray(handNumbers, a))
    if (handValue > 5 && handValue < 8) handNumbers.sort((a, b) => countInArray(handNumbers, b) - countInArray(handNumbers, a))
    return { handValue: handValue, highcards: handNumbers }
  }
  export const compareHighcards = (h1, h2) => {
    for(let i = 0; i < 5; i++) {
      if (h1[i] < h2[i]) return -1
      if (h1[i] > h2[i]) return 1
    }
    return -1
  }
  export const omahahand = (cards, player, deck) => {
    let besthand = -1
    let handcards 

    for (let i = 0; i < 5; i++) {
      for (let o = i + 1; o < 5; o++) {
        for (let p = o + 1; p < 5; p++) {
          for (let n = 0; n < 4; n++) {
            for (let m = n + 1; m < 4; m++) {
              const kasi = poker([deck[i], deck[o], deck[p], cards[n], cards[m]])
              if (kasi.handValue > besthand) {
                handcards = kasi.highcards;
                besthand = kasi.handValue;
              }
              if(kasi.handValue === besthand) {
                if(compareHighcards(kasi.highcards, handcards) > 0) handcards = kasi.highcards
              }
            }
          }
        }
      }
    }
    return { handValue: besthand, highcards: handcards, player: player }
  }

  export const filterWinners = (nr1, hand) => {
    for (let i = 0; i < nr1.highcards.length; i++) {
      if (hand.highcards[i] < nr1.highcards[i]) {
        return false
      }
    }
    return true
  }
  export const filterLosers = (nr1, hand) => {
    for (let i = 0; i < nr1.highcards.length; i++) {
      if (hand.highcards[i] > nr1.highcards[i]) {
        return false
      }
    }
    return true
  }