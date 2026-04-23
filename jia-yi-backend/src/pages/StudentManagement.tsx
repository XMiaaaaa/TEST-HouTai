import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  Filter,
  RefreshCw
} from 'lucide-react'
import Modal from '../components/Modal'
import StudentDetailModal from '../components/StudentDetailModal'
import { studentApi, classApi, coachApi } from '../utils/api'

interface Student {
  id: number
  name: string
  gender: string
  status: string
  phone: string
  licenseLevel: string
  className: string
  coach: string
  inviter: string
  paymentDate: string
  firstExamDate: string
  lastExamDate: string
  notes: string
  idCard?: string
  nationality?: string
}

const StudentManagement = () => {
  // 状态管理
  const [isStudentDetailModalOpen, setIsStudentDetailModalOpen] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState(0)
  const [students, setStudents] = useState<Student[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [coaches, setCoaches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)

  // 加载数据
  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      // 并行加载数据
      const [studentsData, classesData, coachesData] = await Promise.all([
        studentApi.getStudents(),
        classApi.getClasses(),
        coachApi.getCoaches()
      ])
      
      setStudents(studentsData.map((s: any) => ({
        id: s.id,
        name: s.name,
        gender: s.gender,
        status: s.status || '初考',
        phone: s.phone,
        licenseLevel: s.licenseLevel || '1.多旋翼-视距内',
        className: s.class_name || '',
        coach: s.coach || '',
        inviter: s.inviter || '',
        paymentDate: s.payment_date || '',
        firstExamDate: s.first_exam_date || '',
        lastExamDate: s.last_exam_date || '',
        idCard: s.id_card || '',
        nationality: s.nationality || '汉族',
        notes: s.notes || ''
      })))
      
      setClasses(classesData.map((c: any) => c.class_name))
      setCoaches(coachesData.map((c: any) => c.name))
    } catch (err) {
      setError('加载数据失败，请稍后重试')
      console.error('Error loading data:', err)
      // 使用模拟数据作为后备
      setStudents([
        {
          id: 1,
          name: '张三',
          gender: '男',
          status: '初考',
          phone: '13800138001',
          licenseLevel: '1.多旋翼-视距内',
          className: '2026年春季班',
          coach: '张教练',
          inviter: '李四',
          paymentDate: '2026-02-01',
          firstExamDate: '2026-04-15',
          lastExamDate: '2026-04-15',
          idCard: '110101199001011234',
          nationality: '汉族',
          notes: '认真学习'
        }
      ])
      setClasses(['2026年春季班', '2026年夏季班'])
      setCoaches(['张教练', '李教练'])
    } finally {
      setLoading(false)
    }
  }

  // 初始加载
  useEffect(() => {
    loadData()
  }, [])

  // 模拟民族数据
  const [nationalities] = useState([
    '汉族',
    '蒙古族',
    '回族',
    '藏族',
    '维吾尔族',
    '苗族',
    '彝族',
    '壮族',
    '布依族',
    '朝鲜族'
  ])

  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    status: '初考',
    phone: '',
    idCard: '',
    nationality: '汉族',
    licenseLevel: '1.多旋翼-视距内',
    className: '',
    coach: '',
    inviter: '',
    paymentDate: '',
    firstExamDate: '',
    lastExamDate: '',
    notes: ''
  })

  // 上传文件状态
  const [avatar, setAvatar] = useState<File | null>(null)

  // 搜索和筛选
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? student.status === statusFilter : true
    const matchesClass = classFilter ? student.className === classFilter : true
    return matchesSearch && matchesStatus && matchesClass
  })

  // 处理选择
  const handleSelect = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) 
        ? prev.filter(studentId => studentId !== id)
        : [...prev, id]
    )
  }

  // 处理全选
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id))
    }
  }

  // 删除学员
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个学员吗？')) {
      setStudents(students.filter(student => student.id !== id))
    }
  }

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedStudents.length > 0 && window.confirm('确定要删除选中的学员吗？')) {
      setStudents(students.filter(student => !selectedStudents.includes(student.id)))
      setSelectedStudents([])
    }
  }

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  // 打开编辑弹窗
  const openEditModal = (student: Student) => {
    setCurrentStudent(student)
    setIsEditMode(true)
    setFormData({
      name: student.name,
      gender: student.gender,
      status: student.status,
      phone: student.phone,
      idCard: student.idCard || '',
      nationality: student.nationality || '汉族',
      licenseLevel: student.licenseLevel,
      className: student.className,
      coach: student.coach,
      inviter: student.inviter,
      paymentDate: student.paymentDate,
      firstExamDate: student.firstExamDate,
      lastExamDate: student.lastExamDate,
      notes: student.notes
    })
    setIsModalOpen(true)
  }

  // 处理查看学员详情
  const viewStudentDetail = (student: Student) => {
    setSelectedStudentId(student.id)
    setIsStudentDetailModalOpen(true)
  }

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (isEditMode && currentStudent) {
        // 编辑模式：更新现有学员
        const updatedStudents = students.map(student => 
          student.id === currentStudent.id 
            ? {
                ...student,
                ...formData
              }
            : student
        )
        setStudents(updatedStudents)
      } else {
        // 新增模式：创建新学员
        const newStudentData = {
          name: formData.name,
          gender: formData.gender,
          phone: formData.phone,
          id_card: formData.idCard
        }
        
        // 调用API添加学员
        const createdStudent = await studentApi.addStudent(newStudentData)
        
        // 添加到本地状态
        const newStudent: Student = {
          id: createdStudent.id,
          ...formData
        }
        setStudents(prev => [...prev, newStudent])
      }
      
      // 重置表单并关闭弹窗
      resetForm()
    } catch (err) {
      setError('操作失败，请稍后重试')
      console.error('Error submitting form:', err)
    }
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      gender: '男',
      status: '初考',
      phone: '',
      idCard: '',
      nationality: '汉族',
      licenseLevel: '1.多旋翼-视距内',
      className: '',
      coach: '',
      inviter: '',
      paymentDate: '',
      firstExamDate: '',
      lastExamDate: '',
      notes: ''
    })
    setAvatar(null)
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentStudent(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">学员管理</h2>
          <p className="text-gray-500 mt-1">管理和查看所有学员信息</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={loadData}
            className="btn btn-secondary flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            disabled={loading}
          >
            <RefreshCw size={18} className="mr-2" aria-hidden="true" />
            {loading ? '加载中...' : '刷新'}
          </button>
          <button className="btn btn-secondary flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <Download size={18} className="mr-2" aria-hidden="true" />
            导出
          </button>
          <button className="btn btn-secondary flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <Upload size={18} className="mr-2" aria-hidden="true" />
            导入
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus size={18} className="mr-2" aria-hidden="true" />
            新增学员
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">加载中...</span>
        </div>
      )}

      {/* 搜索和筛选 */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="input pl-12"
              placeholder="搜索学员姓名、手机号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <Filter size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="input pl-12 appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">全部状态</option>
                <option value="初考">初考</option>
                <option value="补考">补考</option>
                <option value="休眠">休眠</option>
                <option value="通过">通过</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <Filter size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="input pl-12 appearance-none bg-white"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="">全部班级</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
          {selectedStudents.length > 0 && (
            <button 
              onClick={handleBatchDelete}
              className="btn btn-danger whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              批量删除 ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      {/* 学员列表 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  序号
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  学员姓名
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  性别
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  手机号码
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  机型级别
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  班级
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  带训教员
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelect(student.id)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${
                      student.status === '初考' ? 'status-初考' :
                      student.status === '补考' ? 'status-补考' :
                      student.status === '通过' ? 'status-通过' :
                      'status-休眠'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.licenseLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.coach}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => viewStudentDetail(student)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') viewStudentDetail(student) }}
                        aria-label="查看学员详情"
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => openEditModal(student)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openEditModal(student) }}
                        aria-label="编辑学员信息"
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDelete(student.id) }}
                        aria-label="删除学员"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between card p-4">
        <p className="text-sm text-gray-500">
          显示 1 到 {filteredStudents.length} 条，共 {students.length} 条
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-600 transition-colors duration-200">
            上一页
          </button>
          <button className="px-4 py-2 border border-blue-500 rounded-lg text-sm bg-blue-500 text-white transition-all duration-200">
            1
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-600 transition-colors duration-200">
            下一页
          </button>
        </div>
      </div>

      {/* 新增/编辑学员弹窗 */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title={isEditMode ? "编辑学员" : "新增学员"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">学员姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入学员姓名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">性别</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">身份证号</label>
              <input
                type="text"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入身份证号"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">民族</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                {nationalities.map((nation, index) => (
                  <option key={index} value={nation}>{nation}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">状态</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="初考">初考</option>
                <option value="补考">补考</option>
                <option value="休眠">休眠</option>
                <option value="通过">通过</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">手机号码</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入手机号码"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">机型级别</label>
              <select
                name="licenseLevel"
                value={formData.licenseLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="1.多旋翼-视距内">1.多旋翼-视距内</option>
                <option value="2.多旋翼-超视距">2.多旋翼-超视距</option>
                <option value="3.多旋翼-教员">3.多旋翼-教员</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">班级</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">请选择班级</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">带训教员</label>
              <select
                name="coach"
                value={formData.coach}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">请选择教练</option>
                {coaches.map((coach, index) => (
                  <option key={index} value={coach}>{coach}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">邀请人</label>
              <select
                name="inviter"
                value={formData.inviter}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">请选择邀请人</option>
                {coaches.map((coach, index) => (
                  <option key={index} value={coach}>{coach}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">缴费日期</label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">上传头像</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {avatar && (
              <p className="mt-2 text-sm text-gray-500">已选择文件: {avatar.name}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">首次考试日期</label>
              <input
                type="date"
                name="firstExamDate"
                value={formData.firstExamDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">末次考试日期</label>
              <input
                type="date"
                name="lastExamDate"
                value={formData.lastExamDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">备注</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入备注信息"
              rows={4}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              确认
            </button>
          </div>
        </form>
      </Modal>

      {/* 学员详情弹窗 */}
      <StudentDetailModal 
        isOpen={isStudentDetailModalOpen} 
        onClose={() => setIsStudentDetailModalOpen(false)}
        studentId={selectedStudentId}
      />
    </div>
  )
}

export default StudentManagement
