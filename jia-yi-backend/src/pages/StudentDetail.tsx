import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Plus, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'

const StudentDetail = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('basic')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [attachments, setAttachments] = useState([
    { id: 1, name: '身份证照片', url: 'https://via.placeholder.com/150', type: 'image' },
    { id: 2, name: '健康证明', url: 'https://via.placeholder.com/150', type: 'image' },
    { id: 3, name: '无犯罪记录', url: 'https://via.placeholder.com/150', type: 'image' }
  ])
  const [newAttachment, setNewAttachment] = useState({ name: '', file: null as File | null })

  // 模拟学员数据
  const student = {
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
    notes: '认真学习',
    photo: 'https://via.placeholder.com/150',
    idCardType: '身份证',
    idCardNumber: '110101199001011234',
    nationality: '中国',
    ethnicity: '汉族',
    birthDate: '1990-01-01',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    address: '北京市朝阳区某某街道某某小区1号楼101室',
    idCardPhoto: 'https://via.placeholder.com/150',
    healthCert: 'https://via.placeholder.com/150',
    criminalRecord: 'https://via.placeholder.com/150'
  }

  // 模拟考试记录
  const examRecords = [
    {
      id: 1,
      examDate: '2026-04-15',
      location: '科目一考场',
      result: '通过',
      notes: '第一次考试'
    },
    {
      id: 2,
      examDate: '2026-03-20',
      location: '模拟考试',
      result: '未通过',
      notes: '模拟练习'
    }
  ]

  // 处理附件上传
  const handleAttachmentUpload = () => {
    if (newAttachment.name && newAttachment.file) {
      const attachment = {
        id: attachments.length + 1,
        name: newAttachment.name,
        url: URL.createObjectURL(newAttachment.file),
        type: newAttachment.file.type.split('/')[0]
      }
      setAttachments([...attachments, attachment])
      setNewAttachment({ name: '', file: null })
      setIsUploadModalOpen(false)
    }
  }

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setNewAttachment(prev => ({ ...prev, file: files[0] }))
    }
  }

  // 处理附件删除
  const handleAttachmentDelete = (id: number) => {
    if (window.confirm('确定要删除这个附件吗？')) {
      setAttachments(attachments.filter(attachment => attachment.id !== id))
    }
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
        <h2 className="text-2xl font-bold text-gray-800">学员详情</h2>
      </div>

      {/* 学员基本信息卡片 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            <img 
              src={student.photo} 
              alt={student.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">{student.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">性别</p>
                <p className="font-medium">{student.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">状态</p>
                <span className={`status-badge status-${student.status}`}>
                  {student.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">手机号码</p>
                <p className="font-medium">{student.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">机型级别</p>
                <p className="font-medium">{student.licenseLevel}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">班级</p>
                <p className="font-medium">{student.className}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">带训教员</p>
                <p className="font-medium">{student.coach}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              基本信息
            </button>
            <button
              onClick={() => setActiveTab('attachments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'attachments' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              附件
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'exam' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              考试记录
            </button>
          </nav>
        </div>

        {/* 基本信息标签页 */}
        {activeTab === 'basic' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">证件信息</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">证件类型</p>
                    <p className="text-sm">{student.idCardType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">证件号码</p>
                    <p className="text-sm">{student.idCardNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">国籍</p>
                    <p className="text-sm">{student.nationality}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">民族</p>
                    <p className="text-sm">{student.ethnicity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">出生日期</p>
                    <p className="text-sm">{student.birthDate}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">其他信息</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">所在地区</p>
                    <p className="text-sm">{student.province} {student.city} {student.district}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">详细地址</p>
                    <p className="text-sm">{student.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">邀请人</p>
                    <p className="text-sm">{student.inviter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">缴费时间</p>
                    <p className="text-sm">{student.paymentDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">首考时间</p>
                    <p className="text-sm">{student.firstExamDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">上次考试时间</p>
                    <p className="text-sm">{student.lastExamDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">备注</p>
                    <p className="text-sm">{student.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 附件标签页 */}
        {activeTab === 'attachments' && (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">附件管理</h4>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                上传附件
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-800">{attachment.name}</h4>
                    <button 
                      onClick={() => handleAttachmentDelete(attachment.id)}
                      className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mb-4 flex justify-center">
                    {attachment.type === 'image' ? (
                      <img 
                        src={attachment.url} 
                        alt={attachment.name} 
                        className="w-full max-w-xs mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-xs mx-auto p-8 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <p className="text-gray-500 text-sm">{attachment.name}</p>
                        <p className="text-gray-400 text-xs mt-1">{attachment.type} 文件</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="flex items-center justify-center text-blue-600 hover:text-blue-900 text-sm">
                      <Download size={16} className="mr-1" />
                      下载
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 考试记录标签页 */}
        {activeTab === 'exam' && (
          <div className="p-6">
            <div className="overflow-x-auto">
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
                      考试结果
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      备注
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.examDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-badge status-${record.result}`}>
                          {record.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 上传附件弹窗 */}
      <Modal 
        isOpen={isUploadModalOpen} 
        onClose={() => {
          setIsUploadModalOpen(false)
          setNewAttachment({ name: '', file: null })
        }} 
        title="上传附件"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">附件名称</label>
            <input
              type="text"
              value={newAttachment.name}
              onChange={(e) => setNewAttachment(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入附件名称"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">选择文件</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            {newAttachment.file && (
              <p className="mt-2 text-sm text-gray-500">已选择文件: {newAttachment.file.name}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsUploadModalOpen(false)
                setNewAttachment({ name: '', file: null })
              }}
              className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleAttachmentUpload}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              上传
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentDetail