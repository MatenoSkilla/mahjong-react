import React, { useState } from 'react';
import Tile from './components/Tile';
import './App.css';

function App() {

  const tileOrder = [
    '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
    '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
    '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
    'E', 'S', 'W', 'N', 'Pai', 'Hua', 'Chun'
  ];

  const createDeck = () => {
    const deck = [];
    tileOrder.forEach(tile => {
      for (let i = 0; i < 4; i++) deck.push(tile);
    });
    return deck;
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // 状態
  const [deck, setDeck] = useState(createDeck());
  const [hand, setHand] = useState([]);
  const [drawnTile, setDrawnTile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState([null]);
  const [discarded, setDiscarded] = useState([]);

  // ツモ処理
  const drawTile = () => {
      if (deck.length === 0 || hand.length >= 14) return;

      const nextTile = deck[0];
      setDrawnTile(nextTile);
      setDeck(deck.slice(1));
    };

  // 捨て牌処理
  const discardTile = () => {
    if (selectedIndex === null) return;

    let newHand = [...hand];
    let discardedTile = null;

    if (selectedIndex === "drawn") {
      discardedTile = drawnTile;
      setDrawnTile(null);
    } else {
      discardedTile = newHand.splice(selectedIndex, 1)[0];
    }

    setHand(sortTiles(newHand));
    setDiscarded([...discarded, discardedTile]);
    setSelectedIndex(null);
  };
  
  const dealTiles = () => {
    const shuffled = shuffle(deck);
    const newHand = shuffled.slice(0, 13);
    const newDeck = shuffled.slice(13);
    setHand(sortTiles(newHand));
    setDiscarded([]);
    setDeck(newDeck);
    setSelectedIndex(null);
  };

  const sortTiles = (tiles) => {
    return [...tiles].sort((a,b) => tileOrder.indexOf(a) - tileOrder.indexOf(b));
  };

  // const toggleSelect = (index) => {
  //   setSelectedIndex((prev) =>
  //     prev.includes(index)
  //       ? prev.filter((i) => i !== index)
  //       : [...prev, index]
  //   );
  // };

    // 牌クリック処理
    const handleTileClick = (index) => {
      setSelectedIndex((prev) => (prev === index ? null : index));
      setSelectedIndex(index === selectedIndex ? null : index)
      if (selectedIndex === index) {
        const tileToDiscard = hand[index];
        const newHand = [...hand];
        newHand.splice(index, 1);
        setHand(newHand);
        setSelectedIndex(null);
        setDiscarded([...discarded, tileToDiscard]);
      } else {
        setSelectedIndex(index);
      }
    };

  return (
    <div className="app">
      <h1>麻雀アプリ</h1>
      <button onClick={dealTiles}>配牌</button>
      <p>山の残り枚数: {deck.length}</p>
      <div className="tiles">
        {hand.map((tile, index) => (
          <Tile 
            key={index}
            tile={tile}
            selected={selectedIndex === index}
            onClick={() => handleTileClick(index)}
          />
        ))}
        {drawnTile && (
          <Tile 
            key="drawn"
            tile={drawnTile}
            selected={selectedIndex === "drawn"}
            onClick={() => handleTileClick("drawn")}
            className="drawn-tile"
          />
        )}
      </div>

      <button onClick={drawTile} disabled={hand.length >= 14}>ツモ</button>

      {/* ▼ここに捨て牌を表示 */}
      <div className="discarded">
        <h2>捨て牌</h2>
        <div className="tiles">
          {discarded.map((tile, index) => (
            <div key={index} className="tile">
              <img src={`img/${tile}.gif`} alt={tile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
