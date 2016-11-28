"use strict"

function Search(e) {
    e.preventDefault();
    var infor = $("#infor").val();
    let url = '/admin?infor='+infor

    $.get(url, function (data) {

        //console.log(data);
        if(data.length == 0){
            alert("No Such Users")
        }
        else{
            let table = $('#users_table')
            table.html("")
            for(let k = 0; k<data.length;k++){
                let email_old = data[k].email;
                let row_person = $('<tr>')
                let type = $("<td contenteditable='true' >").text(data[k].type)
                type.attr("class","type")
                let username = $("<td contenteditable='true' >").text(data[k].username)
                username.attr("class","username")
                let email = $("<td contenteditable='true' >").text(data[k].email)
                email.attr("class","email")
                let skills = $("<td contenteditable='true' >").text(data[k].skills)
                skills.attr("class","skills")
                let zipcode = $("<td contenteditable='true' >").text(data[k].zipcode)
                zipcode.attr("class","zipcode")
                let about = $("<td contenteditable='true' >").text(data[k].about)
                about.attr("class","about")
                let pw = $("<td contenteditable='true' >").text(data[k].password)
                pw.attr("class","password")
                pw.attr("id",`${email_old}`)
                row_person.append(type)
                row_person.append(username)
                row_person.append(email)
                row_person.append(pw);
                row_person.append(skills)
                row_person.append(zipcode)
                row_person.append(about)
                table.append(row_person);
            }
            if(($('#save').length == 0)){
                let btn_save = $('<button>').text("Save")
                btn_save.attr('id','save')
                btn_save.css('margin-top','20px')
                $('#pwtable').append(btn_save)
                $("#save").click(function(e){
                    Save();   
                })
            }
        }
    });
}


function Save(){
    
    var data_send = [];
    $("#users_table tr").each(function() {

        let tmp = {
            "email_old":$(this).find('td.password').attr("id"),
            "email":$(this).find('td.email').text(), 
            "password":$(this).find('td.password').text(),
            "type":$(this).find('td.type').text(),
            "about":$(this).find('td.about').text(),
            "skills":$(this).find('td.skills').text(),
            "username":$(this).find('td.username').text(),
            "zipcode":$(this).find('td.zipcode').text(),
        }
        data_send.push(tmp);
    });
    console.log(data_send);    
    $.post("/update", {data:data_send}, function(data){
        alert(`${data}`)
    })

}

$(document).ready(function() {

    $('#search_by').submit(function(e) {
    // Get all the forms elements and their values in one step
        $('#pwtable').css('display', 'block')
        Search(e)
    })

});
 

    
