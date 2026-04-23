import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Eye } from 'lucide-react'
import { useState } from 'react'

const ClassDetail = () => {
  const navigate = useNavigate()

  // 模拟班级数据
  const [className] = useState({
    id: 1,
    name: '2026年春季班',
    startDate: '2026-03-01',
    endDate: '2026-06-01',
    status: '开班',
    notes: '基础班'
  })

  // 模拟班级学员数据
  const [classStudents] = useState([
    {
      id: 1,
      name: '张三',
      gender: '男',
      status: '初考',
      phone: '13800138001',
      licenseLevel: '1.多旋翼-视距内',
      coach: '张教练',
      admissionDate: '2026-02-15'
    },
    {
      id: 2,
      name: '李四',
      gender: '女',
      status: '补考',
      phone: '13900139001',
      licenseLevel: '2.多旋翼-超视距',
      coach: '李教练',
      admissionDate: '2026-02-20'
    },
    {
      id: 3,
      name: '王五',
      gender: '男',
      status: '通过',
      phone: '13700137001',
      licenseLevel: '3.多旋翼-教员',
      coach: '王教练',
      admissionDate: '2026-02-10'
    },
    {
      id: 4,
      name: '赵六',
      gender: '女',
      status: '休眠',
      phone: '13600136001',
      licenseLevel: '1.多旋翼-视距内',
      coach: '张教练',
      admissionDate: '2026-02-05'
    }
  ])

  // 筛选状态
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [licenseLevelFilter, setLicenseLevelFilter] = useState('')

  // 筛选逻辑
  const filteredStudents = classStudents.filter(student => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? student.status === statusFilter : true
    const matchesLicenseLevel = licenseLevelFilter ? student.licenseLevel === licenseLevelFilter : true
    return matchesName && matchesStatus && matchesLicenseLevel
  })

  // 查看学员详情
  const viewStudentDetail = (studentId: number) => {
    navigate(`/student/${studentId}`)
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
        <h2 className="text-2xl font-bold text-gray-800">班级详情</h2>
      </div>

      {/* 班级基本信息 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm">班级名称</p>
            <p className="text-lg font-bold">{className.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">开班时间</p>
            <p className="font-medium">{className.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">结课时间</p>
            <p className="font-medium">{className.endDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">状态</p>
            <span className={`status-badge status-${className.status}`}>
              {className.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">学员人数</p>
            <p className="font-medium">{classStudents.length} 人</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">备注</p>
            <p className="font-medium">{className.notes}</p>
          </div>
        </div>
      </div>

      {/* 班级学员列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-4">班级学员</h4>
          
          {/* 筛选栏 */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="搜索学员姓名"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div className="w-full md:w-64">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={licenseLevelFilter}
                onChange={(e) => setLicenseLevelFilter(e.target.value)}
              >
                <option value="">全部机型级别</option>
                <option value="1.多旋翼-视距内">1.多旋翼-视距内</option>
                <option value="2.多旋翼-超视距">2.多旋翼-超视距</option>
                <option value="3.多旋翼-教员">3.多旋翼-教员</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    序号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    学员姓名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    性别
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    手机号码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    机型级别
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    带训教员
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    入学时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge status-${student.status}`}>
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
                      {student.coach}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.admissionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => viewStudentDetail(student.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassDetail
