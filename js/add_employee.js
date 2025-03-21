

document.getElementById('add-employee-form').addEventListener('submit', function(e) {
    e.preventDefault();  

 
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = "123456na"
    const role = document.getElementById('role').value;
    const phone= document.getElementById('phone').value;
    const address = document.getElementById('address').value;

  
    
  
    const data = {
        username: username,
        email: email,
        password: password,
        password2: password,
        role: role,
        phone: phone,
        address: address,
    };
    console.log(data);

 
    fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Employee Add successfully");

            window.location.href = "/employee.html";




        } else {

            alert( data.message);
        }
    })

});
