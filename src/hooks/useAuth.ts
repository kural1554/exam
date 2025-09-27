'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/**
 * Intha hook user authenticated-ah irukangala-nu check pannum.
 * Illana, avangala login page-ku anupidum.
 * Itha protected pages-la use pannalam.
 */
export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Ithu client-side-la mattum thaan run aagum
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Token illana, user login pannala-nu artham
      toast.error("Please log in to access this page.");
      router.replace('/auth/login'); // Unga sariyaana login page path-a kudunga
    }
    // Venaamna, token-a decode panni expire aagiruka-nu kooda check pannalam (advanced)
    
  }, [router]); // router dependency-ah serunga
}