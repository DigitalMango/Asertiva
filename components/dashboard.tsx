"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Home,
  Newspaper,
  Scale,
  Bookmark,
  User,
  Bell,
  Search,
  Globe,
  Building,
  Trash2,
  Download,
  Plus,
  Folder,
  Eye,
  ExternalLink,
} from "lucide-react"

interface DashboardProps {
  user: { name: string }
}

// Mock data for different sections
const legalUpdates = [
  {
    id: 1,
    title: "New Data Protection Regulations for Financial Services",
    date: "2024-01-15",
    summary:
      "Updated compliance requirements for financial institutions regarding customer data handling and privacy protection measures.",
    category: "Data Protection",
    priority: "High",
  },
  {
    id: 2,
    title: "Employment Law Changes Effective Q2 2024",
    date: "2024-01-12",
    summary:
      "Significant updates to remote work policies and employee rights legislation affecting all business sectors.",
    category: "Employment",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Corporate Tax Reform Implementation Guidelines",
    date: "2024-01-10",
    summary: "New guidelines for corporate tax compliance and reporting requirements for medium to large enterprises.",
    category: "Tax Law",
    priority: "High",
  },
  {
    id: 4,
    title: "Environmental Compliance Updates for Manufacturing",
    date: "2024-01-08",
    summary: "Updated environmental regulations and sustainability reporting requirements for manufacturing companies.",
    category: "Environmental",
    priority: "Medium",
  },
]

const newsArticles = [
  {
    id: 1,
    headline: "Supreme Court Rules on Digital Privacy Rights in Workplace",
    summary:
      "Landmark decision establishes new precedent for employee privacy expectations in digital communications and monitoring.",
    date: "2024-01-16",
    source: "Legal Times",
    relevance: "High",
    industry: "Technology",
  },
  {
    id: 2,
    headline: "EU Announces Stricter AI Regulation Framework",
    summary:
      "New comprehensive regulations for artificial intelligence applications in business, with significant compliance requirements.",
    date: "2024-01-15",
    source: "European Legal Review",
    relevance: "High",
    industry: "Technology",
  },
  {
    id: 3,
    headline: "Healthcare Data Breach Penalties Increase Significantly",
    summary:
      "New enforcement guidelines result in substantially higher fines for healthcare organizations failing to protect patient data.",
    date: "2024-01-14",
    source: "Healthcare Law Journal",
    relevance: "Medium",
    industry: "Healthcare",
  },
  {
    id: 4,
    headline: "Financial Services Face New Anti-Money Laundering Requirements",
    summary:
      "Updated AML compliance standards require enhanced due diligence and reporting procedures for financial institutions.",
    date: "2024-01-13",
    source: "Banking Compliance Weekly",
    relevance: "High",
    industry: "Finance",
  },
]

const laws = [
  {
    id: 1,
    title: "Digital Services Act (DSA)",
    dateEnacted: "2024-01-01",
    country: "European Union",
    sector: "Technology",
    category: "Digital Rights",
    interpretation:
      "This law requires large online platforms to take greater responsibility for content moderation and user safety. Companies must implement transparent reporting systems and risk assessment procedures.",
    tags: ["Platform Liability", "Content Moderation", "User Safety"],
  },
  {
    id: 2,
    title: "Corporate Transparency Act",
    dateEnacted: "2024-01-01",
    country: "United States",
    sector: "Corporate",
    category: "Financial Reporting",
    interpretation:
      "Small corporations and LLCs must now report beneficial ownership information to FinCEN. This aims to prevent money laundering and improve corporate transparency.",
    tags: ["Beneficial Ownership", "FinCEN", "Small Business"],
  },
  {
    id: 3,
    title: "AI Liability Directive",
    dateEnacted: "2023-12-15",
    country: "European Union",
    sector: "Technology",
    category: "Artificial Intelligence",
    interpretation:
      "Establishes liability rules for AI systems, making it easier for individuals to claim compensation for damages caused by AI. Companies using high-risk AI must ensure proper safeguards.",
    tags: ["AI Liability", "Risk Assessment", "Consumer Protection"],
  },
  {
    id: 4,
    title: "Green Taxonomy Regulation Update",
    dateEnacted: "2023-12-01",
    country: "European Union",
    sector: "Environmental",
    category: "Sustainability",
    interpretation:
      "Expanded criteria for environmentally sustainable economic activities. Companies must disclose how their activities align with EU environmental objectives.",
    tags: ["ESG Reporting", "Environmental Standards", "Disclosure"],
  },
]

const savedDocs = [
  {
    id: 1,
    title: "GDPR Compliance Checklist 2024",
    type: "Document",
    dateSaved: "2024-01-10",
    tags: ["GDPR", "Privacy", "Compliance"],
    folder: "Privacy & Data Protection",
  },
  {
    id: 2,
    title: "Employment Contract Template - Remote Work",
    type: "Template",
    dateSaved: "2024-01-08",
    tags: ["Employment", "Remote Work", "Contracts"],
    folder: "HR & Employment",
  },
  {
    id: 3,
    title: "Corporate Tax Reform Analysis",
    type: "Article",
    dateSaved: "2024-01-05",
    tags: ["Tax Law", "Corporate", "Analysis"],
    folder: "Tax & Finance",
  },
  {
    id: 4,
    title: "AI Ethics Guidelines for Business",
    type: "Guidelines",
    dateSaved: "2024-01-03",
    tags: ["AI", "Ethics", "Technology"],
    folder: "Technology & Innovation",
  },
]

const sidebarItems = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Newspaper, label: "News", key: "news" },
  { icon: Scale, label: "Laws", key: "laws" },
  { icon: Bookmark, label: "Saved Docs", key: "saved" },
  { icon: User, label: "Account", key: "account" },
]

export function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [newsSort, setNewsSort] = useState("date")
  const [lawsFilter, setLawsFilter] = useState({ country: "all", sector: "all", category: "all" })
  const [savedDocsSearch, setSavedDocsSearch] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")

  const folders = ["Privacy & Data Protection", "HR & Employment", "Tax & Finance", "Technology & Innovation"]

  const filteredNews = [...newsArticles].sort((a, b) => {
    if (newsSort === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (newsSort === "relevance") return b.relevance.localeCompare(a.relevance)
    return 0
  })

  const filteredLaws = laws.filter((law) => {
    return (
      (lawsFilter.country === "all" || law.country === lawsFilter.country) &&
      (lawsFilter.sector === "all" || law.sector === lawsFilter.sector) &&
      (lawsFilter.category === "all" || law.category === lawsFilter.category)
    )
  })

  const filteredSavedDocs = savedDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(savedDocsSearch.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(savedDocsSearch.toLowerCase()))
    const matchesFolder = selectedFolder === "all" || doc.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const renderHome = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-light mb-4">Recent Legal Updates</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {legalUpdates.map((update, index) => (
          <Card
            key={update.id}
            className="bg-gray-900 border-gray-800 hover:border-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge
                  variant="secondary"
                  className={`${
                    update.priority === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {update.priority}
                </Badge>
                <span className="text-sm text-light/60">{update.date}</span>
              </div>
              <CardTitle className="text-light text-lg leading-tight">{update.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-light/80 text-sm leading-relaxed mb-3">{update.summary}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-accent-gray text-accent-gray">
                  {update.category}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-accent-blue hover:text-accent-blue/80 hover:bg-accent-blue/10"
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderNews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-light">Legal News Feed</h2>
        <Select value={newsSort} onValueChange={setNewsSort}>
          <SelectTrigger className="w-40 bg-gray-900 border-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="relevance">Sort by Relevance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredNews.map((article, index) => (
          <Card
            key={article.id}
            className="bg-gray-900 border-gray-800 hover:border-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2">
                  <Badge
                    variant="secondary"
                    className={`${
                      article.relevance === "High" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {article.relevance} Relevance
                  </Badge>
                  <Badge variant="outline" className="border-accent-gray text-accent-gray">
                    {article.industry}
                  </Badge>
                </div>
                <span className="text-sm text-light/60">{article.date}</span>
              </div>
              <CardTitle className="text-light text-lg leading-tight">{article.headline}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-light/80 text-sm leading-relaxed mb-3">{article.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-light/60">Source: {article.source}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-accent-blue hover:text-accent-blue/80 hover:bg-accent-blue/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderLaws = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-light">Recent Laws & Regulations</h2>
        <div className="flex gap-2">
          <Select
            value={lawsFilter.country}
            onValueChange={(value) => setLawsFilter({ ...lawsFilter, country: value })}
          >
            <SelectTrigger className="w-40 bg-gray-900 border-gray-800">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="European Union">European Union</SelectItem>
            </SelectContent>
          </Select>
          <Select value={lawsFilter.sector} onValueChange={(value) => setLawsFilter({ ...lawsFilter, sector: value })}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-800">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLaws.map((law, index) => (
          <Card
            key={law.id}
            className="bg-gray-900 border-gray-800 hover:border-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-accent-blue text-accent-blue">
                    <Globe className="h-3 w-3 mr-1" />
                    {law.country}
                  </Badge>
                  <Badge variant="outline" className="border-accent-gray text-accent-gray">
                    <Building className="h-3 w-3 mr-1" />
                    {law.sector}
                  </Badge>
                </div>
                <span className="text-sm text-light/60">Enacted: {law.dateEnacted}</span>
              </div>
              <CardTitle className="text-light text-lg leading-tight">{law.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <h4 className="text-accent-blue text-sm font-medium mb-2">Plain Language Summary:</h4>
                <p className="text-light/80 text-sm leading-relaxed">{law.interpretation}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {law.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-800 text-light/70">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  {law.category}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-accent-blue hover:text-accent-blue/80 hover:bg-accent-blue/10"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSavedDocs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-light">Saved Documents</h2>
        <Button size="sm" className="bg-accent-blue hover:bg-accent-blue/90 text-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light/50" />
            <Input
              placeholder="Search saved documents..."
              value={savedDocsSearch}
              onChange={(e) => setSavedDocsSearch(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-light"
            />
          </div>
        </div>
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-60 bg-gray-900 border-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            {folders.map((folder) => (
              <SelectItem key={folder} value={folder}>
                <Folder className="h-4 w-4 mr-2 inline" />
                {folder}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSavedDocs.map((doc, index) => (
          <Card
            key={doc.id}
            className="bg-gray-900 border-gray-800 hover:border-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-accent-gray/20 text-accent-gray">
                  {doc.type}
                </Badge>
                <span className="text-xs text-light/60">{doc.dateSaved}</span>
              </div>
              <CardTitle className="text-light text-base leading-tight">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-xs text-light/60 mb-2">
                  <Folder className="h-3 w-3 inline mr-1" />
                  {doc.folder}
                </p>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-800 text-light/70 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-accent-blue hover:text-accent-blue/80 hover:bg-accent-blue/10 p-2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAccount = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-light mb-6">Account Settings</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-light">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-light/80">
                Full Name
              </Label>
              <Input id="name" defaultValue={user.name} className="bg-gray-800 border-gray-700 text-light" />
            </div>
            <div>
              <Label htmlFor="email" className="text-light/80">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="maria.gonzalez@company.com"
                className="bg-gray-800 border-gray-700 text-light"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-light/80">
                Company
              </Label>
              <Input
                id="company"
                defaultValue="TechCorp Solutions"
                className="bg-gray-800 border-gray-700 text-light"
              />
            </div>
            <div>
              <Label htmlFor="industry" className="text-light/80">
                Industry
              </Label>
              <Select defaultValue="technology">
                <SelectTrigger className="bg-gray-800 border-gray-700 text-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-light">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-light/80">Legal Updates</Label>
                <p className="text-sm text-light/60">Receive notifications for new legal updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-light/80">News Alerts</Label>
                <p className="text-sm text-light/60">Get notified about relevant legal news</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-light/80">Weekly Digest</Label>
                <p className="text-sm text-light/60">Receive weekly summary emails</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-light/80">High Priority Only</Label>
                <p className="text-sm text-light/60">Only notify for high-priority updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-light">Legal Areas of Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Data Protection",
                "Employment Law",
                "Corporate Governance",
                "Tax Law",
                "Environmental",
                "Intellectual Property",
                "Contract Law",
                "Compliance",
              ].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Switch
                    defaultChecked={["Data Protection", "Employment Law", "Corporate Governance"].includes(area)}
                  />
                  <Label className="text-sm text-light/80">{area}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-light">Data & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-dark"
            >
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-light/70 hover:bg-gray-800">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return renderHome()
      case "news":
        return renderNews()
      case "laws":
        return renderLaws()
      case "saved":
        return renderSavedDocs()
      case "account":
        return renderAccount()
      default:
        return renderHome()
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-dark border-r border-gray-800 p-6 hidden lg:block">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.key}
              variant={activeTab === item.key ? "secondary" : "ghost"}
              className={`w-full justify-start transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30"
                  : "text-light/70 hover:text-light hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark border-t border-gray-800 p-4 z-40">
        <div className="flex justify-around">
          {sidebarItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 ${activeTab === item.key ? "text-accent-blue" : "text-light/70"}`}
              onClick={() => setActiveTab(item.key)}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 lg:pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-light mb-2">Welcome back, {user.name}</h1>
                <p className="text-light/70">Stay updated with the latest legal developments for your business</p>
              </div>
              <Button size="sm" className="bg-accent-gray hover:bg-accent-gray/90 text-dark">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
