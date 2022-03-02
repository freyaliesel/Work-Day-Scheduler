var time = dayjs().format("hA");
var schedule = {};

// testing area
var testSchedule = {
    date: "03 02 2022",
    hour9: [9, "test content"],
    hour10: [10, ""],
    hour11: [11, ""],
    hour12: [12, "more test content"],
    hour1: [1, ""],
    hour2: [2, ""],
    hour3: [3, "third test content"],
    hour4: [4, ""],
    hour5: [5, ""],
};

// console.log(testSchedule);
// localStorage.setItem("schedule", JSON.stringify(testSchedule));
// end testing area

// check if there is a schedule in local memory
// may need to adjust property names, otherwise doesnt need to change for iterative generation
function checkSchedule() {
    console.log("checking for saved schedule");
    var savedSchedule = JSON.parse(localStorage.getItem("schedule"));

    if (savedSchedule !== null) {
        if (savedSchedule.date === dayjs().format("MM DD YYYY")) {
            schedule = savedSchedule;
        }
    } else {
        schedule = {
            date: dayjs().format("MM DD YYYY"),
            hour9: [9, ""],
            hour10: [10, ""],
            hour11: [11, ""],
            hour12: [12, ""],
            hour1: [1, ""],
            hour2: [2, ""],
            hour3: [3, ""],
            hour4: [4, ""],
            hour5: [5, ""],
        };
    }
    console.log(schedule);
}

// display saved schedule if it is for today
// this needs to generate the html
function showSchedule() {
    checkSchedule();
    console.log("showing current schedule");
    let index = 9;
    console.log(Object.entries(schedule));

    // schedule.hours.forEach((hour) => {
    //     var rowEl = $("<div>").addClass("row time-block").attr('id', PLACEHOLDERVALUE);
    //     var colEl = $("<div>").addClass("d-flex justify-content-center align-items-center text-center col-1 hour").text(dayjs().hour(index).format('hA'));
    //     var inputEl = $("<textarea>").addClass("col-10 description").val(hour);
    //     var btnEl = $("<button>").addClass("btn saveBtn col-1");
    //     var iconEl = $("<i>").addClass("fa-solid fa-floppy-disk");
    //     btnEl.append(iconEl);
    //     rowEl.append(colEl, inputEl, btnEl);
    //     $('.container').append(rowEl)
    //     index++;
    //     // console.log(rowEl.children());
    // });

    // colorCoding();
}

// save to/do's
// this will probably need to change to account for changes in how the html is generated
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
// this may not need to exist?
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
