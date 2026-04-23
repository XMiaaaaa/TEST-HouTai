import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Clock, User, Calendar, CheckCircle, XCircle, AlertCircle, BarChart3 } from 'lucide-react'

interface ExamLocation {
  id: number
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  examTime: string
  notes: string
}

interface ExamResult {
  id: number
  studentName: string
  examDate: string
  status: '通过' | '挂科' | '缺考'
  failureSubject?: string
  score: number
}

const ExamLocationDetail = () => {
  const { id } = useParams<{ id: string }>()
  const locationId = parseInt(id || '1')
  
  // 模拟考场数据
  const [examLocation, setExamLocation] = useState<ExamLocation | null>(null)
  
  // 模拟考试结果数据
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  
  // 年份筛选
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  
  // 模拟数据加载
  useEffect(() => {
    // 模拟考场数据
    const locations: ExamLocation[] = [
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
    ]
    
    // 模拟考试结果数据
    let results: ExamResult[] = []
    if (locationId !== 2) {
      results = [
        { id: 1, studentName: '张三', examDate: '2024-04-15', status: '通过', score: 95 },
        { id: 2, studentName: '李四', examDate: '2024-04-15', status: '挂科', failureSubject: '理论考试', score: 58 },
        { id: 3, studentName: '王五', examDate: '2024-04-15', status: '通过', score: 88 },
        { id: 4, studentName: '赵六', examDate: '2024-04-15', status: '缺考', score: 0 },
        { id: 5, studentName: '钱七', examDate: '2024-04-15', status: '挂科', failureSubject: '综合实践', score: 62 },
        { id: 6, studentName: '孙八', examDate: '2024-04-15', status: '通过', score: 92 },
        { id: 7, studentName: '周九', examDate: '2024-04-15', status: '挂科', failureSubject: '实操飞行', score: 55 },
        { id: 8, studentName: '吴十', examDate: '2024-04-15', status: '通过', score: 85 },
        { id: 9, studentName: '郑十一', examDate: '2023-04-15', status: '通过', score: 90 },
        { id: 10, studentName: '王十二', examDate: '2023-04-15', status: '挂科', failureSubject: '地面站', score: 60 },
      ]
    }
    
    setExamLocation(locations.find(loc => loc.id === locationId) || null)
    setExamResults(results)
  }, [locationId])
  
  // 根据选择的年份筛选考试结果
  const filteredExamResults = examResults.filter(result => 
    result.examDate.startsWith(selectedYear)
  )
  
  // 计算统计数据
  const totalExams = filteredExamResults.length
  const passedExams = filteredExamResults.filter(result => result.status === '通过').length
  const failedExams = filteredExamResults.filter(result => result.status === '挂科').length
  const absentExams = filteredExamResults.filter(result => result.status === '缺考').length
  const passRate = totalExams > 0 ? (passedExams / totalExams * 100).toFixed(1) : '0.0'
  
  // 计算各科目通过率
  const subjects = ['理论考试', '综合实践', '实操飞行', '地面站', '重规划']
  const subjectPassRates = subjects.map(subject => {
    const subjectExams = filteredExamResults.filter(result => 
      result.status === '挂科' ? result.failureSubject === subject : true
    )
    const subjectPassed = subjectExams.filter(result => result.status === '通过').length
    return {
      subject,
      rate: subjectExams.length > 0 ? (subjectPassed / subjectExams.length * 100).toFixed(1) : '0.0'
    }
  })
  
  // 计算年度考试次数
  const annualExamCount = filteredExamResults.length
  
  if (!examLocation) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <p className="text-gray-500 text-lg">考场信息不存在</p>
        <Link 
          to="/exam-management/locations" 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <ArrowLeft size={18} className="mr-2" />
          返回考场管理
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* 导航栏 */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/exam-management/locations" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft size={18} className="mr-2" />
          返回考场管理
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600 font-medium">{examLocation.name} 详情</span>
      </div>
      
      {/* 考场基本信息卡片 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{examLocation.name}</h2>
            <p className="text-purple-100">{examLocation.notes}</p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <MapPin size={18} className="mr-3 text-purple-200" />
              <span className="text-purple-100">{examLocation.address}</span>
            </div>
            <div className="flex items-center">
              <User size={18} className="mr-3 text-purple-200" />
              <span className="text-purple-100">{examLocation.contactPerson}</span>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="mr-3 text-purple-200" />
              <span className="text-purple-100">{examLocation.contactPhone}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Clock size={18} className="mr-3 text-purple-200" />
              <span className="text-purple-100">考试时间: {examLocation.examTime}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-3 text-purple-200" />
              <span className="text-purple-100">年度考试次数: {annualExamCount}</span>
            </div>
          </div>
          
          {filteredExamResults.length > 0 && (
            <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">考场通过率</h3>
              <div className="text-4xl font-bold">{passRate}%</div>
              <div className="flex space-x-4 mt-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle size={14} className="mr-1 text-green-300" />
                  <span>通过: {passedExams}</span>
                </div>
                <div className="flex items-center">
                  <XCircle size={14} className="mr-1 text-red-300" />
                  <span>挂科: {failedExams}</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle size={14} className="mr-1 text-yellow-300" />
                  <span>缺考: {absentExams}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 数据统计 */}
      {filteredExamResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 各科目通过率 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">各科目通过率</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">选择年份:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <BarChart3 size={20} className="text-purple-500" />
              </div>
            </div>
            
            <div className="space-y-4">
              {subjectPassRates.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                    <span className="text-sm font-bold text-gray-800">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${item.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 考试记录 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">最近考试记录</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">学员姓名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">考试日期</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">挂科项目</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">分数</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExamResults.slice(0, 5).map((result) => (
                    <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm text-gray-800">{result.studentName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{result.examDate}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.status === '通过' ? 'bg-green-100 text-green-800' :
                          result.status === '挂科' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{result.failureSubject || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{result.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamLocationDetail