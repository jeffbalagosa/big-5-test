import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, SIDEBAR } from '../../styles/theme';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  width: number;
  onToggle: () => void;
  onResize: (width: number) => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  width,
  onToggle,
  onResize,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= SIDEBAR.expandedMinWidth && newWidth <= SIDEBAR.expandedMaxWidth) {
          onResize(newWidth);
        }
      }
    },
    [isResizing, onResize]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const navItems = [
    { name: 'Home', path: '/', Icon: Home },
    { name: 'Take Test', path: '/test-selection', Icon: ClipboardList },
    { name: 'About', path: '/about', Icon: Info },
  ];

  const sidebarWidth = isMobile ? 280 : (isCollapsed ? SIDEBAR.collapsedWidth : width);
  const iconSize = isCollapsed && !isMobile ? 32 : 20;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        />
      )}

      <aside
        className={`navigation-drawer ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          position: isMobile ? 'fixed' : 'relative',
          top: 0,
          left: isMobile ? (isOpen ? 0 : '-280px') : 0,
          width: `${sidebarWidth}px`,
          height: '100vh',
          backgroundColor: COLORS.charcoalBlue,
          color: COLORS.white,
          transition: isResizing ? 'none' : (isMobile ? 'left 0.3s ease' : 'width 0.3s ease'),
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          padding: isCollapsed && !isMobile ? '1.5rem 0.5rem' : '1.5rem',
          overflowX: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{
          display: isCollapsed && !isMobile ? 'none' : 'flex',
          justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          minHeight: '32px'
        }}>
          {(!isCollapsed || isMobile) && (
            <h2 style={{ color: COLORS.white, margin: 0, fontSize: '1.80 rem', whiteSpace: 'nowrap' }}>
              Discover You
            </h2>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.white,
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              title={isCollapsed ? item.name : ''}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                gap: isCollapsed && !isMobile ? 0 : '1rem',
                padding: isCollapsed && !isMobile ? '0.75rem 0' : '0.75rem 1rem',
                borderRadius: '8px',
                color: COLORS.white,
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                transition: 'background-color 0.2s',
              })}
            >
              <item.Icon size={iconSize} />
              {(!isCollapsed || isMobile) && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!isMobile && (
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={onToggle}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: COLORS.white,
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            {!isCollapsed && (
              <div style={{ fontSize: '0.875rem', opacity: 0.7, textAlign: 'center' }}>
                &copy; 2025 Discover You: Personality Test Tool
              </div>
            )}
          </div>
        )}

        {isMobile && (
          <div style={{ marginTop: 'auto', fontSize: '0.875rem', opacity: 0.7 }}>
            &copy; 2025 Discover You: Personality Test Tool
          </div>
        )}

        {/* Resize handle */}
        {!isMobile && !isCollapsed && (
          <div
            className="resize-handle"
            onMouseDown={startResizing}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '4px',
              height: '100%',
              cursor: 'col-resize',
              backgroundColor: isResizing ? COLORS.goldenPollen : 'transparent',
              transition: 'background-color 0.2s',
            }}
          />
        )}
      </aside>
    </>
  );
};

export default NavigationDrawer;
