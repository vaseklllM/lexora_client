# Lexora Client

**Lexora** – це веб-додаток для вивчення мов за допомогою карточок (flashcards). Цей репозиторій містить клієнт на Next.js, який працює як інтерфейс до [Lexora API](https://github.com/vaseklllM/lexora_api) та забезпечує зручну роботу з папками, колодами й AI-генерацією в екосистемі продукту.

## Основні можливості

- 🖥️ **Дашборд** – головна сторінка з оглядом папок і колод та швидким доступом до дій
- 📂 **Ієрархія папок** – навігація між вкладеними папками з breadcrumbs і швидким поверненням назад
- 🃏 **Управління колодами** – створення, перейменування та видалення колод з вибором мови в інтерфейсі
- 🗂️ **Управління картками** – створення, редагування та видалення карток з підтримкою опису та аудіо
- 🖱️ **Drag & Drop** – переміщення колод між папками за допомогою перетягування з підтримкою mouse та touch сенсорів, анімаціями та візуальними ефектами
- 🎮 **Ігрові режими навчання** – Type It (введення відповіді з підказкою), Guess It (вибір з варіантів), Pair It (знаходження пар, по 5 карток), Recall It (пригадування) з візуальним статус-баром прогресу
- 📚 **Режими сесій** – окремі режими навчання (learning) та повторення (review) з різними етапами
- 🎯 **Послідовні етапи навчання** – Start → Preview → Pair It → Guess It → Recall It → Type It з плавними анімаціями переходів
- 🔄 **Режим повторення** – можливість повторити окремі картки або всі картки в прогресі через обрану гру
- 📊 **Система прогресу** – відстеження рівня засвоєння (Mastery Score 0-100) для карток та колод, позначення нових карток, карток в прогресі та карток що потребують повторення
- 🎓 **CEFR рівні** – підтримка європейських рівнів володіння мовою (A1-C2)
- 🔊 **Text-to-Speech** – інтеграція аудіо вимови для карток з підтримкою звукових файлів
- 🤖 **AI-генерація** – автоматичне заповнення даних карток за допомогою штучного інтелекту
- 🔐 **Аутентифікація** – вхід/реєстрація через email + пароль та OAuth (Google) з автоматичним оновленням токенів
- 🌍 **Підтримка мов** – підвантаження списку мов з API для подальшого використання в формах і модалках
- 🌐 **Інтернаціоналізація (i18n)** – повна підтримка перекладів з i18next для SSR та клієнтських компонентів (EN, UK, ES, FR, IT, DE, NL, PL)
- 🎯 **Дві системи мов** – App Language (мова інтерфейсу) та User Language (мова для навчання карток) з окремими селекторами
- 🍪 **Cookie-based персоналізація** – автоматичне визначення мови браузера через negotiator та збереження налаштувань у cookies
- ⚙️ **Налаштування користувача** – можливість змінювати мову інтерфейсу через Settings API endpoint
- 🚦 **Захист від rate limiting** – окрема сторінка `Too Many Requests` з таймером автоповернення

## Технології проекту

### Frontend Framework

- **Next.js 15** – App Router, Server Components, server actions для звернень до API, Turbopack для швидкого dev-режиму
- **Next.js Image** – оптимізація зображень з remote patterns для Google OAuth аватарів
- **React 19** – сучасний React runtime з підтримкою нових можливостей
- **TypeScript 5** – типізація компонентів, хуків та API-викликів

### Стан та робота з даними

- **NextAuth.js 4** – JWT-сесії, refresh токени та Google OAuth
- **Zustand** – легковажний стора для локального стану (наприклад, модальні вікна та ігрові стани)
- **React Hook Form + Valibot** – форми та валідація на клієнті й сервері
- **@hookform/resolvers** – інтеграція Valibot-схем з React Hook Form
- **Кастомний valibotResolver** – розширена підтримка `v.forward` для складних валідацій
- **i18next + react-i18next + next-i18next** – повна інтернаціоналізація з підтримкою SSR та Client Components
- **negotiator** – автоматичне визначення найкращої мови з Accept-Language заголовку браузера
- **react-timer-hook** – таймер на сторінці обмежень
- **jwt-decode** – розбір access-токенів з бекенду
- **Кастомні хуки** – usePlayer (audio playback з Zustand), useSliceCards (розділення карток на частини), useGameCardsController (контроль ігрового процесу), useMixCards (перемішування карток)

### UI взаємодія

- **@dnd-kit/core** – drag-and-drop функціональність для переміщення колод між папками
- **motion** – бібліотека для плавних анімацій та переходів у компонентах
- **react-toastify** – система сповіщень для відображення помилок та успішних операцій

### UI та стилі

- **Tailwind CSS 4** – утилітарна стилізація
- **daisyUI** – готові теми (light/dark) та компоненти
- **tailwind-variants** – декларативні стилі з підтримкою варіантів
- **tailwind-merge** – розумне об'єднання Tailwind класів для уникнення конфліктів
- **Sass/SCSS** – препроцесор для стилізації toast-сповіщень та кастомних стилів
- **Власний UI-кит** – набір кнопок, інпутів, breadcrumbs, Alert, CircleProgress, Checkbox, Chip, Cefr тощо (`src/shared/ui`)

### API та архітектура

- **Feature-Sliced Design** – поділ на `app`, `screens`, `widgets`, `features`, `entities`, `shared`
- **Custom fetch layer** – модуль `fetchCustom` додає токен, обробляє 401/429 та редіректи
- **Valibot-схеми** – типобезпечний парсинг відповідей API з обробкою помилок (`src/api/schemas`)
- **Server Actions** – серверні функції для операцій з колодами (створення, переміщення, видалення)
- **Обробка помилок** – централізована система обробки конфліктів та помилок API
- **dotenv** – конфігурація через `.env`

### Розробка та якість

- **ESLint 9** – статичний аналіз з правилами для TypeScript та React
- **Prettier 3** – автоформатування з плагінами (prettier-plugin-tailwindcss для сортування Tailwind класів)
- **Jest + Testing Library** – юніт- та компонентні тести у середовищі JSDOM з підтримкою snapshots
- **Husky + lint-staged** – pre-commit перевірки (автоформатування Prettier, ESLint з `--max-warnings 0`)

## Структура проекту

```
src/
  app/            # Next.js App Router, маршрути для гостів та приватних сторінок
                  # - (guest)/(auth): Sign In/Up
                  # - (private)/dashboard: Dashboard, Folder, Deck, Learning Deck
                  # - logout, too-many-request
  api/            # Серверні екшени та клієнти для звернень до Lexora API
                  # - ai, auth, card, dashboard, deck, folder, languages, settings
                  # - schemas: Valibot схеми для валідації API відповідей
  entities/       # Базові сутності (Card, Deck, Folder, модалки, іконки)
  features/       # Взаємодії користувача та бізнес-логіка
                  # - add-card, button-back
                  # - deck/folder: CRUD операції та модалки
                  # - guess-it/pair-it/recall-it/type-it: ігрові режими
                  # - app-language-select: перемикач мови інтерфейсу
                  # - user-language-select: перемикач мови для навчання
                  # - oauth, view-card
  screens/        # Композиція сторінок (Sign In/Up, Dashboard)
  shared/         # Утиліти, UI-кіт, хелпери, роутинг, схеми валідації
                  # - api-core: fetchCustom, authOptions, обробка помилок
                  # - hooks: usePlayer, useLogout, useGameCardsController, useSliceCards, useMixCards
                  # - icons: SVG іконки
                  # - ui: UI-кіт (Button, Input, Alert, CircleProgress тощо)
                  # - utils: valibotResolver (підтримка v.forward), mixArray, sleep, stack-id
  widgets/        # Великі UI-блоки
                  # - deck-section: Секції з колодами
                  # - header: Навігація та хедер
                  # - learning-deck: Основний віджет навчання з усіма етапами
                  # - section: Drag-and-drop функціональність
```

## Змінні оточення

Створіть файл `.env` у корені проекту з наступними змінними:

| Змінна                                   | Опис                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `SYSTEM_NEXT_API_URL`                    | Базовий URL Lexora API (наприклад, `http://localhost:4000/`) |
| `SYSTEM_NEXT_TTS_URL`                    | Базовий URL для Text-to-Speech аудіо файлів                  |
| `NEXTAUTH_SECRET`                        | Секрет для шифрування сесій NextAuth                         |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_ID`     | OAuth Client ID з Google Cloud                               |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_SECRET` | OAuth Client Secret з Google Cloud                           |

> ⚠️ Для локальної розробки бекенд має бути запущений та доступний за вказаним `SYSTEM_NEXT_API_URL`.

## Запуск проекту

```bash
# 1. Встановити залежності
npm install

# 2. Створити файл .env та налаштувати змінні оточення
# (див. розділ "Змінні оточення" вище)
# Приклад: cp .env.example .env (якщо існує)

# 3. Запустити локальний сервер з Turbopack
npm run dev
```

Веб-додаток буде доступний на [http://localhost:3000](http://localhost:3000).

## Корисні скрипти

```bash
npm run dev           # Режим розробки (Next.js + Turbopack)
npm run build         # Продукційна збірка
npm run start         # Запуск зібраної версії (порт 3000)
npm run lint          # ESLint перевірки
npm run type-check    # Перевірка типів без компіляції
npm run test          # Запуск Jest тестів
npm run test:watch    # Jest у watch-режимі
npm run prepare       # Ініціалізація Husky hooks
```

## Доступні сервіси

- **Web UI**: http://localhost:3000
