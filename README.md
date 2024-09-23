# Machine Maintenance Manager

Este projeto é uma aplicação mobile desenvolvida com **React Native**, **TypeScript**, **Expo**, e **NativeWind**, focada na gestão de máquinas e manutenções. A aplicação é destinada a oferecer uma interface amigável para visualização de máquinas, manutenções e estoque de peças. Todos os dados utilizados na aplicação são mockados.

## 📋 Funcionalidades

### 1. **Interface Amigável e Intuitiva**
- A navegação entre as telas é simples e clara, garantindo a facilidade de uso para os usuários.

### 2. **Tela de Listagem de Máquinas**
- Exibe uma lista de máquinas com seus dados básicos:
  - **Nome**
  - **Tipo**
  - **Localização**
- O layout foi projetado para ser visualmente agradável e fácil de entender.

### 3. **Tela de Detalhes da Máquina**
- Ao clicar em uma máquina, o usuário é redirecionado para a tela de detalhes, onde verá informações mais detalhadas:
  - **Modelo**
  - **Data de Fabricação**
  - **Número de Série**

### 4. **Histórico de Manutenções**
- Exibe o histórico de manutenções da máquina, incluindo:
  - **Data**
  - **Status** (concluída, pendente, etc.)

### 5. **Marcação de Máquina "Em Manutenção"**
- Permite que o usuário marque uma máquina como "em manutenção", com a opção de adicionar comentários explicativos.

### 6. **Criação de Solicitações de Manutenção**
- O usuário pode criar uma solicitação de manutenção preenchendo os seguintes campos:
  - **Descrição do Problema**
  - **Prioridade** (baixa, média, alta)
  - **Responsável**

### 7. **Exibição do Status da Manutenção**
- Ao acessar uma solicitação de manutenção, o usuário verá informações sobre seu status:
  - **Pendente**
  - **Em andamento**
  - **Concluída**

### 8. **Registro de Peças e Materiais Utilizados**
- Simula uma tela para registro de peças e materiais usados durante manutenções.

### 9. **Consulta de Estoque de Peças**
- Exibe uma lista fictícia de peças disponíveis no estoque, permitindo ao usuário simular uma consulta de disponibilidade.

### 10. **Testes de Navegação e Fluxo**
- A aplicação foi testada para garantir que a navegação entre telas segue um fluxo lógico e funcional, mesmo sem integração com dados reais.

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile multiplataforma.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Expo**: Ferramenta para simplificar o desenvolvimento com React Native.
- **NativeWind**: Biblioteca para estilização usando Tailwind CSS no ambiente React Native.

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Emulador Android/iOS ou dispositivo físico para testar a aplicação

### Passos para rodar:

1. Clone o repositório:
   ```bash
   git clone https://github.com/AnaJuliaMM/maintenance_mobile.git
   cd machine-maintenance-manager
    
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o projeto com Expo:
    ```bash
    npx expo start
    ```

4. Execute no emulador ou dispositivo físico via Expo Go.

## 🧪 Testes

- **Testes de navegação**: Garantem que o fluxo entre as telas segue uma sequência lógica.
- **Testes de interface**: Certificam que a interface é intuitiva e fácil de usar.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
