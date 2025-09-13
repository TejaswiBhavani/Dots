import React, { createContext, useContext, ReactNode } from 'react';

// Fallback MemberProvider for Vercel builds without Wix integrations
interface MemberContextType {
  member: null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const MemberContext = createContext<MemberContextType>({
  member: null,
  login: async () => {},
  logout: async () => {},
  isLoggedIn: false,
});

export function MemberProvider({ children }: { children: ReactNode }) {
  const value: MemberContextType = {
    member: null,
    login: async () => {
      console.log('Login not available in Vercel build');
    },
    logout: async () => {
      console.log('Logout not available in Vercel build');
    },
    isLoggedIn: false,
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}