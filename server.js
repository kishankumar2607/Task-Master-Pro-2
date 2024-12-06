const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app instance and set up port
const app = express();
const PORT = 3000;

// JSON file to store tasks
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve client-side files from 'public'

// Helper functions
const readTasks = () => JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8') || '[]');
const writeTasks = (tasks) => fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

// Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(readTasks());
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        writeTasks(tasks);
        res.json(tasks[index]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const filteredTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }
    writeTasks(filteredTasks);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
