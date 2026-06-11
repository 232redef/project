# Библиотека MLP - Система управления книгами и авторами

## Описание проекта
Веб-приложение для управления библиотекой, где можно создавать, редактировать и удалять авторов и их книги. Проект создан для демонстрации навыков fullstack-разработки.

## Архитектура
**Вариант Б: Fullstack Next.js**
- Frontend и Backend в одном приложении
- Route Handlers в `app/api/` для серверной логики
- In-memory хранение данных (массивы в памяти сервера)

## Технологии
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Fetch API для запросов

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Открыть в браузере
http://localhost:3000
```

## Предметная область

**Авторы и Книги** (связь один-ко-многим)

- Один автор может написать много книг
- У каждой книги есть один автор

## Структура базы данных (in-memory)

### Сущность "Автор"

| Поле | Тип | Обязательное | Описание |
|---|---|---|---|
| id | string (UUID) | Да | Уникальный идентификатор |
| name | string | Да | Имя автора |
| email | string | Да | Email (уникальный) |
| age | number | Да | Возраст |
| isActive | boolean | Да | Активен ли автор |
| bio | string | Нет | Биография |
| createdAt | string | Да | Дата создания |
| updatedAt | string | Да | Дата обновления |

### Сущность "Книга"

| Поле | Тип | Обязательное | Описание |
|---|---|---|---|
| id | string (UUID) | Да | Уникальный идентификатор |
| authorId | string | Да | ID автора (внешний ключ) |
| title | string | Да | Название книги |
| isbn | string | Да | ISBN (уникальный) |
| genre | string | Да | Жанр |
| pages | number | Да | Количество страниц |
| isPublished | boolean | Да | Опубликована ли |
| publishedAt | string | Нет | Дата публикации |
| createdAt | string | Да | Дата создания |
| updatedAt | string | Да | Дата обновления |

### Авторы

| Метод | URL | Описание | Пример ответа |
|---|---|---|---|
| GET | `/api/authors?page=1&limit=5` | Получить список авторов (пагинация) | `{ items: [], total: 10, page: 1, pages: 2 }` |
| GET | `/api/authors/:id` | Получить автора с его книгами | `{ id: "...", name: "...", books: [] }` |
| POST | `/api/authors` | Создать автора | `{ id: "...", name: "..." }` |
| PATCH | `/api/authors/:id` | Обновить автора | `{ id: "...", name: "..." }` |
| DELETE | `/api/authors/:id` | Удалить автора | `{ success: true }` |
| GET | `/api/authors/search?q=текст` | Поиск авторов | `{ items: [] }` |

### Книги

| Метод | URL | Описание | Пример ответа |
|---|---|---|---|
| GET | `/api/books?page=1&limit=5&q=текст&authorId=id` | Получить книги (пагинация, поиск, фильтр) | `{ items: [], total: 10, page: 1, pages: 2 }` |
| GET | `/api/books/:id` | Получить книгу с автором | `{ id: "...", title: "...", author: {...} }` |
| POST | `/api/books` | Создать книгу | `{ id: "...", title: "..." }` |
| PATCH | `/api/books/:id` | Обновить книгу | `{ id: "...", title: "..." }` |
| DELETE | `/api/books/:id` | Удалить книгу | `{ success: true }` |
| GET | `/api/books/search?q=текст` | Поиск книг | `{ items: [] }` |

## Структура проекта

```
project/
├── app/
│   ├── api/
│   │   ├── authors/
│   │   │   ├── route.ts                 # GET (список) и POST (создание автора)
│   │   │   ├── [id]/
│   │   │   │   └── route.ts             # GET, PATCH, DELETE для одного автора
│   │   │   └── search/
│   │   │       └── route.ts             # GET (поиск авторов по q)
│   │   └── books/
│   │       ├── route.ts                 # GET (список с фильтрацией) и POST (создание книги)
│   │       ├── [id]/
│   │       │   └── route.ts             # GET, PATCH, DELETE для одной книги
│   │       └── search/
│   │           └── route.ts             # GET (поиск книг по q)
│   ├── authors/
│   │   ├── page.tsx                     # Список авторов (клиентский компонент)
│   │   ├── new/
│   │   │   └── page.tsx                 # Создание нового автора
│   │   └── [id]/
│   │       ├── page.tsx                 # Детальная страница автора с его книгами
│   │       └── edit/
│   │           └── page.tsx             # Редактирование автора
│   ├── books/
│   │   ├── page.tsx                     # Список книг с поиском и фильтром по автору
│   │   ├── new/
│   │   │   └── page.tsx                 # Создание новой книги
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx             # Редактирование книги
│   ├── favicon.ico                      # Иконка сайта (стандартная)
│   ├── globals.css                      # Глобальные стили (Tailwind)
│   ├── layout.tsx                       # Корневой layout с навигацией
│   └── page.tsx                         # Главная страница
├── components/
│   ├── AuthorForm.tsx                   # Форма для создания/редактирования автора
│   ├── BookForm.tsx                     # Форма для создания/редактирования книги
│   ├── Nav.tsx                          # Навигационное меню
│   └── Ui.tsx                           # UI компоненты (PageTitle, ErrorBox, ButtonLink, PrimaryButton, SecondaryButton)
├── lib/
│   ├── api.ts                           # API клиент для запросов из браузера
│   ├── constants.ts                     # Константы (DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT)
│   ├── db.ts                            # Файловое хранилище (persistent, использует fs)
│   ├── store.ts                         # Глобальное in-memory хранилище (основное)
│   └── validation.ts                    # Утилиты: createId, пагинация, валидация, readJson
├── types/
│   └── index.ts                         # TypeScript интерфейсы: Author, Book, BookWithAuthor, PaginatedResponse, ApiError, AuthorInput, BookInput
├── public/                              # Статические файлы (пустая директория)
├── .eslintrc.json                       # Конфиг ESLint
├── next-env.d.ts                        # Next.js типы (авто-генерируемый)
├── next.config.mjs                      # Конфиг Next.js
├── package.json                         # Зависимости и скрипты
├── package-lock.json                    # Lockfile зависимостей
├── postcss.config.js                    # Конфиг PostCSS (для Tailwind)
├── tailwind.config.ts                   # Конфиг Tailwind CSS
├── tsconfig.json                        # Конфиг TypeScript
└── README.md                            # Документация проекта
```

## Автор

Студент группы ИСП-9.19 Макеев Александр
