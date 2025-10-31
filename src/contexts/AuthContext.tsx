import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string, phone: string) => Promise<boolean>;
  logout: () => void;
  isInStore: boolean;
  switchUser: (userType: 'customer' | 'staff' | 'admin') => void;
  updateUserPoints: (newPoints: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with different roles for demo
const mockUsers = {
  customer: {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'customer@cafe.com',
    phone: '0123456789',
    points: 150,
    isInStore: true,
    role: 'customer' as const
  },
  staff: {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'staff@cafe.com',
    phone: '0987654321',
    points: 50,
    isInStore: true,
    role: 'staff' as const
  },
  admin: {
    id: '3',
    name: 'Lê Văn Cường',
    email: 'admin@cafe.com',
    phone: '0555666777',
    points: 500,
    isInStore: false,
    role: 'admin' as const
  }
};

// Demo credentials for different roles
const demoCredentials = [
  { email: 'demo@cafe.com', password: 'demo', type: 'customer' as const },
  { email: 'customer@cafe.com', password: 'customer', type: 'customer' as const },
  { email: 'staff@cafe.com', password: 'staff', type: 'staff' as const },
  { email: 'admin@cafe.com', password: 'admin', type: 'admin' as const }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInStore, setIsInStore] = useState(false);

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsInStore(userData.isInStore || false);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Mock WiFi detection - simulate in-store presence
  React.useEffect(() => {
    const checkLocation = () => {
      // Only update if user exists and status actually changes
      if (user) {
        // More stable in-store status based on user role
        let inStoreChance = 0.3; // Default 30% chance
        
        if (user.role === 'staff') {
          inStoreChance = 0.9; // Staff usually in store
        } else if (user.role === 'admin') {
          inStoreChance = 0.6; // Admin sometimes in store
        }
        
        const inStore = Math.random() < inStoreChance;
        
        // Only update if status actually changes
        if (user.isInStore !== inStore) {
          const updatedUser = { ...user, isInStore: inStore };
          setUser(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        setIsInStore(inStore);
      }
    };
    
    // Only start checking if user exists
    if (user) {
      checkLocation();
      const interval = setInterval(checkLocation, 120000); // Check every 2 minutes (less frequent)
      return () => clearInterval(interval);
    }
  }, [user?.id, user?.role]); // Only depend on user id and role, not the entire user object

  // Separate effect for initial location check
  React.useEffect(() => {
    if (user && user.isInStore !== undefined) {
      setIsInStore(user.isInStore);
    }
  }, [user?.id]); // Only when user changes

  const login = async (email: string, password: string): Promise<boolean> => {
    // Find matching credentials
    const credential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (credential) {
      const userData = mockUsers[credential.type];
      const userWithStore = { ...userData, isInStore };
      setUser(userWithStore);
      localStorage.setItem('currentUser', JSON.stringify(userWithStore));
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, fullName: string, phone: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new customer user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: fullName,
        email: email,
        phone: phone,
        points: 0,
        isInStore: false,
        role: 'customer'
      };
      
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsInStore(false);
    // Clear any stored auth data
    localStorage.removeItem('currentUser');
  };

  const switchUser = (userType: 'customer' | 'staff' | 'admin') => {
    const userData = mockUsers[userType];
    setUser({ ...userData, isInStore });
    // Store current user for persistence
    localStorage.setItem('currentUser', JSON.stringify({ ...userData, isInStore }));
  };

  const updateUserPoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    user,
    login,
    register,
    logout,
    isInStore,
    switchUser,
    updateUserPoints
  }), [user, isInStore]);

  return (
    <AuthContext.Provider value={contextValue}>
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