import React, { useState } from 'react';
import Tile from './components/Tile';
import HandArea from './components/HandArea';
import ControlPanel from './components/ControlPanel';
import DiscardPile from './components/DiscardPile';
import './App.css';

function App() {

  const tileOrder = [
    '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
    '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
    '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
    'E', 'S', 'W', 'N', 'Pai', 'Hua', 'Chun'
  ];

  // 山牌生成
  const createDeck = () => {
    const deck = [];
    tileOrder.forEach(tile => {
      for (let i = 0; i < 4; i++) deck.push(tile);
    });
    return deck;
  };

  // 山シャッフル
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // 状態
  const [deck, setDeck] = useState(createDeck());
  const [playerState, setPlayerState] = useState({
    hand: [],
    drawnTile: null,
    selectedIndex: null,
    discarded: []
  });

  // 手牌並び替え
  const sortTiles = (tiles) => {
    return [...tiles].sort((a,b) => tileOrder.indexOf(a) - tileOrder.indexOf(b));
  };

  // 手牌分配
  const dealTiles = () => {
    const freshDeck = shuffle(createDeck());
    const newHand = freshDeck.slice(0, 13);
    const newDeck = freshDeck.slice(13);

    setDeck(newDeck);
    setPlayerState({
      hand: sortTiles(newHand),
      drawnTile: null,
      selectedIndex: null,
      discarded: []
    });
  };

  // ツモ処理
  const drawTile = () => {
      if (deck.length === 0 || playerState.hand.length >= 14) return;

      const nextTile = deck[0];
      // setDrawnTile(nextTile);
      setPlayerState(prev => ({
        ...prev,
        drawnTile: nextTile
      }));
      setDeck(deck.slice(1));
    };

    // 牌クリック処理
    const handleTileClick = (index) => {
      // 打牌制限
      //if (playerState.hand.length + (playerState.drawnTile ? 1 : 0) <= 13) return;

      if (playerState.selectedIndex === index) {
        const newDiscarded = [...playerState.discarded];
        let newHand = [...playerState.hand];
        let tileToDiscarded = null;

        if (index === "drawn") {
          // ツモ牌を打牌
          tileToDiscarded = playerState.drawnTile;
          newDiscarded.push(tileToDiscarded);
          setPlayerState(prev => ({
            ...prev,
            drawnTile: null,
            selectedIndex: null,
            discarded: newDiscarded
          }));
        } else {
          // 手牌から打牌
          tileToDiscarded = newHand.splice(index, 1)[0];
          newDiscarded.push(tileToDiscarded);
          const updatedHand = [...newHand];

          if (playerState.drawnTile) {
            updatedHand.push(playerState.drawnTile);
          }

        setPlayerState(prev => ({
          ...prev,
          hand: sortTiles(updatedHand),
          drawnTile: null,
          selectedIndex: null,
          discarded: newDiscarded
        }));
      }
      } else {
        setPlayerState(prev => ({
          ...prev,
          selectedIndex: index
        }));
      }
    };

  return (
    <div className="app">
      <h1>麻雀アプリ</h1>
      <ControlPanel
        onDeal={dealTiles}
        onDraw={drawTile}
        isDrawDisabled={playerState.hand.length + (playerState.drawnTile ? 1 : 0) >= 14}
      />
      <p>山の残り枚数: {deck.length}</p>
      <HandArea
        hand={playerState.hand}
        drawnTile={playerState.drawnTile}
        selectedIndex={playerState.selectedIndex}
        onTileClick={handleTileClick}
      />

      {/* ▼ここに捨て牌を表示 */}
      <DiscardPile discarded={playerState.discarded} />

    </div>
  );
}

export default App
