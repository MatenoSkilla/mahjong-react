import React from 'react';

// Tile コンポーネント
function Tile({ tile, selected, onClick, className = "" }) {
    // 画像パスを動的に決定
    const tileImage = `${import.meta.env.BASE_URL}img/${tile}.gif`;

    return (
    <img 
      src={tileImage} 
      alt={tile} 
      className={`tile-img ${selected ? "selected" : ""} ${className}`}
      onClick={onClick}
    /> 
  );
}

export default Tile;
