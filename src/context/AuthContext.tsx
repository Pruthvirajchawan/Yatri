import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  memberSince: string;
  travelStyle: string;
  savedDestinationIds: string[];
  bio?: string;
  phone?: string;
  passportCountry?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfileData: (updates: Partial<UserProfile>) => Promise<void>;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sync / create profile in Firestore
  const syncOrCreateUserProfile = async (firebaseUser: User, customName?: string): Promise<UserProfile> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        const profile: UserProfile = {
          ...data,
          id: firebaseUser.uid,
          email: firebaseUser.email || data.email || 'guest@yatri.in',
          name: data.name || firebaseUser.displayName || customName || 'Traveler',
          avatar: data.avatar || firebaseUser.photoURL || DEFAULT_AVATAR
        };
        setUserProfile(profile);
        return profile;
      } else {
        const isGuest = firebaseUser.isAnonymous;
        const newProfile: UserProfile = {
          id: firebaseUser.uid,
          name: customName || firebaseUser.displayName || (isGuest ? 'Guest Yatri' : 'Pruthviraj Chawan'),
          email: firebaseUser.email || (isGuest ? 'guest@yatri.in' : 'pruthvirajchawan65@gmail.com'),
          avatar: firebaseUser.photoURL || (isGuest ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop' : DEFAULT_AVATAR),
          location: 'Pune, Maharashtra, India',
          memberSince: 'Member since 2026',
          travelStyle: 'Balanced Cultural Explorer',
          savedDestinationIds: ['udaipur', 'kashmir', 'somnath'],
          bio: 'Passionate about cultural trails, mountain circuits & sustainable Indian heritage journeys.',
          isGuest
        };

        await setDoc(userDocRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('Firestore user profile sync note (fallback to local profile):', err);
      const fallbackProfile: UserProfile = {
        id: firebaseUser.uid,
        name: customName || firebaseUser.displayName || 'Traveler',
        email: firebaseUser.email || 'traveler@yatri.in',
        avatar: firebaseUser.photoURL || DEFAULT_AVATAR,
        location: 'India',
        memberSince: 'Joined 2026',
        travelStyle: 'Explorer',
        savedDestinationIds: ['udaipur', 'kashmir'],
        isGuest: firebaseUser.isAnonymous
      };
      setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncOrCreateUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncOrCreateUserProfile(result.user);
        closeAuthModal();
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await syncOrCreateUserProfile(cred.user);
        closeAuthModal();
      }
    } catch (err: any) {
      console.error('Email login failed:', err);
      throw err;
    }
  };

  const signupWithEmail = async (name: string, email: string, pass: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: name });
        await syncOrCreateUserProfile(cred.user, name);
        closeAuthModal();
      }
    } catch (err: any) {
      console.error('Sign up failed:', err);
      throw err;
    }
  };

  const loginAsGuest = async () => {
    try {
      const cred = await signInAnonymously(auth);
      if (cred.user) {
        await syncOrCreateUserProfile(cred.user, 'Guest Explorer');
        closeAuthModal();
      }
    } catch (err: any) {
      console.error('Guest login failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
      throw err;
    }
  };

  const updateUserProfileData = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    const merged: UserProfile = { ...userProfile, ...updates };
    setUserProfile(merged);

    try {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Profile Firestore update note:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        loginAsGuest,
        logout,
        updateUserProfileData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
