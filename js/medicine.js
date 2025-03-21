
function fetchMedicines() {
    fetch('http://127.0.0.1:8000/api/management/medicines/')
        .then(response => response.json())
        .then(data => {
            const medicineList = document.getElementById('medicine-list');
            medicineList.innerHTML = ''; 

           
            const userRole = localStorage.getItem('role');
            
            data.forEach(medicine => {
                console.log(medicine);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${medicine.id}</td>
                    <td>${medicine.name}</td>
                    <td>${medicine.brand_name}</td>
                    <td>${medicine.category_name}</td>
                    <td>${medicine.unit_price}</td>
                    <td>${medicine.pack_size}g</td>
                    <td>${medicine.total_pack}</td>
                    <td>
                        <span class="bg-${medicine.total_pack > 0 ? 'success-focus' : 'danger-focus'} text-${medicine.total_pack > 0 ? 'success-main' : 'danger-main'} px-24 py-4 rounded-pill fw-medium text-sm">
                            ${medicine.total_pack > 0 ? 'Available' : 'Out of Stock'}
                        </span>
                    </td>
                    <td>
                   ${(userRole === 'admin' || userRole === 'medicine_manager') ? `
                            <a href="#" class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="editMedicine(${medicine.id})">Edit</a>
                            <a href="#" class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="deleteMedicine(${medicine.id})">Delete</a>
                        ` : ''}
                    </td>
                `;
                medicineList.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching medicines:', error);
        });
}


    function editMedicine(id) {
        fetch(`http://127.0.0.1:8000/api/management/medicines/${id}/`)
            .then(response => response.json())
            .then(medicine => {
                console.log(medicine);
                document.querySelector('#addMedicineModal #medicine_name').value = medicine.name;
                document.querySelector('#addMedicineModal #brand_name').value = medicine.brand_name;
                document.querySelector('#addMedicineModal #medicine_category').value = medicine.category_name;
                document.querySelector('#addMedicineModal #pack_size').value = medicine.pack_size;
                document.querySelector('#addMedicineModal #total_pack').value = medicine.pack_size;
                document.querySelector('#addMedicineModal #unit_price').value = medicine.unit_price;
    
                document.querySelector('#addMedicineModal .modal-title').textContent = 'Edit Medicine Information';
                document.querySelector('#addMedicineModal button[type="submit"]').textContent = 'Update Medicine';
    
                const form = document.getElementById("medicine-form");
    
                form.onsubmit = function (e) {
                    e.preventDefault();
    
            
                    const updatedMedicine = {
                        name: document.querySelector('#addMedicineModal #medicine_name').value,
                        brand_name: document.querySelector('#addMedicineModal #brand_name').value,
                        category: document.querySelector('#addMedicineModal #medicine_category').value,
                        pack_size: document.querySelector('#addMedicineModal #pack_size').value,
                        unit_price: document.querySelector('#addMedicineModal #unit_price').value,
                        total_pack: document.querySelector('#addMedicineModal #total_pack').value
                    };
    

                    updateMedicine(id, updatedMedicine);
                    $('#addMedicineModal').modal('hide'); 
                };
    
                // Show the modal
                $('#addMedicineModal').modal('show');
            })
            .catch(error => {
                console.error('Error fetching medicine:', error);
            });
    }


    function updateMedicine(id, updatedMedicine) {
        fetch(`http://127.0.0.1:8000/api/management/medicines/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMedicine)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update medicine');
            }
            return response.json();
        })
        .then(updated => {
            console.log('Medicine updated successfully:', updated);
            
        })
        .catch(error => {
            console.error('Error updating medicine:', error);
        });
    }
    
    

    function deleteMedicine(id) {
        if (confirm('Are you sure you want to delete this medicine?')) {
            fetch(`http://127.0.0.1:8000/api/management/medicines/${id}/`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    alert('Medicine deleted successfully!');
                    fetchMedicines(); // Refresh the list
                } else {
                    alert('Failed to delete medicine.');
                }
            })
            .catch(error => {
                console.error('Error deleting medicine:', error);
            });
        }
    }

 
    document.addEventListener('DOMContentLoaded', function() {
        fetchMedicines();
    });




