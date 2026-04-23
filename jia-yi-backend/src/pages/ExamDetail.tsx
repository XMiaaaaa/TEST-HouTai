import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface ExamRecord {
  id: number
  examDate: string
  location: string
  coaches: string[]
  students: ExamStudent[]
  notes: string
}

interface ExamStudent {
  id: number
  name: string
  status: '通过' | '挂科' | '缺考'
  failureSubject?: string
  description: string
}

const ExamDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // 模拟考试记录数据
  const examRecords: ExamRecord[] = [
    { 
      id: 1, 
      examDate: '2026-04-15', 
      location: '科目一考场', 
      coaches: ['张教练'], 
      students: [
        { id: 1, name: '张三', status: '通过', description: '表现优秀' },
        { id: 2, name: '李四', status: '通过', description: '表现良好' },
        { id: 3, name: '王五', status: '挂科', failureSubject: '理论考试', description: '操作失误' },
        { id: 4, name: '赵六', status: '通过', description: '表现优秀' }
      ], 
      notes: '春季班第一次考试'
    },
    { 
      id: 2, 
      examDate: '2026-04-10', 
      location: '科目二考场', 
      coaches: ['李教练', '王教练'], 
      students: [
        { id: 5, name: '钱七', status: '通过', description: '表现良好' },
        { id: 6, name: '孙八', status: '挂科', failureSubject: '实操飞行', description: '紧张失误' },
        { id: 7, name: '周九', status: '通过', description: '表现优秀' }
      ], 
      notes: '夏季班第一次考试'
    }
  ]

  // 根据ID获取考试记录
  const exam = examRecords.find(record => record.id === parseInt(id || '1')) || examRecords[0]
  const examStudents = exam.students

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
        <h2 className="text-2xl font-bold text-gray-800">考试详情</h2>
      </div>

      {/* 考试基本信息 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 px-6">
          <h3 className="text-xl font-bold text-white">考试信息</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium mb-1">考试时间</p>
              <p className="text-lg font-semibold text-gray-800">{exam.examDate}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium mb-1">考试场地</p>
              <p className="text-lg font-semibold text-gray-800">{exam.location}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium mb-1">带队教练</p>
              <p className="text-lg font-semibold text-gray-800">{exam.coaches.join(', ')}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-sm text-amber-600 font-medium mb-1">备注</p>
              <p className="text-lg font-semibold text-gray-800">{exam.notes || '无'}</p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">参考学员</p>
              <p className="text-2xl font-bold text-gray-800">{examStudents.length}</p>
              <p className="text-xs text-gray-400">人</p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 text-center bg-green-50">
              <p className="text-sm text-green-600 mb-1">通过学员</p>
              <p className="text-2xl font-bold text-green-700">{examStudents.filter(s => s.status === '通过').length}</p>
              <p className="text-xs text-gray-400">人</p>
            </div>
            <div className="border border-red-200 rounded-lg p-4 text-center bg-red-50">
              <p className="text-sm text-red-600 mb-1">挂科学员</p>
              <p className="text-2xl font-bold text-red-700">{examStudents.filter(s => s.status === '挂科').length}</p>
              <p className="text-xs text-gray-400">人</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 text-center bg-blue-50">
              <p className="text-sm text-blue-600 mb-1">通过率</p>
              <p className="text-2xl font-bold text-blue-700">
                {(examStudents.filter(s => s.status === '通过').length / examStudents.length * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 参考学员列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-4">参考学员</h4>
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
                    考试结果
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    挂科项目
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    考试说明
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {examStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${student.status === '通过' ? 'status-通过' : 'status-补考'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.status === '挂科' ? student.failureSubject || '-' : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.description || '-'}
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

export default ExamDetail