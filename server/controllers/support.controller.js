import nodemailer from "nodemailer"

const buildTransport = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export const submitSupport = async (req, res) => {
  try {
    const { name, email, phone, query } = req.body
    if (!name || !email || !phone || !query) {
      return res.status(400).json({ message: "name, email, phone, and query are required" })
    }

    const toEmail = process.env.SUPPORT_EMAIL_TO || process.env.SMTP_USER
    if (!toEmail) {
      return res.status(500).json({ message: "support email not configured" })
    }

    const transporter = buildTransport()
    const attachments = []
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      })
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: toEmail,
      subject: `Code2Cloud Support: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nQuery:\n${query}`,
      attachments,
    })

    return res.status(200).json({ message: "support request submitted" })
  } catch (error) {
    console.error("support error:", error)
    return res.status(500).json({ message: "support error" })
  }
}
