import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ClassManagement from './pages/ClassManagement'
import ExamLocationManagement from './pages/ExamLocationManagement'
import ExamLocationDetail from './pages/ExamLocationDetail'
import ExamRecordManagement from './pages/ExamRecordManagement'
import StudentManagement from './pages/StudentManagement'
import CoachManagement from './pages/CoachManagement'
import StudentDetail from './pages/StudentDetail'
import ExamDetail from './pages/ExamDetail'
import ClassDetail from './pages/ClassDetail'
import CoachDetail from './pages/CoachDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/class-management" element={<ClassManagement />} />
          <Route path="/class/:id" element={<ClassDetail />} />
          <Route path="/exam-management" element={<ExamRecordManagement />} />
          <Route path="/exam-management/locations" element={<ExamLocationManagement />} />
          <Route path="/exam-location/:id" element={<ExamLocationDetail />} />
          <Route path="/exam/:id" element={<ExamDetail />} />
          <Route path="/personnel-management/students" element={<StudentManagement />} />
          <Route path="/personnel-management/coaches" element={<CoachManagement />} />
          <Route path="/student/:id" element={<StudentDetail />} />
          <Route path="/coach/:id" element={<CoachDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App