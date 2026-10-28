# LevelUP Mobile

React Native com Expo para Android, iOS e navegador, com Axios e TanStack Query v5.

```powershell
npm ci
npm start
```

Abra o aplicativo no Expo Go pelo QR code, ou execute `npm run android` com um emulador iniciado. O backend Spring Boot deve estar acessível na porta 8080.

Para abrir no navegador, encerre o servidor anterior com `Ctrl+C`, execute `npm run web` e acesse http://localhost:8081. As mesmas telas React Native são renderizadas pelo suporte web do Expo. Tokens usam Expo SecureStore nos dispositivos e `sessionStorage` no navegador.

Para configurar a API, copie `.env.example` para `.env` e defina `EXPO_PUBLIC_API_URL` com o IP do computador, terminando em `/api`. No emulador Android padrão use `http://10.0.2.2:8080/api`. O celular físico precisa usar o endereço de rede do computador.

O [guia completo](../README.md) descreve MySQL, autenticação, configuração de rede, execução e builds.
