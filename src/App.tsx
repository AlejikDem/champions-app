import React from 'react';
import './App.css';

import { CardsContextProvider } from './CardsContext';

import { DeckBuilder } from './Deckbuilder';

function App() {
  return (
    <CardsContextProvider>
      <div className="Wrapper">
        <DeckBuilder />
      </div>
    </CardsContextProvider>
  );
}

export default App;
