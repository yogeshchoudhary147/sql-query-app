# SQL Query Runner App

A web application for running SQL-like queries on mock datasets, designed for Atlan's interview assignment.

## 🚀 Project Overview

The SQL Query Runner App allows users to execute predefined SQL-like queries on mock datasets and visualize the results in tables and charts. It provides an intuitive interface to understand query results with clear data visualization.

## 🛠️ Tech Stack

- **Framework:** React 19
- **Styling:** Tailwind CSS
- **Editor:** Monaco Editor
- **Charts:** Chart.js & react-chartjs-2
- **Date Utilities:** date-fns
- **Icons:** react-icons
- **Build Tool:** Webpack 5

## 📦 Major Plugins & Packages

- **@monaco-editor/react:** Code editor for SQL-like query input.
- **Chart.js & react-chartjs-2:** For visualizing query results.
- **Tailwind CSS:** Modern utility-first styling framework.
- **date-fns:** Date manipulation for query-based filtering.
- **react-icons:** Lightweight icons for UI components.

## ⚡️ Page Load Time

The application is deployed at [https://query-viewer.netlify.app/](https://query-viewer.netlify.app/).

- **First Contentful Paint (FCP):** ~1.2s
- **Largest Contentful Paint (LCP):** ~1.5s
- **Total Load Time:** ~1.8s

These metrics were measured using Chrome DevTools and Lighthouse.

## 🔧 Performance Optimizations

To ensure fast load times and smooth performance:

1. **Minification:** JavaScript and CSS are minified using Webpack's production mode.
2. **Code Splitting:** Implemented dynamic imports for components.
3. **Pagination:** Used pagination for large datasets instead of React Window.
4. **Efficient Rendering:** Memoized components and hooks to avoid unnecessary re-renders.
5. **Asset Compression:** Images and static assets are compressed for faster loading.

## 📝 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sql-query-app.git
