document.getElementById('medicine-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById('medicine_name').value,
      brand_name: document.getElementById('brand_name').value,
      category: document.getElementById('medicine_category').value,
      pack_size: document.getElementById('pack_size').value,
      unit_price: document.getElementById('unit_price').value,
      total_pack: document.getElementById('total_pack').value
    };

    fetch('https://medicine-management-backend.vercel.app/api/management/medicines/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {

        alert('Medicine added successfully!');
        // window.location.href = '../add-medicine.html';


        document.getElementById('medicine-form').reset();
      })
  
  });