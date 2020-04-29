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


// There are textareas where the user can type events for the day
//      - there is a save button, and a lable with the hour
// 

// *******saving stuff******
// When the save button is clicked, the events typed in the text areas will be saved in local storage
// When the page is resfreshed, the events will still be where they were inputted

// *********Elapsed time color change******
// Depending on the current time, events that are past, present or future will be displayed as different colors.
//         -When an event is in the past, it will be grey
//         -When an event is in the future, it will be blue
//         -When an event is in the present hour, it will be green