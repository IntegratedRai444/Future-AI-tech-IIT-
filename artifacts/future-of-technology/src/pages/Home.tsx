import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Hero from '@/components/sections/Hero';
import NavBar from '@/components/ui/NavBar';
import TechDomains from '@/components/sections/TechDomains';
import TechNetworkSection from '@/components/sections/TechNetworkSection';
import Metrics from '@/components/sections/Metrics';
import Innovation from '@/components/sections/Innovation';
import Footer from '@/components/sections/Footer';
import AIGuide from '@/components/ui/AIGuide';
import BackgroundFX from '@/components/three/BackgroundFX';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <BackgroundFX />
          <NavBar />
          <main className="relative z-10 flex flex-col">
            <Hero />
            <TechNetworkSection />
            <TechDomains />
            <Metrics />
            <Innovation />
            <Footer />
          </main>
          <AIGuide />
        </>
      )}
    </div>
  );
}
