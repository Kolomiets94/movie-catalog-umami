# VK Marusya — Movie Discovery SPA

**Live demo:** https://kolomiets94.github.io/VKMarusya/

A responsive React + TypeScript portfolio application for discovering TV shows, viewing details and saving favorites. The catalogue uses live data from the TVmaze API.

## Features

- Live catalogue from TVmaze
- Debounced search (400 ms)
- Show details with poster, genres, year, rating and description
- Client-side routing with a dedicated details URL
- Favorites managed with Redux Toolkit
- Favorites persisted in localStorage
- Loading and API error states
- Responsive desktop/mobile layout
- 404 route

## Tech stack

React 19 · TypeScript · Redux Toolkit · React Redux · React Router · Axios · CSS

## Routes

- `/` — catalogue and search
- `/movie/:id` — show details

## Run locally

```bash
npm install
npm start
```

For a production build:

```bash
npm run build
```

## Data source

Show information and artwork are provided by [TVmaze](https://www.tvmaze.com). TVmaze API data is licensed under CC BY-SA.

## Author

**Alexander Kolomiets** — Junior Frontend Developer (React / TypeScript)

- GitHub: https://github.com/Kolomiets94
- Email: Kolomiets94@yandex.ru
- Telegram: @Kolomiets94
