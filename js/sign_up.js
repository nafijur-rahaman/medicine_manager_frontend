

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();  

 
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    
  
    const data = {
        username: username,
        email: email,
        password: password,
        password2: password,
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
            alert("User registered successfully");
            
            setTimeout(function(){
                window.location.href = 'sign-in.html';
            }, 1000);

        } else {

            alert( data.message);
        }
    })

});
