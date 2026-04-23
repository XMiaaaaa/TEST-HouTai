import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

const CreateCoach = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    contact: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单验证和提交逻辑
    console.log('新建教练:', formData)
    // 提交成功后返回教练管理页面
    navigate('/personnel-management/coaches')
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
        <h2 className="text-2xl font-bold text-gray-800">新建教练</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">教练姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入教练姓名"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">联系方式</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入联系方式"
                required
              />
            </div>
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

export default CreateCoach