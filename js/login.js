$(document).ready(function() {

    $('#login-btn').click(function(e){
        e.preventDefault();

        const username = $("input[type='text']").val();
        const password = $("input[type='password']").val();

        console.log("Username:", username);
        console.log("Password:", password);

        /*
        const url = "http://localhost:3000/login";
        
        // query string
        const params = new URLSearchParams({ username: username, password: password });

        fetch(url + '?' + params.toString(), {
            method: 'GET',
            headers: {

            }
        })
        */

        $.ajax({
            url: "http://localhost:3000/login",
            type: 'GET',
            headers: {
                "task": "login" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response);
                
                if (response ==="Login Successful") {
                    //Redirect to home.html
                    console.log("Let's go home.html");
                    window.location.href = "../pages/home.html"
                }else{
                    alert(response);
                }
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });

    });

    $('#signup-btn').click(function(e) {
        e.preventDefault();

        const username = $("input[type='text']").val();
        const password = $("input[type='password']").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:3000/login",
            type: 'POST',
            headers: {
                "task": "signup" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response);
                
                if (response ==="Login Successful") {
                    //Redirect to home.html
                    console.log("Let's go home.html");
                    window.location.href = "../pages/home.html"
                }else{
                    alert(response);
                }
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });

    });
});


/* 
$(document).ready(function() {
    $('#sendGetReqBtn').click(function(){
        $.ajax({
            url: 'http://localhost:3000/',
            type: 'GET',
            success: function(response) {
                $('#response').html(`<p>Response received!</p>`);
                console.log('HTTP Response DataType: ', typeof(response));
            },
            error: function(error) {
                $('#response').html(`<p>Error: ${error.statusText}</p>`);
            }
        });
    });
});
*/