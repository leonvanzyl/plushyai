# Plushify UI Requirements

## Project Overview

Transform the current boilerplate Next.js application into **Plushify** - a SaaS application that allows users to upload images of themselves, friends, family, or pets, and converts them into adorable plushie versions using AI.

**Scope:** This phase focuses exclusively on UI/UX implementation with mock data. No backend logic or real AI integration will be implemented at this stage.

---

## Initial Requirements

### Core Functionality
1. **Landing Page**: Marketing-focused homepage showcasing the product with before/after examples
2. **User Dashboard**: Control center for authenticated users to manage generations and view credits
3. **Image Generation Interface**: Upload and generate plushie transformations
4. **Gallery**: View all generated plushies in a responsive grid layout
5. **Pricing**: Display credit packages with clear pricing information
6. **Documentation Hub**: Comprehensive guides and FAQs
7. **Legal Pages**: Privacy policy, terms of service, cookie policy, and refund policy

### Authentication Approach
- **Mock Authentication**: Simulate a signed-in user experience using mock data
- No real authentication flows required at this stage
- Remove existing BetterAuth components and pages

### Boilerplate Cleanup
- Remove all boilerplate-specific pages (e.g., `/chat` page)
- Remove boilerplate components (setup checklist, starter prompt modal, GitHub stars)
- Remove authentication components folder
- Keep UI component library (shadcn/ui)

---

## Functional Requirements

### FR-1: Landing Page
**Priority:** High
**Description:** Create a marketing-focused landing page that showcases the Plushify product

**Features:**
- Hero section with compelling headline and call-to-action
- Before/after image showcase demonstrating transformations
- Features grid highlighting key benefits (4-6 cards)
- "How It Works" section with 3-step process visualization
- Sample gallery showcasing example transformations
- Testimonials section with mock reviews
- Multiple call-to-action sections throughout the page
- SEO-optimized content and metadata

### FR-2: Pricing Page
**Priority:** High
**Description:** Display credit packages with transparent pricing

**Features:**
- Three pricing tiers displayed as cards:
  - **Basic Package**: $9 for 30 credits
  - **Pro Package**: $19 for 100 credits (marked as "Popular")
  - **Elite Package**: $29 for 200 credits
- Feature comparison table showing what each package includes
- "How Credits Work" explanation section
- FAQ accordion addressing common pricing questions
- Clear call-to-action buttons for each package

### FR-3: User Dashboard
**Priority:** High
**Description:** Main control center for authenticated users

**Features:**
- Display mock user profile (avatar, name, email)
- Prominent credits balance display (e.g., "75 credits remaining")
- Quick action cards:
  - "Generate New Plushie" (navigates to `/generate`)
  - "View Gallery" (navigates to `/gallery`)
- Recent generations preview (last 3-4 images)
- Usage statistics widget showing:
  - Credits used this month
  - Total generations created
  - Member since date

### FR-4: Generation Interface
**Priority:** High
**Description:** Interface for uploading images and generating plushies

**Features:**
- Image upload dropzone (drag & drop + click to browse)
- Preview area for uploaded image
- Subject type selector (Person/Pet/Other) - UI only
- "Generate Plushie" button with loading states
- Cost indicator showing credit usage (e.g., "This will use 1 credit")
- Success state displaying mock generated plushie
- Download button for generated image
- Error state handling with user-friendly messages
- Option to generate another plushie

### FR-5: Gallery Page
**Priority:** High
**Description:** View all generated plushies in organized layout

**Features:**
- Responsive grid layout (3-4 columns on desktop)
- Display 8-12 mock plushie generations
- Each card shows:
  - Generated plushie image
  - Generation date
  - View and download buttons
- Click to open full-size modal with before/after comparison slider
- Empty state for new users with prompt to generate first plushie
- "Generate New" button in header
- Mobile-optimized layout

### FR-6: Profile Page
**Priority:** Medium
**Description:** User account information and statistics

**Features:**
- Credits balance section at top
- Account information:
  - Name and email
  - Avatar
  - Member since date
- Generation statistics:
  - Total plushies created
  - Total credits used
  - Credits remaining
- "Purchase More Credits" button linking to pricing page
- Account settings placeholders (disabled for this phase)

### FR-7: Documentation Hub
**Priority:** Medium
**Description:** Comprehensive documentation and help resources

**Pages Required:**
- `/docs` - Documentation homepage with navigation cards
- `/docs/getting-started` - Quick start guide
- `/docs/how-to-use` - Detailed step-by-step usage guide
- `/docs/faq` - Frequently asked questions (15-20 items)
- `/docs/tips` - Best practices for photo uploads
- `/docs/troubleshooting` - Common issues and solutions

**Features:**
- Clear navigation between documentation sections
- Search-friendly headings and content structure
- Placeholder screenshots and examples
- Accordion components for FAQs
- Breadcrumb navigation
- Responsive design

### FR-8: Legal Pages
**Priority:** Medium
**Description:** Required legal documentation

**Pages Required:**
- `/legal/privacy` - Privacy Policy
- `/legal/terms` - Terms of Service
- `/legal/cookies` - Cookie Policy
- `/legal/refund` - Refund Policy

**Features:**
- Properly structured with section headings
- Table of contents for long documents
- Last updated date
- Contact information for legal inquiries
- Placeholder legal text (to be replaced by actual legal content)

### FR-9: Navigation System
**Priority:** High
**Description:** Global navigation across the application

**Features:**
- Site Header with:
  - Plushify logo/branding
  - Navigation menu (Dashboard, Generate, Gallery, Pricing, Docs)
  - Mock user profile display with avatar and credits badge
  - Dark/light mode toggle
  - Mobile hamburger menu
- Site Footer with:
  - Product links (Features, Pricing, Gallery)
  - Resources (Docs, FAQ, Tips)
  - Legal (Privacy, Terms, Cookies, Refund)
  - Social media icons (mock links)
  - Copyright notice
- Breadcrumb navigation where appropriate
- Active link highlighting

---

## Non-Functional Requirements

### NFR-1: Design & Branding
**Priority:** High
**Description:** Playful and fun design aesthetic

**Requirements:**
- Bright, vibrant colors (primary: pink/purple theme)
- Rounded corners throughout UI
- Friendly, approachable typography
- Generous use of white space
- Consistent component styling using shadcn/ui
- Custom illustrations or icons where appropriate
- Emphasis on the cute/fun nature of plushies

### NFR-2: Responsiveness
**Priority:** High
**Description:** Mobile-first responsive design

**Requirements:**
- Fully responsive across all device sizes (mobile, tablet, desktop)
- Mobile-optimized layouts and interactions
- Touch-friendly UI elements (minimum 44x44px tap targets)
- Hamburger menu for mobile navigation
- Optimized image sizes for different viewports
- Fluid typography scaling

### NFR-3: Accessibility
**Priority:** Medium
**Description:** Basic accessibility standards

**Requirements:**
- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- Sufficient color contrast ratios
- Keyboard navigation support
- Focus indicators for interactive elements
- ARIA labels where necessary

### NFR-4: Performance
**Priority:** Medium
**Description:** Fast page loads and smooth interactions

**Requirements:**
- Optimized images (lazy loading, appropriate formats)
- Minimal bundle size
- Smooth animations and transitions
- No layout shift during page load
- Fast navigation between pages

### NFR-5: Dark Mode Support
**Priority:** Medium
**Description:** Full dark mode implementation

**Requirements:**
- Maintain dark mode support from boilerplate
- Consistent color scheme in both light and dark modes
- User preference persistence
- Smooth theme transition animations
- All pages and components support dark mode

### NFR-6: Code Quality
**Priority:** High
**Description:** Maintainable and type-safe codebase

**Requirements:**
- TypeScript with strict mode
- ESLint compliance (no errors)
- Type checking passes without errors
- Consistent code formatting
- Reusable component architecture
- Clear component organization
- Proper separation of concerns

---

## Mock Data Requirements

### MD-1: User Data
```typescript
{
  id: "mock-user-001",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/avatars/alex.jpg",
  credits: 75,
  memberSince: "2024-01-15",
  totalGenerations: 24,
  creditsUsed: 125
}
```

### MD-2: Generated Plushies
**Quantity:** 8-12 mock generations

**Data Structure:**
```typescript
{
  id: string,
  originalImage: string,
  plushieImage: string,
  generatedAt: Date,
  subject: "person" | "pet" | "other",
  status: "completed"
}
```

### MD-3: Pricing Data
```typescript
{
  packages: [
    { name: "Basic", price: 9, credits: 30 },
    { name: "Pro", price: 19, credits: 100, popular: true },
    { name: "Elite", price: 29, credits: 200 }
  ]
}
```

---

## Acceptance Criteria

### AC-1: Landing Page
- [ ] Hero section displays with clear value proposition
- [ ] At least 2 before/after image examples shown
- [ ] Features grid displays 4-6 feature cards
- [ ] "How It Works" shows 3-step process
- [ ] Sample gallery displays 6-8 example transformations
- [ ] Page is fully responsive across all devices
- [ ] All CTAs navigate to appropriate pages

### AC-2: Pricing Page
- [ ] Three pricing cards displayed in grid layout
- [ ] Pro package has "Popular" badge
- [ ] Credit amounts and prices match requirements
- [ ] Feature comparison table is clear and readable
- [ ] FAQ accordion opens/closes correctly
- [ ] Page is fully responsive

### AC-3: Dashboard
- [ ] Mock user profile displays correctly
- [ ] Credits balance shown prominently (e.g., "75 credits remaining")
- [ ] Quick action cards navigate to correct pages
- [ ] Recent generations show last 3-4 images
- [ ] Usage statistics display mock data accurately
- [ ] Dashboard is accessible without authentication

### AC-4: Generation Interface
- [ ] Upload dropzone accepts image files
- [ ] Preview displays uploaded image
- [ ] Generate button triggers loading state
- [ ] Success state shows mock generated plushie
- [ ] Download button is functional
- [ ] Credit cost is clearly indicated
- [ ] Error states display helpful messages

### AC-5: Gallery
- [ ] Grid layout displays 8-12 mock plushies
- [ ] Responsive grid (3-4 columns desktop, 2 tablet, 1 mobile)
- [ ] Click card opens full-size modal
- [ ] Modal shows before/after comparison
- [ ] Empty state displays for new users
- [ ] "Generate New" button navigates to `/generate`

### AC-6: Profile Page
- [ ] User info displays correctly (name, email, avatar)
- [ ] Credits balance shown at top
- [ ] Generation statistics display mock data
- [ ] "Purchase More Credits" button links to pricing
- [ ] Member since date is formatted correctly

### AC-7: Documentation
- [ ] All 6 documentation pages are accessible
- [ ] Navigation between docs sections works correctly
- [ ] FAQ accordion functions properly
- [ ] Content is well-structured with headings
- [ ] Responsive layout on all devices

### AC-8: Legal Pages
- [ ] All 4 legal pages are accessible
- [ ] Content is properly structured with sections
- [ ] Links between legal pages work correctly
- [ ] Last updated date is visible
- [ ] Responsive layout

### AC-9: Navigation
- [ ] Site header displays on all pages
- [ ] Navigation menu items link correctly
- [ ] Mock user profile displays in header
- [ ] Mobile hamburger menu functions properly
- [ ] Footer displays on all pages with correct links
- [ ] Active page is highlighted in navigation

### AC-10: Overall Quality
- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] All pages support dark mode
- [ ] Smooth page transitions
- [ ] Consistent design across all pages
- [ ] No console errors or warnings
- [ ] All interactive elements are accessible via keyboard

---

## Out of Scope

The following items are explicitly **NOT** included in this phase:

1. ❌ Real authentication implementation
2. ❌ Backend API development
3. ❌ Real AI image generation
4. ❌ Payment processing integration
5. ❌ Database operations
6. ❌ File upload to server
7. ❌ Real credit management system
8. ❌ Email notifications
9. ❌ User registration/login flows
10. ❌ Unit testing
11. ❌ End-to-end testing
12. ❌ Performance testing
13. ❌ Security implementation
14. ❌ Analytics integration
15. ❌ SEO optimization (content only, no technical SEO)

---

## Dependencies

### Technical Dependencies
- Next.js 15 (existing)
- React 19 (existing)
- TypeScript (existing)
- Tailwind CSS 4 (existing)
- shadcn/ui components (existing)
- Lucide React icons (existing)
- next-themes for dark mode (existing)

### Design Assets Needed
- Plushify logo
- Example before/after images (6-8 sets)
- User avatar images (mock data)
- Placeholder images for documentation

---

## Success Metrics

### User Experience
- Users can navigate entire application without confusion
- Clear understanding of pricing and credit system
- Intuitive generation workflow
- Easy access to documentation and help

### Technical Quality
- Zero ESLint errors
- Zero TypeScript errors
- 100% page load success rate
- Consistent 60fps animations

### Design Quality
- Consistent visual design across all pages
- Responsive layouts on all tested devices
- Proper dark mode implementation
- Accessible UI elements

---

## Assumptions

1. Mock data is sufficient for demonstrating UI/UX
2. Placeholder images can be used for demonstrations
3. Actual legal text will be provided separately
4. Real AI integration will be added in future phase
5. User testing will inform future iterations
6. Payment integration will be separate phase
