

// Function to get priority class from priority value
function loadTasks() {
    // Get priority class
    const taskListSection = $("#task-list");
    const noTasksMessage = $("#no-tasks-message");

    // Show loading text
    taskListSection.html("<p>Loading tasks...</p>");
    noTasksMessage.hide();

    // Make AJAX request to get tasks from the API
    $.ajax({
        url: "/api/tasks",
        method: "GET",
        success: function (tasks) {
            taskListSection.empty(); // Clear loading text or previous tasks

            if (tasks.length === 0) {
                noTasksMessage.show(); // Show "No tasks" message if none exist
                return;
            }

            // Loop through each task and add it to the task list
            tasks.forEach((task) => {
                const priorityClass = getPriorityClass(task.priority);
                const taskRow = `
                    <div class="task-row ${priorityClass}">
                        <div class="task-field">${task.name}</div>
                        <div class="task-field">${task.assigned}</div>
                        <div class="task-field">${task.due}</div>
                        <div class="task-field">${task.priority}</div>
                        <div class="task-field">${task.description}</div>
                        <button onclick="editTask(${task.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
                    </div>
                `;
                taskListSection.append(taskRow);
            });
        },
        error: function () {
            taskListSection.html("<p>Error loading tasks. Please try again later.</p>");
        },
    });
}

// Function to get a priority class based on the priority value
function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case "high":
            return "priority-high";
        case "medium":
            return "priority-medium";
        case "low":
            return "priority-low";
        default:
            return "";
    }
}

// Function to delete a task
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        $.ajax({
            url: `/api/tasks/${id}`,
            method: "DELETE",
            success: loadTasks,
            error: function () {
                alert("Error deleting task.");
            },
        });
    }
}

// Function to edit a task
function editTask(id) {
    $.ajax({
        url: `/api/tasks/${id}`,
        method: "GET",
        success: function (task) {
            $("#edit-task-name").val(task.name);
            $("#edit-task-assigned").val(task.assigned);
            $("#edit-task-due").val(task.due);
            $("#edit-task-priority").val(task.priority);
            $("#edit-task-description").val(task.description);
            $("#edit-task-modal").show();

            $("#edit-task-form").off("submit").on("submit", function (e) {
                e.preventDefault();

                // Update the task in the database and close the modal
                const updatedTask = {
                    name: $("#edit-task-name").val(),
                    assigned: $("#edit-task-assigned").val(),
                    due: $("#edit-task-due").val(),
                    priority: $("#edit-task-priority").val(),
                    description: $("#edit-task-description").val(),
                };

                // Make AJAX request to update the task in the database
                $.ajax({
                    url: `/api/tasks/${id}`,
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(updatedTask),
                    success: function () {
                        $("#edit-task-modal").hide();
                        loadTasks();
                    },
                    error: function () {
                        alert("Error updating task.");
                    },
                });
            });
        },
        error: function () {
            alert("Error fetching task.");
        },
    });
}

// Load tasks on page load
$(document).ready(loadTasks);
