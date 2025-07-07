import React, { useState, useEffect } from 'react';
import { 
  type User, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

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

interface ProfileEditorProps {
  className?: string;
}

export default function ProfileEditor({ className = '' }: ProfileEditorProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserProfile = async (user: User) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // Create initial profile
        const initialProfile: UserProfile = {
          id: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          bio: '',
          company: '',
          role: '',
          location: '',
          experience: '',
          githubUrl: '',
          linkedinUrl: '',
          websiteUrl: '',
          skills: [],
          isPublic: true,
          isAdmin: false,
          profilePicture: user.photoURL || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        await setDoc(docRef, initialProfile);
        setProfile(initialProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage({ type: 'error', text: 'Error loading profile data' });
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    setSaving(true);
    setMessage(null);

    try {
      const docRef = doc(db, 'users', user.uid);
      const updatedProfile = {
        ...profile,
        updatedAt: serverTimestamp()
      };

      await updateDoc(docRef, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Error saving profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && profile && !profile.skills.includes(skillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (profile) {
      setProfile({
        ...profile,
        skills: profile.skills.filter(skill => skill !== skillToRemove)
      });
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: value
      });
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-8">Please sign in to access your profile settings.</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img 
              src={profile.profilePicture || '/default-avatar.png'} 
              alt={profile.name || 'User'}
              className="w-20 h-20 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name || 'Unnamed User'}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-500">{profile.role || 'No role specified'}</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{profile.name || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role/Title</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., AI Automation Engineer"
                />
              ) : (
                <p className="text-gray-900">{profile.role || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{profile.company || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Berlin, Germany"
                />
              ) : (
                <p className="text-gray-900">{profile.location || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              {isEditing ? (
                <select
                  value={profile.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-8 years">5-8 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              ) : (
                <p className="text-gray-900">{profile.experience || 'Not specified'}</p>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Professional Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900">{profile.bio || 'No bio provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              {isEditing ? (
                <div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add a skill..."
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-primary-500 hover:text-primary-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? (
                    profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills listed</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://github.com/username"
                />
              ) : (
                <p className="text-gray-900">
                  {profile.githubUrl ? (
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      {profile.githubUrl}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <p className="text-gray-900">
                  {profile.linkedinUrl ? (
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      {profile.linkedinUrl}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-gray-900">
                  {profile.websiteUrl ? (
                    <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      {profile.websiteUrl}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy Settings</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={profile.isPublic}
              onChange={(e) => handleInputChange('isPublic', e.target.checked)}
              disabled={!isEditing}
              className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="text-gray-700">
              Make my profile public (visible to other users)
            </label>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={saving}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 