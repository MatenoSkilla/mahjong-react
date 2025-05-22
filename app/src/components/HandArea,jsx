import React from 'react';
import Tile from './Tile';

function HandArea({ hand, drawnTile, selectedIndex, onTileClick }) {
  return (
    <div className="tiles">
      {hand.map((tile, index) => (
        <Tile
          key={index}
          tile={tile}
          selected={selectedIndex === index}
          onClick={() => onTileClick(index)}
        />
      ))}
      {drawnTile && (
        <Tile
          key="drawn"
          tile={drawnTile}
          selected={selectedIndex === "drawn"}
          onClick={() => onTileClick("drawn")}
          className="drawn-tile"
        />
      )}
    </div>
  );
}

export default HandArea;
