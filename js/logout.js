function logout() {
    console.log("Logout function called");
    const token = localStorage.getItem('token');
  
    if (token) {
      fetch("http://127.0.0.1:8000/api/users/logout/", {
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
  