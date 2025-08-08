import { lazy} from 'react'

// routesConfig.js
export const Header = lazy(() => import('./component/Header.jsx'));
export const Sidebar = lazy(() => import('./component/Sidebar.jsx'));
export const Breadcrumb = lazy(() => import('./component/Breadcrum.jsx'));
export const Assignments = lazy(() => import('./pages/Assignments.jsx'));
export const CGPA = lazy(() => import('./pages/CGPA.jsx'));
export const Courses = lazy(() => import('./pages/Courses.jsx'));
export const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));


