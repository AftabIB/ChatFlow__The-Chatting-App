# React + Vite App Installation Guide

This guide will help you set up a React application using Vite, install all necessary modules, and run the development server.

---

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

You can verify these installations by running the following commands in your terminal:

```bash
node -v
npm -v
# Or, if you prefer yarn:
yarn -v
git --version
```

---

## Steps to Set Up a React + Vite App

### 1. Clone the Repository (If applicable)
If the project already exists on GitHub, clone it using:

```bash
git clone <repository-url>
cd <repository-name>
```

If you're creating a new project, skip this step and move to step 2.

---

### 2. Create a New React + Vite App

Run the following command to create a new React project using Vite:

```bash
npm create vite@latest <project-name>
# Or, if you prefer yarn:
yarn create vite <project-name>
```

During the setup process, select the following options:
- **Framework:** React
- **Variant:** JavaScript or TypeScript (as per your preference)

Navigate into the project directory:

```bash
cd <project-name>
```

---

### 3. Install Dependencies

Run the following command to install all required modules:

```bash
npm install
# Or, if you prefer yarn:
yarn install
```

---

### 4. Run the Development Server

Start the development server with:

```bash
npm run dev
# Or, if you prefer yarn:
yarn dev
```

This will start the application on a local development server. By default, it will be accessible at:

```
http://localhost:5173
```

---

### 5. Build for Production (Optional)

To create a production-ready build of your application, run:

```bash
npm run build
# Or, if you prefer yarn:
yarn build
```

The output will be located in the `dist` directory.

---

### 6. Preview the Production Build (Optional)

To preview the production build locally, use:

```bash
npm run preview
# Or, if you prefer yarn:
yarn preview
```

This will start a local server to serve the production build.

---

### 7. Push Changes to GitHub (Optional)

If you created a new project and want to push it to GitHub, initialize a Git repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

---

## Common Commands Cheat Sheet

| Command               | Description                          |
|-----------------------|--------------------------------------|
| `npm install`         | Install all project dependencies    |
| `npm run dev`         | Start the development server        |
| `npm run build`       | Build the app for production        |
| `npm run preview`     | Preview the production build        |
| `git add .`           | Stage changes for commit            |
| `git commit -m "msg"`| Commit changes with a message       |
| `git push`            | Push changes to the remote repo     |

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [GitHub Docs](https://docs.github.com/)

If you encounter any issues, feel free to consult the documentation or reach out to your team for support.

