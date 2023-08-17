$(document).ready(function(){
    let currentPosition = -4.86
    $(".spin").click(function (){
        $.ajax({
            url: "http://localhost:3000",
            type: "GET",
            headers: {
                task: "spin", // custom header
            },
            data: {
                user: "Alice",
            },
            success: function (response) {
                // if a success response is received, print it here:
                console.log("Response:", response.getSpin);
                    currentPosition += 1080 + (response.getSpin)
                    $('.wheel img').css('transform', 'rotate(-'+currentPosition+'deg)')
            },
            error: function (error) {
                console.error("Error:", error);
            },
        });
    });
});

