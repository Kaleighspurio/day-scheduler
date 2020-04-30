var eventInput9;
var eventInput10;
var eventInput11;
var eventInput12;
var eventInput1;
var eventInput2;
var eventInput3;
var eventInput4;
var eventInput5;
var eventInput6;
var eventInput7;
var events;
var eventObject;

// when the page opens, the date and time are displayed at the top
var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd MMMM Do YYYY, h:mm a'));
};

$(document).ready(function(){
    datetime = $(".display-date")
    update();
    setInterval(update, 1000);
});

// text that was already put in, should appear when the page is reloaded.
getEventsFromLocalStorage();
$(".form-control").text(events);
console.log(events);

// There are textareas where the user can type events for the day
//      - there is a save button, and a lable with the hour
// 

// *******saving stuff******
// When the save button is clicked, the events typed in the text areas will be saved in local storage
$(".btn").on("click", saveEvents);

function saveEvents(){
    eventInput9 = $(".9-am").val();
    eventInput10 = $(".10-am").val();
    eventInput11 = $("11-am").val();
    eventInput12 = $(".12-pm").val();
    eventInput1 = $(".1-pm").val();
    eventInput2 = $(".2-pm").val();
    eventInput3 = $(".3-pm").val();
    eventInput4 = $(".4-pm").val();
    eventInput5 = $(".5-pm").val();
    eventInput6 = $(".6-pm").val();
    eventInput7 = $(".7-pm").val();
    eventObject = {
        nineAM: eventInput9,
        tenAM: eventInput10,
        elevenAM: eventInput11,
        twelvePM: eventInput12,
        onePM: eventInput1,
        twoPM:eventInput2,
        threePM: eventInput3,
        fourPM: eventInput4,
        fivePM: eventInput5,
        sixPM: eventInput6,
        sevenPM: eventInput7
    }
    console.log(eventObject);
    var events = getEventsFromLocalStorage();
    events.push(eventObject);
    var eventsJSON = JSON.stringify(events);
    localStorage.setItem("events", eventsJSON);
}

function getEventsFromLocalStorage(){
    events = localStorage.getItem("events");
    if (events){
        return JSON.parse(events);
    } else {
        return [];
    }
}
//          1. create an object for the events in the schedule

// When the page is resfreshed, the events will still be where they were inputted

// *********Elapsed time color change******
// Depending on the current time, events that are past, present or future will be displayed as different colors.
//         -When an event is in the past, it will be grey
//         -When an event is in the future, it will be blue
//         -When an event is in the present hour, it will be green