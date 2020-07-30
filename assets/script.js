let events;
let eventObject;

// cited https://stackoverflow.com/questions/10590461/dynamic-date-and-time-with-moment-js-and-setinterval
// when the page opens, the date and time are displayed at the top
let dateAndTime = null,
        date = null;
// this updates the date and time with the current date.time
const update = function () {
    date = moment(new Date())
    dateAndTime.html(date.format('dddd, MMMM Do YYYY, h:mm a'));
};
$(document).ready(() => {
    dateAndTime = $(".display-date")
    // this calls the update function written above
    update();
    // This updates it every second
    setInterval(update, 1000);
});

// text that the user already put in and saved should appear when the page is reloaded.
events = getEventsFromLocalStorage();
// This will take the last array in the object from local storage and render it in the appropriate textarea

$(".9-am").text(events[events.length - 1].nineAM);
$(".10-am").text(events[events.length - 1].tenAM);
$(".11-am").text(events[events.length - 1].elevenAM);
$(".12-pm").text(events[events.length - 1].twelvePM);
$(".1-pm").text(events[events.length - 1].onePM);
$(".2-pm").text(events[events.length - 1].twoPM);
$(".3-pm").text(events[events.length - 1].threePM);
$(".4-pm").text(events[events.length - 1].fourPM);
$(".5-pm").text(events[events.length - 1].fivePM);
$(".6-pm").text(events[events.length - 1].sixPM);
$(".7-pm").text(events[events.length - 1].sevenPM);


// *******saving stuff******
// When a save button is clicked, the events typed in the text areas will be saved in local storage using the function saveEvents
$(".save-btn").on("click", saveEvents);

function saveEvents(event){
    event.preventDefault();
    // Object is created with the values of the textareas to be stored in local storage
    eventObject = {
        nineAM: $(".9-am").val(),
        tenAM: $(".10-am").val(),
        elevenAM: $(".11-am").val(),
        twelvePM: $(".12-pm").val(),
        onePM: $(".1-pm").val(),
        twoPM: $(".2-pm").val(),
        threePM: $(".3-pm").val(),
        fourPM: $(".4-pm").val(),
        fivePM: $(".5-pm").val(),
        sixPM: $(".6-pm").val(),
        sevenPM: $(".7-pm").val()
    }
    // This gets whatever is already saved in local storage, and then adds onto it
    let events = getEventsFromLocalStorage();
    events.push(eventObject);
    let eventsJSON = JSON.stringify(events);
    localStorage.setItem("events", eventsJSON);
}
// get any data that is already saved in local storage
function getEventsFromLocalStorage(){
    events = localStorage.getItem("events");
    if (events){
        return JSON.parse(events);
    } else {
        return [""];
    }
}
// *********Elapsed time color change******
// Depending on the current time, events that are past, present or future will be displayed as different colors.
 const m = moment(new Date);
//  grab the data from the text areas, compare it with the current hour

// This is an array of the classes for my textarea elements
const textareaArray = [$(".9-am"), $(".10-am"), $(".11-am"), $(".12-pm"), $(".1-pm"), $(".2-pm"), $(".3-pm"), $(".4-pm"), $(".5-pm"), $(".6-pm"), $(".7-pm")]
textareaArray.forEach((time) => {
    // for each textarea element in my array, grab the data attribute
    dataHour = time.attr("data-input");
    // compare the current hour from moment.js to the data attribute for each textarea element and shade/adjust css accordingly
    if (m.format("HH") === dataHour){
        // the current hour will have a green background, larger white text, a border, and the textarea height will be larger
        time.css({"background-color": "#51915a", "color": "white", "font-size": "25px", "min-height": "140px", "border": "3px solid #1f437a"});
    } else if (m.format("HH") < dataHour){
        time.css({"background-color": "#e3eb9d", "color": "#38543c"});
    } else {
        time.css({"background-color": "grey", "color": "#383636", "text-decoration": "line-through"});
    }
})


// Clear button will clear the calendar
$(".clear-button").on("click", () => {
    // when the clear button is clicked, local storage is cleared
    localStorage.clear();
    // and the page reloads
    window.location.reload();
});