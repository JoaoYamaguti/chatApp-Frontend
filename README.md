# chatApp-Frontend

Inicialmente este projeto nasceu para ser um teste, onde o projeto basicamente consiste em um chat para troca de mensagens entre os usuários.

## Features
-  Login com email e senha.
-  Autenticação JWT.
-  Edição das informações do perfil.

  ![chatApp-login](https://github.com/user-attachments/assets/c27d3dd9-9e17-4295-a8e7-6a8d8d26a8fa)
  
-  Troca de mensagem entre os usuários.

  ![chatApp-Chating](https://github.com/user-attachments/assets/af6e0952-6cce-4b25-a176-a2c49c897b58)


-  Layout Responsivo.

   ![chatApp-mobile](https://github.com/user-attachments/assets/7a93788b-5795-4c3e-80f2-810f13c4bbfa)

#### Diferenciais (Extras Opcionais)

- [ ] Comunicação em tempo real via WebSocket (uso opcional de ActionCable ou outra tecnologia).
- [x] Suporte ao envio de arquivos (permitindo anexos como imagens e documentos pequenos).
- [x] Implementação de paginação na listagem de mensagens para melhor desempenho.
- [x] Mecanismo de autenticação (por exemplo, JWT) para garantir segurança nas requisições.
- [x] Criação de um endpoint de métricas (/metrics) com estatísticas sobre mensagens enviadas e usuários ativos.
- [ ] Processamento assíncrono de mensagens utilizando fila de tarefas (exemplo: Redis + Sidekiq).

## Tecnologias Usadas
- Vue.js: Biblioteca para construir o Frontend.
- Axios: Ferramenta para fazer as requisições ao backend.

## **! IMPORTANTE !**

O app funcionará corretamente somente se o servido backend estiver ativo.

*[Backend Repo](https://github.com/JoaoYamaguti/chatApp-backend)*

## Project Setup

```sh
npm install
```

### Set Environment Variable 

Crie o arquivo .env para configurar as seguintes variaveis ambiente:

```
VITE_API_URL = *the backend API  base url, example: "http://localhost:3000"*
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
