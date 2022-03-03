var time = dayjs().format("hA");
var schedule = {};

// testing area
var testSchedule = {
    date: "03 03 2022",
    toDos: {
        hour9: "test",
        hour10: "",
        hour11: "",
        hour12: "second test",
        hour13: "",
        hour14: "",
        hour15: "third test",
        hour16: "",
        hour17: "",
    },
};

console.log(testSchedule);
// localStorage.setItem("schedule", JSON.stringify(testSchedule));
// end testing area

// check if there is a schedule in local memory
// need to change structure of object. I need to access the hours individually, compare time, and get at the text
// currently seems overly complicated, and there is probably a better approach
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
    console.log(schedule);
}

// display saved schedule if it is for today
// this needs to generate the html
function showSchedule() {
    checkSchedule();
    console.log("showing current schedule");
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
        $("<textarea>")
            .addClass("col-10 description")
            .val(toDo)
            .appendTo(rowEl);
        $("<button>")
            .addClass("btn saveBtn col-1")
            .appendTo(rowEl)
            .append("<i>")
            .addClass("fa-solid fa-floppy-disk");
    }
    // colorCoding();
}

// save to/do's
// this will need to change to account for changes in how the html is generated
function saveToDo(event) {
    event.preventDefault();
    console.log(`saving toDo`);
    var current = $(event.currentTarget);
    console.log(current.parents());

    // save the text in the matching spot in the schedule
    schedule.hours.forEach((hour) => {
        if (current.parent("div").attr("id") == hour) {
            schedule[key] = current.siblings("textarea").val();
        }
    });

    localStorage.setItem("schedule", JSON.stringify(schedule));
    // console.log(schedule);
}

// change color of time blocks based on time
// lowest priority
// function colorCoding() {
//     console.log(`color code timeblocks`);
//     timeBlocks.each(function () {
//         var current = $(this);
//         var currentTime = current.children("div").text().trim();
//         var currentText = current.children("textarea");
//         if (currentTime == time) {
//             console.log(time);
//             currentText.attr("class", "col-md-10 description present");
//         }
//     });
// }

// DEFINITIONS ONLY ABOVE THIS POINT

// timer function to track and update time and date
setInterval(function () {
    time = dayjs().format("hA");
    $("#currentTime").text(dayjs().format("hh:mm:ss"));
}, 1000);

// display the date
$("#currentDay").text(dayjs().format("dddd, MMM Do, YYYY"));

showSchedule();

// event listener/delegation for buttons
$(".container").on("click", "button", saveToDo);
