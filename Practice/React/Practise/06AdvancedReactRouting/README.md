# 🚀 React Nested Routing Application

> A modern, responsive multi-page web application built with **React, React Router DOM, and Tailwind CSS**.

This project demonstrates nested routing, reusable layouts, client-side navigation, and route redirection through a clean, modular application structure.

---

## 📌 Project Overview

The application consists of two primary sections, each with its own layout and nested pages.

### 🏠 Home Section

A shared layout containing a Header, navigation, main content area, and Footer.

| Page | Description |
|---|---|
| About Us | Introduces the application. |
| Contact | Displays contact information and a demonstration contact form. |
| Info | Presents general information through organized content cards. |

### 👤 Profile Section

A separate layout with profile navigation and a dedicated content area.

| Page | Description |
|---|---|
| Detail | Displays profile information such as name, email, role, and location. |
| Summary | Presents profile statistics and a short introduction. |

### 🔎 Not Found Page

A fallback page displayed when a user visits an undefined route, with an option to return to the Home section.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React** | Builds the interface using reusable components. |

| **React Router DOM** | Manages navigation, nested routes, redirects, and URL-based rendering. |

| **Vite** | Provides the development server and production build tooling. |

| **Tailwind CSS** | Styles components and creates responsive layouts using utility classes. |

| **Lucide React** | Provides scalable icons for the user interface. |

| **JavaScript (ES6+)** | Implements component logic, event handling, and application behavior. |

---

## 🧭 React Router Concepts

### 1. `BrowserRouter`

Enables browser-based routing by connecting the React application to the browser URL. It is typically placed around the application in `main.jsx`.

### 2. `Routes` and `Route`

- **`Routes`** groups route definitions and selects the matching route.
- **`Route`** maps a URL path to a React component.

For example, `/home/about` renders the About component inside the Home layout.

### 3. Nested Routing

Organizes related pages under a common parent route. About, Contact, and Info are nested under `/home`, while Detail and Summary are nested under `/profile`.

This allows related pages to share a layout without duplicating components.

### 4. `Outlet`

Acts as a placeholder inside a parent layout where the matched child route is rendered.

For example, the Home layout contains a Header, an `Outlet`, and a Footer. When the user visits `/home/contact`, the Contact component renders inside the `Outlet`, while the Header and Footer remain visible.

### 5. `Navigate`

A component used to redirect users from one route to another.

```jsx
<Navigate to="/home/about" />
```

This redirects the user to the About page. In this project, `Navigate` handles the default destination for the root URL and parent routes.

### 6. `replace`

The `replace` prop replaces the current browser history entry instead of adding a new one.

```jsx
<Navigate to="/home/about" replace />
```

When `/` redirects to `/home/about`, the current history entry is replaced, preventing the redirecting URL from becoming a separate Back-button step.

### 7. Index Route

Defines the default child route when a parent URL is visited without a child path.

```jsx
<Route path="/home" element={<HomeLayout />}>
  <Route
    index
    element={<Navigate to="about" replace />}
  />
</Route>
```

Visiting `/home` redirects the user to `/home/about`.

### 8. `NavLink`

Provides navigation and supports active-state styling, allowing the currently selected navigation item to be highlighted.

### 9. Not Found Route

A catch-all route uses `path="*"` to match undefined URLs and render the 404 Not Found page.

---

## 🗺️ Application Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/home/about` |
| `/home` | Redirects to `/home/about` |
| `/home/about` | About Us page |
| `/home/contact` | Contact page |
| `/home/info` | Information page |
| `/profile` | Redirects to `/profile/detail` |
| `/profile/detail` | Profile details |
| `/profile/summary` | Profile summary |
| Any undefined route | 404 Not Found page |

---

## ✨ Key Features

- 🔹 Nested routing for organized navigation.
- 🔹 Reusable layouts with shared headers, footers, and navigation.
- 🔹 Child component rendering through `Outlet`.
- 🔹 Active navigation styling using `NavLink`.
- 🔹 Automatic redirection using `Navigate`.
- 🔹 Default child routes using index routes.
- 🔹 A 404 fallback for undefined URLs.
- 🔹 Responsive styling with Tailwind CSS.

---

## 📝 Conclusion

This project demonstrates how React Router DOM can be used to build a structured, multi-page React application with nested routes and reusable layouts. Concepts such as `Outlet`, `Navigate`, `replace`, index routes, and `NavLink` simplify navigation, child component rendering, and route redirection.

By combining React's component-based architecture with Tailwind CSS, the application maintains a clean, consistent, and responsive user interface.

---

**Built with React · React Router DOM · Tailwind CSS · Vite**