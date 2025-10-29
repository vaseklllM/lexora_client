# Lexora Client

**Lexora** is a web application for learning languages using flashcards. This repository contains the Next.js client, which serves as the interface to the [Lexora API](https://github.com/vaseklllM/lexora_api) and provides convenient workflows with folders, decks, and AI generation across the product ecosystem.

🌐 **Website**: [https://lexora.co.ua/](https://lexora.co.ua/)  
📖 **API Documentation**: [https://api.lexora.co.ua/api](https://api.lexora.co.ua/api)

### 🎯 Demo Account

```
📧 Email:    user@example.com
🔑 Password: Password123!
```

## Key Features

- 🖥️ **Dashboard** – a main page with an overview of folders and decks and quick access to actions
- 📂 **Folder hierarchy** – navigate nested folders with breadcrumbs and a quick back navigation
- 🃏 **Deck management** – create, rename, and delete decks with an in-UI language selector
- 🗂️ **Card management** – create, edit, and delete cards with support for description and audio
- 🖱️ **Drag & Drop** – move decks between folders via drag-and-drop with mouse and touch support, animations, and visual effects
- 🎮 **Learning game modes** – Type It (typed answer with hint), Guess It (multiple choice), Pair It (find pairs, 5 cards at a time), Recall It (recall) with a visual progress status bar
- 📚 **Session modes** – separate learning and review modes with different stages
- 🎯 **Sequential learning stages** – Start → Preview → Pair It → Guess It → Recall It → Type It with smooth animated transitions
- 🔄 **Review mode** – review selected cards or all cards in progress through the chosen game
- 📊 **Progress system** – track a Mastery Score (0–100) for cards and decks, mark new cards, in‑progress cards, and cards that require review
- 🎓 **CEFR levels** – support for European proficiency levels (A1–C2)
- 🔊 **Text‑to‑Speech** – audio pronunciation for cards with audio file support
- 🤖 **AI generation** – automatically fill in card data using artificial intelligence
- 🔐 **Authentication** – email/password and OAuth (Google) sign‑in with automatic token refresh
- 🌍 **Language support** – fetch a list of languages from the API for use in forms and modals
- 🌐 **Internationalization (i18n)** – full translation support with i18next for SSR and Client Components (EN, UK, ES, FR, IT, DE, NL, PL)
- 🎯 **Two language systems** – App Language (UI language) and User Language (learning language) with separate selectors
- 🍪 **Cookie‑based personalization** – automatically detect browser language via `negotiator` and store preferences in cookies
- ⚙️ **User settings** – change the interface language via the Settings API endpoint
- 🚦 **Rate limiting protection** – a dedicated `Too Many Requests` page with an auto‑return timer

## Project Technologies

### Frontend Framework

- **Next.js 15** – App Router, Server Components, server actions for API calls, Turbopack for fast development
- **Next.js Image** – image optimization with remote patterns for Google OAuth avatars
- **React 19** – modern React runtime with the latest capabilities
- **TypeScript 5** – type‑safe components, hooks, and API calls

### State and Data Handling

- **NextAuth.js 4** – JWT sessions, refresh tokens, and Google OAuth
- **Zustand** – lightweight store for local state (e.g., modals and game state)
- **React Hook Form + Valibot** – forms and validation on both client and server
- **@hookform/resolvers** – integration of Valibot schemas with React Hook Form
- **Custom `valibotResolver`** – extended support for `v.forward` for complex validations
- **i18next + react-i18next + next-i18next** – full internationalization with SSR and Client Components
- **negotiator** – automatic best‑fit language detection from the browser’s `Accept-Language` header
- **react-timer-hook** – timer for the rate‑limit page
- **jwt-decode** – decode access tokens from the backend
- **Custom hooks** – `usePlayer` (audio playback with Zustand), `useSliceCards` (split cards into parts), `useGameCardsController` (game flow control), `useMixCards` (shuffle cards)

### UI Interaction

- **@dnd-kit/core** – drag‑and‑drop for moving decks between folders
- **motion** – library for smooth animations and transitions in components
- **react-toastify** – notification system for errors and success messages

### UI and Styling

- **Tailwind CSS 4** – utility‑first styling
- **daisyUI** – ready‑made themes (light/dark) and components
- **tailwind-variants** – declarative styling with variants
- **tailwind-merge** – smart merge of Tailwind classes to avoid conflicts
- **Sass/SCSS** – preprocessor for toast styles and custom styling
- **Custom UI kit** – a set of buttons, inputs, breadcrumbs, Alert, CircleProgress, Checkbox, Chip, Cefr, etc. (`src/shared/ui`)

### API and Architecture

- **Feature‑Sliced Design** – structure split into `app`, `screens`, `widgets`, `features`, `entities`, `shared`
- **Custom fetch layer** – `fetchCustom` module adds the token, handles 401/429, and redirects
- **Valibot schemas** – type‑safe parsing of API responses with error handling (`src/api/schemas`)
- **Server Actions** – server functions for deck operations (create, move, delete)
- **Error handling** – centralized conflict and API error handling
- **dotenv** – configuration via `.env`

### Development and Quality

- **ESLint 9** – static analysis with TypeScript and React rules
- **Prettier 3** – auto‑formatting with plugins (including `prettier-plugin-tailwindcss` for class sorting)
- **Jest + Testing Library** – unit and component tests in a JSDOM environment with snapshot support
- **Husky + lint-staged** – pre‑commit checks (Prettier auto‑formatting, ESLint with `--max-warnings 0`)

## Project Structure

```
src/
  app/            # Next.js App Router; routes for guests and private pages
                  # - (guest)/(auth): Sign In/Up
                  # - (private)/dashboard: Dashboard, Folder, Deck, Learning Deck
                  # - logout, too-many-request
  api/            # Server actions and clients for Lexora API
                  # - ai, auth, card, dashboard, deck, folder, languages, settings
                  # - schemas: Valibot schemas for validating API responses
  entities/       # Core entities (Card, Deck, Folder, modals, icons)
  features/       # User interactions and business logic
                  # - add-card, button-back
                  # - deck/folder: CRUD operations and modals
                  # - guess-it/pair-it/recall-it/type-it: game modes
                  # - app-language-select: UI language switcher
                  # - user-language-select: learning language switcher
                  # - oauth, view-card
  screens/        # Page compositions (Sign In/Up, Dashboard)
  shared/         # Utilities, UI kit, helpers, routing, validation schemas
                  # - api-core: fetchCustom, authOptions, error handling
                  # - hooks: usePlayer, useLogout, useGameCardsController, useSliceCards, useMixCards
                  # - icons: SVG icons
                  # - ui: UI kit (Button, Input, Alert, CircleProgress, etc.)
                  # - utils: valibotResolver (v.forward support), mixArray, sleep, stack-id
  widgets/        # Large UI blocks
                  # - deck-section: Deck sections
                  # - header: Navigation and header
                  # - learning-deck: Main learning widget with all stages
                  # - section: Drag-and-drop functionality
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable                                 | Description                                                 |
| ---------------------------------------- | ----------------------------------------------------------- |
| `SYSTEM_NEXT_API_URL`                    | Base URL of the Lexora API (e.g., `http://localhost:4000/`) |
| `SYSTEM_NEXT_TTS_URL`                    | Base URL for Text‑to‑Speech audio files                     |
| `NEXTAUTH_SECRET`                        | Secret for encrypting NextAuth sessions                     |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_ID`     | OAuth Client ID from Google Cloud                           |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_SECRET` | OAuth Client Secret from Google Cloud                       |

> ⚠️ For local development, the backend must be running and accessible at the specified `SYSTEM_NEXT_API_URL`.

## Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file and configure environment variables
# (see the "Environment Variables" section above)
# Example: cp .env.example .env (if present)

# 3. Start the local server with Turbopack
npm run dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000).

## Useful Scripts

```bash
npm run dev           # Development mode (Next.js + Turbopack)
npm run build         # Production build
npm run start         # Start the built app (port 3000)
npm run lint          # ESLint checks
npm run type-check    # Type checking without build
npm run test          # Run Jest tests
npm run test:watch    # Jest in watch mode
npm run prepare       # Initialize Husky hooks
```

## Available Services

- **Web UI**: http://localhost:3000
