

function Search(property) {
    let url = '/admin?property='+property
    $.get(url, function (data) {

        console.log(data);

    });
}

$(document).ready(function() {

    $("button[name='search']").click(function() {
      //console.log($(this).html());
      Search($(this).html())
    });


});