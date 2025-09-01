import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Set a cookie
export function setCookie(name: string, value: any, options?: Cookies.CookieAttributes) {
  Cookies.set(name, JSON.stringify(value), { expires: 7, ...options }); // Default expiration: 7 days
}

// Get a cookie
export function getCookie(name: string) {
  const cookie = Cookies.get(name);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch (e) {
      // If parsing fails, return the raw cookie value
      return cookie;
    }
  }
  return null;
}

// Remove a cookie
export function removeCookie(name: string, options?: Cookies.CookieAttributes) {
  Cookies.remove(name, options);
}
