# LearnLingo

LearnLingo is a web application for a company offering online language learning services. Users can browse language tutors, filter them by language, proficiency level, and hourly rate, and save tutors to a personal favourites list. Registered users can also book a free trial lesson with any tutor.

## Live demo

[coming soon]

## Pages

- **Home** — introduces the platform and links to the Teachers page.
- **Teachers** — a searchable, filterable list of tutors with pagination ("Load more").
- **Favourites** — a private page, available only to logged-in users, listing the tutors they've saved.

## Technologies

- **React** (with **Vite** as the build tool)
- **React Router** — client-side routing between the three pages, plus a private route guard for Favourites
- **Redux Toolkit** / **React Redux** — global state for authentication, teacher data, and favourites
- **Axios** — HTTP requests to the Firebase Realtime Database REST API
- **Firebase**
  - **Authentication** — email/password sign-up, log-in, session persistence, and log-out
  - **Realtime Database** — stores teacher records, users' favourites, and trial lesson bookings
- **React Hook Form** + **Yup** (+ `@hookform/resolvers`) — form state and validation for registration, log-in, and booking forms
- **CSS Modules** — component-scoped styling

## Features

- Email/password authentication via Firebase, with the user's session restored automatically on page refresh.
- A searchable list of tutors with filters for language, proficiency level, and hourly price.
- Server-side pagination ("Load more") against the Firebase Realtime Database for the unfiltered tutor list; client-side filtering/pagination once a filter is active.
- Favouriting tutors (stored per-user in the Realtime Database), with a login-required prompt for unauthenticated users.
- A private Favourites page, accessible only to authenticated users.
- A trial lesson booking form, validated with React Hook Form and Yup, which writes a new entry to the Realtime Database.
- Modals (Registration, Log in, Book trial lesson, login-required) that close via the X icon, a backdrop click, or the Esc key.

## Technical requirements

This project was built to the following specification:

- Routing implemented with React Router.
- State management implemented with Redux.
- Authentication (sign-up, log-in, session fetching, log-out) implemented with Firebase.
- A `teachers` collection in Firebase Realtime Database with fields: `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`.
- Registration and log-in forms built with React Hook Form and Yup, with all fields required.
- Modals closeable via X icon, backdrop click, or Esc key.
- A styled teacher card matching the provided mockup.
- The Teachers page displays 4 cards at a time, with additional cards loaded via a "Load more" button that queries the database again.
- Clicking the favourite ("heart") icon:
  - as an unauthenticated user, shows a message that only authenticated users can use this feature;
  - as an authenticated user, adds/removes the card from favourites and updates the icon's appearance.
- The user's last favourited state persists across page refreshes.
- A "Read more" button expands the card to show the tutor's full bio and student reviews.
- A "Book trial lesson" button opens a modal with a validated booking form.
- A private "Favourites" page, styled identically to the Teachers page, listing only the user's favourited tutors.
- Filtering by language, proficiency level, and hourly price (starred task).

## Getting started

### Prerequisites

- Node.js
- A Firebase project with **Authentication** (Email/Password provider) and **Realtime Database** enabled

### Installation

```bash
git clone [your repo URL]
cd learnlingo
npm install
```

### Environment variables

Create a `.env` file in the project root with your Firebase project's configuration:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

These values are available in the Firebase console under Project settings → General → Your apps.

### Running locally

```bash
npm run dev OR npm start
```

The app will be available at `http://localhost:3000`.

### Seeding the database

Import `teachers.json` into your Realtime Database under a `teachers` node (Firebase console → Realtime Database → Data tab → three-dot menu → Import JSON).

## Project structure

src/
├── components/ reusable UI components
├── pages/ route-level page components
├── redux/ Redux store and slices
├── firebase/ Firebase initialization and auth functions
├── services/ Axios calls to the Firebase REST API
├── hooks/ custom hooks
└── utils/ validation schemas and helpers
