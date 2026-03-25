# API Data Viewer

> A React dashboard for viewing and exploring data from external APIs. Built with Vite, React Bootstrap, and tested with Jest.

## What it does

This frontend consumes the [API Data Processor](https://github.com/cpineda1985/api-data-processor) backend and provides a clean interface to explore validated CSV data.

**Users can:**
- Browse data from multiple files in a sortable table
- Filter by file name
- Toggle inclusion of partially valid rows (`includeEmpty`)
- Navigate through large datasets with pagination
- See loading states and clear error messages

## Key features

- **Real-time filtering** – Filter by file name as you type
- **Pagination** – Navigate through large datasets with next/previous controls
- **Empty rows toggle** – Option to include or exclude partially valid CSV rows
- **Responsive UI** – Built with React Bootstrap, works on desktop and tablet
- **Error handling** – Clear messages for 404s, network errors, and API failures
- **Loading indicators** – Visual feedback during data fetching

## Quick start

### Prerequisites

- Node.js (v16+)
- The [API Data Processor](https://github.com/cpineda1985/api-data-processor) backend running on `http://localhost:3000`

### Installation

```bash
git clone https://github.com/cpineda1985/api-data-viewer
cd api-data-viewer
npm install
npm run dev
```
## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run test      # Run tests
npm run test:all  # Run tests with coverage report
npm run lint      # Run ESLint
```

---

## Tests con y sin mock

The project includes comprehensive tests with Jest and React Testing Library:
Component rendering
File name filtering
Toggle for empty rows
404 error handling
Input clearing behavior
Loading state indicators

Tests can run against mocked data (default) or against a live backend by changing useMock in the test file.

```js
const useMock = false;
```
---
## Project structure

```
src/
├── components/
│   ├── FileDataTable.jsx
│   └── FileDataTable.test.jsx
├── __mocks__/
│   └── mockData.json
├── App.jsx
├── main.jsx
```

---
## Production features

Containerized – Docker and docker-compose ready
Code quality – ESLint configuration included
Test coverage – Unit tests with coverage reporting
Mock data support – Test without backend dependency

---

## 👤 Autor

Cesar Daniel Pineda  
📧 cesardanielpineda@gmail.com  
