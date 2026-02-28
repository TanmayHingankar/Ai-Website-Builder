import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'motion/react'
import authService from '../services/authService'
import { setUserData } from '../redux/userSlice'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const result = await authService.register(formData.name, formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      dispatch(setUserData(result.data))
      navigate('/dashboard')
    } else {
      setErrors({ form: result.error })
    }
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
                  CREATE ACCOUNT
                </span>
              </motion.div>
              <h1 className='text-3xl font-bold text-white mb-2'>Join Code2Cloud</h1>
              <p className='text-sm text-gray-400'>Start building amazing websites with AI</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name Field */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Full Name</label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='John Doe'
                    className='w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition backdrop-blur-sm'
                  />
                </div>
                {errors.name && <p className='text-xs text-red-400 mt-1'>{errors.name}</p>}
              </motion.div>

              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
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
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Password</label>
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

              {/* Confirm Password Field */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Confirm Password</label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='w-full pl-10 pr-10 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition backdrop-blur-sm'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                  >
                    {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                  </button>
                </div>
                {errors.confirmPassword && <p className='text-xs text-red-400 mt-1'>{errors.confirmPassword}</p>}
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
                {loading ? 'Creating Account...' : (
                  <>
                    Create Account
                    <ArrowRight className='w-4 h-4' />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className='text-center mt-6 text-sm text-gray-400'>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className='text-blue-400 hover:text-blue-300 font-semibold transition'
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register