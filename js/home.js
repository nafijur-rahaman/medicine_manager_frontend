// medcine list

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://medicine-management-backend.vercel.app/api/management/medicines/")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("medicine-body");
      tableBody.innerHTML = "";

      data.forEach((medicine) => {
        const statusClass =
          medicine.total_pack > 0
            ? "bg-success-focus text-success-main"
            : "bg-danger-focus text-danger-main";
        const statusText =
          medicine.total_pack > 0 ? "Available" : "Out of Stock";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.pack_size}</td>
            <td>$${medicine.unit_price}</td>
            <td>${medicine.total_pack}</td>
            <td><span class="px-24 py-4 rounded-pill fw-medium text-sm ${statusClass}">${statusText}</span></td>
          `;

        tableBody.appendChild(row);
      });
    })
   
});

//medicine stocks

fetch("https://medicine-management-backend.vercel.app/api/management/stocks/")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("stock-table-body");
    if (data.length === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="4" class="text-center">No data available</td>`;
      tableBody.appendChild(noDataRow);
    } else {
      data.forEach((stock) => {
        const row = document.createElement("tr");
        const amount = stock.purchase_price * stock.total_pack;
        row.innerHTML = `
          <td>${stock.medicine_name}</td>
          <td>${stock.total_pack}</td>
          <td>${stock.purchase_price}</td>
          <td>$${amount}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  });

// dynamic order

fetch("https://medicine-management-backend.vercel.app/api/management/orders/")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("order-table-body");
    if (data.length === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="3" class="text-center">No orders available</td>`;
      tableBody.appendChild(noDataRow);
    } else {
      data.forEach((order) => {
        // console.log(order);
        const row = document.createElement("tr");

        statusClass = "bg-success-focus text-success-main";

        row.innerHTML = `
          <td>${order.order_no}</td>
          <td>$${order.order_amount}</td>
          <td> <span class="px-24 py-4 rounded-pill fw-medium text-sm ${statusClass}">Completed</span> </td>
        `;
        tableBody.appendChild(row);
      });
    }
  });

// dashboard

fetch("https://medicine-management-backend.vercel.app/api/management/medicines/")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("medicine-count").textContent = data.length;
  })
  .catch((error) => {
 
    document.getElementById("medicine-count").textContent = "Error";
  });

fetch("https://medicine-management-backend.vercel.app/api/management/stocks/")
  .then((response) => response.json())
  .then((data) => {
    let amount = 0;
    data.forEach((stock) => {
      amount += stock.total_pack;
    });
    document.getElementById("medicine-pack-count").textContent = amount;
  })



  fetch("https://medicine-management-backend.vercel.app/api/management/orders/")
    .then(response => response.json())
    .then(data => {
        let totalBilling = 0;
        if (Array.isArray(data)) {
            data.forEach(order => {
                totalBilling += parseInt(order.order_amount || 0); 
            });
        }
        document.getElementById("total-billings").textContent = totalBilling; 
    })


    fetch("https://medicine-management-backend.vercel.app/api/management/stocks/")
    .then(response => response.json())
    .then(data => {
        let totalPurchase = 0;
        if (Array.isArray(data)) {
            data.forEach(purchase => {
                totalPurchase += parseInt(purchase.total_pack*purchase.purchase_price || 0); 
            });
        }
        document.getElementById("total-purchase").textContent = `₹ ${totalPurchase.toFixed(2)}`; // Display total with currency
    })




    fetch("https://medicine-management-backend.vercel.app/api/management/orders/")
    .then(response => response.json())
    .then(data => {
        let totalSale = 0;
        if (Array.isArray(data)) {
            data.forEach(order => {
                totalSale += parseInt(order.total_pack*order.order_amount || 0); // Sum up all total_amount values
            });
        }
        document.getElementById("total-sale").textContent = `₹ ${totalSale.toFixed(2)}`; // Display total sale amount
    })



    fetch("https://medicine-management-backend.vercel.app/api/management/medicines/")
    .then(response => response.json())
    .then(data => {
        let totalProductValue = 0;
        if (Array.isArray(data)) {
            data.forEach(medicine => {
                let totalPack = parseInt(medicine.total_pack || 0); 
                let unitPrice = parseFloat(medicine.unit_price || 0); 
                totalProductValue += totalPack * unitPrice; 
            });
        }
        document.getElementById("current-product-value").textContent = `₹ ${totalProductValue.toFixed(2)}`; // Display value
    })


  

    fetch("https://medicine-management-backend.vercel.app/api/users/list")
    .then(response => response.json())
    .then(data => {
        let totalEmployees = 0;
        if (Array.isArray(data)) {
            totalEmployees = data.length; 
        }
        document.getElementById("total-employees").textContent = totalEmployees;
    })




    fetch("https://medicine-management-backend.vercel.app/api/management/customers/")
    .then(response => response.json())
    .then(data => {
        let totalCustomers = 0;
        if (Array.isArray(data)) {
            totalCustomers = data.length; 
        }
        document.getElementById("total-customers").textContent = totalCustomers; 
    })




  