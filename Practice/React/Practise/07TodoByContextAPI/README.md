# 📝 Todo Application – React Context API

A simple and interactive Todo Application built using **React.js, Context API, and Tailwind CSS**. This project demonstrates global state management, CRUD operations, local storage integration, and dynamic styling in React.

## 🚀 Features

- **Add Todo:** Create new tasks and add them to the todo list.
- **Edit Todo:** Update existing tasks whenever required.
- **Delete Todo:** Remove tasks from the list.
- **Mark as Complete:** Mark tasks as completed using a checkbox.
- **Toggle Completed Theme:** Dynamically change the appearance of todos based on their completion status.
- **Local Storage:** Persist todo data in the browser's local storage so tasks remain available after refreshing the page.
- **Global State Management:** Manage and share todo data across components using React Context API.
- **Responsive UI:** Clean and responsive user interface built with Tailwind CSS.

## 🛠️ Technologies Used

| Technology | Description |
|---|---|
| React.js | JavaScript library used to build the user interface. |
| Context API | Used for global state management and sharing data between components without prop drilling. |
| React Hooks | `useState` manages component state, while `useContext` accesses shared context data. |
| Local Storage | Stores todo data in the browser to maintain tasks across page refreshes. |
| Tailwind CSS | Utility-first CSS framework used for styling and dynamic theme changes. |
| Vite | Frontend build tool used for project setup and development. |

## ⚙️ React Concepts Used

### 1. Context API
Context API is used to create a global state that allows different components to access and update todo data without passing props through multiple component levels.

### 2. createContext()
Creates a context object that can be used to share data between components.

### 3. useContext()
Allows components to access the data and functions provided by the Todo Context.

### 4. useState()
Manages component states, such as todo input values, edit mode, and completion status.

### 5. Local Storage
Uses browser local storage to save and retrieve todo data, ensuring that tasks are preserved even after refreshing the application.

### 6. CRUD Operations

The application supports the following operations:

- **Create:** Add new todos.
- **Read:** Display all available todos.
- **Update:** Edit existing todos and toggle their completion status.
- **Delete:** Remove todos from the list.

## 🎯 Learning Outcome

This project helped me understand React Context API, global state management, custom hooks, component communication, CRUD operations, browser local storage, and conditional styling. It also demonstrates how to manage application data efficiently without prop drilling and preserve data across page refreshes.