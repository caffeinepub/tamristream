import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Server,
  Database,
  Cloud,
  CreditCard,
  BarChart3,
  FileCode,
  Shield,
  Zap,
  Globe,
  Wallet,
  Film,
  Code,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Lock,
  TrendingUp,
} from 'lucide-react';

export function TechnicalDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600 text-white">Technical Architecture</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TamriStream Technical Implementation
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Built on Internet Computer Protocol with React, Motoko smart contracts, and decentralized storage
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-zinc-900 p-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="frontend" className="data-[state=active]:bg-blue-600">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-blue-600">
              Backend
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-blue-600">
              Storage
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-blue-600">
              Payments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  Architecture Overview
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  TamriStream is built on a modern, decentralized architecture leveraging Internet Computer Protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-500" />
                      Technology Stack
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span><strong>Frontend:</strong> React 19 with TypeScript and TailwindCSS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span><strong>Backend:</strong> Motoko smart contracts on ICP canisters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span><strong>Storage:</strong> Fleek & Cloudflare Stream for video delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span><strong>Authentication:</strong> Internet Identity (decentralized)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span><strong>Payments:</strong> ICP Ledger, Stripe, Plug Wallet</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Fully decentralized and censorship-resistant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Transparent on-chain payments and royalties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Instant payouts with zero intermediaries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Immutable content ownership records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Scalable infrastructure for global reach</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Data Flow Architecture</h3>
                  <div className="space-y-3 text-zinc-300 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
                      <span>User authenticates via Internet Identity (no passwords)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
                      <span>Frontend React app communicates with ICP canisters</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">3</div>
                      <span>Motoko smart contracts process all business logic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">4</div>
                      <span>Video content served via Fleek/Cloudflare CDN</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">5</div>
                      <span>Payments processed through ICP Ledger or Stripe</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">6</div>
                      <span>Analytics logged on-chain for transparency</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Frontend Tab */}
          <TabsContent value="frontend" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-500" />
                  Frontend Implementation
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Modern React application with professional African-inspired design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">React & TypeScript</h3>
                    <p className="text-zinc-300 text-sm">
                      Built with React 19 and TypeScript for type safety and modern development practices. 
                      Component-based architecture ensures maintainability and reusability.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Modular component structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>React Query for server state management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>TanStack Router for navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Custom hooks for backend integration</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">TailwindCSS Styling</h3>
                    <p className="text-zinc-300 text-sm">
                      Professional African-inspired design system with sea blue primary colors, 
                      responsive layouts, and accessibility features.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Mobile-first responsive design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Dark mode with theme provider</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>WCAG accessibility compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Optimized performance with lazy loading</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Frontend Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Film className="w-8 h-8 text-blue-500" />
                      <h4 className="font-semibold text-white">Content Browsing</h4>
                      <p className="text-zinc-300 text-sm">
                        Intuitive interfaces for movies, music, sports, and podcasts with search and filtering
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Wallet className="w-8 h-8 text-blue-500" />
                      <h4 className="font-semibold text-white">Payment Integration</h4>
                      <p className="text-zinc-300 text-sm">
                        Seamless payment flows for ICP, Stripe, and Plug Wallet with clear UI
                      </p>
                    </div>
                    <div className="space-y-2">
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                      <h4 className="font-semibold text-white">Creator Dashboards</h4>
                      <p className="text-zinc-300 text-sm">
                        Real-time analytics and earnings tracking with blockchain verification
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backend Tab */}
          <TabsContent value="backend" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-500" />
                  Backend Architecture
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Motoko smart contracts on Internet Computer Protocol canisters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">ICP Canisters & Motoko</h3>
                  <p className="text-zinc-300">
                    All backend functionality is implemented using Motoko smart contracts deployed on ICP canisters. 
                    This provides a fully decentralized, tamper-proof backend with transparent execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-6 space-y-3">
                    <Database className="w-8 h-8 text-blue-500" />
                    <h4 className="font-semibold text-white">Data Management</h4>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Movie metadata and content catalogs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>User profiles and preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Creator verification and submissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Ratings, reviews, and social features</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 space-y-3">
                    <Lock className="w-8 h-8 text-blue-500" />
                    <h4 className="font-semibold text-white">Authentication</h4>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Internet Identity integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Role-based access control (admin/user)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Creator verification workflow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Secure session management</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Smart Contract Features</h3>
                  <div className="space-y-3 text-zinc-300 text-sm">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Smart Royalties System:</strong> Automated revenue distribution 
                        with unique canister IDs for each content piece, transparent event logging, and instant payouts
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Content Registry:</strong> Immutable ownership records with NFT 
                        creation, blockchain certificates, and cross-platform tracking
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Revenue Model:</strong> Configurable revenue splits (70-90% to creators) 
                        enforced by smart contracts with transparent calculations
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage Tab */}
          <TabsContent value="storage" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-blue-500" />
                  Video Storage & Delivery
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Decentralized storage with Fleek and Cloudflare Stream for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-8 h-8 text-blue-500" />
                      <h3 className="text-lg font-semibold text-white">Fleek Integration</h3>
                    </div>
                    <p className="text-zinc-300 text-sm">
                      Primary video storage solution using Fleek's decentralized storage network built on IPFS and Filecoin.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Decentralized and censorship-resistant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Permanent content availability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Global CDN distribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Automatic IPFS pinning</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-8 h-8 text-blue-500" />
                      <h3 className="text-lg font-semibold text-white">Cloudflare Stream</h3>
                    </div>
                    <p className="text-zinc-300 text-sm">
                      Alternative high-performance video streaming solution with automatic transcoding and adaptive bitrate.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Automatic video transcoding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Adaptive bitrate streaming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Global edge network delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Built-in DRM protection</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Access Control & Security</h3>
                  <div className="space-y-3 text-zinc-300 text-sm">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Token-Based Authentication:</strong> Video access permissions 
                        managed through ICP canisters with secure token generation and validation
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Subscription Verification:</strong> Real-time subscription status 
                        checks before granting content access with smart contract enforcement
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Content Protection:</strong> Encrypted streaming with DRM support 
                        and watermarking for premium content protection
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    Streaming Optimization
                  </h3>
                  <p className="text-zinc-300 text-sm">
                    Both Fleek and Cloudflare Stream provide adaptive bitrate streaming, ensuring optimal playback 
                    quality across different network conditions. Content is cached at edge locations worldwide for 
                    minimal latency and fast load times.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-blue-500" />
                  Payment System Architecture
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Multi-currency payment processing with ICP Ledger, Stripe, and Plug Wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <Wallet className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">ICP Ledger</h3>
                    <p className="text-zinc-300 text-sm">
                      Native ICP token payments processed directly on-chain with instant confirmation and zero fees.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Instant transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Zero transaction fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Transparent blockchain records</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <CreditCard className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">Stripe Integration</h3>
                    <p className="text-zinc-300 text-sm">
                      Traditional card payments via Stripe with automatic conversion to platform tokens.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Credit & debit cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Automatic crypto conversion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>PCI DSS compliant</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <Wallet className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">Plug Wallet</h3>
                    <p className="text-zinc-300 text-sm">
                      Direct integration with Plug Wallet for seamless ICP ecosystem payments and withdrawals.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>One-click payments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Instant withdrawals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Multi-token support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Creator Payout Flows</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Revenue Generation</h4>
                        <p className="text-zinc-300 text-sm">
                          User subscriptions, pay-per-view, and tips are processed through ICP Ledger or Stripe
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Smart Contract Calculation</h4>
                        <p className="text-zinc-300 text-sm">
                          Motoko smart contracts automatically calculate creator share (70-90%) based on revenue model
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Instant Distribution</h4>
                        <p className="text-zinc-300 text-sm">
                          Earnings are instantly transferred to creator's preferred wallet (Plug, ICP, or traditional methods)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Blockchain Verification</h4>
                        <p className="text-zinc-300 text-sm">
                          All transactions are recorded on-chain with public audit trails and transaction IDs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Payment Security
                  </h3>
                  <p className="text-zinc-300 text-sm">
                    All payment processing implements industry-standard security measures including SSL/TLS encryption, 
                    PCI DSS compliance for card payments, and blockchain verification for crypto transactions. No sensitive 
                    payment data is stored on our servers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                  Analytics & Tracking
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Comprehensive analytics using ICP logging and optional external databases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <Database className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">ICP Logging System</h3>
                    <p className="text-zinc-300 text-sm">
                      All viewer statistics, watch time, and user behavior are logged directly on ICP canisters 
                      for transparency and immutability.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Immutable event logging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Real-time data updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Transparent calculations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Public audit capability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">External Database</h3>
                    <p className="text-zinc-300 text-sm">
                      Optional integration with external analytics databases for advanced reporting and 
                      data visualization capabilities.
                    </p>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Advanced data visualization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Historical trend analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Custom report generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>Export capabilities</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Creator Analytics Dashboard</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                      <h4 className="font-semibold text-white text-sm">Performance Metrics</h4>
                      <p className="text-zinc-300 text-xs">
                        Total views, watch time, engagement rates, and completion rates
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <Globe className="w-6 h-6 text-blue-500" />
                      <h4 className="font-semibold text-white text-sm">Audience Demographics</h4>
                      <p className="text-zinc-300 text-xs">
                        Geographic distribution, device types, and viewing patterns
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                      <h4 className="font-semibold text-white text-sm">Revenue Tracking</h4>
                      <p className="text-zinc-300 text-xs">
                        Real-time earnings, revenue sources, and payout history
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                      <h4 className="font-semibold text-white text-sm">Content Analytics</h4>
                      <p className="text-zinc-300 text-xs">
                        Per-content performance, trending analysis, and recommendations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Admin Analytics Interface</h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    Platform administrators have access to comprehensive analytics dashboards showing:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Platform-wide user engagement metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Content performance across all categories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Revenue tracking and financial reports</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-zinc-300 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Creator payout summaries and trends</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>System performance and health monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>User growth and retention analytics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="bg-zinc-900 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileCode className="w-6 h-6 text-blue-500" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="justify-start h-auto py-4 px-6 border-zinc-700 hover:bg-zinc-800"
                onClick={() => window.open('https://internetcomputer.org/docs', '_blank')}
              >
                <div className="flex items-start gap-3 text-left">
                  <ExternalLink className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white mb-1">ICP Documentation</div>
                    <div className="text-xs text-zinc-400">Learn about Internet Computer Protocol</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto py-4 px-6 border-zinc-700 hover:bg-zinc-800"
                onClick={() => window.open('https://fleek.co/docs', '_blank')}
              >
                <div className="flex items-start gap-3 text-left">
                  <ExternalLink className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white mb-1">Fleek Documentation</div>
                    <div className="text-xs text-zinc-400">Decentralized storage and hosting</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto py-4 px-6 border-zinc-700 hover:bg-zinc-800"
                onClick={() => window.open('https://plugwallet.ooo', '_blank')}
              >
                <div className="flex items-start gap-3 text-left">
                  <ExternalLink className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white mb-1">Plug Wallet</div>
                    <div className="text-xs text-zinc-400">ICP ecosystem wallet integration</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
