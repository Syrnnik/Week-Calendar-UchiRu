import "../css/Calendar.css";
import AddBtn from "../assets/add-btn.png";
import DaysLine from "./DaysLine";

function makeBusy() {
    var curHour = document.getElementsByClassName("current-hour")[0];
    if (curHour) {
        curHour.className = "busy-hour";

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:3003/?id=${curHour.id}`);
        xhr.send();
    }
}

function Calendar() {
    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <span className="calendar-header-text">Interview Calendar</span>
                <img
                    className="add-event-btn"
                    src={AddBtn}
                    onClick={makeBusy}
                    alt="Add new event"
                />
            </div>
            <DaysLine />
        </div>
    );
}

export default Calendar;
