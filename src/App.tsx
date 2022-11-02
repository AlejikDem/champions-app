import React from 'react';
import './App.css';

import cards from './cards.json';

function App() {
  return (
    <div className="App">
      {cards.hero.iron_man.map(card => {
        return (
          <img
            key={card.code}
            src={`${process.env.PUBLIC_URL}/assets/images/${card.code}.png`}
            alt={card.code}
          />
        )
      })}
    </div>
  );
}

export default App;
