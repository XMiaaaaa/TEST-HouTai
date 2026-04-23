import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye
} from 'lucide-react'
import Modal from '../components/Modal'
import ExamRecordDetailModal from '../components/ExamRecordDetailModal'

interface ExamRecord {
  id: number
  examDate: string
  location: string
  coaches: string[]
  students: ExamStudent[]
  notes: string
}

interface ExamStudent {
  id: number
  name: string
  status: '通过' | '挂科' | '缺考'
  failureSubject?: string
  description: string
}

interface Class {
  id: number
  name: string
  students: {
    id: number
    name: string
  }[]
}

const ExamRecordManagement = () => {
  // 模拟考场数据
  const [examLocations] = useState([
    '科目一考场',
    '科目二考场',
    '科目三考场',
    '科目四考场'
  ])

  // 模拟教练数据
  const [coaches] = useState([
    '张教练',
    '李教练',
    '王教练',
    '赵教练'
  ])

  // 模拟班级数据
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: '2026年春季班',
      students: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
        { id: 4, name: '赵六' }
      ]
    },
    {
      id: 2,
      name: '2026年夏季班',
      students: [
        { id: 5, name: '钱七' },
        { id: 6, name: '孙八' },
        { id: 7, name: '周九' },
        { id: 8, name: '吴十' }
      ]
    }
  ])

  // 模拟考试记录数据
  const [examRecords, setExamRecords] = useState<ExamRecord[]>([
    { 
      id: 1, 
      examDate: '2026-04-15', 
      location: '科目一考场', 
      coaches: ['张教练'], 
      students: [
        { id: 1, name: '张三', status: '通过', description: '表现优秀' },
        { id: 2, name: '李四', status: '通过', description: '表现良好' },
        { id: 3, name: '王五', status: '挂科', description: '操作失误' },
        { id: 4, name: '赵六', status: '通过', description: '表现优秀' }
      ], 
      notes: '春季班第一次考试'
    },
    { 
      id: 2, 
      examDate: '2026-04-10', 
      location: '科目二考场', 
      coaches: ['李教练', '王教练'], 
      students: [
        { id: 5, name: '钱七', status: '通过', description: '表现良好' },
        { id: 6, name: '孙八', status: '挂科', description: '紧张失误' },
        { id: 7, name: '周九', status: '通过', description: '表现优秀' }
      ], 
      notes: '夏季班第一次考试'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<ExamRecord | null>(null)
  const [formData, setFormData] = useState({
    examDate: '',
    location: '',
    coaches: [] as string[],
    selectedClass: '',
    selectedStudents: [] as number[],
    students: [] as ExamStudent[],
    notes: ''
  })
  const [isExamDetailModalOpen, setIsExamDetailModalOpen] = useState(false)
  const [selectedExamId, setSelectedExamId] = useState(0)

  // 搜索过滤
  const filteredRecords = examRecords.filter(record => 
    record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.coaches.some(coach => coach.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // 处理教练选择
  const handleCoachSelect = (coach: string) => {
    setFormData(prev => ({
      ...prev,
      coaches: prev.coaches.includes(coach)
        ? prev.coaches.filter(c => c !== coach)
        : [...prev.coaches, coach]
    }))
  }

  // 处理班级选择
  const handleClassSelect = (classId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClass: classId,
      selectedStudents: []
      // 保留已选择的学员，不清空students数组
    }))
  }

  // 处理学员选择
  const handleStudentSelect = (studentId: number) => {
    setFormData(prev => {
      const isSelected = prev.selectedStudents.includes(studentId)
      let newSelectedStudents = isSelected
        ? prev.selectedStudents.filter(id => id !== studentId)
        : [...prev.selectedStudents, studentId]
      
      return {
        ...prev,
        selectedStudents: newSelectedStudents
        // 不再自动更新students数组，只在点击确认添加按钮时更新
      }
    })
  }

  // 处理学员状态变更
  const handleStudentStatusChange = (studentId: number, status: '通过' | '挂科' | '缺考') => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === studentId ? { 
          ...student, 
          status, 
          // 如果不是挂科，清空挂科项目
          failureSubject: status !== '挂科' ? undefined : student.failureSubject
        } : student
      )
    }))
  }

  // 处理挂科项目变更
  const handleFailureSubjectChange = (studentId: number, subject: string) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === studentId ? { ...student, failureSubject: subject } : student
      )
    }))
  }

  // 处理学员描述变更
  const handleStudentDescriptionChange = (studentId: number, description: string) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === studentId ? { ...student, description } : student
      )
    }))
  }

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      examDate: '',
      location: '',
      coaches: [],
      selectedClass: '',
      selectedStudents: [],
      students: [],
      notes: ''
    })
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentRecord(null)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditMode && currentRecord) {
      // 编辑模式
      const updatedRecords = examRecords.map(record => 
        record.id === currentRecord.id 
          ? {
              ...record,
              examDate: formData.examDate,
              location: formData.location,
              coaches: formData.coaches,
              students: formData.students,
              notes: formData.notes
            }
          : record
      )
      setExamRecords(updatedRecords)
    } else {
      // 新增模式
      const newRecord: ExamRecord = {
        id: examRecords.length + 1,
        examDate: formData.examDate,
        location: formData.location,
        coaches: formData.coaches,
        students: formData.students,
        notes: formData.notes
      }
      setExamRecords(prev => [...prev, newRecord])
    }
    
    resetForm()
  }

  // 删除考试记录
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个考试记录吗？')) {
      setExamRecords(examRecords.filter(record => record.id !== id))
    }
  }

  // 打开编辑弹窗
  const openEditModal = (record: ExamRecord) => {
    setCurrentRecord(record)
    setIsEditMode(true)
    setFormData({
      examDate: record.examDate,
      location: record.location,
      coaches: record.coaches,
      selectedClass: '',
      selectedStudents: record.students.map(s => s.id),
      students: record.students,
      notes: record.notes
    })
    setIsModalOpen(true)
  }

  // 打开考试详情弹窗
  const openExamDetailModal = (examId: number) => {
    setSelectedExamId(examId)
    setIsExamDetailModalOpen(true)
  }

  // 计算通过和挂科人数
  const getPassedCount = (students: ExamStudent[]) => {
    return students.filter(s => s.status === '通过').length
  }

  const getFailedCount = (students: ExamStudent[]) => {
    return students.filter(s => s.status === '挂科').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">考试记录</h2>
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
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.examDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {record.coaches.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.students.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {getPassedCount(record.students)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  {getFailedCount(record.students)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {record.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => openExamDetailModal(record.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button onClick={() => openEditModal(record)} className="text-green-600 hover:text-green-900">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(record.id)}
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
          显示 1 到 {filteredRecords.length} 条，共 {examRecords.length} 条
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

      {/* 考试记录弹窗 */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title={isEditMode ? "编辑考试记录" : "新增考试记录"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">考试时间 *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">考试场地 *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">请选择考试场地</option>
                {examLocations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">带队教练（可选）*</label>
            <div className="flex flex-wrap gap-2">
              {coaches.map((coach, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleCoachSelect(coach)}
                  className={`px-3 py-1 rounded-full text-sm ${formData.coaches.includes(coach) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {coach}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">总备注说明</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="该场考试的整体备注..."
              rows={3}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-base font-semibold mb-4">参考学员管理</h3>
            
            <div className="space-y-4">
              {/* 选择班级 */}
              <div>
                <p className="text-sm font-medium mb-2">1. 选择班级</p>
                <select
                  name="selectedClass"
                  value={formData.selectedClass}
                  onChange={(e) => handleClassSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择班级</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id.toString()}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              {/* 勾选参考学员 */}
              {formData.selectedClass && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">2. 勾选参考学员</p>
                    <button
                      type="button"
                      onClick={() => {
                        const selectedClass = classes.find(cls => cls.id.toString() === formData.selectedClass)
                        if (selectedClass) {
                          const allStudentIds = selectedClass.students.map(s => s.id)
                          setFormData(prev => ({
                            ...prev,
                            selectedStudents: allStudentIds,
                            students: allStudentIds.map(id => {
                              const student = selectedClass?.students.find(s => s.id === id)
                              return student ? { id: student.id, name: student.name, status: '通过' as '通过' | '挂科' | '缺考', description: '' } : null
                            }).filter((s): s is ExamStudent => s !== null)
                          }))
                        }
                      }}
                      className="text-sm text-blue-600 hover:text-blue-900"
                    >
                      全选当前班级
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {classes.find(cls => cls.id.toString() === formData.selectedClass)?.students.map((student) => (
                      <label key={student.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{student.name}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const selectedClass = classes.find(cls => cls.id.toString() === formData.selectedClass)
                        if (selectedClass) {
                          // 只添加新选择的学员，避免重复
                          const newStudents = formData.selectedStudents
                            .filter(id => !formData.students.some(s => s.id === id))
                            .map(id => {
                              const student = selectedClass?.students.find(s => s.id === id)
                              return student ? { id: student.id, name: student.name, status: '通过' as '通过' | '挂科' | '缺考', description: '' } : null
                            })
                            .filter((s): s is ExamStudent => s !== null)
                         
                          setFormData(prev => ({
                            ...prev,
                            students: [...prev.students, ...newStudents]
                          }))
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      确认添加已选学员 ({formData.selectedStudents.length})
                    </button>
                  </div>
                </div>
              )}
              
              {/* 学员列表 */}
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        学员姓名
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        班级
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态修改
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        挂科项目
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        考试说明
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.students.length > 0 ? (
                      formData.students.map((student) => {
                        const selectedClass = classes.find(cls => cls.id.toString() === formData.selectedClass)
                        return (
                          <tr key={student.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {selectedClass?.name || ''}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={student.status}
                                onChange={(e) => handleStudentStatusChange(student.id, e.target.value as '通过' | '挂科' | '缺考')}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              >
                                <option value="通过">通过</option>
                                <option value="挂科">挂科</option>
                                <option value="缺考">缺考</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              {student.status === '挂科' && (
                                <select
                                  value={student.failureSubject || ''}
                                  onChange={(e) => handleFailureSubjectChange(student.id, e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                >
                                  <option value="">请选择挂科项目</option>
                                  <option value="理论考试">理论考试</option>
                                  <option value="综合实践">综合实践</option>
                                  <option value="实操飞行">实操飞行</option>
                                  <option value="地面站">地面站</option>
                                  <option value="重规划">重规划</option>
                                </select>
                              )}
                              {student.status !== '挂科' && (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <textarea
                                value={student.description}
                                onChange={(e) => handleStudentDescriptionChange(student.id, e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                placeholder="考试说明"
                                rows={2}
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedStudents: prev.selectedStudents.filter(id => id !== student.id),
                                    students: prev.students.filter(s => s.id !== student.id)
                                  }))
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                删除
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                          当前未添加参考学员，请从上方选择并添加。
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* 统计信息 */}
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <span className="mr-4">总参考人数: <strong>{formData.students.length}</strong></span>
                  <span className="mr-4">通过数: <strong className="text-green-600">{getPassedCount(formData.students)}</strong></span>
                  <span>挂科数: <strong className="text-red-600">{getFailedCount(formData.students)}</strong></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetForm}
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
      <ExamRecordDetailModal 
        isOpen={isExamDetailModalOpen} 
        onClose={() => setIsExamDetailModalOpen(false)}
        examId={selectedExamId}
      />
    </div>
  )
}

export default ExamRecordManagement
