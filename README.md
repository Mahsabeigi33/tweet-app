# TweetApp – Full Stack Developer Assessment

A full-stack Twitter-style application built in 4 days as part of a developer assessment. Users can securely register, log in (with email ), and manage their personal tweets with a clean, responsive UI.

##  Live Demo

- **Frontend**: https://tweet-app-indol.vercel.app/
- **Backend**: https://tweet-app-6c85.onrender.com


### Frontend
- **React** with **TypeScript**
- **Vite** – fast dev/build
- **Tailwind CSS** – utility-first styling
- **Shadcn UI** – accessible, customizable components
- **TanStack Query (React Query)** – for data fetching and caching
- **Axios** – for HTTP requests
- **React Router** – client-side routing
- **@react-oauth/google** – Google sign-in integration

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** – cloud database
- **Mongoose** – schema modeling
- **JWT** – secure user authentication
- **bcryptjs** – password hashing


###  Authentication
- Email/password signup and login
- JWT-based session management
- Google Login Authentication

### Tweets
- Create a tweet 
- Edit or delete your own tweets
- View  your own tweets  ( user-specific filtering) and all tweets
- Sort tweets by `updatedAt` (most recent first)
- Character counter and form validation

### UI/UX
- Responsive layout
- Minimalist design using Shadcn + Tailwind
- Reusable `TweetForm` and `TweetList` components
- Loading and error states handled with React Query

