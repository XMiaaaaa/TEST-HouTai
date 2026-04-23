import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Upload } from 'lucide-react'

const CreateStudent = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    status: '初考',
    phone: '',
    licenseLevel: '1.多旋翼-视距内',
    classId: '',
    coachId: '',
    inviter: '',
    paymentDate: '',
    firstExamDate: '',
    lastExamDate: '',
    notes: '',
    idCardType: '身份证',
    idCardNumber: '',
    nationality: '中国',
    ethnicity: '汉族',
    birthDate: '',
    province: '',
    city: '',
    district: '',
    address: ''
  })

  // 模拟班级列表
  const classes = ['2026年春季班', '2026年夏季班', '2025年秋季班', '2025年冬季班']
  // 模拟教练列表
  const coaches = ['张教练', '李教练', '王教练']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 这里可以处理文件上传逻辑
    console.log('文件上传:', e.target.files)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单验证和提交逻辑
    console.log('新建学员:', formData)
    // 提交成功后返回学员管理页面
    navigate('/personnel-management/students')
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
        <h2 className="text-2xl font-bold text-gray-800">新建学员</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">基本信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">照片</label>
                <div className="flex items-center">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="ml-4"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入姓名"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">性别</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">状态</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="初考">初考</option>
                  <option value="补考">补考</option>
                  <option value="休眠">休眠</option>
                  <option value="通过">通过</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">手机号码</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入手机号码"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">机型级别</label>
                <select
                  name="licenseLevel"
                  value={formData.licenseLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1.多旋翼-视距内">1.多旋翼-视距内</option>
                  <option value="2.多旋翼-超视距">2.多旋翼-超视距</option>
                  <option value="3.多旋翼-教员">3.多旋翼-教员</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">班级</label>
                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择班级</option>
                  {classes.map((className, index) => (
                    <option key={index} value={className}>{className}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">带训教员</label>
                <select
                  name="coachId"
                  value={formData.coachId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择教练</option>
                  {coaches.map((coach, index) => (
                    <option key={index} value={coach}>{coach}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 证件信息 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">证件信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">证件类型</label>
                <select
                  name="idCardType"
                  value={formData.idCardType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="身份证">身份证</option>
                  <option value="护照">护照</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">证件号码</label>
                <input
                  type="text"
                  name="idCardNumber"
                  value={formData.idCardNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入证件号码"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">国籍</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入国籍"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">民族</label>
                <input
                  type="text"
                  name="ethnicity"
                  value={formData.ethnicity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入民族"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">出生日期</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* 地址信息 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">地址信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">省份</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入省份"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">城市</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入城市"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">区县</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入区县"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">详细地址</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="请输入详细地址"
                required
              />
            </div>
          </div>

          {/* 其他信息 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">其他信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">邀请人</label>
                <input
                  type="text"
                  name="inviter"
                  value={formData.inviter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入邀请人"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">缴费时间</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">首考时间</label>
                <input
                  type="date"
                  name="firstExamDate"
                  value={formData.firstExamDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">上次考试时间</label>
                <input
                  type="date"
                  name="lastExamDate"
                  value={formData.lastExamDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="mt-4">
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
          </div>

          {/* 附件上传 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">附件</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">身份证照片</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">健康证明</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">无犯罪记录</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6">
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

export default CreateStudent