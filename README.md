# Inkwell – Modern Blogging Platform

A full-stack blogging platform built with React, Appwrite, Redux, and Tailwind CSS. Inkwell allows users to create, edit, manage, and explore blog posts through a clean and responsive interface.

## Features

### Authentication
- User registration and login
- Persistent authentication using Appwrite
- Protected routes for authenticated users

### Blog Management
- Create new blog posts
- Edit existing posts
- Delete posts
- Rich text editor support
- Featured image uploads

### Community Experience
- Browse posts from all users
- Separate sections for:
  - Your Posts
  - Community Posts
- Search posts by title
- Reading time estimation
- Post publication dates

### Modern UI
- Responsive design
- Dark mode support
- Dashboard-style layout
- Accessible and mobile-friendly components

---

## Tech Stack

### Frontend
- React
- React Router
- Redux Toolkit
- React Hook Form
- TinyMCE Editor
- Tailwind CSS

### Backend
- Appwrite
  - Authentication
  - Database
  - Storage

---

## Project Structure

```bash
src/
├── appwrite/
│   └── config.js
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── PostCard/
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── AllPosts.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   ├── Post.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── store/
├── utils/
└── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SharmaHridya/blog-website.git
cd blog-website
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Appwrite Configuration

Create:

### Database
- Posts Collection

### Collection Attributes

| Attribute | Type |
|------------|--------|
| title | String |
| content | String |
| featuredImage | String |
| status | String |
| userId | String |

### Storage
- Bucket for uploaded images

### Permissions
- Read: Any
- Update: Author Only
- Delete: Author Only

---

## Future Improvements

- User profiles
- Comments system
- Likes and bookmarks
- Categories and tags
- Follow authors
- Analytics dashboard
- AI-assisted content generation

---

## Author

**Hridya Sharma**

GitHub: https://github.com/SharmaHridya

---

## License

This project is licensed under the MIT License.