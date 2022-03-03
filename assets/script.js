var schedule = {};

// check if there is a schedule in local memory
function checkSchedule() {
    console.log("checking for saved schedule");
    var savedSchedule = JSON.parse(localStorage.getItem("schedule"));

    if (savedSchedule !== null) {
        if (savedSchedule.date === dayjs().format("MM DD YYYY")) {
            schedule = savedSchedule;
            console.log(`loading saved schedule`);
        }
    } else {
        console.log(`setting new schedule`);
        schedule = {
            date: dayjs().format("MM DD YYYY"),
            toDos: {
                hour09: "",
                hour10: "",
                hour11: "",
                hour12: "",
                hour13: "",
                hour14: "",
                hour15: "",
                hour16: "",
                hour17: "",
            },
        };
    }
}

// display saved schedule if it is for current day
function showSchedule() {
    checkSchedule();
    console.log("showing current schedule");
    // empty the div first
    $(".container").empty();
    for (var [hour, toDo] of Object.entries(schedule.toDos)) {
        var rowEl = $("<div>")
            .addClass("row time-block")
            .attr("id", hour)
            .appendTo(".container");
        $("<div>")
            .addClass(
                "d-flex justify-content-center align-items-center text-center col-1 hour"
            )
            .text(dayjs().hour(hour.substring(4)).format("hA"))
            .appendTo(rowEl);
        var textEl = $("<textarea>").val(toDo).appendTo(rowEl);
        $("<button>")
            .addClass("btn saveBtn col-1")
            .appendTo(rowEl)
            .append("<i>")
            .addClass("fa-solid fa-floppy-disk");

        // apply color-coding as this is rendered
        const timeBlock = dayjs().hour(hour.substring(4));
        const now = dayjs();

        if (timeBlock.diff(now, "hour") == 0) {
            textEl.addClass("col-10 present");
        } else if (timeBlock.diff(now, "hour") > 0) {
            textEl.addClass("col-10 future");
        } else {
            textEl.addClass("col-10 past");
        }
    }
}

// save to/do's
function saveToDo(event) {
    event.preventDefault();
    console.log(`saving toDo`);
    var current = $(event.currentTarget);

    // save the text in the matching spot in the schedule
    for (var toDo of Object.keys(schedule.toDos)) {
        if (current.parent("div").attr("id") == toDo)
            schedule.toDos[toDo] = current.siblings("textarea").val();
    }
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// update the date
function displayDate() {
    $("#currentDay").text(dayjs().format("dddd, MMM Do, YYYY"));
    $("#currentTime").text(dayjs().format("h:mm a"));
}

function autoSave () {
    $("textarea").each(function() {
        for (var toDo of Object.keys(schedule.toDos)) {
            if ($(this).parent("div").attr("id") == toDo)
                schedule.toDos[toDo] = $(this).val();
        }
    });
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

setInterval(function () {
    displayDate();

    if (dayjs().format('mm') == 00) {
        autoSave();
        showSchedule;
    }

}, 1000);

displayDate();
showSchedule();


// event listener/delegation for buttons
$(".container").on("click", "button", saveToDo);
