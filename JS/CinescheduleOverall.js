function formValidation() {
    /* var name = document.querySelector("#name");
    console.log(name);
    alert(name); */
    alert("Form submitted!");
}

$(document).ready(function(){
    //$("p").css("border", "3px solid red");
    $("#deliverplz").load("CinescheduleNavbar.html");
});

$(document).ready(function(){
    $("#lightmodeAppend").click(function() {
        $("header").append('<link href="CSS/CinescheduleLightmode.css" type="text/css" rel="stylesheet">');
    });
    $("#lightmodeToggle").click(function() {
        $('body, hr, h1, h2, h3, p, table, th, td').toggleClass('lightmode');
        $('.navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle').toggleClass('lightmode');
    });
});