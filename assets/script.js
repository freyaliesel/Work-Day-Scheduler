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
            toDos: [
                { time: "hour-9", description: "", isCompleted: false },
                { time: "hour-10", description: "", isCompleted: false },
                { time: "hour-11", description: "", isCompleted: false },
                { time: "hour-12", description: "", isCompleted: false },
                { time: "hour-13", description: "", isCompleted: false },
                { time: "hour-14", description: "", isCompleted: false },
                { time: "hour-15", description: "", isCompleted: false },
                { time: "hour-16", description: "", isCompleted: false },
                { time: "hour-17", description: "", isCompleted: false },
            ],
        };
    }
}

// display saved schedule
function showSchedule() {
    checkSchedule();
    console.log("showing current schedule");
    // empty the div first
    $(".container").empty();
    schedule.toDos.forEach((toDo) => {
        var hour = toDo.time.substring(toDo.time.indexOf("-") + 1);
        var rowEl = $("<div>")
            .addClass("row time-block")
            .attr("id", toDo.time)
            .appendTo(".container");
        $("<div>")
            .addClass(
                "d-flex justify-content-center align-items-center text-center col-1 hour"
            )
            .text(dayjs().hour(hour).format("hA"))
            .appendTo(rowEl);
        var textEl = $("<textarea>")
            .val(toDo.description)
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
        const timeBlock = dayjs().hour(hour);
        const now = dayjs();

        if (timeBlock.diff(now, "hour") == 0) {
            textEl.addClass("present");
        } else if (timeBlock.diff(now, "hour") > 0) {
            textEl.addClass("future");
        } else {
            textEl.addClass("past");
        }

        // apply checkmarks as appropriate
        if (toDo.isCompleted) {
            checkEl.addClass("btn-success");
            checkEl.children("i").addClass("fa-square-check");
        } else {
            checkEl.addClass("btn-secondary");
            checkEl.children("i").addClass("fa-square");
        }
    });
}

// save to/do's
function saveToDo(event) {
    event.preventDefault();
    console.log(`saving toDo`);
    var current = $(event.currentTarget);
    // save the text in the matching spot in the schedule
    schedule.toDos.forEach((task) => {
        if (current.parent("div").attr("id") == task.time) {
            task.description = current.siblings("textarea").val();
            if (current.siblings(".checkBtn").hasClass("btn-success")) {
                task.isCompleted = true;
            } else {
                task.isCompleted = false;
            }
        }
    });
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// toggle checkboxes
function checkBox(event) {
    event.preventDefault();
    var button = $(event.currentTarget);
    if (button.hasClass("btn-secondary")) {
        button.removeClass("btn-secondary").addClass("btn-success");
        button
            .children("i")
            .removeClass("fa-square")
            .addClass("fa-square-check");
    } else {
        button.removeClass("btn-success").addClass("btn-secondary");
        button
            .children("i")
            .removeClass("fa-square-check")
            .addClass("fa-square");
    }
}

function autoSave() {
    console.log(`autosaving`);
    $("textarea").each(function () {
        var current = $(this);
        schedule.toDos.forEach((task) => {
            if (current.parent("div").attr("id") == task.time) {
                task.description = current.val();
                if (current.siblings(".checkBtn").hasClass("btn-success")) {
                    task.isCompleted = true;
                } else {
                    task.isCompleted = false;
                }
            }
        });
    });
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// update the date
function displayDate() {
    $("#currentDay").text(dayjs().format("dddd, MMM Do, YYYY"));
    $("#currentTime").text(dayjs().format("h:mm a"));
}

setInterval(function () {
    displayDate();
    if (dayjs().format("mmss") == 0) {
        autoSave();
        showSchedule;
    }
}, 1000);

displayDate();
showSchedule();

// event listener/delegation for buttons
$(".container").on("click", "button", function (event) {
    if ($(event.currentTarget).hasClass("saveBtn")) {
        saveToDo(event);
    }

    if ($(event.currentTarget).hasClass("checkBtn")) {
        checkBox(event);
    }
});
