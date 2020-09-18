$(document).ready(function() {

    let time = moment().format("[Today is] dddd, MMMM Do YYYY")

    let setHour = moment().set("hour", 7);

    let currentHour = moment().hour();

    $("#currentTime").html(time);


    for (x = 7; x <= 23; x++){

        let y = "";

        if (x < 10){
            y = "0" + x;
        }else{
            y = x;
        }

        $("#plannerTable").append('<tr><td>' + y +':00</td><td id="hour' + y + 'td" class="center aligned tasktd"></td><td class="right aligned"><button class="ui basic circular orange icon button addEvent" id="hour' + y + 'btn"><i class="calendar plus outline icon"></i></button><button class="ui basic circular green icon button done-btn" id="mark' + y + 'btn"><i class="calendar check outline icon"></i></button><button class="ui basic circular black icon button del-btn" id="del' + y + 'btn"><i class="calendar times outline icon"></i></button></td></tr>');

        }

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

    
    
    $("tr td:nth-child(2)").each(function(){

        let trID = $(this).attr("id");
        let trModID = ($(this).attr("id") + "css");

        let trContent = $(this).html(localStorage.getItem(trID));

        let trCSS = $(this).css("text-decoration", localStorage.getItem(trModID));
    
    });
    

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

    $(".done-btn").click(function(){

        let getmarkBtn = $(this).attr("id");
        let chngMarkBtnID = ("hour" + getmarkBtn.substring(4,6) + "td");

        let getLinePropoerty = $("#" + chngMarkBtnID).css("text-decoration-line");

        if(getLinePropoerty === "line-through") {
            $("#" + chngMarkBtnID).css("text-decoration", "none");
            localStorage.setItem((chngMarkBtnID + "css"), "none");
        } else {
            $("#" + chngMarkBtnID).css("text-decoration", "line-through");
            localStorage.setItem((chngMarkBtnID + "css"), "line-through");
        }
    })

    $(".del-btn").click(function(){

        let getdelBtn = $(this).attr("id");

        let chngDelBtnID = ("hour" + getdelBtn.substring(3,5) + "td");

        localStorage.setItem(chngDelBtnID, "");

        $("#" + chngDelBtnID).html(localStorage.getItem(chngDelBtnID));

    })

});
  
