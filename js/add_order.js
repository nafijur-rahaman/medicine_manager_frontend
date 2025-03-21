document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    document.getElementById('orderForm').addEventListener('submit', function(e) {
      e.preventDefault();
      createCustomerAndPlaceOrder();
    });
  });
  
  async function createCustomerAndPlaceOrder() {
    const medicine_name = document.getElementById('medicineName').value;
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const totalPack = document.getElementById('totalPack').value;
    const orderBy = document.getElementById('orderBySelect').value;

  
    const customerData = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
    };
  

    const customerResponse = await fetch('http://127.0.0.1:8000/api/management/customers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
  
    if (!customerResponse.ok) {
      console.log('Error creating customer!');
      return;
    }
  
    const customer = await customerResponse.json();

   let amount =0;
  fetch(`http://127.0.0.1:8000/api/management/medicines/?name=${medicine_name}`)
  .then(response => response.json())
    .then(data => {
        console.log(data);
        amount= parseInt(data.unit_price)*totalPack;
        
    })
        

        
  


    const orderData = {
      customer: customerName,
      medicine: medicine_name,
      total_pack: totalPack,
      ordered_by: orderBy,
      order_amount: amount,
    };
  
    console.log(orderData);

    const orderResponse = await fetch('http://127.0.0.1:8000/api/management/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
  
    if (orderResponse.ok) {
      alert('Order placed successfully!');

    //   document.getElementById('orderForm').reset();
    } else {
      alert('Error placing order!');
    }
  }