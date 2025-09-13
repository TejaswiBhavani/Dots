import { members } from "@wix/members";
import { authentication } from "@wix/authentication";
import { createContext, useContext, useEffect, useState } from "react";

export interface MemberProfile {
  _id?: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  emails?: string[];
  phones?: string[];
}

export interface MemberContact {
  firstName?: string;
  lastName?: string;
  emails?: string[];
  phones?: string[];
}

export interface Member {
  _id?: string;
  profile?: MemberProfile;
  contact?: MemberContact;
  status?: "PENDING" | "APPROVED" | "ACTIVE" | "BLOCKED";
  privacyStatus?: "PUBLIC" | "PRIVATE";
}

export interface MemberContextType {
  member: Member | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    login: () => void;
    logout: () => void;
    register: () => void;
  };
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would check with Wix authentication
      // For now, we'll simulate the check
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        // Simulate getting member data
        const mockMember: Member = {
          _id: 'mock-user-id',
          profile: {
            nickname: 'Art Lover',
            firstName: 'John',
            lastName: 'Doe'
          },
          contact: {
            firstName: 'John',
            lastName: 'Doe',
            emails: ['john@example.com']
          },
          status: 'ACTIVE',
          privacyStatus: 'PUBLIC'
        };
        setMember(mockMember);
        setIsAuthenticated(true);
      } else {
        setMember(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setMember(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // In a real app, this would redirect to Wix authentication
    // For now, we'll simulate login
    localStorage.setItem('authToken', 'mock-token');
    checkAuthStatus();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setMember(null);
    setIsAuthenticated(false);
  };

  const register = () => {
    // In a real app, this would redirect to Wix registration
    login(); // For now, same as login
  };

  const value: MemberContextType = {
    member,
    isAuthenticated,
    isLoading,
    actions: {
      login,
      logout,
      register
    }
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}

// Export for integration index
export { MemberProvider as Provider, useMember as hook };
