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
                let radio = $("<input type='radio'>")
                radio.attr("class","radio")
                radio.attr("id",`${email_old}`)
                let type = $("<td>").text(data[k].type)
                type.attr("class","type")
                let username = $("<td>").text(data[k].username)
                username.attr("class","username")
                let email = $("<td>").text(data[k].email)
                email.attr("class","email")
                let skills = $("<td>").text(data[k].skills)
                skills.attr("class","skills")
                let zipcode = $("<td>").text(data[k].zipcode)
                zipcode.attr("class","zipcode")
                let about = $("<td>").text(data[k].about)
                about.attr("class","about")
                let pw = $("<td>").text(data[k].password)
                pw.attr("class","password")
                row_person.append(radio)
                row_person.append(type)
                row_person.append(username)
                row_person.append(email)
                row_person.append(pw);
                row_person.append(skills)
                row_person.append(zipcode)
                row_person.append(about)
                table.append(row_person);
            }
            if(($('#remove').length == 0)){
                let btn_save = $('<button>').text("Remove")
                btn_save.attr('id','remove')
                btn_save.css('margin-top','20px')
                $('#pwtable').append(btn_save)
                $("#remove").click(function(e){
                    Save();   
                })
            }
        }
    });
}


function Save(){
    
    var data_send = [];
    $("#users_table tr").each(function() {

        if($(this).find('input:radio').is(":checked")){
            var tmp = {"email":$(this).find('td.email').text()}
            data_send.push(tmp);
            //console.log($(this).find('td.email').text())
        }

        
    });
    //console.log(data_send); 
    $.post("/rm", {data:data_send}, function(data){
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
 

    
