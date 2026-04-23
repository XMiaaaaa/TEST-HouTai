import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  User, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const location = useLocation()

  const navItems = [
    { name: '首页', path: '/dashboard', icon: Home },
    { name: '班级管理', path: '/class-management', icon: Calendar },
    { 
      name: '考试管理', 
      path: '/exam-management', 
      icon: FileText,
      subItems: [
        { name: '考试记录', path: '/exam-management' },
        { name: '考场管理', path: '/exam-management/locations' }
      ]
    },
    { 
      name: '人员管理', 
      path: '/personnel-management/students', 
      icon: Users, 
      subItems: [
        { name: '学员管理', path: '/personnel-management/students' },
        { name: '教练管理', path: '/personnel-management/coaches' }
      ]
    }
  ]

  // 当访问子页面时，自动展开对应的父级菜单
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.subItems?.some(sub => location.pathname === sub.path) && !expandedItems.includes(item.path)) {
        setExpandedItems(prev => [...prev, item.path])
      }
    })
  }, [location.pathname])

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) ? prev.filter(item => item !== path) : [...prev, path]
    )
  }

  const getActiveClass = (path: string) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
  }

  const isActive = (path: string) => {
    // 对于人员管理这种特殊情况，检查是否以 /personnel-management/ 开头
    if (path === '/personnel-management/students') {
      return location.pathname.startsWith('/personnel-management/')
    }
    // 对于考试管理，检查是否以 /exam-management 开头
    if (path === '/exam-management') {
      return location.pathname.startsWith('/exam-management')
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div 
        className={`bg-white border-r border-gray-100 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20'} shadow-sm`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center'}`}>
            <div className="text-blue-600 font-bold text-xl">甲易</div>
            {isSidebarOpen && <span className="ml-2 text-gray-500">后台管理系统</span>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsSidebarOpen(!isSidebarOpen) }}
            aria-label={isSidebarOpen ? '关闭侧边栏' : '打开侧边栏'}
            className="p-2 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSidebarOpen ? <X size={20} className="text-gray-500" /> : <Menu size={20} className="text-gray-500" />}
          </button>
        </div>
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.path} className="space-y-1">
              {item.subItems ? (
                <button
                  onClick={() => toggleExpand(item.path)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(item.path) }}
                  aria-label={`展开/折叠 ${item.name} 菜单`}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 transition-all duration-200 ${isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'} ${isSidebarOpen ? 'mr-3' : ''}`} />
                    {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                  </div>
                  {isSidebarOpen && item.subItems && (
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-400 transition-transform duration-200 ${expandedItems.includes(item.path) ? 'transform rotate-180' : ''}`} 
                      aria-hidden="true"
                    />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 transition-all duration-200 ${isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'} ${isSidebarOpen ? 'mr-3' : ''}`} aria-hidden="true" />
                    {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                  </div>
                </Link>
              )}
              {isSidebarOpen && item.subItems && (
                <div className={`pl-10 mt-1 space-y-1 ${expandedItems.includes(item.path) ? 'block' : 'hidden'} transition-all duration-300`}>
                  {item.subItems.map((subItem) => (
                    <Link 
                      key={subItem.path}
                      to={subItem.path}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium text-gray-600 transition-all duration-200 ${getActiveClass(subItem.path)} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => 
                location.pathname === item.path || 
                item.subItems?.some(sub => location.pathname === sub.path)
              )?.name || '首页'}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click() }}
                aria-label="管理员菜单"
              >
                <span className="text-sm font-medium">管理员</span>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={18} className="text-blue-600" aria-hidden="true" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout