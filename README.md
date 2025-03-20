# chatApp-Frontend

Inicialmente este projeto é um teste para a [vaga de Dev Jr.](https://github.com/rhuantac/vaga-dev-voll) da empresa [Voll](https://vollsolutions.com.br/).

O projeto basicamente consiste em um chat para troca de mensagens entre os usuários.

#### Diferenciais (Extras Opcionais)

- [ ] Comunicação em tempo real via WebSocket (uso opcional de ActionCable ou outra tecnologia).
- [x] Suporte ao envio de arquivos (permitindo anexos como imagens e documentos pequenos).
- [x] Implementação de paginação na listagem de mensagens para melhor desempenho.
- [x] Mecanismo de autenticação (por exemplo, JWT) para garantir segurança nas requisições.
- [x] Criação de um endpoint de métricas (/metrics) com estatísticas sobre mensagens enviadas e usuários ativos.
- [ ] Processamento assíncrono de mensagens utilizando fila de tarefas (exemplo: Redis + Sidekiq).

## Tecmologias Usadas
- Vue.js: Biblioteca para construir o Frontend.
- Axios: Ferramenta para fazer as requisições ao backend.

## **! IMPORTANTE !**

O app funcionará corretamente somente se servido backend estiver ativo.

*[Backend Repo](https://github.com/JoaoYamaguti/chatApp-backend)*

## Project Setup

```sh
npm install
```

### Set Invironment Variable 

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
