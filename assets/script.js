var today = moment();

const schedule = {
    date: today,
    nine: "",
    ten: "",
    eleven: "",
    twelve: "",
    one: "",
    two: "",
    three: "",
    four: "",

}

// first display the date
$("#currentDay").text(today.format("MMM Do, YYYY"));

// display saved schedule if it is for today
function showSchedule() {
    checkSchedule();
    console.log("updating schedule");
}

// check if there is a schedule in local memory
function checkSchedule() {
    console.log("checking for saved schedule");
    var savedSchedule = JSON.parse(localStorage.getItem("schedule"));

}

// function to change color of time blocks based on time

// function to save to/do's
function saveToDo(event) {
    event.preventDefault();
    var toDo =($(event.currentTarget).siblings("textarea").val());
    console.log(toDo);

}

showSchedule();

// event listener/delegation for buttons
$(".container").on("click", "button", saveToDo);