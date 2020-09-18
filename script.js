$(document).ready(function() {


    // set the current day using moment.js
    let time = moment().format("[Today is] dddd, MMMM Do YYYY")

    //set the current hour using moment.js
    let currentHour = moment().hour();
    
    //set the page header html to current day
    $("#currentTime").html(time);

    /* The below for loop generates the html table for the webpage
        The table has 1 row for each time block with 3 buttons
        It aslo prefixes a 0 in formt of one digit hours i.e 07:00 */
    for (x = 7; x <= 23; x++){

        let y = "";

        if (x < 10){
            y = "0" + x;

        }else   {
            y = x;
        }

        $("#plannerTable").append('<tr><td>' + y +':00</td><td id="hour' + y + 'td" class="center aligned tasktd"></td><td class="right aligned"><button class="ui basic circular orange icon button addEvent" id="hour' + y + 'btn"><i class="calendar plus outline icon"></i></button><button class="ui basic circular green icon button done-btn" id="mark' + y + 'btn"><i class="calendar check outline icon"></i></button><button class="ui basic circular black icon button del-btn" id="del' + y + 'btn"><i class="calendar times outline icon"></i></button></td></tr>');

        }


    /* The below function color codes the timeblocks
        It sets the css background color by comparing 
        the split hour number from the row id
        and compares it to currenthour */
    $("td:first-child").each(function () {
        
        eachHour = $(this).text();

        if (eachHour.substring(0,2) < currentHour){
            $(this).parent().css("background-color", "#f9fafb");
            $(this).css("text-decoration", "line-through");
        } else if (eachHour.substring(0,2) == currentHour)  {
            $(this).parent().css("background-color", "#a3faca");
        } else if (eachHour.substring(0,2) > currentHour) {
            $(this).parent().css("background-color", "#cde2ef");
        }
    })

    
    /* The below function loads any saved tasks form local storage on page refresh.
        It also sets the task to be marked as done, css -text decoration
         if the user had clicked on the button */
    $("tr td:nth-child(2)").each(function(){

        let trID = $(this).attr("id");
        let trModID = ($(this).attr("id") + "css");

        let trContent = $(this).html(localStorage.getItem(trID));

        let trCSS = $(this).css("text-decoration", localStorage.getItem(trModID));
    
    });
    
    /* Add an event to the time row on button click
        the clock event triggers a modal that user can input their task into
        the modal checks for a balnk input but will accept anything */
    $(".addEvent").click(function(){

        let getbtnID = $(this).attr("id");
        let chngAddEventBtnID = (getbtnID.substring(0,6) + "td");
        let userTask = $("#userInput");

        $('.ui.modal')
        .modal({
            onApprove : function() {

                if (userTask.val() == ""){
                    $("#modal-error").show();
                    return false;
                } else {
                    localStorage.setItem(chngAddEventBtnID, userTask.val());
                    $("#" + chngAddEventBtnID).html(localStorage.getItem(chngAddEventBtnID));
                    userTask.val("");
                } 
              },
        })
        .modal('show');
        $("#modal-error").hide();
    }); 

    /* button to change the taks css text -decoration property
        it is to indicate a task as done or not done
        it does a check to see if there is a task for that row */
    $(".done-btn").click(function(){

        let getmarkBtn = $(this).attr("id");
        let chngMarkBtnID = ("hour" + getmarkBtn.substring(4,6) + "td");

        let getLineProperty = $("#" + chngMarkBtnID).css("text-decoration-line");

        if ($("#" + chngMarkBtnID).html() === ""){
                alert("Please add a task");
        } else {
            if(getLineProperty === "line-through") {
                $("#" + chngMarkBtnID).css("text-decoration", "none");
                localStorage.setItem((chngMarkBtnID + "css"), "none");
            } else {
                $("#" + chngMarkBtnID).css("text-decoration", "line-through");
                localStorage.setItem((chngMarkBtnID + "css"), "line-through");
            }
        }

    })

    /* delete button  to delete a task and remove it's value from
        local storage, the key still remains stored */
    $(".del-btn").click(function(){

        let getdelBtn = $(this).attr("id");

        let chngDelBtnID = ("hour" + getdelBtn.substring(3,5) + "td");

        localStorage.setItem(chngDelBtnID, "");

        $("#" + chngDelBtnID).html(localStorage.getItem(chngDelBtnID));

    })

});
  
