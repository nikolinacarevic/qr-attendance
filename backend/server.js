const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const attendanceSchema = new mongoose.Schema({
  sessionId: String,
  username: String,
  firstName: String,
  lastName: String,
  subjectName: String,
  timestamp: { type: Date, default: Date.now },
});

const studentsSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const subjectsSchema = new mongoose.Schema({
  name: String,
  location: String,
  time: String,
  day: String,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
const Students=mongoose.model("Students",studentsSchema);
const Subjects=mongoose.model("Subjects",subjectsSchema);

// API za dohvat svih studenata
app.get('/api/attendance', async (req, res) => {
  try {
    const records = await Attendance.find(); // Prilagodi ovisno o bazi (MongoDB, PostgreSQL, itd.)
    res.json(records);
  } catch (error) {
    console.error('Greška pri dohvaćanju prisutnosti:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const records = await Students.find(); // Prilagodi ovisno o bazi (MongoDB, PostgreSQL, itd.)
    res.json(records);
  } catch (error) {
    console.error('Greška pri dohvaćanju studenata:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

app.get('/api/subjects', async (req, res) => {
  try {
    const records = await Subjects.find(); // Prilagodi ovisno o bazi (MongoDB, PostgreSQL, itd.)
    res.json(records);
  } catch (error) {
    console.error('Greška pri dohvaćanju predmeta:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

// API endpoint za dohvat prisutnih studenata
app.get('/api/attendance/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const students = await Attendance.find({ sessionId: sessionId });

    if (!students) {
      return res.status(404).json({ message: 'Nema prisutnih studenata za ovu sesiju.' });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Došlo je do pogreške pri dohvaćanju podataka.' });
  }
});


app.post("/attend", async (req, res) => {
  try {
    const { sessionId, username, firstName, lastName, subjectName } = req.body;

    const newAttendance = new Attendance({ sessionId, username, firstName, lastName, subjectName });
    await newAttendance.save();

    res.json({ success: true, message: "Prisutnost uspješno evidentirana!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Greška na serveru." });
  }
});

app.post("/students", async (req, res) => {
  try {
    const {  username, firstName, lastName, password } = req.body;

    const newStudents = new Students({ username, firstName, lastName, password });
    await newStudents.save();

    res.json({ success: true, message: "Novi student!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Greška na serveru." });
  }
});

app.post("/subjects", async (req, res) => {
  try {
    const { name, location, time, day } = req.body;

    const newSubjects = new Subjects({ name, location, time, day });
    await newSubjects.save();

    res.json({ success: true, message: "Novi predmet!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Greška na serveru." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
