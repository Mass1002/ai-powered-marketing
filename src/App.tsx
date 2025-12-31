import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle, Target, Palette, Article, Copy, ArrowClockwise, LightbulbFilament, TrendUp, Users } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Custom_Card } from '@/components/ui/custom_card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

interface MarketingStrategy {
  marketingCopy: string
  visualStrategy: string
  targetAudience: string
}

function App() {
  const [productBrief, setProductBrief] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategy, setStrategy] = useState<MarketingStrategy | null>(null)
  const [error, setError] = useState<string | null>(null)

  const minChars = 20
  const maxChars = 2000
  const isValid = productBrief.trim().length >= minChars && productBrief.length <= maxChars

  const handleGenerate = async () => {
    if (!isValid) return

    setIsGenerating(true)
    setError(null)
    setStrategy(null)

    try {
      const prompt = window.spark.llmPrompt`You are an expert marketing strategist. A user has provided the following product/service description:

"${productBrief}"

Generate a comprehensive marketing strategy with these three components:

1. Marketing Copy: Write persuasive, engaging marketing copy for this product/service. Make it compelling and action-oriented. 2-3 paragraphs.

2. Visual Strategy: Describe the visual presentation strategy including suggested imagery, colors, design motifs, mood, and overall aesthetic direction. Be specific and actionable.

3. Target Audience: Identify and describe the ideal target audience including demographics, psychographics, pain points, and why this product/service appeals to them.

Return your response as a JSON object with this exact structure:
{
  "marketingCopy": "your marketing copy here",
  "visualStrategy": "your visual strategy here", 
  "targetAudience": "your target audience analysis here"
}`

      const result = await window.spark.llm(prompt, 'gpt-4o', true)
      const parsed = JSON.parse(result)
      
      if (parsed.marketingCopy && parsed.visualStrategy && parsed.targetAudience) {
        setStrategy(parsed)
        toast.success('Marketing strategy generated!')
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError('Failed to generate strategy. Please try again.')
      toast.error('Generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const handleReset = () => {
    setStrategy(null)
    setError(null)
    setProductBrief('')
  }

  return (
    <div className="min-h-screen diagonal-pattern">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkle className="text-primary" size={32} weight="fill" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              AI-Powered Marketing Assistant
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Transform your product description into comprehensive marketing strategies with persuasive copy, visual direction, and audience insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Custom_Card className="px-4 py-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-coral/10 rounded-full">
                <LightbulbFilament size={28} weight="fill" className="text-coral" />
              </div>
              <h3 className="font-semibold text-foreground">Creative Copy</h3>
              <p className="text-sm text-muted-foreground">AI-generated persuasive messaging</p>
            </div>
          </Custom_Card>

          <Custom_Card className="px-4 py-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendUp size={28} weight="fill" className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Visual Strategy</h3>
              <p className="text-sm text-muted-foreground">Design direction and aesthetics</p>
            </div>
          </Custom_Card>

          <Custom_Card className="px-4 py-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-accent/10 rounded-full">
                <Users size={28} weight="fill" className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Target Audience</h3>
              <p className="text-sm text-muted-foreground">Ideal customer profiling</p>
            </div>
          </Custom_Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {!strategy ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Custom_Card className="px-6 md:px-8 shadow-lg border-2">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="product-brief" className="block text-sm font-medium mb-2 text-foreground">
                      Describe Your Product or Service
                    </label>
                    <Textarea
                      id="product-brief"
                      placeholder="e.g., A sustainable water bottle made from recycled ocean plastic, featuring double-wall insulation and a unique filtration system..."
                      value={productBrief}
                      onChange={(e) => setProductBrief(e.target.value)}
                      className="min-h-[200px] text-base resize-none focus-visible:ring-accent focus-visible:ring-2 transition-all duration-200"
                      maxLength={maxChars}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {productBrief.length >= minChars ? (
                          <span className="text-accent font-medium">Ready to generate</span>
                        ) : (
                          <span>Minimum {minChars} characters required</span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {productBrief.length} / {maxChars}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    onClick={handleGenerate}
                    disabled={!isValid || isGenerating}
                    size="lg"
                    className="w-full h-12 md:h-14 text-base md:text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkle className="animate-spin" size={20} weight="fill" />
                        Generating Your Strategy...
                      </>
                    ) : (
                      <>
                        <Sparkle size={20} weight="fill" />
                        Generate Marketing Strategy
                      </>
                    )}
                  </Button>
                </div>
              </Custom_Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Custom_Card className="px-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-coral/10 rounded-lg">
                        <Article size={24} weight="fill" className="text-coral" />
                      </div>
                      <div>
                        <Badge className="bg-coral/20 text-coral hover:bg-coral/30 mb-2">Marketing Copy</Badge>
                        <h3 className="text-xl font-semibold text-foreground">Persuasive Messaging</h3>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(strategy.marketingCopy, 'Marketing copy')}
                      className="hover:bg-coral/10"
                    >
                      <Copy size={20} />
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {strategy.marketingCopy}
                  </p>
                </Custom_Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Custom_Card className="px-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Palette size={24} weight="fill" className="text-primary" />
                      </div>
                      <div>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">Visual Strategy</Badge>
                        <h3 className="text-xl font-semibold text-foreground">Design Direction</h3>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(strategy.visualStrategy, 'Visual strategy')}
                      className="hover:bg-primary/10"
                    >
                      <Copy size={20} />
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {strategy.visualStrategy}
                  </p>
                </Custom_Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Custom_Card className="px-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Target size={24} weight="fill" className="text-accent" />
                      </div>
                      <div>
                        <Badge className="bg-accent/20 text-accent-foreground hover:bg-accent/30 mb-2">Target Audience</Badge>
                        <h3 className="text-xl font-semibold text-foreground">Ideal Customer Profile</h3>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(strategy.targetAudience, 'Target audience')}
                      className="hover:bg-accent/10"
                    >
                      <Copy size={20} />
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {strategy.targetAudience}
                  </p>
                </Custom_Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Custom_Card className="px-6 shadow-lg border-2 bg-gradient-to-br from-lavender/20 to-accent/10">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-primary rounded-full">
                        <Sparkle size={24} weight="fill" className="text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Next Steps</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Use this marketing strategy as a foundation. Refine the copy, implement the visual direction, and target your ideal audience to maximize impact.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <Badge variant="secondary" className="px-3 py-1">Refine messaging</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Create visuals</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Launch campaign</Badge>
                    </div>
                  </div>
                </Custom_Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex justify-center pt-4"
              >
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="gap-2 border-2 hover:bg-secondary transition-all duration-200 hover:scale-[1.02]"
                >
                  <ArrowClockwise size={20} weight="bold" />
                  Generate New Strategy
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!strategy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Custom_Card className="px-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto">
                      1
                    </div>
                    <h4 className="font-medium text-foreground">Describe</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter details about your product or service
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto">
                      2
                    </div>
                    <h4 className="font-medium text-foreground">Generate</h4>
                    <p className="text-sm text-muted-foreground">
                      AI creates comprehensive marketing strategy
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto">
                      3
                    </div>
                    <h4 className="font-medium text-foreground">Implement</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the insights to launch your campaign
                    </p>
                  </div>
                </div>
              </div>
            </Custom_Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App
