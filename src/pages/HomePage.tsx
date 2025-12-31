import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/theme';
import { ArrowRight, ClipboardList } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          backgroundColor: COLORS.teaGreen,
          color: COLORS.charcoalBlue,
          marginBottom: '2rem',
        }}
      >
        <ClipboardList size={40} />
      </div>

      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Discover Your Personality</h1>
      <p
        style={{
          fontSize: '1.25rem',
          color: COLORS.charcoalBlue,
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.6',
          opacity: 0.8,
        }}
      >
        Take our scientifically-backed personality tests to gain insights into your traits,
        behaviors, and how you interact with the world.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link
          to="/test-selection"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: COLORS.goldenPollen,
            color: COLORS.charcoalBlue,
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(255, 200, 87, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 200, 87, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 200, 87, 0.4)';
          }}
        >
          Start a Test <ArrowRight size={20} />
        </Link>
      </div>

      <div
        style={{
          marginTop: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(189, 217, 191, 0.1)',
            border: `1px solid ${COLORS.teaGreen}`,
          }}
        >
          <h3 style={{ marginBottom: '0.75rem' }}>Big Five (OCEAN)</h3>
          <p style={{ fontSize: '0.875rem', margin: 0, opacity: 0.8 }}>
            The most widely accepted model in personality psychology, measuring Openness,
            Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
          </p>
        </div>
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(46, 64, 82, 0.05)',
            border: `1px solid ${COLORS.charcoalBlue}22`,
          }}
        >
          <h3 style={{ marginBottom: '0.75rem' }}>Myers-Briggs (MBTI)</h3>
          <p style={{ fontSize: '0.875rem', margin: 0, opacity: 0.8 }}>
            Explore your preferences in how you perceive the world and make decisions across
            four dichotomies.
          </p>
        </div>
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(65, 34, 52, 0.05)',
            border: `1px solid ${COLORS.midnightViolet}22`,
          }}
        >
          <h3 style={{ marginBottom: '0.75rem' }}>Child-Friendly Mode</h3>
          <p style={{ fontSize: '0.875rem', margin: 0, opacity: 0.8 }}>
            Simplified versions of our tests designed specifically for younger
            audiences with easier-to-understand language.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
