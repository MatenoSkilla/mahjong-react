import React from 'react';

function ControlPanel({ onDeal, onDraw, isDrawDisabled }) {
  return (
    <div className="control-panel">
      <button onClick={onDeal}>配牌</button>
      <button onClick={onDraw} disabled={isDrawDisabled}>ツモ</button>
    </div>
  );
}

export default ControlPanel;
