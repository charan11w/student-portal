# Student Dashboard Application

## Overview
This React-based Student Dashboard app provides a user-friendly interface for students to manage and view their academic information, including courses, assignments, CGPA calculation, and profile settings.

---

## Features

### 1. Main Content Area
- Dynamically renders content based on the sidebar selection.
- Supports the following views:
  - **Dashboard / Home:** Displays widgets summarizing student data and progress.
  - **Courses:** Displays a table of course details including Course Name, Course ID, Credit Units, Student Grade, and Grade Points.
  - **CGPA:** Shows the current CGPA calculator based on the student's completed courses.
  - **Assignments:** Lists completed and ongoing assignments with filtering capabilities.

### 2. Breadcrumb Navigation
- Located in the Navbar.
- Displays the current navigation path based on sidebar selection.
- Examples:
  - Dashboard = Home
  - Courses = Home / Courses
  - Assignments = Home / Assignments

### 3. User Dropdown Menu
- Accessed via the user icon at the top right corner of the Navbar.
- Options include:
  - **Change Password**
  - **Edit Personal Data**
  - **Logout**

### 4. Dashboard / Home View
- Provides an overview with widgets summarizing key academic metrics and recent activity.

### 5. Courses View
- Tabular display of course data with columns:
  - Course Name
  - Course ID
  - Credit Units
  - Student Grade
  - Grade Points

### 6. CGPA View
- Calculates and displays the current CGPA based on completed courses data.

### 7. Assignments View
- Lists assignments categorized as Completed or Ongoing.
- Includes filter functionality by Course ID and Assignment ID.
- Allows clearing filters to view all assignments.

---

## Technology Stack
- React.js (with hooks)
- Tailwind CSS for styling
- React Icons for user icon
- Context API (or your chosen state management) for user authentication and profile management

## Installation & Running Instructions

### Prerequisites
- Ensure you have **Node.js** installed (version 14 or higher recommended).
- You should have a package manager like **npm** (comes with Node.js) or **yarn** installed.

---

### Steps to Install and Run

1. **Clone the repository**

   Open your terminal and run:
   ```bash
   git clone https://github.com/charan11w/student-portal.git
   cd student-dashboard/myportal
2. **Install Dependencies**
   ```bash
    npm install
3. **Start the development server**
    ```bash
    npm start
2. **Open the application**
   ```bash
   http://localhost:3000
    

---
