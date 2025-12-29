# AI-Powered Marketing Assistant

An intelligent tool that transforms product descriptions into comprehensive marketing strategies, combining persuasive copy, visual direction, and audience targeting in seconds.

**Experience Qualities**:
1. **Inspiring** - The interface should evoke creativity and possibility, making users feel empowered to market anything effectively.
2. **Efficient** - Users should move from idea to strategy seamlessly with minimal friction, experiencing the AI's power immediately.
3. **Professional** - The output presentation should feel agency-grade, giving users confidence in the strategic recommendations.

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused tool with a clear input-output flow. It manages form state, API calls, loading states, and result display but remains single-purpose without complex navigation or data persistence needs.

## Essential Features

### Product Brief Input
- **Functionality**: Text area where users describe their product/service with rich formatting support
- **Purpose**: Captures the essential information needed for AI to generate relevant marketing materials
- **Trigger**: User focuses on the prominent input field on page load
- **Progression**: User types description → Character count updates → Submit button becomes enabled → User clicks generate
- **Success criteria**: Input accepts multi-line text, validates minimum length (20 chars), provides clear feedback on requirements

### AI Strategy Generation
- **Functionality**: Sends product brief to LLM with structured prompt requesting marketing copy, visual strategy, and target audience
- **Purpose**: Transforms raw product info into actionable marketing intelligence
- **Trigger**: User clicks "Generate Strategy" button with valid input
- **Progression**: Button click → Loading state with progress indicator → API call to spark.llm → Parse JSON response → Display results with smooth transition
- **Success criteria**: Returns structured data within 10 seconds, handles errors gracefully, maintains context throughout

### Results Display
- **Functionality**: Presents three marketing elements (copy, visual strategy, audience) in organized, scannable cards
- **Purpose**: Delivers actionable insights in a format that's easy to read, reference, and act upon
- **Trigger**: Successful API response from strategy generation
- **Progression**: Loading completes → Results fade in → Cards appear with staggered animation → User can read/copy content → Option to generate new strategy appears
- **Success criteria**: Content is formatted clearly, copyable sections work, visual hierarchy guides attention, user can easily start a new brief

## Edge Case Handling

- **Empty Input** - Disable submit button and show helper text indicating minimum requirements
- **Very Short Input** - Validate minimum 20 characters with inline feedback before allowing submission
- **API Failures** - Display friendly error message with retry option, preserve user's input
- **Extremely Long Input** - Accept up to 2000 characters with counter, truncate gracefully if exceeded
- **Slow Network** - Show engaging loading state with progress hints, timeout after 30 seconds
- **Malformed AI Response** - Fallback to partial display if JSON incomplete, show error if completely invalid

## Design Direction

The design should feel like a premium creative tool—sophisticated yet approachable. Think of a modern creative agency's internal tools: bold color choices that energize, generous white space that lets content breathe, and typography that balances authority with creativity. The interface should feel alive with subtle motion that guides attention without overwhelming.

## Color Selection

A vibrant, creative palette that balances professional credibility with innovative energy.

- **Primary Color**: Deep indigo (oklch(0.35 0.15 265)) - Conveys intelligence, creativity, and trustworthiness; used for primary actions and key UI elements
- **Secondary Colors**: 
  - Bright coral (oklch(0.70 0.18 25)) - Energy and creativity for accents and highlights
  - Soft lavender (oklch(0.85 0.08 285)) - Used for backgrounds and subtle elements
- **Accent Color**: Electric cyan (oklch(0.75 0.15 195)) - Attention-grabbing for CTAs, success states, and interactive elements
- **Foreground/Background Pairings**:
  - Background (Soft cream oklch(0.98 0.01 85)): Dark slate text (oklch(0.25 0.02 265)) - Ratio 12.5:1 ✓
  - Primary (Deep indigo oklch(0.35 0.15 265)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent (Electric cyan oklch(0.75 0.15 195)): Dark slate text (oklch(0.25 0.02 265)) - Ratio 6.8:1 ✓
  - Card (White oklch(1 0 0)): Dark slate text (oklch(0.25 0.02 265)) - Ratio 13.1:1 ✓

## Font Selection

Typography should feel modern and energetic while maintaining exceptional readability for both short punchy headlines and longer marketing copy.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold / 32px / tight letter-spacing (-0.02em) / leading-none
  - H2 (Section Headers): Space Grotesk Semibold / 24px / tight letter-spacing / leading-tight
  - H3 (Card Titles): Space Grotesk Medium / 18px / normal letter-spacing / leading-snug
  - Body (Marketing Copy): Inter Regular / 16px / normal spacing / leading-relaxed (1.7)
  - Small (Labels/Helper): Inter Medium / 14px / normal spacing / leading-normal
  - Tiny (Character Count): Inter Regular / 12px / wide letter-spacing (0.02em) / uppercase

## Animations

Animations should create a sense of intelligence at work, with smooth transitions that make the AI generation feel purposeful rather than instantaneous. The interface should feel responsive and alive.

- **Form interactions**: Subtle scale (0.98) and shadow expansion on input focus (200ms ease-out)
- **Button states**: Lift effect on hover with shadow growth (150ms), satisfying press with slight scale-down (100ms)
- **Loading state**: Pulsing gradient animation on generate button, rotating spinner icon, animated progress hints
- **Results reveal**: Staggered fade-up animation for each card (300ms with 100ms delay between), smooth opacity and transform
- **Success moments**: Quick scale-bounce (1.02) on cards when they appear (200ms spring animation)

## Component Selection

- **Components**:
  - **Textarea**: Core input - increased min-height (150px), custom focus ring in accent color, rounded-xl borders
  - **Button**: Primary CTA for generation - size lg, full-width on mobile, with icon (Sparkle), disabled state clearly differentiated
  - **Card**: Display container for results - elevated shadow, rounded-xl, padding-6, border in subtle lavender
  - **Badge**: Highlight each section type (copy/visual/audience) - soft rounded-full style with category colors
  - **ScrollArea**: For long marketing copy - subtle custom scrollbar, smooth inertia
  - **Separator**: Between result sections - thin decorative line in lavender

- **Customizations**:
  - Custom gradient background pattern using CSS (diagonal stripes in lavender/white)
  - Animated gradient border on primary button during loading state
  - Custom icon integration from Phosphor (Sparkle, Target, Palette, Users, ArrowRight)
  - Copy-to-clipboard button overlay on each result card

- **States**:
  - **Textarea**: Empty (with placeholder), Focused (ring + shadow), Filled, Error (red ring), Disabled
  - **Generate Button**: Default, Hover (lift + shadow), Active (press down), Loading (gradient animation + disabled), Disabled (muted)
  - **Result Cards**: Hidden (initial), Animating In (staggered fade-up), Visible, Hover (subtle lift)

- **Icon Selection**:
  - **Sparkle**: Main generation action, magical/AI feeling
  - **Target**: Target audience section identifier
  - **Palette**: Visual strategy section identifier
  - **Article**: Marketing copy section identifier
  - **Copy**: Copy-to-clipboard action
  - **ArrowClockwise**: Retry/generate new strategy

- **Spacing**:
  - Container max-width: max-w-4xl for optimal reading
  - Section gaps: gap-8 for major sections, gap-4 for related elements
  - Card internal padding: p-6 for generous breathing room
  - Input padding: p-4 for comfortable typing area
  - Page padding: px-4 md:px-8 with py-12 for balanced frame

- **Mobile**:
  - Stack all cards vertically with full width on mobile (sm breakpoint)
  - Reduce heading sizes: H1 to 24px, H2 to 20px on mobile
  - Increase touch targets: buttons min-h-12 on mobile
  - Sticky header with title shrinks on scroll (mobile only)
  - Bottom padding increased to accommodate mobile keyboards
  - Responsive typography scale: text-base on mobile, text-lg on desktop
