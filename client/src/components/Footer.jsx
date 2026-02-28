import React from 'react'
import { motion } from 'motion/react'
import { Linkedin, Mail, ExternalLink } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Documentation', 'API', 'Community', 'Support'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] }
  ]

  return (
    <footer className='relative mt-20 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent pt-20 pb-10 border-t border-white/5'>
      {/* Background elements */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' />

      <div className='max-w-7xl mx-auto px-6'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-12 mb-12'>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='md:col-span-1'
          >
            <div className='mb-6'>
              <h3 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Code2Cloud
              </h3>
              <p className='text-sm text-gray-500 mt-2'>Build and deploy beautiful websites with AI.</p>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-3'>
              <motion.a
                href='https://www.linkedin.com/in/tanmay-hingankar'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.1, y: -2 }}
                className='p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400/30 transition'
              >
                <Linkedin className='w-4 h-4' />
              </motion.a>
              <motion.a
                href='mailto:hingankartanmay@gmail.com'
                whileHover={{ scale: 1.1, y: -2 }}
                className='p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400/30 transition'
              >
                <Mail className='w-4 h-4' />
              </motion.a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className='text-sm font-semibold text-white mb-4'>{section.title}</h4>
              <ul className='space-y-2'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <button className='text-xs text-gray-400 hover:text-blue-400 transition duration-200'>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8' />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row items-center justify-between gap-6'
        >
          {/* Copyright and Credit */}
          <div className='text-sm text-gray-500 text-center md:text-left'>
            <p>(c) {currentYear} Code2Cloud. All rights reserved.</p>
            <p className='mt-2'>
              Crafted with love by{' '}
              <a
                href='https://www.linkedin.com/in/tanmay-hingankar'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1 font-bold'
              >
                Tanmay
                <ExternalLink className='w-3 h-3' />
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className='flex flex-col items-center md:items-end gap-3 text-sm'>
            <a
              href='mailto:hingankartanmay@gmail.com'
              className='text-sm text-gray-400 hover:text-blue-400 transition inline-flex items-center gap-2'
            >
              <Mail className='w-4 h-4' />
              hingankartanmay@gmail.com
            </a>
            <div className='text-sm text-gray-400 inline-flex items-center gap-2'>
              <span className='w-4 h-4 rounded-full bg-blue-400/20 border border-blue-400/30 inline-block' />
              8010414037
            </div>
            <a
              href='https://www.linkedin.com/in/tanmay-hingankar'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-gray-400 hover:text-blue-400 transition inline-flex items-center gap-2'
            >
              <Linkedin className='w-4 h-4' />
              LinkedIn Profile
            </a>
          </div>
        </motion.div>

        {/* Bottom gradient line */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent' />
      </div>
    </footer>
  )
}

export default Footer
