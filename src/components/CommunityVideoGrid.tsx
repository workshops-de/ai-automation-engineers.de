import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AuthButtonStandalone from './AuthButtonStandalone';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

const communityVideos: Video[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'AI-Automation Grundlagen: Von Zero zu Hero in 30 Minuten',
    description: 'Lerne die Basics der AI-Automation mit praktischen Beispielen',
    duration: '32:15',
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`
  },
  {
    id: 'oHg5SJYRHA0',
    title: 'n8n Advanced Workflows: Multi-Agent Orchestration',
    description: 'Fortgeschrittene n8n-Techniken für komplexe AI-Workflows',
    duration: '45:22',
    thumbnail: `https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg`
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Claude Code Live: Real-world AI Coding Session',
    description: 'Siehe einen Experten beim Live-Coding mit Claude Code',
    duration: '58:30',
    thumbnail: `https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg`
  },
  {
    id: 'ScMzIvxBSi4',
    title: 'MCP Server Development Workshop',
    description: 'Baue deinen eigenen MCP Server von Grund auf',
    duration: '67:45',
    thumbnail: `https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg`
  },
  {
    id: '2vjPBrBU-TM',
    title: 'GitHub Copilot Enterprise Secrets',
    description: 'Insider-Tipps für maximale Produktivität mit Copilot',
    duration: '38:12',
    thumbnail: `https://img.youtube.com/vi/2vjPBrBU-TM/maxresdefault.jpg`
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Cursor vs Claude Code: Der ultimative Vergleich',
    description: 'Detaillierter Vergleich der beiden AI-Coding-Tools',
    duration: '42:08',
    thumbnail: `https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg`
  }
];

interface VideoCardProps {
  video: Video;
  isAuthenticated: boolean;
  onVideoClick: (videoId: string) => void;
  onAuthTrigger: () => void;
}

function VideoCard({ video, isAuthenticated, onVideoClick, onAuthTrigger }: VideoCardProps) {
  const handleClick = () => {
    if (isAuthenticated) {
      onVideoClick(video.id);
    } else {
      onAuthTrigger();
    }
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        
        {/* Play button overlay */}
        <button
          onClick={handleClick}
          className={`absolute inset-0 flex items-center justify-center ${
            isAuthenticated ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all ${
            isAuthenticated ? 'hover:bg-white hover:scale-110' : 'opacity-60'
          }`}>
            <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
          {video.duration}
        </div>

        {/* Login overlay for unauthenticated users */}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white rounded-lg p-4 max-w-xs text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p className="text-sm font-medium text-gray-900 mb-1">Login erforderlich</p>
              <p className="text-xs text-gray-600">Premium Content</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {video.description}
        </p>
        
        <button 
          onClick={handleClick}
          className={`inline-flex items-center font-medium transition-colors ${
            isAuthenticated 
              ? 'text-blue-600 hover:text-blue-800' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAuthenticated ? 'Video ansehen' : 'Login erforderlich'}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </article>
  );
}

function CommunityPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        setShowAuthModal(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleVideoClick = (videoId: string) => {
    if (user) {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      window.open(videoUrl, '_blank', 'width=1280,height=720,scrollbars=yes,resizable=yes');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthTrigger = () => {
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Community wird geladen...</p>
      </div>
    );
  }

  return (
    <>
      {/* Auth Modal */}
      {showAuthModal && !user && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Content</h2>
            <p className="text-gray-600 mb-6">
              Diese Videos sind exklusiv für Community-Mitglieder. Melde dich kostenlos an, um Zugang zu erhalten.
            </p>
            <AuthButtonStandalone 
              className="w-full justify-center text-lg px-8 py-4"
              variant="default"
            />
            <p className="text-sm text-gray-500 mt-4">
              Kostenlose Anmeldung mit Google-Account
            </p>
          </div>
        </div>
      )}

      {/* User Welcome (for authenticated users) */}
      {user && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-green-800">
              <strong>Willkommen zurück, {user.displayName || user.email?.split('@')[0]}!</strong> 
              Du hast vollen Zugang zu allen Premium-Videos.
            </p>
          </div>
        </div>
      )}

      <!-- Video Grid -->
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communityVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isAuthenticated={!!user}
            onVideoClick={handleVideoClick}
            onAuthTrigger={handleAuthTrigger}
          />
        ))}
      </div>
    </>
  );
}

export default CommunityPage;