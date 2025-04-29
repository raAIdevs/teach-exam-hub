
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

type User = {
  id: string;
  name: string;
  email: string;
  subject: string;
  institute: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, subject: string, institute: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, "id">;
            
            setUser({
              id: firebaseUser.uid,
              name: userData.name,
              email: userData.email,
              subject: userData.subject,
              institute: userData.institute
            });
          } else {
            // If Firestore data doesn't exist but user is authenticated
            setUser({
              id: firebaseUser.uid,
              name: "User",
              email: firebaseUser.email || "",
              subject: "",
              institute: ""
            });
          }
        } catch (error) {
          console.error("Error getting user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase signup with additional user data saved to Firestore
  const signup = async (name: string, email: string, password: string, subject: string, institute: string) => {
    setIsLoading(true);
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create comprehensive user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        subject,
        institute,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        role: "teacher", // Default role for all users in this application
        status: "active",
        profileComplete: true
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Signup error:", error);
      throw new Error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase logout
  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
