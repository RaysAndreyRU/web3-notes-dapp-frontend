#  Web3 Notes DApp — Frontend

> Frontend for **Web3 Notes DApp**, built with **Vite**, **React**, and **TypeScript** using the **Feature-Sliced Design (FSD)** architecture.  
> It connects to the NestJS + Prisma backend and authenticates users through **Lumia Passport**.

---

## Features

-  **Web3 Authentication** via [Lumia Passport](https://www.lumiapassport.io)
-  **Client-side encryption demo** — create, view, and manage notes stored as ciphertext by the backend
-  **Vite + React + TypeScript** — ultra-fast build and development environment
-  **Feature-Sliced Design** — scalable modular architecture for frontend projects
-  **Modern UI** with reusable shared components
-  **Environment-based API URLs** through `VITE_APP_BACKEND_URL`

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | [React](https://react.dev) |
| **Build Tool** | [Vite](https://vitejs.dev) |
| **Language** | TypeScript |
| **State & Structure** | Feature-Sliced Design (FSD) |
| **Styling** | Tailwind CSS / CSS Modules |
| **Auth** | [@lumiapassport/ui-kit](https://www.npmjs.com/package/@lumiapassport/ui-kit) |
| **API** | REST / Axios |
| **Environment Management** | `VITE_` variables |

---

##  Project Architecture

Follows the **[Feature-Sliced Design](https://feature-sliced.design/)** methodology:
Each layer is **independent**, **scalable**, and follows clear responsibility boundaries.

> Security note: this reference implementation derives its encryption input from the connected wallet address. It demonstrates the client/server ciphertext flow but must not be treated as production-grade confidential storage without a private key-derivation and key-management design.

---

##  Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

# Build & Preview
```bash
# Build production bundle
npm run build

# Preview locally
npm run preview
```

---

# Docker (optional)
```bash
docker build -t web3-notes-frontend .
docker run -p 5173:3000 web3-notes-frontend
```

---
# License
MIT © Rays Andrey

