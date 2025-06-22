//loads navbar in other HTML pages
$(document).ready(function(){
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