# Evangelho das Dimenúveis — Tarô & Prática Contemplativa

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> *"Não prevê. Reconhece. Cada Dimenúvel contém todas as outras."*

---

## 🌌 Origem e Propósito

O **Evangelho das Dimenúveis** é uma aplicação web contemplativa, filosófica e prática, fundamentada nos ensinamentos e nas transmissões do *Evangelho das Dimenúveis*, do *Tarô das Dimenúveis* e dos *Provérbios da Espiral*.

A proposta do aplicativo é oferecer um santuário digital para a prática cotidiana do autoconhecimento, meditação guiada e observação atenta do Padrão. Em vez de prever um futuro predeterminado, a obra convida o praticante a **reconhecer a presença, atravessar a experiência e abidar no Silêncio**.

---

## 🔮 Principais Funcionalidades

### 1. 🏠 Página Inicial (Início)
- **Citações e Provérbios Diários**: Apresentação dinâmica e interativa de trechos do Evangelho e dos *Provérbios da Espiral*.
- **Acesso Rápido às Dimenúveis**: Navegação direta pelas 8 Dimenúveis que compõem o Padrão:
  1. 🟣 **Silêncio** *(Dimenúvel Violeta)*
  2. 🔵 **Visão** *(Dimenúvel Índigo)*
  3. 🔷 **Mente** *(Dimenúvel Azul)*
  4. 🟢 **Coração** *(Dimenúvel Verde)*
  5. 🟡 **Vontade** *(Dimenúvel Amarelo)*
  6. 🟠 **Energia** *(Dimenúvel Laranja)*
  7. 🔴 **Matéria** *(Dimenúvel Vermelho)*
  8. ⚪ **O Espelho** *(Dimenúvel Transcendente)*

### 2. 🌀 A Jornada dos Giros (Prática da Espiral)
- **Trilha Progressiva**: Sequência de 10 Giros contemplativos cobrindo a transição do Silêncio à Matéria e ao Espelho.
- **Temporizador de Prática**: Cronômetro contemplativo integrado com instruções passo a passo (Ancoragem, Foco, Respiração e Abida).
- **Registro de Progresso**: Acompanhamento de giros concluídos, frequência de práticas e estados de consciência.

### 3. 📖 Leitor do Evangelho & Provérbios da Espiral
- **Biblioteca Completa**: Acesso organizado a todas as transmissões e capítulos do livro.
- **Filtros por Categoria**:
  - *Transmissão*
  - *Evangelho*
  - *Mistérios*
  - *Salmos*
  - *Giros*
  - *Provérbios* (I a XX da Espiral)
- **Busca Integrada**: Leitura fluida com busca por palavras-chave e navegação estruturada.

### 4. 🃏 Oráculo do Tarô das Dimenúveis
- **Tiragens Arquetípicas**:
  - **Carta Única**: Diagnóstico do momento presente e ponto de ancoragem.
  - **Tiragem de 3 Cartas**: Tríade de alinhamento (*Reconhecimento*, *Travessia*, *Abida*).
- **Artes Espirituais & Interpretações**: Cartas ilustradas com descrições arquetípicas profundas, orientações práticas e perguntas para reflexão.

### 5. ✨ Experiência Visual & Atmosfera
- **Design Escuro e Celestial**: Animações de galáxia espiral e partículas cósmicas em movimento.
- **Interface Responsiva**: Adaptada para dispositivos móveis e desktop com transições fluidas via Framer Motion.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações**: [Motion](https://motion.dev/) (Framer Motion)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Passos para execução local

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   O aplicativo estará disponível em `http://localhost:3000`.

3. **Verificar a compilação do TypeScript (Lint)**:
   ```bash
   npm run lint
   ```

4. **Gerar o build de produção**:
   ```bash
   npm run build
   ```

### 📱 Gerar APK Android

1. **Sincronize o Capacitor com Android**:
   ```bash
   npm run prepare:android
   ```

2. **Gerar APK de release**:
   ```bash
   npm run assemble:android
   ```

3. **Assinatura do APK**:
   - Se você não fornecer um keystore próprio, o Gradle usará a chave de debug para assinar o APK.
   - Para usar uma chave personalizada, crie `android/keystore.properties` com as propriedades:
     ```properties
     storeFile=keystore.jks
     storePassword=senha
     keyAlias=alias
     keyPassword=senha
     ```

4. **Local do APK gerado**:
   - `android/app/build/outputs/apk/release/app-release.apk`

5. **Observações importantes**:
   - O nome do app instalado é **Evangelho das Dimenúveis**.
   - O `appId` atual é `com.example.evangelho`. Se alterar o pacote, remova e readicione o Android com `npx cap sync android`.
   - Use Node.js 20 no CI para garantir que a compilação do Tailwind funcione corretamente.

---

## 📜 Licença e Direitos

© **Evangelho das Dimenúveis**. Todos os direitos reservados.
