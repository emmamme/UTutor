"use strict"

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
                if (response['type'] == 'admin' && response['email'] != "") {
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

function Search(e) {
    e.preventDefault();
    var infor = $("#infor").val();
    let url = '/admin?infor='+infor

    $.get(url, function (data) {

        //console.log(data);
        let table = $('#users_table')
        table.html("")

        for(let k = 0; k<data.length;k++){
            let email = data[k].email;
            let row_person = $('<tr>').append($('<td>').text(data[k].type));
            row_person.append($('<td>').text(data[k].username))
            row_person.append($('<td>').text(data[k].email))
            let pw = $('<td>').text(data[k].password)
            pw.attr("class","pw")
            pw.attr("id",`${email}`)
            row_person.append(pw);
            table.append(row_person);
        }

    });
}

function EditPW() {
    
    $(".pw").each(function(){
        let cell = $(this);
        let email = cell.attr("id")
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
/*
$.post('/applicants', $('#add_applicant').serialize(), function (data) {
        alert(`${data}`);
    });
*/
$(document).ready(function() {

    $('#search_by').submit(function(e) {
    // Get all the forms elements and their values in one step
        Search(e)
    })

    $("#edit").click(function(){
        EditPW();

    })

    $("#save").click(function(e){
        SavePW(); 
        Search(e)   
    })
});
 

    
