"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, HelpCircle, Book, MessageCircle, Mail, Phone, FileText, Video, ExternalLink, Send, RefreshCw } from "lucide-react"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { useToast } from "@/components/ui/use-toast"

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I set up my first campaign?",
        answer:
          "To set up your first campaign, navigate to the Campaigns page and click 'Create Campaign'. Choose your campaign type, set your budget, define your target audience, and configure your campaign settings. Our step-by-step wizard will guide you through the process.",
      },
      {
        question: "What metrics should I track?",
        answer:
          "Key metrics to track include conversion rate, click-through rate (CTR), cost per acquisition (CPA), return on ad spend (ROAS), and lifetime value (LTV). Focus on metrics that align with your business objectives.",
      },
      {
        question: "How do I interpret my analytics data?",
        answer:
          "Start by looking at trends over time rather than single data points. Compare performance across different campaigns, channels, and time periods. Use the built-in comparison tools and filters to drill down into specific segments.",
      },
    ],
  },
  {
    category: "Account Management",
    questions: [
      {
        question: "How do I upgrade my plan?",
        answer:
          "Go to Settings > Billing & Subscription and click 'Change Plan'. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll be prorated for any billing differences.",
      },
      {
        question: "Can I add team members?",
        answer:
          "Yes! Professional and Enterprise plans support multiple team members. Go to Settings > Team Management to invite users and assign roles with appropriate permissions.",
      },
      {
        question: "How do I export my data?",
        answer:
          "You can export data from any report or table by clicking the 'Export' button. Choose from PDF, CSV, or Excel formats. Automated reports can also be scheduled to be sent via email.",
      },
    ],
  },
  {
    category: "Integrations",
    questions: [
      {
        question: "Which platforms can I connect?",
        answer:
          "We support integrations with Google Analytics, Facebook Ads, Google Ads, Mailchimp, Slack, Zapier, and many more. Check the Integrations page for a full list of supported platforms.",
      },
      {
        question: "How do I troubleshoot integration issues?",
        answer:
          "First, check that your API keys are valid and have the necessary permissions. Ensure your connected accounts haven't expired. If issues persist, contact our support team with the specific error message.",
      },
    ],
  },
  {
    category: "Billing & Pricing",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer or invoice.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Absolutely. You can cancel your subscription at any time from the billing settings. Your account will remain active until the end of your current billing period.",
      },
    ],
  },
]

const resources = [
  {
    title: "Getting Started Guide",
    description: "Complete guide to setting up your account and first campaign",
    type: "guide",
    icon: Book,
    link: "#",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video tutorials for all major features",
    type: "video",
    icon: Video,
    link: "#",
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers and integrations",
    type: "docs",
    icon: FileText,
    link: "#",
  },
  {
    title: "Best Practices",
    description: "Tips and strategies for optimizing your campaigns",
    type: "guide",
    icon: Book,
    link: "#",
  },
  {
    title: "Webinar Series",
    description: "Live and recorded webinars on advanced topics",
    type: "video",
    icon: Video,
    link: "#",
  },
  {
    title: "Community Forum",
    description: "Connect with other users and share experiences",
    type: "community",
    icon: MessageCircle,
    link: "#",
  },
]

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const { toast } = useToast()

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    setIsContactDialogOpen(false)

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    })

    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you within 24 hours.",
    })
  }

  const handleQuickAction = (actionType: string) => {
    toast({
      title: `${actionType} Support`,
      description: `Opening ${actionType.toLowerCase()} support channel...`,
    })
  }

  const handleResourceClick = (resource: typeof resources[0]) => {
    toast({
      title: "Opening Resource",
      description: `Loading ${resource.title}...`,
    })
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header - Enhanced with same UX patterns */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Find answers to your questions and get the help you need</p>
        </div>
        <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
          <DialogTrigger asChild>
            <Button className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <MessageCircle className="h-4 w-4 mr-2 group-hover:animate-pulse transition-all duration-200" />
              <span className="relative z-10">Contact Support</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Contact Support</DialogTitle>
              <DialogDescription>Send us a message and we'll get back to you as soon as possible.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={contactForm.subject} onValueChange={(value) => setContactForm({ ...contactForm, subject: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="integration">Integration Help</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={isSending}
                className="group relative overflow-hidden hover:scale-105 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isSending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                )}
                <span className="relative z-10">
                  {isSending ? "Sending..." : "Send Message"}
                </span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className="group transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
          onClick={() => handleQuickAction("Live Chat")}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-200">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="group transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
          onClick={() => handleQuickAction("Email")}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-200">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Email Support</h3>
              <p className="text-sm text-muted-foreground">Send us an email and we'll respond within 24h</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="group transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
          onClick={() => handleQuickAction("Phone")}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:scale-110 transition-transform duration-200">
              <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">Phone Support</h3>
              <p className="text-sm text-muted-foreground">Call us for urgent issues (Enterprise only)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Content - Enhanced tab style */}
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "faq", label: "FAQ", icon: "" },
            { value: "guides", label: "Guides & Tutorials", icon: "" },
            { value: "resources", label: "Resources", icon: "" },
            { value: "status", label: "System Status", icon: "" }
          ].map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="group relative data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:scale-105 data-[state=active]:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex items-center space-x-2">
                <span className="group-hover:animate-bounce transition-transform">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {filteredFAQ.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>{category.category}</span>
                  </CardTitle>
                  <CardDescription>{category.questions.length} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources
              .filter((r) => r.type === "guide" || r.type === "video")
              .map((resource) => (
                <Card key={resource.title} className="transition-all duration-200 hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <resource.icon className="h-5 w-5" />
                      <span>{resource.title}</span>
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.title} className="transition-all duration-200 hover:shadow-md cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <resource.icon className="h-5 w-5" />
                    <span>{resource.title}</span>
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.type}</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>All Systems Operational</span>
              </CardTitle>
              <CardDescription>All services are running normally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { service: "Dashboard", status: "operational" },
                { service: "Analytics API", status: "operational" },
                { service: "Campaign Management", status: "operational" },
                { service: "Data Processing", status: "operational" },
                { service: "Integrations", status: "operational" },
                { service: "Notifications", status: "operational" },
              ].map((item) => (
                <div key={item.service} className="flex items-center justify-between p-3 border rounded">
                  <span className="font-medium">{item.service}</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <Badge
                      variant="outline"
                      className="text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
                    >
                      Operational
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest system updates and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  date: "Dec 1, 2024",
                  title: "Performance Improvements",
                  description: "Improved dashboard loading times by 40%",
                  type: "improvement",
                },
                {
                  date: "Nov 28, 2024",
                  title: "New Integration: Slack",
                  description: "Added Slack integration for real-time notifications",
                  type: "feature",
                },
                {
                  date: "Nov 25, 2024",
                  title: "Scheduled Maintenance",
                  description: "Database optimization completed successfully",
                  type: "maintenance",
                },
              ].map((update, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{update.title}</h4>
                      <Badge variant="outline">{update.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{update.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
