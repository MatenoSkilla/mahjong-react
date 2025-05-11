import React from 'react';

// Tile コンポーネント
function Tile({ tile }) {
    // 画像パスを動的に決定
    const tileImage = `/img/${tile}.gif`;

    return (
    <div className="tile">
      <img src={tileImage} alt={tile} className="tile-img" />
    </div>
  );
}

export default Tile;
