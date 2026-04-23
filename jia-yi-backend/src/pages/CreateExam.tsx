import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

const CreateExam = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    examDate: '',
    location: '',
    coach: '',
    notes: ''
  })

  // 模拟教练列表
  const coaches = ['张教练', '李教练', '王教练']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单验证和提交逻辑
    console.log('新建考试记录:', formData)
    // 提交成功后返回考试管理页面
    navigate('/exam-management')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mr-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          返回
        </button>
        <h2 className="text-2xl font-bold text-gray-800">新建考试记录</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">考试时间</label>
              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">考试场地</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入考试场地"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">带队教练</label>
              <select
                name="coach"
                value={formData.coach}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">请选择教练</option>
                {coaches.map((coach, index) => (
                  <option key={index} value={coach}>{coach}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">备注</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="请输入备注信息"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save size={18} className="mr-2" />
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateExam