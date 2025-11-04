import { useState, useEffect, createContext, useContext } from 'react';
import { sampleUsers } from '../data/sampleData';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('protrackr-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check test accounts
    const testUser = sampleUsers.find(u => u.email === email);
    if (testUser && password === 'Password123') {
      setUser(testUser);
      localStorage.setItem('protrackr-user', JSON.stringify(testUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name, email, password, role) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = sampleUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      department: role === 'student' ? 'Computer Science' : 'Faculty',
      year: role === 'student' ? '1st Year' : undefined,
      avatarURL: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      bio: `New ${role} on ProTrackr`,
      publicProfile: true
    };

    setUser(newUser);
    localStorage.setItem('protrackr-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('protrackr-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}