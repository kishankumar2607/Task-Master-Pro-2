

$(document).ready(function () {
    $("#search-input").on("input", function () {
        const query = $(this).val().toLowerCase();

        // Perform AJAX request to get tasks from the API and filter them based on the search query.
        $.ajax({
            url: "/api/tasks",
            method: "GET",
            success: function (tasks) {
                const filteredTasks = tasks.filter((task) =>
                    [task.name, task.assigned, task.due, task.priority, task.description]
                        .some((field) => field.toLowerCase().includes(query))
                );

                // Update the tasks list with the filtered tasks.
                displayTasks(filteredTasks);
            },
            error: function () {
                alert("Error searching tasks.");
            },
        });
    });
});


// Function to display tasks in the search results section.
function displayTasks(tasks) {
    const searchResults = $("#search-results");
    searchResults.empty();

    // Display a message if no tasks match the search query.
    if (tasks.length === 0) {
        searchResults.html("<p>No matching tasks found.</p>");
        return;
    }

    // Display each task in the search results section.
    tasks.forEach((task) => {
        const priorityClass = getPriorityClass(task.priority); // Ensure getPriorityClass is defined
        const taskHtml = `
            <div class="task-row ${priorityClass}">
                <div class="task-field">${task.name}</div>
                <div class="task-field">${task.assigned}</div>
                <div class="task-field">${task.due}</div>
                <div class="task-field">${task.priority}</div>
                <div class="task-field">${task.description}</div>
            </div>
        `;
        searchResults.append(taskHtml);
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
