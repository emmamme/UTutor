
$(function() {
    getUserFromSession();
    // Get the user name from the server by making an
    // ajax GET request to the url "/name"
    // The callback function on success will call updateUI
    // with the new value for name
    function getUserFromSession() {
        $.ajax({
            url: "/userinsession",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if (response['type'] != "" && response['email'] != "") {
                    $(".ututor_user").text(response['username'] + " (" + response['email'] + ")");
                    
                }
                else {
                    window.location.href = "../index.html";
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    
}
    
    
});

function getTutorFromSession() {
    $.ajax({
        url: "/tutorprofile",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $('#email').text(data[0].email)
            $('#username').text(data[0].username)
            $('#password').text(data[0].password)
            $('#zipcode').text(data[0].zipcode)
            $('#interest').text(data[0].skills)
            $('#about').text(data[0].about)
            $('#username_head').text(data[0].username)
            $("#sendemail").prop("href", `mailto:${data[0].email}`)
           
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
    
}

function EditPW() {
    
    $("#password").each(function(){
        let cell = $(this);
        let email = $('#email').text()
        if (!cell.hasClass("edittd")){
            let val = cell.html();
            cell
                .toggleClass('edittd')
                .html("")
                .append(`<input type='text' class='updatePW' name=${email} value='`+val+"'></input>");
        }
    })
}

function SavePW(){
    var data_send = [];
    
    $( ".updatePW" ).each(function() {
            let tmp = {"email":$(this).attr("name"), "password":$(this).val()}
            data_send.push(tmp);
    });
    
    $.post("/updatepw", {data:data_send}, function(data){
        alert(`${data}`)
    })


}

$(document).ready(function() {

   
   getTutorFromSession();

   $("#edit").click(function(){
        EditPW();

    })

   $("#save").click(function(){
        SavePW();
        getTutorFromSession();
        $('#password').removeClass("edittd");

    })

   

});
