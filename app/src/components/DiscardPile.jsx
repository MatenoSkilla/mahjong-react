import React from 'react';

function DiscardPile({ discarded }) {
  return (
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
  );
}

export default DiscardPile;
