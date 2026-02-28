import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { motion } from "motion/react"
import { useSelector } from 'react-redux';
import api from '../services/api';
const plans = [
    {
        key: "free",
        name: "Free",
        priceLabel: "Free",
        priceValue: 0,
        credits: 100,
        description: "Perfect to explore Code2Cloud",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        popular: false,
        button: "Get Started",
    },
    {
        key: "pro",
        name: "Pro",
        priceLabel: "₹499",
        priceValue: 499,
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },
    {
        key: "enterprise",
        name: "Enterprise",
        priceLabel: "₹1499",
        priceValue: 1499,
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    },
];
function Pricing() {
    const navigate = useNavigate()
  const {userData}=useSelector(state=>state.user)
  const [loading,setLoading]=useState(null)
  const [historyLoading,setHistoryLoading]=useState(false)
  const [history,setHistory]=useState([])

  useEffect(() => {
    if (!userData) return
    const loadHistory = async () => {
        setHistoryLoading(true)
        try {
            const result = await api.get(`/billing/history`)
            setHistory(result.data || [])
        } catch (error) {
            console.log(error)
        } finally {
            setHistoryLoading(false)
        }
    }
    loadHistory()
  }, [userData])
    const handleBuy=async (planKey)=>{
if(!userData){
navigate("/")
return
}
if(planKey=="free"){
    navigate("/dashboard")
    return
}
setLoading(planKey)
try {
    const result=await api.post(`/billing`,{planType:planKey})
    window.location.href=result.data.sessionUrl
} catch (error) {
    console.log(error)
    setLoading(null)
}

    }
    return (
        <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>

            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]' />
            </div>

            <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition' onClick={() => navigate("/")}>
                <ArrowLeft size={16} />
                Back
            </button>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-4xl mx-auto text-center mb-14"
            >
                <h1 className='text-4xl md:text-5xl font-bold mb-4'> Simple, transparent pricing</h1>
                <p className='text-zinc-400 text-lg'> Buy credits once. Build anytime. Payments are processed via Stripe and credits are added automatically.</p>
            </motion.div>

            <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileHover={{ y: -14, scale: 1.03 }}
                        className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all
              ${p.popular
                                ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
                            }`}
                    >
                        {p.popular && (
                            <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500'>Most Popular</span>
                        )}

                        <h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
                        <p className='text-zinc-400 text-sm mb-6'>{p.description}</p>
                        <div className='flex items-end gap-1 mb-4'>
                            <span className='text-4xl font-bold'>{p.priceLabel}</span>
                            {p.priceValue > 0 && (
                                <span className='text-sm text-zinc-400 mb-1'>/one-time</span>
                            )}
                        </div>

                        <div className='flex items-center gap-2 mb-8'>
                            <Coins size={18} className='text-yellow-400' />
                            <span className='font-semibold'>{p.credits} Credits</span>
                        </div>

                        <ul className='space-y-3 mb-10'>
                            {p.features.map((f) => (
                                <li
                                    key={f}
                                    className='flex items-center gap-2 text-sm text-zinc-300'
                                >
                                    <Check size={16} className='text-green-400' />
                                    {f}
                                </li>
                            ))}
                        </ul>


                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            disabled={loading}
                            onClick={()=>handleBuy(p.key)}
                            className={`w-full py-3 rounded-xl font-semibold transition
                              ${p.popular
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "bg-white/10 hover:bg-white/20"
                                } disabled:opacity-60`}
                        >
                            {loading===p.key?"Redirecting...":p.button}


                        </motion.button>


                    </motion.div>
                ))}
            </div>

            {/* Credit Usage */}
            <div className='relative z-10 max-w-4xl mx-auto mt-20 text-center'>
                <h2 className='text-2xl font-semibold mb-4'>Credit Usage</h2>
                <p className='text-zinc-400 text-sm mb-6'>Credits are deducted as you build and deploy websites.</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-left'>
                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
                        <p className='text-sm text-zinc-400 mb-2'>Development</p>
                        <p className='text-lg font-semibold'>50 credits</p>
                        <p className='text-xs text-zinc-500 mt-1'>Generate a new website</p>
                    </div>
                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
                        <p className='text-sm text-zinc-400 mb-2'>Editing</p>
                        <p className='text-lg font-semibold'>25 credits</p>
                        <p className='text-xs text-zinc-500 mt-1'>Update an existing website</p>
                    </div>
                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
                        <p className='text-sm text-zinc-400 mb-2'>Deployment</p>
                        <p className='text-lg font-semibold'>10 credits</p>
                        <p className='text-xs text-zinc-500 mt-1'>Deploy your website live</p>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            {userData && (
                <div className='relative z-10 max-w-5xl mx-auto mt-20'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-2xl font-semibold'>Transaction History</h2>
                        <button
                            onClick={async () => {
                                setHistoryLoading(true)
                                try {
                                    const result = await api.get(`/billing/history`)
                                    setHistory(result.data || [])
                                } catch (error) {
                                    console.log(error)
                                } finally {
                                    setHistoryLoading(false)
                                }
                            }}
                            className='text-sm px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition'
                        >
                            {historyLoading ? "Loading..." : "Refresh"}
                        </button>
                    </div>

                    <div className='rounded-2xl border border-white/10 bg-white/5 overflow-hidden'>
                        <div className='grid grid-cols-5 gap-4 px-5 py-3 text-xs uppercase tracking-wider text-zinc-400 border-b border-white/10'>
                            <span>Date</span>
                            <span>Type</span>
                            <span>Reason</span>
                            <span className='text-right'>Credits</span>
                            <span className='text-right'>Balance</span>
                        </div>
                        <div className='max-h-96 overflow-y-auto'>
                            {history.length === 0 && !historyLoading && (
                                <div className='px-5 py-6 text-sm text-zinc-400'>No transactions yet.</div>
                            )}
                            {history.map((t) => (
                                <div key={t._id} className='grid grid-cols-5 gap-4 px-5 py-4 text-sm border-b border-white/5'>
                                    <span className='text-zinc-400'>{new Date(t.createdAt).toLocaleString()}</span>
                                    <span className={`${t.type === "credit_add" ? "text-green-400" : "text-red-400"}`}>
                                        {t.type === "credit_add" ? "Added" : "Used"}
                                    </span>
                                    <span className='text-zinc-300 capitalize'>{t.reason?.replace("_", " ")}</span>
                                    <span className={`text-right ${t.type === "credit_add" ? "text-green-400" : "text-red-400"}`}>
                                        {t.type === "credit_add" ? "+" : "-"}{t.amount}
                                    </span>
                                    <span className='text-right text-zinc-300'>{t.balanceAfter}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Pricing
