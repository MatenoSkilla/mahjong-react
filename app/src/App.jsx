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

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [hand, setHand] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  
  const dealTiles = () => {
    const shuffledTiles = shuffle([...tileOrder, ...tileOrder, ...tileOrder, ...tileOrder]);
    setHand(shuffledTiles.slice(0, 13));
    setSelectedTiles([]);
  };

  const toggleSelect = (index) => {
    setSelectedTiles((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="app">
      <h1>麻雀アプリ</h1>
      <button onClick={dealTiles}>配牌</button>
      <div className="tiles">
        {hand.map((tile, index) => (
          <div
            key={index}
            className={`tile ${selectedTiles.includes(index) ? 'selected' : ''}`}
            onClick={() => toggleSelect(index)}
          >
            <img src={`img/${tile}.gif`} alt={tile} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
