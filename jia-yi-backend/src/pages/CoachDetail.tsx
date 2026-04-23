import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Search, Filter } from 'lucide-react'
import { useState } from 'react'

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
}

interface Coach {
  id: number
  name: string
  contact: string
  invitedCount: number
  trainingCount: number
}

const CoachDetail = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // 模拟教练数据
  const [coach] = useState<Coach>({
    id: 1,
    name: '张教练',
    contact: '13800138001',
    invitedCount: 15,
    trainingCount: 25
  })

  // 模拟教练名下的学员数据
  const [students] = useState<Student[]>([
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
      notes: '认真学习'
    },
    {
      id: 2,
      name: '赵六',
      gender: '女',
      status: '休眠',
      phone: '13600136001',
      licenseLevel: '1.多旋翼-视距内',
      className: '2025年冬季班',
      coach: '张教练',
      inviter: '王五',
      paymentDate: '2025-11-01',
      firstExamDate: '2026-01-01',
      lastExamDate: '2026-01-01',
      notes: '暂时休学'
    },
    {
      id: 3,
      name: '孙七',
      gender: '男',
      status: '通过',
      phone: '13500135001',
      licenseLevel: '2.多旋翼-超视距',
      className: '2025年秋季班',
      coach: '张教练',
      inviter: '张三',
      paymentDate: '2025-08-01',
      firstExamDate: '2025-11-01',
      lastExamDate: '2025-11-01',
      notes: '优秀学员'
    }
  ])

  // 筛选学员
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? student.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

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
        <h2 className="text-2xl font-bold text-gray-800">教练详情</h2>
      </div>

      {/* 教练基本信息 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm">教练姓名</p>
            <p className="text-lg font-bold">{coach.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">联系方式</p>
            <p className="font-medium">{coach.contact}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">邀请学员数</p>
            <p className="font-medium">{coach.invitedCount} 人</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">带训学员数</p>
            <p className="font-medium">{coach.trainingCount} 人</p>
          </div>
        </div>
      </div>

      {/* 教练名下学员列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <h4 className="text-sm font-medium text-gray-500">带训学员</h4>
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索学员姓名"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative w-48">
                <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">全部状态</option>
                  <option value="初考">初考</option>
                  <option value="补考">补考</option>
                  <option value="休眠">休眠</option>
                  <option value="通过">通过</option>
                </select>
              </div>
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
                    班级
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
                      {student.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a 
                        href={`/student/${student.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </a>
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

export default CoachDetail