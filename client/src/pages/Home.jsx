import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { Coins, Zap, Code2, Rocket, Lock, Edit3, Globe, ArrowRight } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { setUserData } from '../redux/userSlice'
import Footer from '../components/Footer'
import authService from '../services/authService'

function Home() {
    const [openProfile, setOpenProfile] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [chatInput, setChatInput] = useState("")
    const [chatMessages, setChatMessages] = useState([
        { role: "bot", content: "Hi! I'm Code2Cloud Assistant. Ask me about pricing, credits, or features." }
    ])
    const [supportForm, setSupportForm] = useState({
        name: "",
        email: "",
        phone: "",
        query: "",
        screenshot: null
    })
    const [supportStatus, setSupportStatus] = useState(null)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)

    const features = [
        {
            icon: <Zap className='w-6 h-6' />,
            title: "Prompt → Website Generation",
            description: "Describe your idea and let AI instantly generate a fully functional, production-ready website."
        },
        {
            icon: <Edit3 className='w-6 h-6' />,
            title: "Real-Time Code Editing via Prompt",
            description: "Make instant changes to your website by simply describing what you want modified."
        },
        {
            icon: <Globe className='w-6 h-6' />,
            title: "Instant Deployment with Live URL",
            description: "Your website goes live instantly with a shareable URL. No deployment hassles."
        },
        {
            icon: <Code2 className='w-6 h-6' />,
            title: "Full Code Download",
            description: "Download the complete source code of your website anytime. Full ownership and control."
        },
        {
            icon: <Rocket className='w-6 h-6' />,
            title: "AI Assisted Refactoring",
            description: "Let AI analyze and improve your code. Get better performance and cleaner architecture."
        },
        {
            icon: <Lock className='w-6 h-6' />,
            title: "Scalable Cloud Architecture",
            description: "Built on enterprise-grade infrastructure. Scale from zero to millions of users seamlessly."
        },
        {
            icon: <Globe className='w-6 h-6' />,
            title: "Local Language Support",
            description: "Use the builder in your local language and generate websites tailored to your region."
        }
    ]
    const pricingPlans = [
        {
            name: "Free",
            price: "₹0",
            tagline: "Perfect to explore Code2Cloud",
            features: ["100 credits", "AI website generation", "Responsive HTML output"]
        },
        {
            name: "Pro",
            price: "₹499",
            tagline: "For serious creators & freelancers",
            features: ["500 credits", "Faster generation", "Edit & regenerate"],
            popular: true
        },
        {
            name: "Enterprise",
            price: "₹1499",
            tagline: "For teams & power users",
            features: ["1000 credits", "Team collaboration", "Dedicated support"]
        }
    ]

    const handleLogOut = async () => {
        const result = await authService.logout()
        if (result.success) {
            dispatch(setUserData(null))
            setOpenProfile(false)
        }
    }

    const handleChatSend = () => {
        const message = chatInput.trim()
        if (!message) return
        const next = [
            ...chatMessages,
            { role: "user", content: message },
        ]
        const reply = message.toLowerCase().includes("credit")
            ? "Credits are used for generation (50), updates (25), and deployment (10)."
            : message.toLowerCase().includes("pricing")
                ? "We offer Free, Pro, and Enterprise plans. Open Pricing to pay via Stripe."
                : "Thanks! Share more details and I'll guide you."
        setChatMessages([...next, { role: "bot", content: reply }])
        setChatInput("")
    }

    const handleSupportSubmit = async (e) => {
        e.preventDefault()
        setSupportStatus(null)
        try {
            const formData = new FormData()
            formData.append("name", supportForm.name)
            formData.append("email", supportForm.email)
            formData.append("phone", supportForm.phone)
            formData.append("query", supportForm.query)
            if (supportForm.screenshot) {
                formData.append("screenshot", supportForm.screenshot)
            }
            await api.post("/support", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setSupportStatus({ type: "success", message: "Thanks! We received your query and will reach out soon." })
            setSupportForm({ name: "", email: "", phone: "", query: "", screenshot: null })
        } catch (error) {
            setSupportStatus({ type: "error", message: "Failed to submit. Please try again." })
        }
    }

    useEffect(() => {
        if (!userData) return;
        const handleGetAllWebsites = async () => {
            try {
                const result = await api.get(`/website/get-all`)
                setWebsites(result.data || [])
            } catch (error) {
                console.log(error)
            }
        }
        handleGetAllWebsites()
    }, [userData])

    return (
        <div className='relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden'>
            {/* Animated background elements */}
            <motion.div
                animate={{ opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="fixed top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 blur-3xl opacity-20 pointer-events-none"
            />
            <motion.div
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                className="fixed bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500 to-blue-500 blur-3xl opacity-15 pointer-events-none"
            />

            {/* Modern Navbar */}
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/40 border-b border-white/5'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    {/* Logo */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate('/')}
                        className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2'
                    >
                        <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white'>
                            C
                        </div>
                        Code2Cloud
                    </motion.button>

                    {/* Nav Links */}
                    <div className='hidden md:flex items-center gap-8'>
                        <motion.button
                            whileHover={{ y: -2 }}
                            onClick={() => navigate("/pricing")}
                            className='text-sm text-gray-300 hover:text-white transition'
                        >
                            Pricing
                        </motion.button>
                        <motion.button
                            whileHover={{ y: -2 }}
                            onClick={() => document.querySelector('#features').scrollIntoView({ behavior: 'smooth' })}
                            className='text-sm text-gray-300 hover:text-white transition'
                        >
                            Features
                        </motion.button>
                    </div>

                    {/* Right Section */}
                    <div className='flex items-center gap-4'>
                        {userData && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition'
                            >
                                <Coins size={14} className='text-yellow-400' />
                                <span className='text-gray-300'>Credits:</span>
                                <span className='font-semibold'>{userData.credits}</span>
                            </motion.div>
                        )}

                        {!userData ? (
                            <div className='flex items-center gap-3'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => navigate('/login')}
                                    className='px-4 py-2 text-sm text-gray-300 border border-white/20 rounded-lg hover:border-white/40 hover:text-white transition'
                                >
                                    Sign In
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/register')}
                                    className='px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition'
                                >
                                    Get Started
                                </motion.button>
                            </div>
                        ) : (
                            <div className='relative'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setOpenProfile(!openProfile)}
                                    className='flex items-center w-9 h-9'
                                >
                                    <img
                                        src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`}
                                        alt=""
                                        referrerPolicy='no-referrer'
                                        className='w-9 h-9 rounded-full border border-white/20 object-cover'
                                    />
                                </motion.button>

                                <AnimatePresence>
                                    {openProfile && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-64 z-50 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                                            >
                                                <div className='px-4 py-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
                                                    <p className='text-sm font-semibold text-white'>{userData.name}</p>
                                                    <p className='text-xs text-gray-400'>{userData.email}</p>
                                                </div>

                                                <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5 text-gray-300'>
                                                    <Coins size={14} className='text-yellow-400' />
                                                    <span>Credits: {userData.credits}</span>
                                                </button>

                                                <button
                                                    onClick={() => { navigate("/dashboard"); setOpenProfile(false); }}
                                                    className='w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/10'
                                                >
                                                    Dashboard
                                                </button>
                                                <button className='w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/10'>
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={handleLogOut}
                                                    className='w-full px-4 py-3 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition'
                                                >
                                                    Logout
                                                </button>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => setOpenProfile(false)}
                                                className='fixed inset-0 z-40'
                                            />
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className='relative pt-40 pb-32 px-6 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30'
                >
                    <span className='text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                        🚀 The Future of Web Development
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
                >
                    Build and Deploy Your Website <br />
                    <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>with Just One Prompt</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='max-w-2xl mx-auto text-lg text-gray-400 mb-4 leading-relaxed'
                >
                    One prompt generates your complete website. AI writes frontend + backend code, deploys instantly, and gives you a live URL. Modify, improve, and download your source code anytime.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => userData ? navigate("/dashboard") : navigate("/register")}
                        className='px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-blue-500/30 transition'
                    >
                        Get Started Now <ArrowRight className='w-4 h-4' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/pricing")}
                        className='px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition'
                    >
                        Try Demo
                    </motion.button>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='flex items-center justify-center gap-8 mt-12 flex-wrap text-xs text-gray-400'
                >
                    <div>✓ Production Ready Code</div>
                    <div>✓ Instant Deployment</div>
                    <div>✓ Full Code Download</div>
                    <div>✓ Real-time Editing</div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id='features' className='relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='max-w-7xl mx-auto text-center mb-16'
                >
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>Powerful Features</h2>
                    <p className='text-gray-400 max-w-2xl mx-auto'>Everything you need to build, deploy, and manage your website with AI assistance</p>
                </motion.div>

                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className='group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-blue-400/30 hover:bg-white/10 transition duration-300'
                        >
                            {/* Gradient background on hover */}
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none' />

                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className='relative w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition'
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 className='text-lg font-semibold text-white mb-2 relative'>{feature.title}</h3>
                            <p className='text-gray-400 text-sm leading-relaxed relative'>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id='pricing' className='relative py-32 px-6'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='max-w-4xl mx-auto text-center mb-16'
                >
                    <h2 className='text-4xl md:text-5xl font-bold mb-4'>Simple, transparent pricing</h2>
                    <p className='text-gray-400'>Choose a plan, then pay securely via Stripe on the pricing page.</p>
                </motion.div>

                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {pricingPlans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -6 }}
                            className={`relative rounded-2xl border p-8 backdrop-blur-sm transition
                                ${plan.popular ? "border-blue-400/50 bg-gradient-to-b from-blue-500/15 to-transparent" : "border-white/10 bg-white/5 hover:border-blue-400/30 hover:bg-white/10"}`}
                        >
                            {plan.popular && (
                                <span className='absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-blue-500/80'>Most Popular</span>
                            )}
                            <h3 className='text-xl font-semibold mb-2'>{plan.name}</h3>
                            <p className='text-gray-400 text-sm mb-4'>{plan.tagline}</p>
                            <div className='flex items-end gap-2 mb-6'>
                                <span className='text-4xl font-bold'>{plan.price}</span>
                                <span className='text-xs text-gray-400 mb-1'>/one-time</span>
                            </div>
                            <ul className='space-y-2 mb-8'>
                                {plan.features.map((f) => (
                                    <li key={f} className='text-sm text-gray-300 flex items-center gap-2'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-blue-400' />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/pricing")}
                                className={`w-full py-3 rounded-lg font-semibold transition
                                    ${plan.popular ? "bg-blue-500 hover:bg-blue-600" : "bg-white/10 hover:bg-white/20"}`}
                            >
                                View Pricing & Pay
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* User Websites Section */}
            {userData && websites?.length > 0 && (
                <section className='relative py-32 px-6'>
                    <div className='max-w-7xl mx-auto'>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className='mb-12'
                        >
                            <h2 className='text-4xl font-bold mb-2'>Your Projects</h2>
                            <p className='text-gray-400'>Continue working on your websites or create new ones</p>
                        </motion.div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {websites.slice(0, 3).map((w, i) => (
                                <motion.div
                                    key={w._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    onClick={() => navigate(`/editor/${w._id}`)}
                                    className='cursor-pointer group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-400/30 transition'
                                >
                                    <div className='h-48 bg-gray-900 overflow-hidden relative'>
                                        <iframe
                                            srcDoc={w.latestCode}
                                            className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                        />
                                        <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition' />
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='text-base font-semibold text-white line-clamp-2 mb-2'>{w.title}</h3>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-xs text-gray-500'>
                                                Updated {new Date(w.updatedAt).toLocaleDateString()}
                                            </p>
                                            <ArrowRight className='w-4 h-4 text-gray-400 group-hover:text-blue-400 transition' />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {websites.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className='text-center mt-10'
                            >
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className='px-6 py-3 rounded-lg border border-blue-400/30 text-blue-400 hover:bg-blue-400/10 transition'
                                >
                                    View All {websites.length} Projects
                                </button>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* CTA Section */}
            {!userData && (
                <section className='relative py-32 px-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-400/20 p-12 text-center backdrop-blur-sm'
                    >
                        <h2 className='text-4xl font-bold mb-4'>Ready to Build Your Website with AI?</h2>
                        <p className='text-gray-400 mb-8 text-lg'>Start for free and get 100 credits to generate your first website</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className='px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition'
                        >
                            Create Free Account
                        </motion.button>
                    </motion.div>
                </section>
            )}

            {/* Help & Support */}
            <section id='support' className='relative py-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div>
                        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Need help or have a query?</h2>
                        <p className='text-gray-400 mb-6'>
                            Share your issue and we will contact you on email. You can also attach a screenshot.
                        </p>
                        <div className='rounded-2xl border border-white/10 bg-white/5 p-6'>
                            <ul className='space-y-3 text-sm text-gray-300'>
                                <li>• Priority help for payment and credits issues</li>
                                <li>• Website build or deployment guidance</li>
                                <li>• Bug reports with screenshots</li>
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={handleSupportSubmit} className='rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4'>
                        <div>
                            <label className='text-sm text-gray-300'>Full Name</label>
                            <input
                                className='mt-2 w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-blue-400/50'
                                value={supportForm.name}
                                onChange={(e) => setSupportForm(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-sm text-gray-300'>Email</label>
                                <input
                                    type='email'
                                    className='mt-2 w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-blue-400/50'
                                    value={supportForm.email}
                                    onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className='text-sm text-gray-300'>Contact Number</label>
                                <input
                                    type='tel'
                                    className='mt-2 w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-blue-400/50'
                                    value={supportForm.phone}
                                    onChange={(e) => setSupportForm(prev => ({ ...prev, phone: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className='text-sm text-gray-300'>Your Query</label>
                            <textarea
                                rows='4'
                                className='mt-2 w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-blue-400/50'
                                value={supportForm.query}
                                onChange={(e) => setSupportForm(prev => ({ ...prev, query: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className='text-sm text-gray-300'>Screenshot (optional)</label>
                            <input
                                type='file'
                                accept='image/*'
                                className='mt-2 block w-full text-sm text-gray-300'
                                onChange={(e) => setSupportForm(prev => ({ ...prev, screenshot: e.target.files?.[0] || null }))}
                            />
                        </div>
                        {supportStatus && (
                            <div className={`text-sm ${supportStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
                                {supportStatus.message}
                            </div>
                        )}
                        <button className='w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-semibold'>
                            Submit Query
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Floating AI Chatbot */}
            <div className='fixed bottom-6 right-6 z-50'>
                {chatOpen && (
                    <div className='mb-3 w-80 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden'>
                        <div className='flex items-center justify-between px-4 py-3 border-b border-white/10'>
                            <div className='font-semibold'>AI Help</div>
                            <button onClick={() => setChatOpen(false)} className='text-gray-400 hover:text-white'>×</button>
                        </div>
                        <div className='max-h-72 overflow-y-auto px-4 py-3 space-y-3'>
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
                                    <span className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-blue-500/20 text-blue-200" : "bg-white/10 text-gray-200"}`}>
                                        {m.content}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center gap-2 p-3 border-t border-white/10'>
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                                className='flex-1 rounded-lg bg-slate-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none'
                                placeholder='Ask about pricing, credits...'
                            />
                            <button onClick={handleChatSend} className='px-3 py-2 rounded-lg bg-blue-500 text-sm font-semibold'>
                                Send
                            </button>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg flex items-center justify-center font-bold'
                >
                    AI
                </button>
            </div>
        </div>
    )
}

export default Home
