import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { RewardsSection } from './components/RewardsSection';
import { ContactSection } from './components/ContactSection';
import { LoginModal } from './components/LoginModal';
import { OrderModal } from './components/OrderModal';
import { DemoUserSwitcher } from './components/DemoUserSwitcher';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { MenuItem } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // Listen for custom events to open login modal
  React.useEffect(() => {
    const handleOpenLoginModal = () => {
      setIsLoginModalOpen(true);
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    return () => window.removeEventListener('openLoginModal', handleOpenLoginModal);
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsOrderModalOpen(true);
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-black transition-colors overflow-x-hidden">
            <Header
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
              onLoginClick={() => setIsLoginModalOpen(true)}
            />

            <main>
              <section id="home">
                <Hero onExploreClick={() => handleSectionChange('menu')} />
              </section>

              <section id="menu">
                <MenuSection onOrderClick={handleOrderClick} />
              </section>

              <section id="about">
                <AboutSection />
              </section>

              <section id="rewards">
                <RewardsSection />
              </section>

              <section id="contact">
                <ContactSection />
              </section>
            </main>

            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />

            <OrderModal
              isOpen={isOrderModalOpen}
              onClose={() => setIsOrderModalOpen(false)}
              item={selectedMenuItem}
            />

            <DemoUserSwitcher />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;