import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import AuthService from "~/services/authService";
import AuthContextType from "~/type/authContextType";
import { LoginType, JwtPayloadType } from "~/type/authType";

// Cria o AuthContext para fornecer o estado de autenticação do usuário e funções em todo o aplicativo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o `AuthContext` e retornar o estado de autenticação e as funções.
 *
 * @throws {Error} Se for usado fora de um componente `AuthProvider`, lança um erro.
 * @returns {AuthContextType} O valor do contexto contendo `user`, `signIn` e `signOut`.
 *
 * @exemplo
 * const { user, signIn, signOut } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// Componente AuthProvider que envolve o aplicativo e fornece o contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedUser = SecureStore.getItem("user");

  const [user, setUser] = useState<JwtPayloadType>(
    storedUser ? JSON.parse(storedUser) : { username: "", role: null }
  );

  /**
   * Faz o login de um usuário usando seu email e senha.
   * A função chama o serviço `login` para autenticar o usuário, atualiza o estado `user`,
   * e armazena os dados do usuário autenticado de forma segura no `SecureStore`.
   *
   * @async
   * @function
   * @param {string} email - O endereço de email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<void>} Resolve quando a autenticação do usuário estiver completa e os dados do usuário estiverem armazenados de forma segura.
   *
   * @exemplo
   * await signIn('user@example.com', 'senha123');
   */
  const login = async (data: LoginType): Promise<void> => {
    try {
      const { jwtPayload } = await AuthService.login("", data);
      setUser(jwtPayload);

      await SecureStore.setItemAsync("user", JSON.stringify(jwtPayload));
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  /**
   * Faz o logout do usuário atual limpando o estado `user` e removendo os dados do usuário do `SecureStore`.
   * Esta função essencialmente faz o logout do usuário e reseta o contexto de autenticação.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolve quando os dados do usuário forem removidos do estado e do armazenamento seguro.
   *
   * @exemplo
   * await signOut();
   */
  const logout = async (): Promise<void> => {
    await AuthService.logout();
    setUser({ username: "", role: null });
    await SecureStore.deleteItemAsync("user");
  };

  useEffect(() => {
    /**
     * Carrega os dados do usuário do `SecureStore` ao montar o componente.
     * Se os dados existirem, define o estado `user` com o objeto do usuário armazenado.
     * Esta função é chamada dentro do hook `useEffect` para carregar os dados do usuário quando o componente é renderizado pela primeira vez.
     *
     * @async
     * @function
     * @returns {Promise<void>} Resolve quando os dados do usuário forem carregados e o estado for atualizado.
     */
    const loadUser = async (): Promise<void> => {
      const storedUser = await SecureStore.getItemAsync("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  // Fornece o AuthContext para os componentes filhos, passando os dados do usuário e as funções de autenticação
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
