import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Award,
  Activity,
  ArrowUpRight,
  Target
} from 'lucide-react'
import Modal from '../components/Modal'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  // 模拟数据
  const stats = [
    {
      title: '在籍学员',
      value: '128',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      change: '+12 本月',
      changeType: 'up' as const
    },
    {
      title: '班级数量',
      value: '8',
      icon: Calendar,
      color: 'bg-green-100 text-green-600',
      change: '+2 本月',
      changeType: 'up' as const
    },
    {
      title: '考试通过率',
      value: '85%',
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-600',
      change: '+5% 较上月',
      changeType: 'up' as const
    },
    {
      title: '待考学员',
      value: '32',
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
      change: '-8 较上月',
      changeType: 'down' as const
    }
  ]

  const recentActivities = [
    { id: 1, type: '新增学员', user: '张三', time: '今天 09:30', icon: Users, color: 'bg-blue-100 text-blue-600', link: '/personnel-management/students', linkText: '前往学员管理' },
    { id: 2, type: '考试记录', user: '李四', time: '今天 08:15', icon: Award, color: 'bg-green-100 text-green-600', link: '/exam-management', linkText: '前往考试管理' },
    { id: 3, type: '新增班级', user: '王五', time: '昨天 16:45', icon: Calendar, color: 'bg-purple-100 text-purple-600', link: '/class-management', linkText: '前往班级管理' },
    { id: 4, type: '学员状态更新', user: '赵六', time: '昨天 14:20', icon: Activity, color: 'bg-orange-100 text-orange-600', link: '/personnel-management/students', linkText: '前往学员管理' },
    { id: 5, type: '新增教练', user: '孙七', time: '昨天 10:30', icon: Users, color: 'bg-blue-100 text-blue-600', link: '/personnel-management/coaches', linkText: '前往教练管理' },
    { id: 6, type: '考场信息更新', user: '周八', time: '前天 15:20', icon: Calendar, color: 'bg-green-100 text-green-600', link: '/exam-management/locations', linkText: '前往考场管理' },
    { id: 7, type: '学员成绩录入', user: '吴九', time: '前天 09:10', icon: Award, color: 'bg-purple-100 text-purple-600', link: '/exam-management', linkText: '前往考试管理' },
    { id: 8, type: '新增考试安排', user: '郑十', time: '3天前 14:45', icon: Calendar, color: 'bg-orange-100 text-orange-600', link: '/exam-management', linkText: '前往考试管理' },
    { id: 9, type: '班级学员调整', user: '王十一', time: '3天前 10:00', icon: Users, color: 'bg-blue-100 text-blue-600', link: '/class-management', linkText: '前往班级管理' },
    { id: 10, type: '教练排班更新', user: '李十二', time: '4天前 16:30', icon: Activity, color: 'bg-green-100 text-green-600', link: '/personnel-management/coaches', linkText: '前往教练管理' }
  ]

  const topCoaches = [
    { name: '张教练', students: 25, successRate: '92%' },
    { name: '李教练', students: 20, successRate: '88%' },
    { name: '王教练', students: 30, successRate: '85%' }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">仪表盘</h2>
          <p className="text-gray-500 mt-1">欢迎回来！今天是2026年04月21日</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp size={14} className={`mr-1 ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <p className={`text-sm font-medium ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${stat.color} shadow-sm`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近活动 */}
        <div className="lg:col-span-2 card fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">最近活动</h3>
            <button 
              onClick={() => setIsActivityModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center transition-all duration-200">
              查看全部
              <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg mr-4 ${activity.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">{activity.type}</span>
                      <span className="ml-2 text-gray-500">by {activity.user}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 优秀教练 */}
        <div className="card fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">优秀教练</h3>
            <Award size={20} className="text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topCoaches.map((coach, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{coach.name}</p>
                    <p className="text-gray-500 text-sm">{coach.students} 名学员</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">{coach.successRate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 系统概览 */}
      <div className="card fade-in" style={{ animationDelay: '600ms' }}>
        <h3 className="text-lg font-semibold mb-6 text-gray-800">系统概览</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-6 p-5 bg-blue-50 rounded-r-lg hover:bg-blue-100 transition-all duration-200">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Users size={18} className="mr-2 text-blue-600" />
              学员管理
            </h4>
            <p className="text-gray-600 text-sm mt-2">管理学员信息，支持导入导出</p>
          </div>
          <div className="border-l-4 border-green-500 pl-6 p-5 bg-green-50 rounded-r-lg hover:bg-green-100 transition-all duration-200">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Calendar size={18} className="mr-2 text-green-600" />
              班级管理
            </h4>
            <p className="text-gray-600 text-sm mt-2">管理班级信息，支持状态更新</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-6 p-5 bg-purple-50 rounded-r-lg hover:bg-purple-100 transition-all duration-200">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Target size={18} className="mr-2 text-purple-600" />
              考试管理
            </h4>
            <p className="text-gray-600 text-sm mt-2">记录考试信息，追踪考试结果</p>
          </div>
        </div>
      </div>

      {/* 查看全部活动弹窗 */}
      <Modal 
        isOpen={isActivityModalOpen} 
        onClose={() => setIsActivityModalOpen(false)}
        title="全部活动记录"
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const Icon = activity.icon
            return (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  navigate(activity.link)
                  setIsActivityModalOpen(false)
                }}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg mr-4 ${activity.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{activity.type}</span>
                    <span className="ml-2 text-gray-500">by {activity.user}</span>
                    <div className="text-sm text-blue-600 mt-1 flex items-center">
                      {activity.linkText}
                      <ArrowUpRight size={12} className="ml-1" />
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
