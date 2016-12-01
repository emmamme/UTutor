
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
            $('td[name=username]').text(data[0].username)
            $('td[name=password').text(data[0].password)
            $('td[name=zipcode').text(data[0].zipcode)
            $('td[name=skills').text(data[0].skills)
            $('td[name=about').text(data[0].about)
           
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
    
}

function Edit() {
    
    $(".editable").each(function(){
        let cell = $(this);
        let email = $('#email').text()
        let id = cell.attr('name');
        if (!cell.hasClass("edittd")){
            let val = cell.html();
            cell
                .toggleClass('edittd')
                .html("")
                .append(`<input type='text' class='update' id=${id} name=${email} value='`+val+"'></input>");
        }
    })
}

function Save(){
    var data_send = {};
    
    $( ".update" ).each(function() {
            var email = $(this).attr("name");
            let id = $(this).attr("id");
            data_send[id] = $(this).val()
            data_send["email"] = email
            
    });
    console.log(data_send)
    $.post("/updateprofile", {data:data_send}, function(data){
        alert(`${data}`)
    })
}



$(document).ready(function() {

   
   getTutorFromSession();

   $("#edit").click(function(){
        Edit();

    })

   $("#save").click(function(){
        Save();
        getTutorFromSession();
        $('.edittd').removeClass("edittd");

    })

   

});
