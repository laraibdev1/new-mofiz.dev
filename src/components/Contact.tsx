"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { sendEmail } from "@/lib/actions"
// import { useToast } from "@/hooks/use-toast"
import ReCAPTCHA from "react-google-recaptcha"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
  recaptcha?: string
}

export default function Contact() {
  // const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      isValid = false
    }

    // ReCAPTCHA validation (if enabled)
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Reset status when user starts editing after a submission
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (token) {
      setErrors((prev) => ({ ...prev, recaptcha: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await sendEmail({
        ...formData,
        recaptchaToken,
      })

      // toast({
      //   title: "Message sent successfully!",
      //   description: "Thank you for reaching out. I'll get back to you soon.",
      //   variant: "default",
      // })

      setSubmitStatus("success")

      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setRecaptchaToken(null)
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    } catch (error) {
      console.error("Error sending email:", error)

      // toast({
      //   title: "Message could not be sent",
      //   description: "There was an error sending your message. Please try again later.",
      //   variant: "destructive",
      // })

      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-primary/5 h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-6 mt-auto">
                  <a
                    href="mailto:rahmanlaraib11@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">rahmanlaraib11@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-muted-foreground">github.com/yourusername</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">linkedin.com/in/yourusername</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message could not be sent</p>
                      <p className="text-sm mt-1">There was an error sending your message. Please try again later.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full ${errors.name ? "border-destructive" : ""}`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full ${errors.email ? "border-destructive" : ""}`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className={`w-full min-h-[150px] ${errors.message ? "border-destructive" : ""}`}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="flex flex-col items-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                        theme={
                          typeof window !== "undefined" && document.documentElement.classList.contains("dark")
                            ? "dark"
                            : "light"
                        }
                      />
                      {errors.recaptcha && (
                        <p className="text-sm text-destructive mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.recaptcha}
                        </p>
                      )}
                    </div>
                  )}

                  <Button type="submit" className="w-full relative" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">Send Message</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

