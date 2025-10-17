import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  company: string;
  role: string;
  location: string;
  experience: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  skills: string[];
  isPublic: boolean;
  isAdmin: boolean;
  profilePicture: string;
  createdAt?: any;
  updatedAt?: any;
}

interface ProfilesListProps {
  className?: string;
}

const PROFILES_PER_PAGE = 24;

export default function ProfilesList({ className = '' }: ProfilesListProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Create query for public profiles only
    const profilesQuery = query(
      collection(db, 'users'),
      where('isPublic', '==', true),
      orderBy('updatedAt', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(profilesQuery, (snapshot) => {
      const profilesData: UserProfile[] = [];
      
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data() as UserProfile;
        profilesData.push({
          ...data,
          id: doc.id
        });
      });
      
      setProfiles(profilesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(profiles.length / PROFILES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROFILES_PER_PAGE;
  const endIndex = startIndex + PROFILES_PER_PAGE;
  const currentProfiles = profiles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="h-8 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {currentProfiles.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Noch keine Profile verfügbar</h3>
          <p className="text-gray-600">Sei der Erste und erstelle dein Profil!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProfiles.map((profile, index) => (
              <div key={profile.id} className={`group animate-fade-in-up`} style={{animationDelay: `${index * 100}ms`}}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  {/* Profile Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center">
                      <img 
                        src={profile.profilePicture || '/default-avatar.svg'} 
                        alt={profile.name || 'User'}
                        className="w-16 h-16 rounded-full object-cover bg-gray-100"
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {profile.name || 'Anonymous User'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {profile.role || 'Role not specified'}
                        </p>
                        {profile.company && (
                          <p className="text-gray-500 text-xs mt-1">
                            {profile.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Body */}
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    {profile.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {profile.location}
                      </div>
                    )}
                    
                    {/* Bio */}
                    {profile.bio && (
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {profile.bio}
                      </p>
                    )}
                    
                    {/* Experience */}
                    {profile.experience && (
                      <div className="flex items-center">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {profile.experience}
                        </span>
                      </div>
                    )}
                    
                    {/* Skills */}
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.slice(0, 4).map(skill => (
                            <span key={skill} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          {profile.skills.length > 4 && (
                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                              +{profile.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Profile Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      {/* Social Links */}
                      <div className="flex gap-3">
                        {profile.githubUrl && (
                          <a 
                            href={profile.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="GitHub"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {profile.linkedinUrl && (
                          <a 
                            href={profile.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {profile.websiteUrl && (
                          <a 
                            href={profile.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Website"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                      
                      {/* View Profile Button */}
                      <a 
                        href={`/profile?id=${profile.id}`} 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                      >
                        Profil ansehen
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                  }`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Zurück
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-4">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                          page === currentPage
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                  }`}
                >
                  Weiter
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
} 