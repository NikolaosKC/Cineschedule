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

//two methods of lightmode

/*
$(document).ready(function(){
    $("#lightmodeAppend").click(function() {
        $("header").append('<link href="CSS/CinescheduleLightmode.css" type="text/css" rel="stylesheet">');
    });

    $("#lightmodeToggle").click(function() {
        $('body, hr, h1, h2, h3, p, table, th, td').toggleClass('lightmode');
        $('.navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle, #carouselItem').toggleClass('lightmode');
    }
});
*/

$(document).ready(function(){
    let lightmode = localStorage.getItem("lightmode"); //assignment of variable for lightmode storage item for easier writing
    if(lightmode === "true") {enableLightmode()}; //checks if true so it enables lightmode on page entry

    function enableLightmode() { //enables lightmode and changes storage to true
        $('body, hr, h1, h2, h3, p, table, th, td').addClass('lightmode');
        $('.navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle, #carouselItem').addClass('lightmode');
        localStorage.setItem("lightmode", "true")
    }

    function disableLightmode() { //disables lightmode and changes storage to not true
        $('body, hr, h1, h2, h3, p, table, th, td').removeClass('lightmode');
        $('.navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle, #carouselItem').removeClass('lightmode');
        localStorage.setItem("lightmode", "false")
    }

    $("#lightmodeToggle").click(function() { //button is clicked
        lightmode = localStorage.getItem("lightmode"); //im losing my mind
        if(lightmode !== "true"){ //if lightmode is off, enable
            enableLightmode();
        } else { //if lightmode is on, disable
            disableLightmode();
        };
    });
});