import { useState, useEffect } from "react";
import "../css/DaysLine.css";
import Weekday from "./Weekday";
import HoursLine from "./HoursLine";
import PrevArrow from "../assets/prev-arrow.png";
import NextArrow from "../assets/next-arrow.png";

function DaysLine() {
    const [date, SetDate] = useState(new Date());
    const [curMonth, SetCurMonth] = useState("");
    const [curWeek, SetCurWeek] = useState([]);
    const [curHours, SetCurHours] = useState([]);
    const [allDays, setDays] = useState([]);

    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    function daysInMonth(year, month) {
        var days = new Date(year, month + 1, 0).getDate();
        return days;
    }

    function getFirstWeekDay(move) {
        var firstday = new Date(
            date.setDate(date.getDate() - date.getDay() + move)
        );
        return firstday;
    }

    function genWeek(firstWeekDay) {
        var week = [];
        for (var i = 0; i < 7; i++) {
            var day = firstWeekDay.getDate() + i;
            var daysCount = daysInMonth(date.getFullYear(), date.getMonth());
            if (day > daysCount) day -= daysCount;

            week.push(
                <Weekday
                    ltr={weekdays[firstWeekDay.getDay() + i]}
                    day={day}
                    current={
                        new Date().getDate() === firstWeekDay.getDate() + i &&
                        new Date().getMonth() === firstWeekDay.getMonth() &&
                        new Date().getFullYear() === firstWeekDay.getFullYear()
                            ? true
                            : false
                    }
                />
            );
        }
        return week;
    }

    function makeEmpty() {
        var curHour = document.getElementsByClassName("current-hour")[0];
        if (curHour)
            if (curHour.classList.contains("busy-hour")) {
                curHour.classList.remove("current-hour");
                curHour.classList.remove("busy-hour");
                var deleteBtn = document.getElementById("delete-btn");
                deleteBtn.hidden = true;

                const xhr = new XMLHttpRequest();
                xhr.open(
                    "DELETE",
                    `http://127.0.0.1:8000/remove_day/${curHour.id}`
                );
                xhr.send();
            }
    }

    useEffect(() => {
        async function getBusy() {
            try {
                var promise = await fetch(`http://localhost:3003/`);
                var days = await promise.json();
                // setDays([1, 2]);
                setDays(days);
                // console.log(days);
                // console.log(allDays);

                // console.log(promise.status);
                // var busy = promise.json();
                // console.log(busy);
            } catch {}
        }

        function genHours(firstWeekDay) {
            getBusy();

            var hours = [];
            var time = "";
            var daysCount = daysInMonth(date.getFullYear(), date.getMonth());
            for (var i = 0; i < 24; i++) {
                if (i < 10) time = `0${i}:00`;
                else time = `${i}:00`;

                hours.push(
                    <HoursLine
                        firstday={firstWeekDay}
                        daysCount={daysCount}
                        time={time}
                        all_days={allDays}
                    />
                );
            }
            return hours;
        }

        var firstWeekDay = getFirstWeekDay(0);
        SetCurWeek(genWeek(firstWeekDay));
        SetCurHours(genHours(firstWeekDay));

        function updateMonth() {
            var curDate = date.toDateString().split(" ");
            SetCurMonth(`${curDate[1]} ${curDate[3]}`);
        }
        updateMonth();

        var prevMonthBtn = document.getElementById("prev-month");
        prevMonthBtn.onclick = function () {
            var firstWeekDay = getFirstWeekDay(-7);
            SetCurWeek(genWeek(firstWeekDay));
            SetCurHours(genHours(firstWeekDay));
            updateMonth();
        };

        var nextMonthBtn = document.getElementById("next-month");
        nextMonthBtn.onclick = function () {
            var firstWeekDay = getFirstWeekDay(7);
            SetCurWeek(genWeek(firstWeekDay));
            SetCurHours(genHours(firstWeekDay));
            updateMonth();
        };

        // Btn from Footer Bar
        var todayBtn = document.getElementById("today-btn");
        todayBtn.onclick = function () {
            date.setDate(new Date().getDate());
            date.setMonth(new Date().getMonth());
            date.setFullYear(new Date().getFullYear());

            var firstday = getFirstWeekDay(0);
            SetCurWeek(genWeek(firstday));
            SetCurHours(genHours(firstday));
            updateMonth();
        };
    }, []);
    // console.log(allDays);

    return (
        <div className="month-info-bg">
            <div className="daysline-bg">
                <div className="month-info">
                    <div className="calendar-daysline">{curWeek}</div>
                    <div className="current-date">
                        <img
                            id="prev-month"
                            className="month-arrow"
                            src={PrevArrow}
                            alt="prev month"
                        />
                        <span>{curMonth}</span>
                        <img
                            id="next-month"
                            className="month-arrow"
                            src={NextArrow}
                            alt="next month"
                        />
                    </div>
                </div>
            </div>

            <div className="calendar-hourstable">
                <table className="hours-table">
                    <tbody>{curHours}</tbody>
                </table>
            </div>

            <div className="footer-bar">
                <div id="today-btn" className="footer-btn">
                    <span>Today</span>
                </div>
                <div
                    id="delete-btn"
                    className="footer-btn"
                    onClick={makeEmpty}
                    hidden
                >
                    <span>Delete</span>
                </div>
            </div>
        </div>
    );
}

export default DaysLine;
