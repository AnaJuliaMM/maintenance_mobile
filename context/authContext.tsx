import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import AuthService from "~/services/authService";
import AuthContextType from "~/type/authContextType";
import { LoginType } from "~/type/authType";

// Create the AuthContext to provide user authentication state and functions across the app
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access the `AuthContext` and return the authentication state and functions.
 *
 * @throws {Error} If used outside of an `AuthProvider` component, it throws an error.
 * @returns {AuthContextType} The context value containing `user`, `signIn`, and `signOut`.
 *
 * @example
 * const { user, signIn, signOut } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component that wraps the app and provides authentication context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    /**
     * Loads user data from `SecureStore` on component mount.
     * If data exists, it sets the `user` state with the stored user object.
     * This function is called within the `useEffect` hook to load user data when the component is first rendered.
     *
     * @async
     * @function
     * @returns {Promise<void>} Resolves when user data has been loaded and state is updated.
     */
    const loadUser = async () => {
      const storedUser = await SecureStore.getItemAsync("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  /**
   * Signs in a user using their email and password.
   * The function calls the `login` service to authenticate the user, updates the `user` state,
   * and stores the authenticated user data securely in `SecureStore`.
   *
   * @async
   * @function
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} Resolves when user authentication is complete and user data is securely stored.
   *
   * @example
   * await signIn('user@example.com', 'password123');
   */
  const login = async (data: LoginType): Promise<void> => {
    const authenticatedUser = await AuthService.login("", data);
    setUser(authenticatedUser);
    await SecureStore.setItemAsync("user", JSON.stringify(authenticatedUser));
  };

  /**
   * Signs out the current user by clearing the `user` state and removing the user data from `SecureStore`.
   * This function essentially logs out the user and resets the authentication context.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when user data has been cleared from the state and secure storage.
   *
   * @example
   * await signOut();
   */
  const logout = async (): Promise<void> => {
    setUser(null);
    await SecureStore.deleteItemAsync("user");
  };

  // Provide the AuthContext to children components, passing the user data and auth functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
