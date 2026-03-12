import React from 'react';
import HeroesPage from './pages/heroesPage/heroesPage';
import './app.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <HeroesPage />
    </div>
  );
};

export default App;