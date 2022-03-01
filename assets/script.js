var today = dayjs();
var timeBlocks = $(".time-block");

var schedule = {};

// testing area
var testSchedule = {
    date: "03 01 2022",
    nine: "test",
    ten: "",
    eleven: "",
    twelve: "",
    one: "another test",
    two: "",
    three: "",
    four: "",
    five: "",
};
// console.log(testSchedule);
localStorage.setItem("schedule", JSON.stringify(testSchedule));
// end testing area

// check if there is a schedule in local memory
function checkSchedule() {
    console.log("checking for saved schedule");
    var savedSchedule = JSON.parse(localStorage.getItem("schedule"));

    if (savedSchedule !== null) {
        if (savedSchedule.date === today.format("MM DD YYYY")) {
            schedule = savedSchedule;
        }
    } else {
        schedule = {
            date: today.format("MM DD YYYY"),
            nine: "",
            ten: "",
            eleven: "",
            twelve: "",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
        };
    }
    console.log(schedule);
}

// display saved schedule if it is for today
function showSchedule() {
    checkSchedule();
    console.log("showing current schedule");

    timeBlocks.each(function () {
        var current = $(this);
        for (const [key, value] of Object.entries(schedule)) {
            if (current.attr("id") == key) {
                current.children("textarea").val(value);
            }
        }
    });
}

// save to/do's
function saveToDo(event) {
    event.preventDefault();
    var current = $(event.currentTarget);

    // save the text in the matching spot in the schedule
    Object.keys(schedule).forEach(function (key) {
        if (current.parent("div").attr("id") == key) {
            schedule[key] = current.siblings("textarea").val();
        }
    });
    console.log(schedule);
}

// timer function to track time

// function to change color of time blocks based on time

// DEFINITIONS ONLY ABOVE THIS POINT

// display the date
$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));

showSchedule();

// event listener/delegation for buttons
$(".container").on("click", "button", saveToDo);
