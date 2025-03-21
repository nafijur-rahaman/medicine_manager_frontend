document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("user-table-body");
    let currentEditingUserId = null; // Store the user being edited

    // Fetch user data
    function fetchUsers() {
        fetch("http://127.0.0.1:8000/api/users/list/")
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = "";
                
                if (data.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No users found</td></tr>`;
                } else {
                    data.forEach((user, index) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${user.id || "N/A"}</td>
                            <td>${user.username || "N/A"}</td>
                            <td>${user.role || "N/A"}</td>
                            <td>${user.phone || "N/A"}</td>
                            <td>${user.email || "N/A"}</td>
                            <td>
                                <a href="#" class="edit-btn bg-warning-focus text-warning-main px-3 py-1 rounded-pill fw-medium text-sm" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#employeeModal">Edit</a>
                                <a href="#" class="delete-btn bg-danger-focus text-danger-main px-3 py-1 rounded-pill fw-medium text-sm" data-id="${user.id}">Delete</a>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });

                    // Attach event listeners after the rows are rendered
                    attachEventListeners();
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Failed to load data</td></tr>`;
            });
    }

    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                editUser(userId);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                deleteUser(userId);
            });
        });
    }

   
    function editUser(userId) {
        fetch(`http://127.0.0.1:8000/api/users/list/${userId}/`)
            .then(response => response.json())
            .then(user => {
                console.log(user);
                currentEditingUserId = userId;
                document.getElementById("username").value = user.username || "";
                document.getElementById("email").value = user.email || "";
                document.getElementById("phone").value = user.phone || "";
                document.getElementById("address").value = user.address || "";
                document.getElementById("role").value = user.role || "admin";
            })
            .catch(error => console.error("Error fetching user details:", error));
    }


    document.getElementById("add-employee-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedUser = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            role: document.getElementById("role").value
        };

        fetch(`http://127.0.0.1:8000/api/users/list/${currentEditingUserId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(() => {
            alert("User updated successfully");
            fetchUsers(); 
            document.querySelector(".btn-close").click(); 
        })
        .catch(error => console.error("Error updating user:", error));
    });

    // Function to handle Delete
    function deleteUser(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(`http://127.0.0.1:8000/api/users/${userId}/delete/`, {
                method: "DELETE"
            })
            .then(() => {
                fetchUsers(); // Refresh list
            })
            .catch(error => console.error("Error deleting user:", error));
        }
    }

    // Initial Fetch
    fetchUsers();
});
