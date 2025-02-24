# SQL Query Runner App

This is a SQL Query Runner application built for Atlan's interview. It allows users to run mock SQL queries, visualize results through interactive charts, and efficiently handle large datasets with pagination.

## 🚀 Project Overview

The SQL Query Runner App enables users to:
1. Write and run SQL-like queries on mock datasets.
2. View results in a tabular format with pagination for large datasets.
3. Visualize query results using dynamic charts.
4. Experience a responsive and user-friendly interface.

## ⚙️ Tech Stack

This project was built using the following technologies:

- **JavaScript Framework:** [React 19](https://react.dev)
- **Build Tool:** [Webpack 5](https://webpack.js.org)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Code Editor:** [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react)
- **Charting Library:** [Chart.js](https://www.chartjs.org) with [react-chartjs-2](https://react-chartjs-2.js.org)
- **Date Utilities:** [date-fns](https://date-fns.org)

## 📦 Major Dependencies

The following major packages were installed:

```json
"dependencies": {
  "@monaco-editor/react": "^4.7.0",
  "@tailwindcss/postcss": "^4.0.8",
  "chart.js": "^4.4.8",
  "date-fns": "^4.1.0",
  "react": "^19.0.0",
  "react-chartjs-2": "^5.3.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-tabs": "^6.1.0",
  "tailwindcss": "^4.0.8"
}
```

## ⏱️ Page Load Time

The page load time was measured using **Google PageSpeed Insights**:

- **First Contentful Paint (FCP):** 1.2 seconds
- **Largest Contentful Paint (LCP):** 1.8 seconds
- **Total Load Time:** 2.5 seconds

## ⚡ Performance Optimizations

Several optimizations were implemented to improve load time and performance:

1. **Efficient Pagination:** Instead of rendering the entire dataset, only paginated results are shown.
2. **Optimized Charts:** Reduced dataset size when rendering charts to avoid UI lag.
3. **Asset Minification:** Webpack was configured to minify JavaScript and CSS.

## 🛠️ Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/sql-query-app.git
cd sql-query-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run in Development Mode

```bash
npm start
```

The app will open automatically in your browser at `http://localhost:8080`.

### 4. Build for Production

```bash
npm run build
```

## 🙏 Acknowledgments

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react)
- [Chart.js](https://www.chartjs.org)
- [Webpack](https://webpack.js.org)

---

Feel free to fork the project and contribute! 🛠️
