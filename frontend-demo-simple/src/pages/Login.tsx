import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 简单的登录验证
    if (username === 'admin' && password === '123456') {
      navigate('/dashboard')
    } else {
      setError('用户名或密码错误')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">甲易后台管理系统</h1>
          <p className="text-gray-600 mt-2">请登录以访问系统</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">用户名</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">密码</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            登录
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>默认账号: admin</p>
          <p>默认密码: 123456</p>
        </div>
      </div>
    </div>
  )
}

export default Login