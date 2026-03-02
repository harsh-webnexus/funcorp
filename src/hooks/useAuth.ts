'use client';

import { useState, useEffect } from 'react';

interface User {
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User>({
    email: null,
    name: null,
    isAuthenticated: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      // Check localStorage first
      let email = localStorage.getItem('userEmail');
      let name = localStorage.getItem('userName');
      let isAuth = localStorage.getItem('isAuthenticated');
      
      // If not in localStorage, check sessionStorage
      if (!email || !isAuth) {
        email = sessionStorage.getItem('userEmail');
        name = sessionStorage.getItem('userName');
        isAuth = sessionStorage.getItem('isAuthenticated');
      }
      
      // If still no email, check userData
      if (!email) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            const parsed = JSON.parse(userData);
            email = parsed.email;
            name = parsed.name;
          } catch (e) {
            console.error('Error parsing userData', e);
          }
        }
      }
      
      setUser({
        email: email || null,
        name: name || null,
        isAuthenticated: isAuth === 'true' || !!email
      });
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    // Clear all storages
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAuthenticated');
    
    setUser({
      email: null,
      name: null,
      isAuthenticated: false
    });
    
    // Force refresh
    window.location.href = '/';
  };

  return { user, isLoading, logout };
}