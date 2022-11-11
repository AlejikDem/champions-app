import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DeckBuilder } from './pages/Deckbuilder';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.Wrapper}>
      <Router>
        <Routes>
          <Route path='/' element={<DeckBuilder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
