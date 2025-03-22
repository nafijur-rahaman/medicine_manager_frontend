document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addCategoryForm');
    
  
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const categoryName = document.getElementById('categoryName').value;

        if (categoryName.trim() === "") {
            alert("Category name cannot be empty");
            return;
        }

      
        fetch('https://medicine-management-backend.vercel.app/api/management/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_name: categoryName })
        })
        .then(response => response.json())
        .then(data => {
            alert('Category added successfully!');
            location.reload(); 
        })
      
    });
});
