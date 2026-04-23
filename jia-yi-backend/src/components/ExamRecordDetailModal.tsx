import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ExamStudent {
  id: number
  name: string
  status: '通过' | '挂科' | '缺考'
  failureSubject?: string
  description: string
}

interface ExamRecord {
  id: number
  examDate: string
  location: string
  coaches: string[]
  students: ExamStudent[]
  notes: string
}

interface ExamRecordDetailModalProps {
  isOpen: boolean
  onClose: () => void
  examId: number
}

const ExamRecordDetailModal: React.FC<ExamRecordDetailModalProps> = ({ isOpen, onClose, examId }) => {
  const [exam, setExam] = useState<ExamRecord | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchName, setSearchName] = useState<string>('')

  // 模拟考试记录数据
  useEffect(() => {
    if (isOpen) {
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
      const foundExam = examRecords.find(record => record.id === examId) || examRecords[0]
      setExam(foundExam)
    }
  }, [isOpen, examId])

  if (!isOpen || !exam) return null

  const examStudents = exam.students
  const passedCount = examStudents.filter(s => s.status === '通过').length
  const failedCount = examStudents.filter(s => s.status === '挂科').length
  const passRate = examStudents.length > 0 ? (passedCount / examStudents.length * 100).toFixed(0) : '0'

  // 筛选学员
  const filteredStudents = examStudents.filter(student => {
    // 状态筛选
    const statusMatch = filterStatus === 'all' || student.status === filterStatus
    // 姓名搜索
    const nameMatch = student.name.toLowerCase().includes(searchName.toLowerCase())
    return statusMatch && nameMatch
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* 模态框头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">考试详情</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* 模态框内容 */}
        <div className="p-6 space-y-6">
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
                  <p className="text-2xl font-bold text-green-700">{passedCount}</p>
                  <p className="text-xs text-gray-400">人</p>
                </div>
                <div className="border border-red-200 rounded-lg p-4 text-center bg-red-50">
                  <p className="text-sm text-red-600 mb-1">挂科学员</p>
                  <p className="text-2xl font-bold text-red-700">{failedCount}</p>
                  <p className="text-xs text-gray-400">人</p>
                </div>
                <div className="border border-blue-200 rounded-lg p-4 text-center bg-blue-50">
                  <p className="text-sm text-blue-600 mb-1">通过率</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {passRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 参考学员列表 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-500 mb-4">参考学员</h4>
              
              {/* 筛选控件 */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">状态筛选:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value="通过">通过</option>
                    <option value="挂科">挂科</option>
                    <option value="缺考">缺考</option>
                  </select>
                </div>
                <div className="flex items-center flex-1">
                  <span className="text-sm text-gray-600 mr-2">姓名搜索:</span>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="输入学员姓名"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
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
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ 
                            student.status === '通过' ? 'bg-green-100 text-green-800' :
                            student.status === '挂科' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                          没有找到符合条件的学员
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* 模态框底部 */}
        <div className="flex justify-end p-6 border-t border-gray-200 space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExamRecordDetailModal