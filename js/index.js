// dynamic nav elements

document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = document.getElementById("sidebar-menu");
  

    const userRole = localStorage.getItem("role");
  
  
    sidebarMenu.innerHTML = "";
  
 
    const menuItems = {
      admin: [
        { link: "index.html", icon: "solar:home-smile-angle-outline", text: "Dashboard" },
        { link: "employee.html", icon: "flowbite:users-group-outline", text: "Employees" },
        { link: "customer.html", icon: "fe:users", text: "Customers" },
        { title: "Product Management" },
        { link: "category.html", icon: "mdi:hospital-box", text: "Medicine Category" },
        { link: "medicine.html", icon: "mdi:pill", text: "Medicines" },
        { link: "medicine-stock.html", icon: "mdi:warehouse", text: "Medicine Stock" },
        { link: "low-stocks.html", icon: "mdi:warning", text: "Low Stocks" },
        { title: "Order Management" },
        { link: "order.html", icon: "mdi:cart", text: "Order" },
      ],
      medicine_manager: [
        { link: "index.html", icon: "solar:home-smile-angle-outline", text: "Dashboard" },
        { title: "Product Management" },
        { link: "category.html", icon: "mdi:hospital-box", text: "Medicine Category" },
        { link: "medicine.html", icon: "mdi:pill", text: "Medicines (Limited Access)" },
        { link: "medicine-stock.html", icon: "mdi:warehouse", text: "Medicine Stock" },
        { link: "low-stocks.html", icon: "mdi:warning", text: "Low Stocks" },
      ],
      order_manager: [
        { link: "index.html", icon: "solar:home-smile-angle-outline", text: "Dashboard" },
        { link: "medicine.html", icon: "mdi:pill", text: "View Medicines (Read-Only)" },
        { title: "Order Management" },
        { link: "order.html", icon: "mdi:cart", text: "Manage Orders" },
        { link: "customer.html", icon: "fe:users", text: "Manage Customers" },
      ],
    };
  
   
    function createMenu(items) {
      items.forEach((item) => {
        if (item.title) {
          sidebarMenu.innerHTML += `<li class="sidebar-menu-group-title">${item.title}</li>`;
        } else {
          sidebarMenu.innerHTML += `
            <li>
              <a href="${item.link}">
                <iconify-icon icon="${item.icon}" class="menu-icon"></iconify-icon>
                <span>${item.text}</span>
              </a>
            </li>
          `;
        }
      });
    }
  

    if (userRole in menuItems) {
      createMenu(menuItems[userRole]);
    } else {
      sidebarMenu.innerHTML = `<li><span>Access Denied</span></li>`;
    }
  });
  

  // sidebar dynamic


  document.addEventListener("DOMContentLoaded", function () {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
  
    if (token) {
      fetch(`https://medicine-management-backend.vercel.app/api/users/list/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {

        // console.log(data);
 
        document.getElementById("user-role").textContent = data.role;
        document.getElementById("user-name").textContent = data.username;

      })
      .catch((error) => {

        document.getElementById("user-name").textContent = "Error loading name";
        document.getElementById("user-role").textContent = "Error loading role";
      });
    } else {

      document.getElementById("user-name").textContent = "Guest";
      document.getElementById("user-role").textContent = "N/A";
    }
  });
  

  
  const id = localStorage.getItem('user_id');
  fetch(`https://medicine-management-backend.vercel.app/api/users/list/${id}`)
      .then(response => response.json())
      .then(data => {
      // Corrected this line to use 'data' instead of 'user'
          const userImage = document.getElementById('user-image');
          userImage.src = `https://res.cloudinary.com/dwsp8rft8/${data.image}`;
          
      })
  