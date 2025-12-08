# HRMS Admin Dashboard

A modern, feature-rich Human Resource Management System (HRMS) administration dashboard built with Vue 3, Vite, and Vuetify.

## Overview

The HRMS Admin Dashboard is a comprehensive web application designed to streamline HR operations and workforce management. It provides administrators and HR personnel with tools to manage employees, track attendance, handle requests, manage training and development, oversee payroll, and more.

## Features

### Core Modules

- **Admin Central** - Centralized hub for administrative tasks
  - Employee Management
  - Employment Records
  - Request Management
  - Team Calendar

- **HR Self-Service** - Employee self-service portal
  - Attendance Tracking
  - Personal Dashboard
  - Leave/Time-off Requests
  - Team Calendar

- **My Work** - Personal task and project management
  - Project Management
  - Task Tracking

- **Assets** - Company asset management
  - Asset Inventory
  - Asset Allocation

- **Training & Development** - Staff development programs
  - Training Overview
  - Training Catalog
  - Enroll in Programs

- **Payroll** - Salary and compensation management
  - Payroll Processing
  - Reports

- **Support** - Help and assistance
  - Support Tickets
  - FAQs

- **Stats & Reports** - Analytics and reporting
  - Performance Reports
  - Workforce Analytics

- **Profile & Account** - User account management
  - Personal Profile
  - Account Settings

## Tech Stack

- **Frontend Framework**: [Vue 3](https://vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [Vuetify 3](https://vuetifyjs.com/)
- **Router**: [Vue Router 4](https://router.vuejs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Image Cropping**: [CropperJS](https://fengyuanchen.github.io/cropperjs/)
- **Icons**: [Material Design Icons](https://materialdesignicons.com/)
- **Styling**: [Sass](https://sass-lang.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hrms-admin
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── assets/              # Static assets and global styles
│   ├── base.css
│   └── main.css
├── components/          # Reusable Vue components
│   ├── MainLayout.vue
│   ├── AdminCentral/
│   ├── Assets/
│   ├── HrSelfService/
│   ├── MyWork/
│   ├── TrainingAndDev't/
│   └── reusable/
├── pages/              # Page components (routes)
│   ├── Home.vue
│   ├── AdminCentral/
│   ├── Assets/
│   ├── Configurations/
│   ├── HrSelfService/
│   ├── Login/
│   ├── MyWork/
│   ├── NotFound/
│   ├── payroll/
│   ├── Profile/
│   ├── Stats/
│   ├── Support/
│   └── TrainingAndDev't/
├── router/             # Vue Router configuration
│   └── index.js
├── stores/             # Pinia state management
│   └── auth.js
├── plugins/            # Vue plugins
│   └── vuetify.js
├── utils/              # Utility functions
│   └── dateFormatter.js
├── axios.js            # Axios configuration
├── main.js             # Application entry point
└── App.vue             # Root component
```

## Key Components

### Routing
Routes are configured in `src/router/index.js` and provide navigation between different modules and pages.

### State Management
User authentication and application state is managed using Pinia stores located in `src/stores/auth.js`.

### HTTP Client
API requests are handled through Axios configured in `src/axios.js`.

### UI Framework
Vuetify provides Material Design components and is configured in `src/plugins/vuetify.js`.

## Available Scripts

- `npm run dev` - Start development server with host flag
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Configuration

### Vite Configuration
Configured in `vite.config.js` with:
- Vue 3 plugin support
- Path alias for `@` pointing to `src` directory
- Vue DevTools integration (currently disabled)

### Vuetify
Material Design UI framework configured with custom themes and components.

## Authentication

The application includes authentication functionality managed through the `auth.js` Pinia store. Login functionality is available in the Login module.

## Browser Support

Works with all modern browsers that support ES2020+.

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with descriptive messages
4. Push to the branch
5. Create a Pull Request

## Development Workflow

The project uses the `Development` branch as the main development branch. Keep the Development branch stable and create feature branches for new work.

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Dependencies Issues
Clear `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)

## License

[Add your license information here]

## Support

For issues and questions, please contact the development team or create an issue in the repository.
