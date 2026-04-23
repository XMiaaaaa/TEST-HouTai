import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye 
} from 'lucide-react'

import Modal from '../components/Modal'
import ExamDetailModal from '../components/ExamDetailModal'

interface Exam {
  id: number
  examDate: string
  location: string
  coach: string
  studentCount: number
  passedCount: number
  failedCount: number
  notes: string
}

const ExamManagement = () => {
  // 模拟数据
  const [exams, setExams] = useState<Exam[]>([
    { 
      id: 1, 
      examDate: '2026-04-15', 
      location: '科目一考场', 
      coach: '张教练', 
      studentCount: 20, 
      passedCount: 18, 
      failedCount: 2, 
      notes: '春季班第一次考试'
    },
    { 
      id: 2, 
      examDate: '2026-04-10', 
      location: '科目二考场', 
      coach: '李教练', 
      studentCount: 15, 
      passedCount: 12, 
      failedCount: 3, 
      notes: '夏季班第一次考试'
    },
    { 
      id: 3, 
      examDate: '2026-04-05', 
      location: '科目一考场', 
      coach: '王教练', 
      studentCount: 18, 
      passedCount: 16, 
      failedCount: 2, 
      notes: '秋季班补考'
    },
    { 
      id: 4, 
      examDate: '2026-03-30', 
      location: '科目三考场', 
      coach: '张教练', 
      studentCount: 12, 
      passedCount: 10, 
      failedCount: 2, 
      notes: '冬季班第二次考试'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    examDate: '',
    location: '',
    coach: '',
    studentCount: '',
    passedCount: '',
    failedCount: '',
    notes: ''
  })
  const [isExamDetailModalOpen, setIsExamDetailModalOpen] = useState(false)
  const [selectedExamId, setSelectedExamId] = useState(0)

  // 搜索过滤
  const filteredExams = exams.filter(exam => 
    exam.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.coach.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 删除考试记录
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个考试记录吗？')) {
      setExams(exams.filter(exam => exam.id !== id))
    }
  }

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 创建新考试记录
    const newExam: Exam = {
      id: exams.length + 1,
      examDate: formData.examDate,
      location: formData.location,
      coach: formData.coach,
      studentCount: parseInt(formData.studentCount) || 0,
      passedCount: parseInt(formData.passedCount) || 0,
      failedCount: parseInt(formData.failedCount) || 0,
      notes: formData.notes
    }
    setExams(prev => [...prev, newExam])
    // 重置表单并关闭弹窗
    setFormData({
      examDate: '',
      location: '',
      coach: '',
      studentCount: '',
      passedCount: '',
      failedCount: '',
      notes: ''
    })
    setIsModalOpen(false)
  }

  // 打开考试详情弹窗
  const openExamDetailModal = (examId: number) => {
    setSelectedExamId(examId)
    setIsExamDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">考试管理</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus size={18} className="mr-2" />
          新增考试记录
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="搜索考试场地或教练"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 考试记录列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                考试时间
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                考试场地
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                带队教练
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                参考学员
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                通过学员
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                挂科学员
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                备注
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.examDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {exam.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.coach}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.studentCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {exam.passedCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  {exam.failedCount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {exam.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => openExamDetailModal(exam.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(exam.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          显示 1 到 {filteredExams.length} 条，共 {exams.length} 条
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
            上一页
          </button>
          <button className="px-3 py-1 border border-primary rounded-md text-sm bg-primary text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
            下一页
          </button>
        </div>
      </div>

      {/* 新增考试记录弹窗 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="新增考试记录">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">考试时间</label>
              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">考试场地</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入考试场地"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">带队教练</label>
              <input
                type="text"
                name="coach"
                value={formData.coach}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入教练姓名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">参考学员</label>
              <input
                type="number"
                name="studentCount"
                value={formData.studentCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入参考人数"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">通过学员</label>
              <input
                type="number"
                name="passedCount"
                value={formData.passedCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入通过人数"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">挂科学员</label>
              <input
                type="number"
                name="failedCount"
                value={formData.failedCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入挂科人数"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="请输入备注信息"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700"
            >
              确认
            </button>
          </div>
        </form>
      </Modal>

      {/* 考试详情弹窗 */}
      <ExamDetailModal 
        isOpen={isExamDetailModalOpen} 
        onClose={() => setIsExamDetailModalOpen(false)}
        examId={selectedExamId}
      />
    </div>
  )
}

export default ExamManagement