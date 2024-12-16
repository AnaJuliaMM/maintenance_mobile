import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import { machineType, machinePostType } from "~/type/machineType";

class MachineService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: "http://192.168.1.143:3014/machines/",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.loadToken();
  }

  /**
   * Carrega o token de autenticação do SecureStore.
   * Este método é chamado no construtor da classe para carregar o token no momento da inicialização.
   *
   * @async
   * @returns {Promise<void>} Não retorna valor. Apenas carrega o token.
   */
  private async loadToken(): Promise<void> {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        this.token = token;
      }
    } catch (error) {
      console.error("Erro ao carregar o token:", error);
    }
  }

  /**
   * Retorna os cabeçalhos de autenticação, incluindo o token JWT.
   * Caso o token não tenha sido carregado, lança um erro.
   *
   * @returns {object} Cabeçalhos de autenticação para a requisição HTTP.
   * @throws {Error} Se o token de autenticação não estiver disponível.
   */
  private getAuthHeaders(): object {
    if (!this.token) {
      throw new Error("Token de autenticação não encontrado");
    }

    return {
      Accept: "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  /**
   * Realiza uma requisição GET para buscar uma lista de máquinas.
   *
   * @async
   * @param {string} endpoint - O endpoint da API para buscar as máquinas.
   * @returns {Promise<machineType[]>} Uma promessa que resolve para uma lista de objetos `machineType`.
   * @throws {AxiosError} Se houver erro durante a requisição.
   */
  async get(endpoint: string): Promise<machineType[]> {
    try {
      const response = await this.api.get(endpoint, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Realiza uma requisição GET para buscar uma máquina específica pelo ID.
   *
   * @async
   * @param {string} endpoint - O endpoint da API para buscar a máquina.
   * @param {number} id - O ID da máquina a ser buscada.
   * @returns {Promise<machineType>} Uma promessa que resolve para o objeto `machineType` da máquina.
   * @throws {AxiosError} Se houver erro durante a requisição.
   */
  async getById(endpoint: string, id: number): Promise<machineType> {
    try {
      const response = await this.api.get(`${endpoint}/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Trata os erros de requisição e resposta.
   * Exibe uma mensagem de erro específica dependendo do tipo de erro.
   *
   * @param {AxiosError} error - O erro gerado pela requisição Axios.
   */
  private handleError(error: AxiosError): void {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        alert(
          "Seu usuário não tem permissão para acessar esta página. Por favor, faça login."
        );
      } else {
        console.error(
          `Erro na resposta: ${error.response.status}`,
          error.response.data
        );
      }
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }
  }
}

export default new MachineService();
