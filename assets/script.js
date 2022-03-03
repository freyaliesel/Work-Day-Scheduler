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
                hour09: ["", false],
                hour10: ["", false],
                hour11: ["", false],
                hour12: ["", false],
                hour13: ["", false],
                hour14: ["", false],
                hour15: ["", false],
                hour16: ["", false],
                hour17: ["", false],
            },
        };
    }
    console.log(schedule);
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
        var textEl = $("<textarea>")
            .val(toDo[0])
            .addClass("col-9")
            .appendTo(rowEl);
        var checkEl = $("<button>")
            .addClass("btn checkBtn col-1")
            .appendTo(rowEl);
        $("<i>").addClass("fa-solid fa-square").appendTo(checkEl);
        var buttonEl = $("<button>")
            .addClass("btn saveBtn col-1")
            .appendTo(rowEl);
        $("<i>").addClass("fa-solid fa-floppy-disk").appendTo(buttonEl);

        // apply color-coding as this is rendered
        const timeBlock = dayjs().hour(hour.substring(4));
        const now = dayjs();

        if (timeBlock.diff(now, "hour") == 0) {
            textEl.addClass("present");
        } else if (timeBlock.diff(now, "hour") > 0) {
            textEl.addClass("future");
        } else {
            textEl.addClass("past");
        }

        // apply checkmarks as appropriate
        if (toDo[1]) {
            checkEl.addClass("btn-success");
            checkEl.children("i").addClass("fa-square-check");
        } else {
            checkEl.addClass("btn-secondary");
            checkEl.children("i").addClass("fa-square");
        }
    }
}

// save to/do's
function saveToDo(event) {
    event.preventDefault();
    console.log(`saving toDo`);
    var current = $(event.currentTarget);

    // save the text in the matching spot in the schedule
    for (var task of Object.keys(schedule.toDos)) {
        if (current.parent("div").attr("id") == task) {
            schedule.toDos[0] = current.siblings("textarea").val();
            if (current.siblings("button").hasClass("btn-success")) {
                schedule.toDos = true;
            }
        }
    }
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// update the date
function displayDate() {
    $("#currentDay").text(dayjs().format("dddd, MMM Do, YYYY"));
    $("#currentTime").text(dayjs().format("h:mm a"));
}

function autoSave() {
    console.log(`autosaving`);
    $("textarea").each(function () {
        for (var toDo of Object.keys(schedule.toDos)) {
            if ($(this).parent("div").attr("id") == toDo)
                schedule.toDos[toDo] = $(this).val();
        }
    });
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

function checkBox(event) {
    event.preventDefault();
    var button = $(event.currentTarget);
    console.log(`clicking checkbox`);

    if (button.hasClass("btn-secondary")) {
        button.removeClass("btn-secondary").addClass("btn-success");
        button
            .children("i")
            .removeClass("fa-square")
            .addClass("fa-square-check");
        console.log(button.children("i"));
    } else {
        button.removeClass("btn-success").addClass("btn-secondary");
        button
            .children("i")
            .removeClass("fa-square-check")
            .addClass("fa-square");
    }
}

setInterval(function () {
    displayDate();

    if (dayjs().format("mm") == 00) {
        autoSave();
        showSchedule;
    }
}, 1000);

displayDate();
showSchedule();

// event listener/delegation for buttons
// $(".container").on("click", ".saveBtn", saveToDo);

$(".container").on("click", "button", function (event) {
    if ($(event.currentTarget).hasClass("saveBtn")) {
        saveToDo(event);
    }

    if ($(event.currentTarget).hasClass("checkBtn")) {
        checkBox(event);
    }
});
