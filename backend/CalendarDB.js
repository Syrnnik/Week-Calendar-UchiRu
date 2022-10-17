const sqlite3 = require("sqlite3");

class CalendarDB {
    constructor(db_path) {
        this.tablename = "calendar";
        this.col_id = "id";

        this.db = new sqlite3.Database(
            db_path,
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err && err.code == "SQLITE_CANTOPEN") {
                    this.createDB();
                    return;
                } else if (err) {
                    console.log("Getting error " + err);
                    exit(1);
                }
            }
        );
    }

    // CREATE DB
    createDB() {
        this.db = new sqlite3.Database("./.db", (err) => {
            if (err) {
                console.log("Getting error " + err);
                exit(1);
            }
            this.createTable(this.db);
        });
    }

    // CREATE TABLE
    createTable() {
        this.db.run(`
    CREATE TABLE IF NOT EXISTS ${this.tablename} (
        ${this.col_id} TEXT NOT NULL PRIMARY KEY
    );
        `);
    }

    // ADD NEW DAY WITH ID
    addDay(req, res) {
        var id = req.query.id;
        // console.log(id);
        this.db.run(
            `INSERT INTO ${this.tablename} (${this.col_id}) VALUES ('${id}');`,
            (err, day) => {
                res.send("");
            }
        );
    }

    // GET ALL DAYS
    getAllDays(req, res) {
        this.db.all(
            `SELECT ${this.col_id} FROM ${this.tablename};`,
            (err, days) => {
                // console.log(days);
                res.send(days);
            }
        );
    }

    // GET DAY BY ID
    isBusy(req, res) {
        var id = req.query.id;
        // console.log(id);
        this.db.get(
            `SELECT ${this.col_id} FROM ${this.tablename} WHERE ${this.col_id}='${id}';`,
            (err, day) => {
                // console.log(day);
                if (day !== undefined) {
                    // res.status(200);
                    res.send(true);
                } else {
                    // res.status(404);
                    res.send(false);
                }
            }
        );
    }

    // REMOVE DAY BY ID
    removeDay(req, res) {
        var id = req.query.id;
        this.db.run(
            `DELETE FROM ${this.tablename} WHERE ${this.col_id}='${id}';`,
            (err, day) => {
                res.send("");
            }
        );
    }
}

module.exports = { CalendarDB };
