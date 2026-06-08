# Async Race

Deployment: https://async-race-ashy.vercel.app/

Estimated score: 400 / 400

## Setup

```bash
npm install
npm run dev
```

The app expects the Async Race API to be running at `http://127.0.0.1:3000`.

## Scripts

```bash
npm run build
npm run lint
npm run format
npm run ci:format
```

## Checklist 400 / 400 pts

## UI Deployment

- [x] Deployment Platform: Successfully deploy the UI on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.

## Requirements to Commits and Repository

- [x] Commit guidelines compliance: commits should follow the specified Conventional Commits format.
- [x] Checklist included in README.md.
- [x] Score calculation included at the top of README.md.
- [x] UI Deployment link in README.md: add the hosted frontend URL after deployment.

## Basic Structure 80 / 80 points

- [x] Two Views 10 / 10: Garage and Winners views are implemented.
- [x] Garage View Content 30 / 30:
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] Winners View Content 10 / 10:
  - [x] Name of view
  - [x] Winners table
  - [x] Pagination
- [x] Persistent State 30 / 30: view state, pagination, sorting, and input fields are stored in Redux.

## Garage View 90 / 90 points

- [x] Car Creation And Editing Panel. CRUD Operations 20 / 20.
- [x] Color Selection 10 / 10.
- [x] Random Car Creation 20 / 20.
- [x] Car Management Buttons 10 / 10.
- [x] Pagination 10 / 10.
- [x] EXTRA POINTS 20 / 20:
  - [x] Empty Garage message.
  - [x] Empty Garage Page moves back after deleting the last car on a page.

## Winners View 50 / 50 points

- [x] Display Winners 15 / 15.
- [x] Pagination for Winners 10 / 10.
- [x] Winners Table 15 / 15.
- [x] Sorting Functionality 10 / 10.

## Race 170 / 170 points

- [x] Start Engine Animation 20 / 20.
- [x] Stop Engine Animation 20 / 20.
- [x] Responsive Animation 30 / 30.
- [x] Start Race Button 10 / 10.
- [x] Reset Race Button 15 / 15.
- [x] Winner Announcement 5 / 5.
- [x] Button States 20 / 20.
- [x] Actions during the race 50 / 50.

## Prettier and ESLint Configuration 10 / 10 points

- [x] Prettier Setup 5 / 5.
- [x] ESLint Configuration 5 / 5.
