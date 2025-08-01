//loads navbar in other HTML pages
$(document).ready(function(){
    //$("p").css("border", "3px solid red");
    $("#deliverNavbarFooter").load("CinescheduleNavbarFooter.html");
});

function contactValidation() {
    //let acquiredName = document.querySelector("#username").value; //JS equivalent
    let acquiredName = $("#contactName").val();
    let acquiredEmail = $("#contactEmail").val();
    let acquiredSubject = $("#contactSubject").val();
    let acquiredComments = $("#contactComments").val();
    if (acquiredName != "" && acquiredEmail != "" && acquiredSubject != "" && acquiredComments != "") {
        alert("Form submitted!\nName: " + acquiredName + "\nEmail: " + acquiredEmail + "\nSubject: " + acquiredSubject);
    };
};

function taskValidation() {
    let acquiredName = $("#taskName").val();
    let acquiredDesc = $("#taskDesc").val();
    let acquiredDate = $("#taskDate").val();
    let acquiredPriority = $("#taskPriority").val();
    if (acquiredDesc == "") {acquiredDesc = "—"}
    let taskConfirmation;
    //console.log(acquiredName);
    //console.log(acquiredDesc);
    //console.log(acquiredDate);
    //console.log(acquiredPriority);
    //console.log(typeof(acquiredName));
    //console.log(typeof(acquiredDesc));
    //console.log(typeof(acquiredDate));
    //console.log(typeof(acquiredPriority));
    if (acquiredName != "" && acquiredDate != "" && acquiredPriority != "") {
        if (acquiredDesc == "—") {
            taskConfirmation = confirm("Form submitted!\nName: " + acquiredName + "\nDescription: None\nDate: " + acquiredDate + "\nPriority: " + acquiredPriority);
        } else {
            taskConfirmation = confirm("Form submitted!\nName: " + acquiredName + "\nDescription: " + acquiredDesc + "\nDate: " + acquiredDate + "\nPriority: " + acquiredPriority + "\n\nAre you sure you want to create this task?");
        };

        if (taskConfirmation == true) {
            let taskTable = document.querySelector("#taskTable");
            let row = taskTable.insertRow(1);
            let cell = row.insertCell(0);
            cell.innerText = acquiredName;

            cell = row.insertCell(1);
            cell.innerText = acquiredDesc;

            cell = row.insertCell(2);
            cell.innerText = acquiredDate;

            cell = row.insertCell(3);
            cell.innerText = acquiredPriority;

            cell = row.insertCell(4);
            cell.innerHTML = "<input type='checkbox'>&nbspComplete<br><br><button type='button' onclick='deleteTask(this)' class='btn bg-danger border border-black border-2 p-1 pt-0 pb-0 text-white'>Delete</button>";

            alert("Task created.");
        } else {
            alert("Task cancelled.");
        }
    };
};

function deleteTask(givenRow) {
    console.log(givenRow);
    let indexOfGivenRow = givenRow.parentNode.parentNode.rowIndex;
    //it goes outwards as follows:
    //givenRow (whatever is within the cell td, in particular the button that activated this function) -->
    //parentNode (the cell td itself) -->
    //parentNode (the desired row tr, which we want to delete, that contains the cell td) -->
    //rowIndex (the position of the given row on the table)
    //console.log(givenRow.parentNode);
    //console.log(givenRow.parentNode.parentNode);
    //console.log(givenRow.parentNode.parentNode.rowIndex);
    let deleteConfirmation = confirm("Are you sure you want to delete this task?");
    if (deleteConfirmation == true) {
        document.querySelector("#tasktable").deleteRow(indexOfGivenRow);
        alert("Task deleted.");
    } else {
        alert("Task not deleted.");
    };
};

//methods of lightmode without localstorage or cookies

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

//if($.browser.chrome) {
    //localStorage saving of lightmode (doesn't work on firefox but I must use it anyway)
    $(document).ready(function(){
        let lightmode = localStorage.getItem("lightmode"); //assignment of variable for lightmode storage item for easier writing, with let so it stays in function, all upon page load
        //console.log("Lightmode on page load:", lightmode);

        if(lightmode === "true") { //checks if true so it enables lightmode on page entry
            //console.log("Enabled lightmode on page load")
            enableLightmode();
        };

        function enableLightmode() { //enables lightmode and changes storage to true
            $("body, hr, h1, h2, h3, p, table, th, td").addClass("lightmode");
            $("label.notBootstrap, .navButton, .input, .bodyPageLink, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle").addClass("lightmode");
            $(".carousel-item, #taskFormButton, #taskFormContainer, .form-text, .carousel-inner").addClass("lightmode");
            localStorage.setItem("lightmode", "true");
            //console.log("Lightmode enabled");
        };

        function disableLightmode() { //disables lightmode and changes storage to not true
            $("body, hr, h1, h2, h3, p, table, th, td").removeClass("lightmode");
            $("label.notBootstrap, .navButton, .input, .bodyPageLink, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle").removeClass("lightmode");
            $(".carousel-item, #taskFormButton, #taskFormContainer, .form-text, .carousel-inner").removeClass("lightmode");
            localStorage.setItem("lightmode", "false");
            //console.log("Lightmode disabled");
        };

        $("#lightmodeToggle").click(function() { //button is clicked
            lightmode = localStorage.getItem("lightmode"); //reassignment upon button click in case page is not reloaded
            if(lightmode !== "true"){ //if lightmode is off, enable
                enableLightmode();
            } else { //if lightmode is on, disable
                disableLightmode();
            };
        });
    });

    //localStorage saving of task table
    $(document).ready(function() {
        let storedTable = localStorage.getItem("storedTable"); //checks on page load if a table has been previously saved/stored
        if (storedTable) {
            document.querySelector("#taskTableContainer").innerHTML = storedTable; //if a stored table exists, load it into HTML
        };

        $("#saveTable").click(function() {
            let saveConfirmation = confirm("Are you sure you want to save the table?");
            if (saveConfirmation == true) {
                let checkboxList = $("#taskTable input[type='checkbox']"); //lists every checkbox in the task table within an array
                //console.log(checkboxList);
                //console.log(checkboxList.length);
                for (let i = 0; i < checkboxList.length ; i++) {
                    let currentCheckbox = checkboxList[i]; //each element within this array is inspected
                    //console.log(currentCheckbox);
                    //console.log(currentCheckbox.checked);
                    if (currentCheckbox.checked) {
                        currentCheckbox.setAttribute("checked", "checked"); //if checked, add attribute checked="checked" to the specific checkbox (checkboxes in this table are by default unchecked)
                    } else {
                        currentCheckbox.removeAttribute("checked"); //if unchecked, remove attribute so it is no longer checked
                    };
                };
                
                let storedTable = document.querySelector("#taskTable").outerHTML; //extract table
                localStorage.setItem("storedTable", storedTable); //store it with localstorage name storedTable
                alert("Changes saved.")
            } else {
                alert("Changes not saved.")
            };
        });
        
        $("#resetTable").click(function() {
            let resetConfirmation = confirm("Are you sure you want to reset the table and erase all tasks?\nThis cannot be reversed.");
            if (resetConfirmation == true) {
                localStorage.removeItem("storedTable");
                alert("Table reset.");
            } else {
                alert("Table not reset.");
            };
        });
    });
//};

/*
if ($.browser.mozilla) {
    //cookie saving of lightmode and task table (WORKS ON FIREFOX AND I CAN USE THIS FOR !!!ANYTHING!!! but it doesn't work on chromium browsers :( )
    $(document).ready(function(){
        //COOKIES!!!!!!!!!!!

        //setCookie("purpose1","test1",365);
        //setCookie("purpose2","test2",365);
        //setCookie("purpose3","test3",365);
        //console.log(getCookie("purpose1"));
        //console.log(getCookie("purpose2"));
        //console.log(getCookie("purpose3"));
        
        function setCookie(name, value, expdays) {
            const date = new Date(); //variable for current date as object
            date.setTime(date.getTime() + (expdays*24*60*60*1000)); //obtain current date in milliseconds, then add expiry days in milliseconds
            let expiresOn = "expires=" + date.toUTCString(); //converts new date to string in UTC so it can be seamlessly integrated into cookie
            document.cookie = name + "=" + value + ";" + expiresOn + ";path=/; SameSite=Lax; Secure"; //path=/ means can be accessed from any page
        };

        function getCookie(name) {
            console.log(document.cookie);
            const cookieArray = document.cookie.split("; ");
            console.log(cookieArray);

            for (let i=0; i<cookieArray.length; i++) { //i up to length of array, ex. array is 3 length, so i goes from 0-2
                let currentElement = cookieArray[i]; //let currentElement = current element of array
                console.log(currentElement.indexOf(name));
                console.log(currentElement);
                if (currentElement.indexOf(name) == 0) {
                    return currentElement.substring(name.length + 1); //name.length serves as position of desired substring (the value), +1 to remove = sign after name
                };
            };

            //uses forEach, but I prefer for loop for some reason
            //let result = null;
            //cookieArray.forEach(function(element) {
            //    console.log(element.indexOf(name));
            //    if (element.indexOf(name) == 0){
            //        result = element.substring(name.length + 1);
            //    }
            //})
            //return result;
        };

        function deleteCookie(name) { //nice to have
            setCookie(name, null, null);
        };

        //lightmode
        let lightmode = getCookie("lightmode"); //assignment of variable for lightmode cookie for easier writing, with let so it stays in function, all upon page load
        //console.log("Lightmode on page load:", lightmode);

        if(lightmode === "true") { //checks if true so it enables lightmode on page entry
            //console.log("Enabled lightmode on page load")
            enableLightmode();
        };

        function enableLightmode() { //enables lightmode and changes cookie to true
            $("body, hr, h1, h2, h3, p, table, th, td").addClass("lightmode");
            $(".navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle").addClass("lightmode");
            $(".carousel-item, #taskButton, #taskContainer, .form-text, .carousel-inner").addClass("lightmode");
            setCookie("lightmode", "true", 365);
            //console.log("Lightmode enabled");
        };

        function disableLightmode() { //disables lightmode and changes cookie to not true
            $("body, hr, h1, h2, h3, p, table, th, td").removeClass("lightmode");
            $(".navButton, .input, :submit, .movieFestivalGrid, .teamMembers, #lightmodeToggle").removeClass("lightmode");
            $(".carousel-item, #taskButton, #taskContainer, .form-text, .carousel-inner").removeClass("lightmode");
            setCookie("lightmode", "false", 365);
            //console.log("Lightmode disabled");
        };

        $("#lightmodeToggle").click(function() { //button is clicked
            lightmode = getCookie("lightmode"); //reassignment upon button click in case page is not reloaded
            if(lightmode !== "true"){ //if lightmode is off, enable
                enableLightmode();
            } else { //if lightmode is on, disable
                disableLightmode();
            };
        });

        //task table
        let storedTable = getCookie("storedTable"); //checks on page load if a table has been previously saved/stored
        if (storedTable) {
            document.querySelector("#taskTableContainer").innerHTML = storedTable; //if a stored table exists, load it into HTML
        };

        $("#saveTable").click(function() {
            let saveConfirmation = confirm("Are you sure you want to save the table?");
            if (saveConfirmation == true) {
                let storedTable = document.querySelector("#taskTable").outerHTML; //extract table
                setCookie("storedTable", storedTable, 365); //store it with localstorage name storedTable
                alert("Changes saved.")
            } else {
                alert("Changes not saved.")
            };
        });
        
        $("#resetTable").click(function() {
            let resetConfirmation = confirm("Are you sure you want to reset the table and erase all tasks?\nThis cannot be reversed.");
            if (resetConfirmation == true) {
                deleteCookie("storedTable");
                alert("Table reset.");
            } else {
                alert("Table not reset.");
            }
        });
    });
};
*/

/* localstorage version without variable assignment
$(document).ready(function(){
    if(localStorage.getItem("lightmode") === "true") {enableLightmode()}; //checks if true so it enables lightmode on page entry

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
        if(localStorage.getItem("lightmode") !== "true"){ //if lightmode is off, enable
            enableLightmode();
        } else { //if lightmode is on, disable
            disableLightmode();
        };
    });
});
*/

$(document).ready(function(){
    function loadStats() {
        let totalRows = (document.querySelector("#taskTable").rows.length) - 1;
        let checkedRows = document.querySelectorAll("#taskTable input[type='checkbox']:checked").length; //lists every checked checkbox in the task table within an array, then determines this array's length
        console.log(document.querySelectorAll("#taskTable input[type='checkbox']:checked"));
        console.log(checkedRows);
        document.querySelector("#taskStatsContainer").innerHTML =
            "<p>Completed tasks: " + checkedRows + "</p>"
                +
            "<p>Pending tasks: " + (totalRows - checkedRows) + "</p>"
                +
            "<p>Total tasks: " + totalRows + "</p>";
    }

    $(window).on("load", loadStats()); //reloads stats on window load
    $("#updateTaskStats").click(function() {loadStats()}); //also reloads stats on button click
});