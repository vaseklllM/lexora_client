# Lexora Client

**Lexora** – це веб-додаток для вивчення мов за допомогою карточок (flashcards). Цей репозиторій містить клієнт на Next.js, який працює як інтерфейс до [Lexora API](https://github.com/vasek17/lexora_api) та забезпечує зручну роботу з папками, колодами й AI-генерацією в екосистемі продукту.

## Основні можливості

- 🖥️ **Дашборд** – головна сторінка з оглядом папок і колод та швидким доступом до дій
- 📂 **Ієрархія папок** – навігація між вкладеними папками з breadcrumbs і швидким поверненням назад
- 🃏 **Управління колодами** – створення, перейменування та видалення колод з вибором мови в інтерфейсі
- 🔐 **Аутентифікація** – вхід/реєстрація через email + пароль та OAuth (Google) з автоматичним оновленням токенів
- 🌍 **Підтримка мов** – підвантаження списку мов з API для подальшого використання в формах і модалках
- 🚦 **Захист від rate limiting** – окрема сторінка `Too Many Requests` з таймером автоповернення

## Технології проекту

### Frontend Framework

- **Next.js 15** – App Router, Server Components, server actions для звернень до API
- **React 19** – сучасний React runtime з підтримкою нових можливостей
- **TypeScript 5** – типізація компонентів, хуків та API-викликів

### Стан та робота з даними

- **NextAuth.js 4** – JWT-сесії, refresh токени та Google OAuth
- **Zustand** – легковажний стора для локального стану (наприклад, модальні вікна)
- **React Hook Form + Valibot** – форми та валідація на клієнті й сервері
- **react-timer-hook** – таймер на сторінці обмежень
- **jwt-decode** – розбір access-токенів з бекенду

### UI та стилі

- **Tailwind CSS 4** – утилітарна стилізація
- **daisyUI** – готові теми (light/dark) та компоненти
- **tailwind-variants** – декларативні стилі з підтримкою варіантів
- **Власний UI-кит** – набір кнопок, інпутів, breadcrumbs тощо (`src/shared/ui`)

### API та архітектура

- **Feature-Sliced Design** – поділ на `app`, `screens`, `widgets`, `features`, `entities`, `shared`
- **Custom fetch layer** – модуль `fetchCustom` додає токен, обробляє 401/429 та редіректи
- **Valibot-схеми** – типобезпечний парсинг відповідей API (`src/api/schemas`)
- **dotenv** – конфігурація через `.env`

### Розробка та якість

- **ESLint 9** – статичний аналіз з правилами для TypeScript та React
- **Prettier 3** – автоформатування (включно з Tailwind плагіном)
- **Jest + Testing Library** – юніт- та компонентні тести у середовищі JSDOM
- **Husky + lint-staged** – pre-commit перевірки (`lint`, `type-check`, `test`)

## Структура проекту

```
src/
  app/            # Next.js App Router, маршрути для гостів та приватних сторінок
  api/            # Серверні екшени та клієнти для звернень до Lexora API
  entities/       # Базові сутності (Deck, Folder, модалки, іконки)
  features/       # Взаємодії користувача та бізнес-логіка (створення/перейменування тощо)
  screens/        # Композиція сторінок (Sign In/Up, Dashboard)
  shared/         # Утиліти, UI-кит, хелпери, роутинг, схеми валідації
  widgets/        # Великі UI-блоки (Section, Header, т.д.)
```

## Змінні оточення

Створіть файл `.env` у корені на основі `.env.example`:

| Змінна                                   | Опис                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `SYSTEM_NEXT_API_URL`                    | Базовий URL Lexora API (наприклад, `http://localhost:4000/`) |
| `NEXTAUTH_SECRET`                        | Секрет для шифрування сесій NextAuth                         |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_ID`     | OAuth Client ID з Google Cloud                               |
| `SYSTEM_NEXT_OAUTH_GOOGLE_CLIENT_SECRET` | OAuth Client Secret з Google Cloud                           |

> ⚠️ Для локальної розробки бекенд має бути запущений та доступний за вказаним `SYSTEM_NEXT_API_URL`.

## Запуск проекту

```bash
# 1. Встановити залежності
npm install

# 2. Скопіювати змінні оточення
cp .env.example .env
# (за потреби оновити значення)

# 3. Запустити локальний сервер з Turbopack
npm run dev
```

Веб-додаток буде доступний на [http://localhost:3000](http://localhost:3000). NextAuth callback-и працюють на `http://localhost:3000/api/auth/*`.

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
- **NextAuth (callbacks)**: http://localhost:3000/api/auth

## Поради по розробці

- Перед комітом переконайтеся, що `npm run prepare` виконано хоча б раз (активація Husky).
- Приймаючи зміни з бекенду, оновлюйте схеми у `src/api/schemas`, щоб зберегти типобезпечність фронтенду.
- Для відладки HTTP-викликів можна тимчасово вимкнути редіректи `fetchCustom`, але не забудьте повернути захист перед комітом.

Приємної роботи з Lexora! 🚀
