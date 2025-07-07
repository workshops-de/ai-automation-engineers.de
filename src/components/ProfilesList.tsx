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

const PROFILES_PER_PAGE = 50;

export default function ProfilesList({ className = '' }: ProfilesListProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
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

  useEffect(() => {
    // Filter profiles based on search and filter criteria
    let filtered = profiles;

    // Enhanced search filter - search across all fields
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(profile => {
        const searchableText = [
          profile.name,
          profile.email,
          profile.company,
          profile.role,
          profile.bio,
          profile.location,
          profile.experience,
          ...(profile.skills || [])
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchableText.includes(searchLower);
      });
    }

    // Experience filter
    if (experienceFilter && experienceFilter !== 'All') {
      filtered = filtered.filter(profile => profile.experience === experienceFilter);
    }

    // Location filter
    if (locationFilter && locationFilter !== 'All') {
      filtered = filtered.filter(profile => 
        profile.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Skill filter
    if (skillFilter && skillFilter !== 'All') {
      filtered = filtered.filter(profile => 
        profile.skills?.some(skill => 
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [profiles, searchTerm, experienceFilter, locationFilter, skillFilter]);

  // Get unique values for filters
  const getUniqueExperiences = () => {
    const experiences = profiles.map(p => p.experience).filter(Boolean);
    return ['All', ...Array.from(new Set(experiences))];
  };

  const getUniqueLocations = () => {
    const locations = profiles.map(p => p.location).filter(Boolean);
    return ['All', ...Array.from(new Set(locations))];
  };

  const getUniqueSkills = () => {
    const skills = profiles.flatMap(p => p.skills || []);
    return ['All', ...Array.from(new Set(skills))].slice(0, 20); // Limit for UI
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProfiles.length / PROFILES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROFILES_PER_PAGE;
  const endIndex = startIndex + PROFILES_PER_PAGE;
  const currentProfiles = filteredProfiles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        {/* Loading Hero Section */}
        <section className="bg-gradient-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Automation Professionals</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Loading our community of talented professionals...
              </p>
            </div>
          </div>
        </section>

        {/* Loading Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Automation Professionals</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Connect with talented AI automation engineers, researchers, and thought leaders from around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{profiles.length}</div>
                <div className="text-sm text-blue-100">Active Members</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{new Set(profiles.map(p => p.location?.split(',')[1]?.trim()).filter(Boolean)).size}</div>
                <div className="text-sm text-blue-100">Countries</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{new Set(profiles.flatMap(p => p.skills || [])).size}</div>
                <div className="text-sm text-blue-100">Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search profiles by name, skills, company, bio, location..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select 
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Skills</option>
                {getUniqueSkills().map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              
              <select 
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Experience</option>
                {getUniqueExperiences().map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
              
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <span>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProfiles.length)} of {filteredProfiles.length} profiles
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentProfiles.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProfiles.map(profile => (
                <div key={profile.id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                  {/* Card Header with gradient background */}
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                      <div className="absolute left-0 bottom-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
                    </div>
                    
                    {/* Profile info */}
                    <div className="relative z-10 flex items-center">
                      <img 
                        src={profile.profilePicture || '/default-avatar.svg'} 
                        alt={profile.name || 'User'}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        width="80"
                        height="80"
                        loading="lazy"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-white">{profile.name || 'Anonymous User'}</h3>
                        <p className="text-white text-opacity-90">{profile.role || 'Role not specified'}</p>
                        {profile.company && (
                          <p className="text-white text-opacity-75 text-sm">{profile.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Location and Experience */}
                    <div className="flex flex-wrap gap-2 text-sm">
                      {profile.location && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {profile.location}
                        </div>
                      )}
                      {profile.experience && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {profile.experience}
                        </span>
                      )}
                    </div>
                    
                    {/* Bio */}
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {profile.bio || 'No bio provided yet.'}
                    </p>
                    
                    {/* Skills */}
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {profile.skills.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{profile.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Social Links */}
                    <div className="flex gap-2 pt-2">
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
                          className="text-gray-400 hover:text-primary-600 transition-colors"
                          title="Website"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex-1 transition-colors font-medium text-sm">
                        Connect
                      </button>
                      <a 
                        href={`/profiles/${profile.id}`} 
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-white hover:border-gray-400 transition-all font-medium text-sm flex items-center justify-center"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            page === currentPage
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    // Show ellipsis
                    if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to connect with AI automation professionals? Create your profile and start networking today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/profile" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Create Profile
            </a>
            <a href="/learning" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 