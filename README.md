# Remix & Monorepo Practice

Remix와 Monorepo 연습용 프로젝트입니다.
- Remix app은 [공식 튜토리얼](https://remix.run/docs/en/main/tutorials/jokes) 기반으로 제작되었습니다.
- [Future Flag](https://remix.run/docs/en/main/start/future-flags)를 적극적으로 사용합니다. 현재 Vite와 Single Fetch를 사용합니다.

## Project Structure

```
apps/                      
   ├── remix-jokes/        # A Remix app for jokes
packages/                  
   ├── design-system/      # Design system
   └── eslint-config/      # Shared ESLint configuration
```

## Requirements
- Node.js: v18 or higher
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

