import React, { useState } from 'react';
import NavigationDrawer from './NavigationDrawer';
import { Menu } from 'lucide-react';
import { COLORS } from '../../styles/theme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1.5rem',
            backgroundColor: COLORS.white,
            borderBottom: `1px solid ${COLORS.teaGreen}`,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.charcoalBlue,
              cursor: 'pointer',
              padding: '0.5rem',
              marginRight: '1rem',
            }}
          >
            <Menu size={24} />
          </button>
          <h1 style={{ margin: 0, fontSize: '1.25rem', color: COLORS.charcoalBlue }}>
            Personality Test Tool
          </h1>
        </header>

        <main style={{
          flex: 1,
          padding: '2rem 1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
