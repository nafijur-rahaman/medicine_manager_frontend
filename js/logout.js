
   const token = localStorage.getItem('token');
                

   if (token) {
    document.getElementById('logout-item').style.display = 'block';
    document.getElementById('login-item').style.display = 'none';
    document.getElementById('signup-item').style.display = 'none';
  } else {
    document.getElementById('logout-item').style.display = 'none';
    document.getElementById('login-item').style.display = 'block';
    document.getElementById('signup-item').style.display = 'block';
  }
 


function logout() {
 
    const token = localStorage.getItem('token');
  
    if (token) {
      fetch("https://medicine-management-backend.vercel.app/api/users/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        alert("You have been logged out successfully.");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user_id");
          window.location.href = "../sign-in.html";
        } else {
          alert("Error during logout. Please try again.");
        }
      })
    } else {
      alert("No user is logged in.");
    }
  }
  