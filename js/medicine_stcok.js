    // Function to fetch medicines and stock data from the API and populate the table
    function fetchMedicinesAndStocks() {
        fetch('https://medicine-management-backend.vercel.app/api/management/stocks/')
            .then(response => response.json())
            .then(data => {
                const stockList = document.getElementById('stock_list');
                stockList.innerHTML = ''; 

                data.forEach(stock => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${stock.id}</td>
                        <td>${stock.medicine_name}</td>
                        <td>$${stock.purchase_price}</td>
                        <td>${stock.total_pack}</td>
                        <td>
                            <a href="#" class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="editStock(${stock.id})">Edit</a>
                            <a href="#" class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="deleteStock(${stock.id})">Delete</a>
                        </td>
                    `;
                    stockList.appendChild(tr);
                });
            })
         
    }

    function editStock(id) {
  
        fetch(`https://medicine-management-backend.vercel.app/api/management/stocks/${id}/`)
            .then(response => response.json())
            .then(stock => {

                document.getElementById('medicine_name').value = stock.medicine_name;
                document.getElementById('total_pack').value = stock.total_pack;
                document.getElementById('purchase_price').value = stock.purchase_price;


                const form = document.getElementById('stockForm');
                form.onsubmit = function(event) {
                    event.preventDefault();
                    updateStock(id);
                };


                $('#addStockModal').modal('show');  
            })
        
    }

    function updateStock(id) {
        const form = document.getElementById('stockForm');
        const formData = new FormData(form);

        const stockData = {
            medicine: formData.get('medicine_name'),
            total_pack: formData.get('total_pack'),
            purchase_price: formData.get('purchase_price')
        };

        fetch(`https://medicine-management-backend.vercel.app/api/management/stocks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stockData)
        })
        .then(response => response.json())
        .then(data => {

            alert(data)
            $('#addStockModal').modal('hide'); 
            fetchMedicinesAndStocks();
        })
       
    }

    // Function to delete stock
    function deleteStock(id) {
        if (confirm('Are you sure you want to delete this stock?')) {
            fetch(`https://medicine-management-backend.vercel.app/api/management/stocks/${id}/`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    alert('Stock deleted successfully!');
                    fetchMedicinesAndStocks(); 
                } else {
                    alert('Failed to delete stock.');
                }
            })
         
        }
    }


    document.addEventListener('DOMContentLoaded', function() {
        fetchMedicinesAndStocks();
    });