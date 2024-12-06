
$(document).ready(function () {
    $("#submit").click((evt) => {
        evt.preventDefault();

        // Create new task object from user input
        const newTask = {
            name: $("#task-name").val().trim(),
            assigned: $("#task-assigned").val().trim(),
            due: $("#task-due").val().trim(),
            priority: $("#task-priority").val().trim(),
            description: $("#task-description").val().trim(),
        };

        // Validate user input
        if (!newTask.name) {
            alert("Task name is required.");
            return;
        }
        if (!newTask.assigned) {
            alert("Assigned to is required.");
            return;
        }
        if (!newTask.due) {
            alert("Due date is required.");
            return;
        }
        if (!newTask.priority) {
            alert("Priority is required.");
            return;
        }

        // Send POST request to API
        $.ajax({
            url: "/api/tasks",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newTask),
            success: function () {
                window.location.href = "index.html";
            },
            error: function () {
                alert("Error creating task.");
            },
        });
    });
});