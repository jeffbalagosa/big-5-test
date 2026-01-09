import React from 'react';
import { COLORS } from '../styles/theme';
import { Shield, Cpu, BookOpen } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import logo from '../assets/discover_you_logo.png';

const AboutPage: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const spacing = isDesktop ? '2rem' : '4rem';
  const padding = isDesktop ? '1rem 0' : '2rem 0';

  return (
    <div style={{ padding, maxWidth: '800px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: spacing }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isDesktop ? '60px' : '80px',
            height: isDesktop ? '60px' : '80px',
            borderRadius: '20px',
            backgroundColor: 'transparent',
            color: COLORS.charcoalBlue,
            marginBottom: '0',
          }}
        >
          <img src={logo} alt="Discover You Logo" style={{ width: isDesktop ? '45px' : '60px', height: isDesktop ? '45px' : '60px', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: isDesktop ? '2.5rem' : '3rem', marginBottom: '0.5rem' }}>About the Project</h1>
        <p
          style={{
            fontSize: isDesktop ? '1.1rem' : '1.25rem',
            color: COLORS.charcoalBlue,
            lineHeight: '1.6',
            fontWeight: 500,
          }}
        >
          A modern, privacy-focused personality assessment tool designed for the age of AI.
        </p>
      </div>

      {/* Designed for AI Callout */}
      <div
        style={{
          backgroundColor: COLORS.charcoalBlue,
          color: COLORS.white,
          padding: isDesktop ? '1.5rem 2rem' : '2.5rem',
          borderRadius: '20px',
          marginBottom: spacing,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(43, 48, 58, 0.2)',
        }}
      >
        <Cpu size={isDesktop ? 32 : 48} style={{ marginBottom: isDesktop ? '0.75rem' : '1.5rem', color: COLORS.goldenPollen }} />
        <h2 style={{ marginBottom: '0.5rem', color: COLORS.white, fontSize: isDesktop ? '1.5rem' : '2rem' }}>Designed for AI Integration</h2>
        <p style={{ fontSize: isDesktop ? '1rem' : '1.1rem', lineHeight: '1.7', opacity: 0.9, margin: 0 }}>
          Unlike traditional tests, this tool is built to help you interact better with Large Language Models.
          By understanding your personality traits, you can provide AI assistants with a "persona" or context
          that helps them tailor their communication, advice, and creative output to your specific needs.
        </p>
      </div>

      {/* Test Overviews */}
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: '1.5rem', marginBottom: spacing }}>
        <div
          style={{
            padding: isDesktop ? '1.5rem' : '2rem',
            borderRadius: '16px',
            backgroundColor: COLORS.white,
            border: `1px solid ${COLORS.teaGreen}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <BookOpen size={20} color={COLORS.charcoalBlue} />
            <h3 style={{ margin: 0, fontSize: isDesktop ? '1.1rem' : '1.25rem' }}>Big Five (OCEAN)</h3>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, opacity: 0.8 }}>
            The Five Factor Model is the gold standard in academic psychology. It measures five key dimensions:
            Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
          </p>
        </div>

        <div
          style={{
            padding: isDesktop ? '1.5rem' : '2rem',
            borderRadius: '16px',
            backgroundColor: COLORS.white,
            border: `1px solid ${COLORS.charcoalBlue}22`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <BookOpen size={20} color={COLORS.charcoalBlue} />
            <h3 style={{ margin: 0, fontSize: isDesktop ? '1.1rem' : '1.25rem' }}>Myers-Briggs (MBTI)</h3>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, opacity: 0.8 }}>
            Based on Jungian theory, MBTI categorizes individuals into 16 distinct types based on preferences
            in how they perceive the world and make decisions.
          </p>
        </div>
      </div>

      {/* Privacy Note */}
      <div
        style={{
          padding: isDesktop ? '1.5rem' : '2rem',
          borderRadius: '16px',
          backgroundColor: COLORS.teaGreen + 'CC',
          border: `1px solid ${COLORS.teaGreen}`,
          marginBottom: spacing,
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Shield size={isDesktop ? 24 : 32} color={COLORS.charcoalBlue} style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: isDesktop ? '1.1rem' : '1.25rem' }}>Privacy First</h3>
          <p style={{ margin: 0, lineHeight: '1.5', opacity: 1, fontSize: '0.9rem' }}>
            Your data is yours. All calculations and processing happen entirely within your browser.
            We do not store your answers on any server, and no data is sent to external APIs.
            When you generate a report, it's created locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
