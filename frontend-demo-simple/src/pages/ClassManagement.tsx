import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users
} from 'lucide-react'
import Modal from '../components/Modal'
import ClassDetailModal from '../components/ClassDetailModal'

interface Class {
  id: number
  name: string
  startDate: string
  endDate: string
  status: string
  studentCount: number
  notes: string
}

const ClassManagement = () => {
  // 模拟数据
  const [classes, setClasses] = useState<Class[]>([
    { 
      id: 1, 
      name: '2026年春季班', 
      startDate: '2026-03-01', 
      endDate: '2026-06-01', 
      status: '开班', 
      studentCount: 25, 
      notes: '基础班'
    },
    { 
      id: 2, 
      name: '2026年夏季班', 
      startDate: '2026-06-01', 
      endDate: '2026-09-01', 
      status: '开班', 
      studentCount: 20, 
      notes: '进阶班'
    },
    { 
      id: 3, 
      name: '2025年秋季班', 
      startDate: '2025-09-01', 
      endDate: '2025-12-01', 
      status: '结课', 
      studentCount: 30, 
      notes: '基础班'
    },
    { 
      id: 4, 
      name: '2025年冬季班', 
      startDate: '2025-12-01', 
      endDate: '2026-03-01', 
      status: '结课', 
      studentCount: 22, 
      notes: '进阶班'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentClass, setCurrentClass] = useState<Class | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: '开班',
    notes: ''
  })
  const [isClassDetailModalOpen, setIsClassDetailModalOpen] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState(0)

  // 搜索过滤并按状态和开班时间排序
  const filteredClasses = classes
    .filter(cls => 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? cls.status === statusFilter : true)
    )
    .sort((a, b) => {
      // 先按状态排序：开课在前，结课在后
      if (a.status === '开班' && b.status === '结课') return -1
      if (a.status === '结课' && b.status === '开班') return 1
      // 状态相同则按开班时间排序：最新的在前
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })

  // 删除班级
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个班级吗？')) {
      setClasses(classes.filter(cls => cls.id !== id))
    }
  }

  // 处理表单变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      status: '开班',
      notes: ''
    })
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentClass(null)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditMode && currentClass) {
      // 编辑模式：更新现有班级
      const updatedClasses = classes.map(cls => 
        cls.id === currentClass.id 
          ? {
              ...cls,
              name: formData.name,
              startDate: formData.startDate,
              endDate: formData.endDate,
              status: formData.status,
              notes: formData.notes
            }
          : cls
      )
      setClasses(updatedClasses)
    } else {
      // 新增模式：创建新班级
      const newClass: Class = {
        id: classes.length + 1,
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        studentCount: 0,
        notes: formData.notes
      }
      setClasses([...classes, newClass])
    }
    
    resetForm()
  }

  // 打开编辑弹窗
  const openEditModal = (cls: Class) => {
    setCurrentClass(cls)
    setIsEditMode(true)
    setFormData({
      name: cls.name,
      startDate: cls.startDate,
      endDate: cls.endDate,
      status: cls.status,
      notes: cls.notes
    })
    setIsModalOpen(true)
  }

  // 打开班级详情弹窗
  const openClassDetailModal = (classId: number) => {
    setSelectedClassId(classId)
    setIsClassDetailModalOpen(true)
  }

  // 查看学员详情
  const viewStudentDetail = (studentId: number) => {
    // 这里可以添加打开学员详情弹窗的逻辑
    console.log('查看学员详情:', studentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">班级管理</h2>
          <p className="text-gray-500 mt-1">管理和查看所有班级信息</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus size={18} className="mr-2" />
          新增班级
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="搜索班级名称"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">全部状态</option>
              <option value="开班">开班</option>
              <option value="结课">结课</option>
            </select>
          </div>
        </div>
      </div>

      {/* 班级卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                  cls.status === '开班' 
                    ? 'bg-gradient-to-br from-green-500 to-green-600' 
                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                }`}>
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">{cls.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      cls.status === '开班' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cls.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openClassDetailModal(cls.id)}
                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => openEditModal(cls)}
                  className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(cls.id)}
                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{cls.startDate}</span>
                </div>
                {cls.endDate && (
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">{cls.endDate}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={18} className="text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">学员人数</span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">{cls.studentCount}</span>
                </div>
              </div>
              
              {cls.notes && (
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{cls.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-500">
          显示 1 到 {filteredClasses.length} 条，共 {classes.length} 条
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

      {/* 班级弹窗 */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title={isEditMode ? "编辑班级" : "新建班级"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">班级名称</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入班级名称"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">状态</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="开班">开班</option>
                <option value="结课">结课</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{formData.status === '开班' ? '开课时间' : '开班时间'}</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{formData.status === '结课' ? '结课时间' : ''}</label>
              {formData.status === '结课' && (
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">备注</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows={4}
              placeholder="请输入备注信息"
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
              保存
            </button>
          </div>
        </form>
      </Modal>

      {/* 班级详情弹窗 */}
      <ClassDetailModal 
        isOpen={isClassDetailModalOpen} 
        onClose={() => setIsClassDetailModalOpen(false)}
        classId={selectedClassId}
        onViewStudent={viewStudentDetail}
      />
    </div>
  )
}

export default ClassManagement
