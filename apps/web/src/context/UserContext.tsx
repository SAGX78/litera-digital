import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  defaultFormat: 'epub' | 'pdf';
  dailyReminder: boolean;
  cloudSync: boolean;
}

interface UserContextType {
  user: UserProfile;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  updateAvatar: (file: File) => void;
  logout: () => void;
}

const defaultUser: UserProfile = {
  name: 'Rian Pratama, S.Kom',
  username: 'rianpratama',
  email: 'rian.pratama@gmail.com',
  phone: '+62 812-8920-1123',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3coyPznlPdOjrxGmTVDH4P1y59poKhZyT8ytjsgEmz31CxaOXQL2kAdxa5tE9FWZQ69EYM2pT0b2Bv0lLJ4IY7WVh6kwdewK3QqbRE1B4rOLMO-HjcVwWQVBunUO9vQjqKHLbdOFQXhBBu0NEsvl9g41EBVcBpzATPzTS_uYp_PgQpBexKsTgiTj0Gnl2SwH55y0jKGLEj9GPOiiZqNwjCo6sgGRFV4MIKpru0n8mmijp-6YZdGXW9Q',
  defaultFormat: 'epub',
  dailyReminder: true,
  cloudSync: true
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateAvatar = (file: File) => {
    const url = URL.createObjectURL(file);
    setUser(prev => ({ ...prev, avatar: url }));
  };

  const logout = () => {
    // Dummy logout just resets the state or does nothing special for now
    // In a real app this would clear auth tokens
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, updateAvatar, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
