# 🎓 EduTrack - Student Management System

EduTrack is a modern, high-performance Student Management System built with **Angular 16**, featuring a bold **Neo-Brutalist** design aesthetic. It provides a seamless experience for managing student registrations, analytics, and data visualization.

![EduTrack Logo](https://fonts.gstatic.com/s/i/materialicons/school/v12/24px.svg)

---

## ✨ Key Features

- **🚀 Performance Dashboard**: Real-time analytics showing student distribution by course using **Highcharts**.
- **📋 Master Student List**: Powered by **AG Grid**, featuring advanced filtering, sorting, and pagination with zero-scroll layout.
- **📝 Student Registration**: Robust form validation and a streamlined registration process.
- **🔍 Quick View & Management**: Custom-built modals for viewing student details and secure deletion confirmations.
- **💾 Hybrid Persistence**: Smart data management combining static JSON fallbacks with **LocalStorage** for persistent student records and deletion tracking.
- **🎨 Neo-Brutalist Design**: A unique black & lime design system with bold shadows, thick borders, and snappy micro-animations.

---

## 🛠 Tech Stack

- **Core**: [Angular 16](https://angular.io/)
- **Grid**: [AG Grid Alpine](https://www.ag-grid.com/angular-data-grid/getting-started/)
- **Charts**: [Highcharts](https://www.highcharts.com/)
- **Styling**: Vanilla SCSS with a custom `@use` based global variable system.
- **Icons**: [Boxicons](https://boxicons.com/)
- **Fonts**: [Poppins (Google Fonts)](https://fonts.google.com/specimen/Poppins)
- **Feedback**: [@ngneat/hot-toast](https://github.com/ngneat/hot-toast)

---

## 🏗 Architecture Highlights

### 🎨 Centralized Design System
The project uses a structured `src/styles/_variables.scss` file to maintain a consistent Neo-Brutalist identity across all components.
- **Atomic tokens** for colors, shadows, and transitions.
- **Modern Sass `@use` syntax** for better scoping and maintainability.

### 🧠 Memory Management
All components utilize a standard `Subject` based unsubscription pattern (`takeUntil(destroy$)`) to prevent memory leaks in observable streams.

### 🛠 Persistent Data Logic
Deletion and additions are managed via a custom `StudentService` that handles:
- Filtering out deleted records (tracked by email in LocalStorage).
- Merging static assets with user-generated local data.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (Latest stable)
- Angular CLI 16+

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd edutrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`.

---

## 🚀 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

## ✅ Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## ⚖️ License

Developed as part of the EduTrack Assessment Project.
