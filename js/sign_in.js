

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();


    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    // console.log(formData);

    fetch("https://medicine-management-backend.vercel.app/api/users/login/", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {  
            alert("Login successful!");
            localStorage.setItem("token", data.token);
            localStorage.setItem ("user_id", data.user_id);
            localStorage.setItem("role", data.role);
            window.location.href = "index.html";  
        } else {
            alert("Login failed! Please check your credentials.");
        }
    })
    .catch(error => alert("An error occurred: " + error));
});



