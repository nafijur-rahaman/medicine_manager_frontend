async function fetchOrders() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/management/orders/');
      const orders = await response.json();

      const orderTableBody = document.getElementById('orderTableBody');
      orderTableBody.innerHTML = ''; 

      orders.forEach(order => {

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.order_no}</td>
          <td>${order.customer_name}</td>
          <td>${order.customer_email}</td>
          <td>${order.medicine_name}</td>
          <td>$${order.order_amount}</td>
          <td>${order.order_date}</td>
          <td>
            <a href="#" class="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="editOrder(${order.id})">Edit</a>
            <a href="#" class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm" onclick="deleteOrder(${order.id})">Delete</a>
          </td>
        `;
        orderTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  


  async function editOrder(orderId) {

        console.log(orderId);
        const response = await fetch(`http://127.0.0.1:8000/api/management/orders/${orderId}/`);
        const order = await response.json();

        console.log(order);
        document.getElementById('medicineName').value = order.medicine_name;
        document.getElementById('customerName').value = order.customer_name;
        document.getElementById('totalAmount').value = order.order_amount;
        document.getElementById('totalPack').value = order.total_pack;
        document.getElementById('orderBySelect').value = order.ordered_by_username;

        // Store the current order ID
        currentOrderId = orderId;

        $('#orderModal').modal('show');

}



  async function updateOrder(orderId) {
    if (!orderId) return alert("Order ID is required.");
  
    const orderData = {
      customer: document.getElementById('customerName').value,
      medicine: document.getElementById('medicineName').value,
      total_pack: document.getElementById('totalPack').value,
      ordered_by: document.getElementById('orderBySelect').value,
    order_amount: document.getElementById('totalAmount').value,
    };
  
    const response = await fetch(`http://127.0.0.1:8000/api/management/orders/${orderId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  
    if (response.ok) {
      alert('Order updated successfully!');
      $('#orderModal').modal('hide');
      fetchOrders();
    } else {
      alert('Error updating order');
    }
  }
  
  

  // Delete order
  async function deleteOrder(orderId) {
    const confirmation = confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/management/orders/${orderId}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Order deleted successfully');
          fetchOrders(); // Refresh the orders list
        } else {
          alert('Error deleting order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  }


  document.onload = fetchOrders();