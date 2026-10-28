# LevelUP

Aplicativo com backend Spring Boot e frontend React Native com Expo, disponível no navegador, Android e iOS. A integração usa Axios e TanStack Query.

## Design

[Protótipo do projeto no Figma](https://www.figma.com/design/Zk7vrWLP8jaYe6E5hb6cOc/Sem-t%C3%ADtulo?node-id=0-1&t=mzN2lfmXfBVyci3b-1)

## Funcionalidades

- Publicações com texto, imagem por URL ou ambos.
- Tarefas que concedem 10 XP ao serem concluídas, uma única vez.
- Registro manual e histórico de atividades.
- Cadastro, login, busca de usuários, seguidores e perfil com XP e nível.

## Iniciar o backend

Requisitos: Java 21 e MySQL rodando na porta 3306.

```powershell
cd levelup-api
.\mvnw.cmd spring-boot:run
```

A API usa a porta **8080**. A configuração padrão do MySQL é usuário `root`, senha `root` e banco `leveup_api`. As tabelas são criadas ou atualizadas automaticamente.

Para outra conexão, configure `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` antes de iniciar.

## Abrir no navegador

Em outro terminal:

```powershell
cd mobile-front-end
npm ci
npm run web
```

Acesse **http://localhost:8081**. Crie uma conta para começar. Se o Expo já estiver aberto, encerre com `Ctrl+C` antes de executar o comando.

## Abrir no celular

```powershell
cd mobile-front-end
npm start
```

Abra o Expo Go e escaneie o QR code. Celular e computador devem estar na mesma rede.

Se precisar definir a API, copie `mobile-front-end/.env.example` para `.env` e ajuste `EXPO_PUBLIC_API_URL` para `http://IP_DO_COMPUTADOR:8080/api`. No emulador Android padrão, use `http://10.0.2.2:8080/api`. Reinicie o Expo após alterar essa configuração.

## Validação do frontend

```powershell
npm run lint
npm run check
npm run export:web
```

Após atualizar o projeto, reinicie o Spring Boot e o Expo para carregar as novas funcionalidades.
