import React, { type PropsWithChildren } from 'react';
import './styles.css';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Heróis</h1>
      </header>
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;