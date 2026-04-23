const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool, testConnection } = require('./config');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 学生相关API
app.get('/api/students', async (req, res) => {
  try {
    console.log('Fetching students...');
    const [rows] = await pool.query('SELECT * FROM students');
    console.log('Students fetched successfully:', rows.length);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const { name, gender, phone, email, address, photo, id_card } = req.body;
    const [result] = await pool.query(
      'INSERT INTO students (name, gender, phone, email, address, photo, id_card) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, gender, phone, email, address, photo, id_card]
    );
    res.json({ id: result.insertId, message: 'Student created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 班级相关API
app.get('/api/classes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM classes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/classes', async (req, res) => {
  try {
    const { class_name, coach_id, start_date, end_date, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO classes (class_name, coach_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)',
      [class_name, coach_id, start_date, end_date, status]
    );
    res.json({ id: result.insertId, message: 'Class created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 教练相关API
app.get('/api/coaches', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM coaches');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/coaches', async (req, res) => {
  try {
    const { name, gender, phone, email, address, photo, id_card, speciality } = req.body;
    const [result] = await pool.query(
      'INSERT INTO coaches (name, gender, phone, email, address, photo, id_card, speciality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, gender, phone, email, address, photo, id_card, speciality]
    );
    res.json({ id: result.insertId, message: 'Coach created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 考试相关API
app.get('/api/exams', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exams');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/exams', async (req, res) => {
  try {
    const { exam_name, exam_date, exam_location_id, exam_type, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO exams (exam_name, exam_date, exam_location_id, exam_type, status) VALUES (?, ?, ?, ?, ?)',
      [exam_name, exam_date, exam_location_id, exam_type, status]
    );
    res.json({ id: result.insertId, message: 'Exam created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 考试地点相关API
app.get('/api/exam-locations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_locations');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/exam-locations', async (req, res) => {
  try {
    const { location_name, address, capacity, contact_person, contact_phone } = req.body;
    const [result] = await pool.query(
      'INSERT INTO exam_locations (location_name, address, capacity, contact_person, contact_phone) VALUES (?, ?, ?, ?, ?)',
      [location_name, address, capacity, contact_person, contact_phone]
    );
    res.json({ id: result.insertId, message: 'Exam location created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 考试记录相关API
app.get('/api/exam-records', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_records');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/exam-records', async (req, res) => {
  try {
    const { student_id, exam_id, score, pass_status, exam_time, notes } = req.body;
    const [result] = await pool.query(
      'INSERT INTO exam_records (student_id, exam_id, score, pass_status, exam_time, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, exam_id, score, pass_status, exam_time, notes]
    );
    res.json({ id: result.insertId, message: 'Exam record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
