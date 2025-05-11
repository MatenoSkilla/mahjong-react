import { useState } from 'react';
import Tile from './components/Tile';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [tiles] = useState(['1m', '2m', '3m', '4m']);

  return (
    <div className="app">
      <h1>麻雀牌の表示</h1>
      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <Tile key={index} tile={tile} />
        ))}
      </div>
    </div>
  );
}

export default App
