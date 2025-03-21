document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "http://127.0.0.1:8000/api/management/customers/";
    const tableBody = document.getElementById("customer-list");

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = ""; 

            data.forEach((customer, index) => {
                const row = document.createElement("tr");
                console.log(customer);
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.email}</td>
                    <td>${customer.address}</td>
                    <td>
                        <a href="#" class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm edit-btn" data-id="${customer.id}">Edit</a>
                        <a href="#" class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm delete-btn" data-id="${customer.id}">Delete</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });


            document.querySelectorAll(".edit-btn").forEach(btn => {
                btn.addEventListener("click", function (event) {
                    event.preventDefault();
                    const customerId = this.getAttribute("data-id");

  
                    fetch(`${apiURL}${customerId}/`)
                        .then(response => response.json())
                        .then(customer => {

                            document.getElementById("username").value = customer.name;
                            document.getElementById("email").value = customer.email;
                            document.getElementById("phone").value = customer.phone;
                            document.getElementById("address").value = customer.address;

            
                            const customerModal = new bootstrap.Modal(document.getElementById('customerModal'));
                            customerModal.show();
                        })
                        .catch(error => console.error("Error fetching customer data:", error));
                });
            });

            document.querySelectorAll(".delete-btn").forEach(btn => {
                btn.addEventListener("click", function (event) {
                    event.preventDefault();
                    const customerId = this.getAttribute("data-id");
                    if (confirm("Are you sure you want to delete this customer?")) {
                        deleteCustomer(customerId);
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});

function deleteCustomer(customerId) {
    fetch(`http://127.0.0.1:8000/api/management/customers/${customerId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => {
            if (response.ok) {
                alert("Customer deleted successfully!");
                location.reload();
            } else {
                alert("Failed to delete customer.");
            }
        })
        .catch(error => console.error("Error deleting customer:", error));
}


document.getElementById("customerform").addEventListener("submit", function (event) {
    event.preventDefault();

    const customerId = document.querySelector(".edit-btn").getAttribute("data-id");

    const updatedCustomer = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
    };

    fetch(`http://127.0.0.1:8000/api/management/customers/${customerId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
    })
        .then(response => {
            if (response.ok) {
                alert("Customer details updated successfully!");
                location.reload();
            } else {
                alert("Failed to update customer details.");
            }
        })
        .catch(error => console.error("Error updating customer:", error));
});
