import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

import { authType, JwtPayloadType, LoginType } from "~/type/authType";

interface DecodedJwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
    | "user:admin"
    | "user:user"
    | "user:viewer"
    | "user:editor"
    | null;
  exp?: number;
  iss?: string;
  aud?: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://192.168.1.143:3014/auth",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Realiza a operação de login enviando uma requisição POST para o endpoint da API especificado com os dados de autenticação fornecidos.
   * Se o login for bem-sucedido, os dados de resposta são armazenados localmente e o token é retornado.
   *
   * @async
   * @function
   * @param {string} endpoint - O endpoint da API para o qual a requisição de login será enviada.
   * @param {AuthType} data - Os dados de autenticação (por exemplo, email e senha) a serem enviados no corpo da requisição.
   * @returns {Promise<AxiosResponse>} Retorna uma promessa que resolve com a resposta da API contendo os dados do usuário e o token.
   * @throws {AxiosError} Se a requisição falhar, um erro será lançado.
   *
   * @exemplo
   * const response = await authService.login("/auth/login", { email: "user@example.com", password: "senha123" });
   */
  async login(
    endpoint: string,
    data: authType
  ): Promise<{ token: string; jwtPayload: JwtPayloadType }> {
    try {
      const response = await this.api.post(endpoint, data);

      // Persist token in local storage
      const token = response.data;
      await SecureStore.setItemAsync("token", token);

      // Decode token to extract user role
      const decodedToken = jwtDecode<DecodedJwtPayload>(token);
      const jwtPayload: JwtPayloadType = {
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        exp: decodedToken.exp,
        iss: decodedToken.iss,
        aud: decodedToken.aud,
      };

      return { token, jwtPayload };
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Faz o logout do usuário, excluindo o token de autenticação armazenado.
   * Este método remove o "authToken" do armazenamento seguro.
   *
   * @async
   * @function
   * @returns {Promise<void>} Retorna uma promessa que resolve quando o usuário for desconectado (o token é excluído).
   *
   * @exemplo
   * await authService.logout();
   */
  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync("token");
  }

  /**
   * Função responsável por tratar erros em requisições HTTP utilizando Axios.
   *
   * @param {AxiosError} error - O erro que ocorreu durante a requisição.
   *
   * Caso o erro seja relacionado à resposta do servidor, ele verifica o código
   * de status HTTP e lida com ele de maneira apropriada:
   * - Se o status for 403 ou 401, exibe um alerta informando que o usuário
   *   não tem permissão.
   * - Caso contrário, o erro é logado no console.
   *
   * Se o erro não for relacionado à resposta, a função verifica se houve um
   * problema com a requisição ou com a configuração da requisição.
   *
   * @returns {void} - Não retorna nada.
   */
  private handleError(error: AxiosError): void {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        alert("Seu usuário não tem permissão");
      } else
        console.error(
          `Erro na resposta: ${error.response.status}`,
          error.response.data
        );
    } else if (error.request)
      console.error("Erro na requisição:", error.request);
    else console.error("Erro ao configurar a requisição:", error.message);
  }
}

export default new AuthService();
