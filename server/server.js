const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'aimazing'
});
app.get('/api/spent_table', (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const sqlQuery = 'SELECT * FROM spent_table WHERE spent_date BETWEEN ? AND ?';
    db.query(sqlQuery, [startDate, endDate], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to fetch data');
            return;
        }

        res.json(results);
    });
});


app.post('/api/insert', (req, res) => {
    const amount = req.body.amount;
    const date = req.body.date;
    const sqlInsert = "INSERT INTO spent_table (amount, spent_date) VALUES (?, ?) ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount)";
    db.query(
        sqlInsert, [amount, date],
        (err, results, fields) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to insert data');
                return;
            }
            res.send(results);
        }
    );
});

app.listen(3001, () => { console.log('running on port 3001') });
