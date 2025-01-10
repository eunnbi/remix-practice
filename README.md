# Remix & Monorepo Practice

This is a practice project for Remix and Monorepo.

- Remix App: Developed following the [official tutorial](https://remix.run/docs/en/main/tutorials/jokes).
- Future Flags: Actively leveraging [Future Flags](https://remix.run/docs/en/main/start/future-flags) to explore and learn the latest features of Remix.
   - **Vite**: Provides a fast build process and Hot Module Replacement (HMR).
   - **Single Fetch**: Optimizes data loading by reducing network requests.
- **Fully Tree-Shakeable**: Designed to minimize bundle size by effectively removing unused code.

## Project Structure

```
apps/                      
   ├── remix-jokes/        # Remix app for practicing
packages/                  
   ├── design-system/      # Shared UI components and theming
   └── eslint-config/      # Shared ESLint configuration
```

## Requirements
- Node.js: v20 or higher
- pnpm: v9 or higher

## Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/eunnbi/remix-practice.git
cd remix-practice
```

#### 2. Run Setup Script

```bash
./setup.sh
```

#### 3. Run Development Server

```
pnpm app dev
```
