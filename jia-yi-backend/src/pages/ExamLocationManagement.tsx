import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Phone,
  Clock,
  User
} from 'lucide-react'
import Modal from '../components/Modal'
import ExamLocationDetailModal from '../components/ExamLocationDetailModal'

interface ExamLocation {
  id: number
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  examTime: string
  notes: string
}

const ExamLocationManagement = () => {
  // 模拟考场数据
  const [examLocations, setExamLocations] = useState<ExamLocation[]>([
    { 
      id: 1, 
      name: '科目一考场', 
      address: '北京市朝阳区考场路1号', 
      contactPerson: '张老师', 
      contactPhone: '13800138001', 
      examTime: '04-15', 
      notes: '理论考试场地'
    },
    { 
      id: 2, 
      name: '科目二考场', 
      address: '北京市海淀区考场路2号', 
      contactPerson: '李老师', 
      contactPhone: '13900139001', 
      examTime: '04-16', 
      notes: '实操考试场地'
    },
    { 
      id: 3, 
      name: '科目三考场', 
      address: '北京市丰台区考场路3号', 
      contactPerson: '王老师', 
      contactPhone: '13700137001', 
      examTime: '04-17', 
      notes: '飞行考试场地'
    },
    { 
      id: 4, 
      name: '科目四考场', 
      address: '北京市西城区考场路4号', 
      contactPerson: '赵老师', 
      contactPhone: '13600136001', 
      examTime: '04-18', 
      notes: '综合考试场地'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<ExamLocation | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    examTime: '',
    notes: ''
  })
  const [isLocationDetailModalOpen, setIsLocationDetailModalOpen] = useState(false)
  const [selectedLocationId, setSelectedLocationId] = useState(0)

  // 搜索过滤
  const filteredLocations = examLocations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      contactPerson: '',
      contactPhone: '',
      examTime: '',
      notes: ''
    })
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentLocation(null)
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
    
    if (isEditMode && currentLocation) {
      // 编辑模式
      const updatedLocations = examLocations.map(location => 
        location.id === currentLocation.id 
          ? {
              ...location,
              name: formData.name,
              address: formData.address,
              contactPerson: formData.contactPerson,
              contactPhone: formData.contactPhone,
              examTime: formData.examTime,
              notes: formData.notes
            }
          : location
      )
      setExamLocations(updatedLocations)
    } else {
      // 新增模式
      const newLocation: ExamLocation = {
        id: examLocations.length + 1,
        name: formData.name,
        address: formData.address,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        examTime: formData.examTime,
        notes: formData.notes
      }
      setExamLocations(prev => [...prev, newLocation])
    }
    
    resetForm()
  }

  // 删除考场
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个考场吗？')) {
      setExamLocations(examLocations.filter(location => location.id !== id))
    }
  }

  // 打开编辑弹窗
  const openEditModal = (location: ExamLocation) => {
    setCurrentLocation(location)
    setIsEditMode(true)
    setFormData({
      name: location.name,
      address: location.address,
      contactPerson: location.contactPerson,
      contactPhone: location.contactPhone,
      examTime: location.examTime,
      notes: location.notes
    })
    setIsModalOpen(true)
  }

  // 打开考场详情弹窗
  const openLocationDetailModal = (locationId: number) => {
    setSelectedLocationId(locationId)
    setIsLocationDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">考场管理</h2>
          <p className="text-gray-500 mt-1">管理和查看所有考场信息</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus size={18} className="mr-2" />
          新增考场
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="搜索考场名称或地址"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 考场卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  <MapPin size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">{location.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => openLocationDetailModal(location.id)}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openEditModal(location)}
                    className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-200"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(location.id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={16} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{location.address}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{location.contactPerson}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{location.contactPhone}</span>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock size={18} className="text-purple-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">考试时间</p>
                    <p className="text-sm font-semibold text-gray-800">{location.examTime}</p>
                  </div>
                </div>
              </div>
              
              {location.notes && (
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{location.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-500">
          显示 1 到 {filteredLocations.length} 条，共 {examLocations.length} 条
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

      {/* 考场弹窗 */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title={isEditMode ? "编辑考场" : "新增考场"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">考场名称</label>              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入考场名称"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">地址</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入考场地址"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">考点联系人</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入考点联系人"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">联系方式</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入联系方式"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">考试时间</label>
              <input
                type="text"
                name="examTime"
                value={formData.examTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="请输入考试时间，如：04-15"
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

      {/* 考场详情弹窗 */}
      <ExamLocationDetailModal 
        isOpen={isLocationDetailModalOpen} 
        onClose={() => setIsLocationDetailModalOpen(false)}
        locationId={selectedLocationId}
      />
    </div>
  )
}

export default ExamLocationManagement
