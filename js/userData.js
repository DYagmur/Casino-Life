var currentUserName;
var currentUser;

function refreshUserData() {
    console.log('refreshData() is run');
    $.ajax ({
        url:"http://localhost:3000/getUserData",
        type: 'GET',
        headers: {
            "task": "getUserData"
        },
        success: function(response) {
            console.log("response" , response);
            currentUserName = response.currentUserName;
            currentUser = response.currentUser;
        
            let userNickName = currentUser.nickname;
            let userBalance = currentUser.balance;
            let userTickets = currentUser.ticket;
            
            $("#username").text(userNickName);
            $("#balance").text(userBalance);
            $("#ticket").text(userTickets);

        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}

function plusTicket(number,mul) {
    currentUser.ticket += (number * mul);
    // send the new data to Server
    $.ajax({
        url:"http://localhost:3000/plusTicket",
        type: 'POST',
        headers: {
            "task": "plusTicket"
        },
        data: {
            username: currentUserName,
            ticket: currentUser.ticket
        }
    })
}

function minusTicket(number) {
    currentUser.ticket -= number;

    $.ajax({
        url:"http://localhost:3000/plusTicket",
        type: 'POST',
        headers: {
            "task": "plusTicket"
        },
        data: {
            username: currentUserName,
            ticket: currentUser.ticket
        }
    })
}
export {refreshUserData, plusTicket,minusTicket};