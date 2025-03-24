"use server"

import nodemailer from "nodemailer"

interface EmailData {
  name: string
  email: string
  message: string
  recaptchaToken?: string | null
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn("RECAPTCHA_SECRET_KEY is not set. Skipping verification.")
    return true
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }).toString(),
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function sendEmail(data: EmailData) {
  const { name, email, message, recaptchaToken } = data

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("EMAIL_USER or EMAIL_PASSWORD is missing in environment variables.")
    throw new Error("Email server credentials are not set.")
  }

  // Verify reCAPTCHA if token is provided
  if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
    const isValid = await verifyRecaptcha(recaptchaToken)
    if (!isValid) {
      throw new Error("reCAPTCHA verification failed")
    }
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // Use true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Default to sending emails to yourself
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
  }

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.response)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}

