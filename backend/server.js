const express = require("express");
const DB = require("./CalendarDB");
const cors = require("cors");

// DB
const calendarDB = new DB.CalendarDB("./.db");

// HTTP SERVER
const port = 3003;
const app = express();

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    calendarDB.getAllDays(req, res);
});

app.get("/isBusy", (req, res) => {
    calendarDB.isBusy(req, res);
});

app.post("/", (req, res) => {
    calendarDB.addDay(req, res);
});

app.delete("/", (req, res) => {
    calendarDB.removeDay(req, res);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/`);
});
