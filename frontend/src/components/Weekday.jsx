import "../css/Weekday.css";

function Weekday({ ltr, day, current }) {
    return (
        <div className="daysline-weekday">
            <span className="weekday-ltr">{ltr}</span>
            <span id={current ? "current-day" : ""} className="weekday-day">
                {day}
            </span>
        </div>
    );
}

export default Weekday;
