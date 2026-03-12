# CorpFlow

A Kanban task management web application built with **Angular** (frontend) and **Java Spring** (backend).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)

---

## Overview

CorpFlow is a Kanban-style task manager that lets teams create, assign, and track tasks across different status stages. Tasks can be moved between stages using drag and drop, with changes reflected in real time.

---

## Tech Stack

| Layer    | Technology       |
|----------|------------------|
| Frontend | Angular          |
| Backend  | Java Spring      |
| Database | MySQL            |

---

## Project Structure

```
corpflow/
├── frontend/   # Angular application
└── backend/    # Java Spring application
```

---

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js & npm](https://nodejs.org/)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [MySQL](https://www.mysql.com/)

### Clone the Repository

```bash
git clone <repository-url>
cd corpflow
```

---

### Frontend Setup

Navigate to the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run start
```

The frontend will be available at **[http://localhost:4200](http://localhost:4200)**.

---

### Backend Setup

1. Make sure your **MySQL** server is running.

2. Open `backend/src/main/resources/db.properties` and configure it with your MySQL credentials:

3. Navigate to the `backend` folder. All dependencies are managed by Maven via `pom.xml`. Compile and run the application:

## Usage

With both the frontend and backend running:

1. **Sign Up** — Open [http://localhost:4200](http://localhost:4200) and create a new account on the signup page.

2. **Log In** — Use your credentials to log in and access the Kanban board.

3. **Create a Task** — Use the task creation form to add a new task by filling in:
   - **Title**
   - **Description**
   - **Deadline**
   - **Assigned User**

4. **Track Tasks** — Newly created tasks start with the status **TODO**. Move tasks between status columns (e.g. *TODO → EXECUTING → FINISHED*) using **drag and drop**. The status updates automatically when a task is dropped into a new column.

5. **Delete a Task** — Tasks can be deleted directly from the board.
