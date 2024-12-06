
# **TaskMaster Pro**

TaskMaster Pro is a feature-rich task management application that allows users to create, edit, delete, and search tasks seamlessly. The application includes a RESTful API backend to handle task operations and a dynamic client-side interface for task management.

---

## **Features**

- **REST API**:
  - Create new tasks
  - Read all tasks
  - Read a single task
  - Update tasks
  - Delete tasks
- **Dynamic User Interface**:
  - View tasks with categorized priorities
  - Add, edit, delete, and search tasks
  - Loading indicators for better user experience
  - Error handling and notifications
- **Storage**:
  - Tasks are stored in a server-side JSON file for persistence.

---

## **Technologies Used**

### **Frontend**
- HTML5
- CSS3
- JavaScript (with jQuery)

### **Backend**
- Node.js
- Express.js
- File system for JSON storage

---

## **Getting Started**

Follow these instructions to set up and run the project locally.

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- A modern web browser

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/kishankumar2607/Task-Master-Pro-2.git
   ```
2. Navigate to the project directory:
   ```bash
   cd taskmaster-pro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **Running the Application**
1. Start the server:
   ```bash
   node server.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **API Endpoints**

| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| GET    | `/api/tasks`      | Retrieve all tasks     |
| GET    | `/api/tasks/:id`  | Retrieve a single task |
| POST   | `/api/tasks`      | Create a new task      |
| PUT    | `/api/tasks/:id`  | Update an existing task|
| DELETE | `/api/tasks/:id`  | Delete a task          |

---

## **Project Structure**

```plaintext
.
├── public/
│   ├── index.html
│   ├── add-task.html
│   ├── search-task.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── addTask.js
│   │   ├── script.js
│   │   └── searchTask.js
├── tasks.json
├── server.js
├── package.json
└── README.md
```

---

## **How It Works**

1. **Task Management**:
   - Users interact with the UI to add, edit, delete, or search for tasks.
2. **REST API**:
   - The client-side JavaScript communicates with the server-side API using AJAX requests.
3. **Data Storage**:
   - Tasks are stored in a JSON file (`tasks.json`) on the server.

---

## **Future Enhancements**

- User authentication for personalized task lists.
- Drag-and-drop interface for task prioritization.
- Integration with a database (e.g., MongoDB or PostgreSQL) for scalability.
- Implementing unit and integration testing for the API and client-side code.

---

## **Contributing**

Contributions are welcome! Please fork the repository and submit a pull request for any feature or bug fix you'd like to propose.

---


## **Contact**

For questions or collaboration, reach out to:

- **Author(s)**: Kishan, Bibin, Gihan
- **Email**: [kishank2607@gmail.com](mailto:kishank2607@gmail.com)
