import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'motion/react'
import authService from '../services/authService'
import { setUserData } from '../redux/userSlice'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const result = await authService.login(formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      dispatch(setUserData(result.data))
      navigate('/dashboard')
    } else {
      setErrors({ form: result.error })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background shapes */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 blur-3xl opacity-30"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-cyan-400 blur-3xl opacity-30"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative w-full max-w-md'
      >
        {/* Glass card */}
        <div className='relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden'>
          <div className='relative px-8 py-10'>
            {/* Header */}
            <div className='text-center mb-8'>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className='inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30'
              >
                <span className='text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  WELCOME BACK
                </span>
              </motion.div>
              <h1 className='text-3xl font-bold text-white mb-2'>Sign in to Code2Cloud</h1>
              <p className='text-sm text-gray-400'>Continue building amazing websites</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Email</label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    className='w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition backdrop-blur-sm'
                  />
                </div>
                {errors.email && <p className='text-xs text-red-400 mt-1'>{errors.email}</p>}
              </motion.div>

              {/* Password Field */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className='flex justify-between items-center mb-2'>
                  <label className='block text-sm font-medium text-gray-300'>Password</label>
                  <button
                    type='button'
                    onClick={() => navigate('/forgot-password')}
                    className='text-xs text-blue-400 hover:text-blue-300 transition'
                  >
                    Forgot?
                  </button>
                </div>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='w-full pl-10 pr-10 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition backdrop-blur-sm'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                  >
                    {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                  </button>
                </div>
                {errors.password && <p className='text-xs text-red-400 mt-1'>{errors.password}</p>}
              </motion.div>

              {/* Form Error */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm'
                >
                  {errors.form}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={loading}
                className='w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition disabled:opacity-50'
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign in
                    <ArrowRight className='w-4 h-4' />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className='flex items-center gap-3 my-6'>
              <div className='h-px flex-1 bg-white/10' />
              <span className='text-xs text-gray-500'>OR</span>
              <div className='h-px flex-1 bg-white/10' />
            </div>

            {/* Sign Up Link */}
            <div className='text-center text-sm text-gray-400'>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className='text-blue-400 hover:text-blue-300 font-semibold transition'
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
