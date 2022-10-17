import "../css/HoursLine.css";

function setCurrent(event) {
    var curHour = document.getElementsByClassName("current-hour")[0];
    if (curHour) curHour.classList.remove("current-hour");

    var deleteBtn = document.getElementById("delete-btn");
    if (event.target.classList.contains("busy-hour")) deleteBtn.hidden = false;
    else deleteBtn.hidden = true;

    event.target.classList.add("current-hour");
}

function HoursLine({ firstday, daysCount, time, all_days }) {
    var cellDay = 0;
    var cellMonth = 0;
    var cellYear = 0;
    var cellDate = "";
    var eventCells = [];

    for (var i = 0; i < 7; i++) {
        cellDay = firstday.getDate();
        cellMonth = firstday.getMonth() + 1;
        cellYear = firstday.getFullYear();

        // Fix cell day part
        cellDay += i;
        // console.log(daysCount);
        if (cellDay > daysCount) {
            cellDay -= daysCount;
            cellMonth += 1;
        }
        if (cellDay < 10) cellDay = `0${cellDay}`;
        else cellDay = `${cellDay}`;
        // console.log(cellDay);

        // Fix cell month part
        if (cellMonth < 10) cellMonth = `0${cellMonth}`;

        cellDate = `${cellDay}.${cellMonth}.${cellYear} ${time}`;

        console.log(all_days);
        var isBusy = false;
        // for (day in all_days) console.log(day);
        console.log(cellDate in all_days);
        
        eventCells.push(
            <td
                id={cellDate}
                // className={isBusy(cellDate) ? "busy-hour" : ""}
                onClick={setCurrent}
            />
        );
    }

    return (
        <tr>
            <td>{time}</td>
            {eventCells}
        </tr>
    );
}

export default HoursLine;
