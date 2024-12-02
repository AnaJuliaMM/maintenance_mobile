import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import { LoginType } from "~/type/authType";

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3011/api/Auth",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Saves a token securely in Expo SecureStore.
   * This method stores the provided token value under the specified key.
   *
   * @async
   * @function
   * @param {string} key - The key under which the token will be stored.
   * @param {string} value - The token value to be stored.
   * @returns {Promise<void>} Resolves when the token has been successfully stored.
   *
   * @example
   * await authService.saveToken("authToken", "some-auth-token");
   */
  async saveToken(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * Retrieves a token from Expo SecureStore.
   * This method fetches the stored token using the specified key.
   *
   * @async
   * @function
   * @param {string} key - The key of the token to retrieve.
   * @returns {Promise<string | null>} Resolves with the token value if found, or null if not.
   *
   * @example
   * const token = await authService.getToken("authToken");
   */
  async getToken(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  /**
   * Deletes a token from Expo SecureStore.
   * This method removes the token stored under the specified key.
   *
   * @async
   * @function
   * @param {string} key - The key of the token to delete.
   * @returns {Promise<void>} Resolves when the token has been successfully deleted.
   *
   * @example
   * await authService.deleteToken("authToken");
   */
  async deleteToken(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  /**
   * Performs a login operation by sending a POST request to the specified API endpoint with the provided authentication data.
   * If the login is successful, the response data is stored locally, and the token is returned.
   *
   * @async
   * @function
   * @param {string} endpoint - The API endpoint to send the login request to.
   * @param {AuthType} data - The authentication data (e.g., email and password) to be sent in the request body.
   * @returns {Promise<AxiosResponse>} Resolves with the API response containing the user data and token.
   * @throws {AxiosError} If the request fails, an error is thrown.
   *
   * @example
   * const response = await authService.login("/auth/login", { email: "user@example.com", password: "password123" });
   */
  async login(endpoint: string, data: LoginType): Promise<AxiosResponse> {
    try {
      const response = await this.api.post(endpoint, data);
      await this.saveToken("authToken", response.data.token);
      return response.data.user;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Logs out the user by deleting the stored authentication token.
   * This method removes the "authToken" from secure storage.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the user has been logged out (token is deleted).
   *
   * @example
   * await authService.logout();
   */
  async logout(): Promise<void> {
    await this.deleteToken("authToken");
  }
}

export default new AuthService();
