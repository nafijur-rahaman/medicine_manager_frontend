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

    fetch('http://127.0.0.1:8000/api/management/medicines/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {

        alert('Medicine added successfully!');
        console.log(data);

        // document.getElementById('medicine-form').reset();
      })
      .catch(error => {

        alert('Error adding medicine!');
        console.error(error);
      });
  });