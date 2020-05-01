var eventInput9AM;
var eventInput10AM;
var eventInput11AM;
var eventInput12PM;
var eventInput1PM;
var eventInput2PM;
var eventInput3PM;
var eventInput4PM;
var eventInput5PM;
var eventInput6PM;
var eventInput7PM;
var events;
var eventObject;

// cited https://stackoverflow.com/questions/10590461/dynamic-date-and-time-with-moment-js-and-setinterval
// when the page opens, the date and time are displayed at the top
var dateAndTime = null,
        date = null;
// this updates the date and time with the current date.time
var update = function () {
    date = moment(new Date())
    dateAndTime.html(date.format('dddd MMMM Do YYYY, h:mm a'));
};
$(document).ready(function(){
    dateAndTime = $(".display-date")
    // this calls the update function written above
    update();
    // This updates it every second
    setInterval(update, 1000);
});

// text that was already put in, should appear when the page is reloaded.
events = getEventsFromLocalStorage();
console.log(events)
// This will take the last array in the object and render it in the appropriate textarea
$(".9-am").text(events[events.length - 1].nineAM);
$(".10-am").text(events[events.length - 1].tenAM);
$(".11-am").text(events[events.length - 1].elevenAM);
$(".12-am").text(events[events.length - 1].twelvePM);
$(".1-pm").text(events[events.length - 1].onePM);
$(".2-pm").text(events[events.length - 1].twoPM);
$(".3-pm").text(events[events.length - 1].threePM);
$(".4-pm").text(events[events.length - 1].fourPM);
$(".5-pm").text(events[events.length - 1].fivePM);
$(".6-pm").text(events[events.length - 1].sixPM);
$(".7-pm").text(events[events.length - 1].sevenPM);


// *******saving stuff******
// When a save button is clicked, the events typed in the text areas will be saved in local storage using the function saveEvents
$(".btn").on("click", saveEvents);

function saveEvents(event){
    event.preventDefault();
    // These assign the value of what the user typed in the text area to variables
    eventInput9AM = $(".9-am").val();
    eventInput10AM = $(".10-am").val();
    eventInput11AM = $(".11-am").val();
    eventInput12PM = $(".12-pm").val();
    eventInput1PM = $(".1-pm").val();
    eventInput2PM = $(".2-pm").val();
    eventInput3PM = $(".3-pm").val();
    eventInput4PM = $(".4-pm").val();
    eventInput5PM = $(".5-pm").val();
    eventInput6PM = $(".6-pm").val();
    eventInput7PM = $(".7-pm").val();
    console.log(eventInput11AM);
    // Object is created with the values of the textareas to be stored in local storage
    eventObject = {
        nineAM: eventInput9AM,
        tenAM: eventInput10AM,
        elevenAM: eventInput11AM,
        twelvePM: eventInput12PM,
        onePM: eventInput1PM,
        twoPM:eventInput2PM,
        threePM: eventInput3PM,
        fourPM: eventInput4PM,
        fivePM: eventInput5PM,
        sixPM: eventInput6PM,
        sevenPM: eventInput7PM
    }
    console.log(eventObject);
    // This gets whatever is already saved in local storage, and then adds onto it
    var events = getEventsFromLocalStorage();
    events.push(eventObject);
    var eventsJSON = JSON.stringify(events);
    localStorage.setItem("events", eventsJSON);
}
// get any data that is already saved in local storage
function getEventsFromLocalStorage(){
    events = localStorage.getItem("events");
    if (events){
        return JSON.parse(events);
    } else {
        return [];
    }
}

// When the page is resfreshed, the events will still be where they were inputted


// *********Elapsed time color change******
// Depending on the current time, events that are past, present or future will be displayed as different colors.
//         -When an event is in the past, it will be grey
//         -When an event is in the future, it will be blue
//         -When an event is in the present hour, it will be green

// **************** What happens if it is a new day*********
// refresh when it is a new day
// When it is a new day, clear local storage