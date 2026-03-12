# 🦸‍♂️ Heroes Manager - Frontend

Modern administrative interface for managing superheroes. This project was developed using **React**, **TypeScript**, and **Clean Architecture** concepts.

---

## 📸 Interface Preview

The system includes:

- **Dashboard Grid**: Responsive card visualization.

- **Complete CRUD**: Creation, listing, editing, and deletion of heroes.

- **Custom Modals**: Replacement of native functions with elegant dialogs.

- **Automatic Alerts**: Notification system that closes automatically after 15 seconds.

---

## 🛠️ Technologies and Tools

- **React 18** (Hooks & Functional Components)
- **TypeScript** (Strict Typing)
- **Axios** (REST API Integration)
- **Vite** (Build tool)

---

## 📂 Folder Structure

```text
src/
├── components/ # Reusable UI
│ ├── Button/
│ ├── Card/
│ ├── Input/
│ ├── TopBar/
│ └── Modal/ # Alert, Confirm, Create and View Modals
├── layouts/ # MainLayout
├── pages/ # HeroesPage
├── service/ # heroes.ts (Axios)
├── test/ # configuration of tests
└── types/ # Interfaces (hero.ts)

```

## 🚀 How to Start

1. **Install dependencies**:

```bash
npm install

```

# ⚙️ Heroes Manager - Backend


In the `.env` file in the project root, add the following variable:

```env.VITE_API_URL=[https://www.wizepdv.com.br/api/](https://www.wizepdv.com.br/api/)
```

## 🚀 How to run the project

```bash

# Install dependencies
npm install

# Start the development server

npm run dev


## 📡 Consumed Endpoints

* **GET** `/heroes`: Lists all heroes.

* **POST** `/heroes`: Creates a new hero.

* **PUT** `/heroes/:id`: Full edit of hero data.

* **PATCH** `/heroes/:id/toggle`: Enables or disables hero status.

* **DELETE** `/heroes/:id`: Permanent removal of the record.

# 🛡️ Heroes Manager - Backend

REST server developed in **Node.js** to manage data persistence and business logic of the hero ecosystem.

---

## 🛠️ Technologies and Tools

- **Node.js**: Execution environment.

- **Express**: Framework for routing and managing requests.

- **TypeScript**: Superset for code typing and robustness.

- **Axios**: Used for potential external integrations.

- **CORS**: Enabled to allow consumption by the frontend.

---

## 📂 Folder Structure

```text
src/
├── controllers/ # Request control logic
├── lib/ # Prisma configuration
├── routes/ # Express route definitions
├── service/ # Business logic and database layer
└── server.ts # Main file and initialization

```

## 📡 Endpoints (Routes)

* **GET** `/heroes`: Returns the list of heroes. Accepts filtering via query string (?name=).

* **POST** `/heroes`: Receives a JSON to register a new hero.

* **PUT** `/heroes/:id`: Updates the information for a specific hero.

* **PATCH** `/heroes/:id/toggle`: Toggles the hero's status (Active/Inactive).

* **DELETE** `/heroes/:id`: Permanently removes the hero from the database.

## 🚀 How to Run the Server

1. **Install dependencies**:

``bash
npm install

``

2. **Configure environment variables**:

Create a `.env` file in the project root with the desired port:

``env
PORT=3333
DATABASE_URL=localhost...

```

3. **Run in development mode:**:

``bash
npm run dev

```

## 🗄️ Database (Prisma ORM)

This project uses **Prisma** to manage data persistence. To configure the database, use the commands below:

```bash
# 1. Install Prisma dependencies
npm install

# 2. Generate the Prisma Client (Automatic typing)
npx prisma generate

# 3. Run migrations (Creates tables in the database)
npx prisma migrate dev

# 4. Open Prisma Studio (Visual interface to view data)
npx prisma studio

```

## 📝 Business Rules

* **Unique IDs**: Each hero has a unique identifier (UUID/Auto-increment) managed by the database to ensure accuracy in edits and deletions.

* **CORS**: The server is configured to accept requests from the frontend, allowing secure communication between different domains.

* **JSON**: All API responses follow the JSON standard to ensure universal compatibility.

## 🗄️ Data Persistence (ORM)

This project uses **Prisma ORM** to interact with the database.

- **Type Safety**: Guarantees type accuracy in all queries.

- **Migrations**: Versioned database change history.

- **Prisma Studio**: Visual interface for managing data.



## 🚀 Next Steps (Roadmap)

* **Authentication**: Implementation of secure login using JWT (JSON Web Tokens) and password encryption with bcrypt.

* **Access Control (Roles)**: Differentiation between regular users and administrators for read, write, and delete permissions.

* **CI/CD**: Automation configuration via GitHub Actions for test execution and automated deployment.

* **Deployment**: Making the API available in a production environment (Railway/Render/Vercel).