import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Award
} from 'lucide-react'
import Modal from '../components/Modal'
import CoachDetailModal from '../components/CoachDetailModal'

interface Coach {
  id: number
  name: string
  contact: string
  invitedCount: number
  trainingCount: number
}

const CoachManagement = () => {
  // 模拟数据
  const [coaches, setCoaches] = useState<Coach[]>([
    { 
      id: 1, 
      name: '张教练', 
      contact: '13800138001', 
      invitedCount: 15, 
      trainingCount: 25
    },
    { 
      id: 2, 
      name: '李教练', 
      contact: '13900139001', 
      invitedCount: 12, 
      trainingCount: 20
    },
    { 
      id: 3, 
      name: '王教练', 
      contact: '13700137001', 
      invitedCount: 18, 
      trainingCount: 30
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    invitedCount: '0',
    trainingCount: '0'
  })
  
  const [isCoachDetailModalOpen, setIsCoachDetailModalOpen] = useState(false)
  const [selectedCoachId, setSelectedCoachId] = useState(0)

  // 搜索过滤
  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.contact.includes(searchTerm)
  )

  // 删除教练
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个教练吗？')) {
      setCoaches(coaches.filter(coach => coach.id !== id))
    }
  }

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 打开编辑弹窗
  const openEditModal = (coach: Coach) => {
    setCurrentCoach(coach)
    setIsEditMode(true)
    setFormData({
      name: coach.name,
      contact: coach.contact,
      invitedCount: coach.invitedCount.toString(),
      trainingCount: coach.trainingCount.toString()
    })
    setIsModalOpen(true)
  }

  // 打开教练详情弹窗
  const openCoachDetailModal = (coachId: number) => {
    setSelectedCoachId(coachId)
    setIsCoachDetailModalOpen(true)
  }

  // 查看学员详情
  const viewStudentDetail = (studentId: number) => {
    // 这里可以添加打开学员详情弹窗的逻辑
    console.log('查看学员详情:', studentId)
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      invitedCount: '0',
      trainingCount: '0'
    })
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentCoach(null)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditMode && currentCoach) {
      // 编辑模式：更新现有教练
      const updatedCoaches = coaches.map(coach => 
        coach.id === currentCoach.id 
          ? {
              ...coach,
              name: formData.name,
              contact: formData.contact,
              invitedCount: parseInt(formData.invitedCount) || 0,
              trainingCount: parseInt(formData.trainingCount) || 0
            }
          : coach
      )
      setCoaches(updatedCoaches)
    } else {
      // 新增模式：创建新教练
      const newCoach: Coach = {
        id: coaches.length + 1,
        name: formData.name,
        contact: formData.contact,
        invitedCount: parseInt(formData.invitedCount) || 0,
        trainingCount: parseInt(formData.trainingCount) || 0
      }
      setCoaches(prev => [...prev, newCoach])
    }
    
    resetForm()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">教练管理</h2>
          <p className="text-gray-500 mt-1">管理和查看所有教练信息</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus size={18} className="mr-2" />
          新增教练
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="搜索教练姓名或联系电话..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 教练卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <div key={coach.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Users size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">{coach.name}</h3>
                  <p className="text-sm text-gray-500">{coach.contact}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openCoachDetailModal(coach.id)}
                  className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => openEditModal(coach)}
                  className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(coach.id)}
                  className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">邀请学员</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{coach.invitedCount}</p>
                  </div>
                  <Users size={20} className="text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">带训学员</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{coach.trainingCount}</p>
                  </div>
                  <Award size={20} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-500">
          显示 1 到 {filteredCoaches.length} 条，共 {coaches.length} 条
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

      {/* 新增/编辑教练弹窗 */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title={isEditMode ? "编辑教练" : "新增教练"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">教练姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入教练姓名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">联系电话</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入联系电话"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">邀请学员数</label>
              <input
                type="number"
                name="invitedCount"
                value={formData.invitedCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">带训学员数</label>
              <input
                type="number"
                name="trainingCount"
                value={formData.trainingCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="0"
                required
              />
            </div>
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

      {/* 教练详情弹窗 */}
      <CoachDetailModal 
        isOpen={isCoachDetailModalOpen} 
        onClose={() => setIsCoachDetailModalOpen(false)}
        coachId={selectedCoachId}
        onViewStudent={viewStudentDetail}
      />
    </div>
  )
}

export default CoachManagement
