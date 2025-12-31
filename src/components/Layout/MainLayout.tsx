import React, { useState, useEffect } from 'react';
import NavigationDrawer from './NavigationDrawer';
import { Menu } from 'lucide-react';
import { COLORS } from '../../styles/theme';
import { useSidebarState } from '../../hooks/useSidebarState';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isCollapsed, width, toggleCollapsed, setWidth } = useSidebarState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isCollapsed={isCollapsed}
        width={width}
        onToggle={toggleCollapsed}
        onResize={setWidth}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {isMobile && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              zIndex: 999,
              background: COLORS.charcoalBlue,
              border: 'none',
              color: COLORS.white,
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <Menu size={24} />
          </button>
        )}

        <main style={{
          flex: 1,
          padding: isMobile ? '4rem 1rem 2rem' : '2rem',
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
