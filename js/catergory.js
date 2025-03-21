
    document.addEventListener('DOMContentLoaded', function () {
        const tableBody = document.getElementById("categoryTable")
        tableBody.innerHTML = '';

        fetch('http://127.0.0.1:8000/api/management/categories/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach((category, index) => {
          
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${category.category_name}</td>
                        <td>
                            <a href="#" class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="openEditModal(${category.id}, '${category.category_name}')">Edit</a>
                            <a href="#" class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="deleteCategory(${category.id})">Delete</a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    });


    function openEditModal(categoryId, categoryName) {

        const modal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
        const inputField = document.querySelector('#addCategoryModal input[name="categoryName"]');
        inputField.value = categoryName;

        const form = document.querySelector('#addCategoryModal form');
        form.onsubmit = function (e) {
            e.preventDefault();
            updateCategory(categoryId, inputField.value);
            modal.hide();
        };

        modal.show();
    }


    function updateCategory(categoryId, categoryName) {
        fetch(`http://127.0.0.1:8000/api/management/categories/${categoryId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_name: categoryName }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Category updated successfully!');
                location.reload(); // Reload the page to fetch the updated list
            })
            .catch(error => console.error('Error updating category:', error));
    }


    function deleteCategory(categoryId) {
        if (confirm('Are you sure you want to delete this category?')) {
            fetch(`http://127.0.0.1:8000/api/management/categories/${categoryId}/`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('Category deleted successfully!');
                        location.reload();
                    }
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    }

