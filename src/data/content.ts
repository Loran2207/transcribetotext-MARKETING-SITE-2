// All marketing copy. Single source of truth.
//
// Landing v2 follows the client brief "Landing v2 / Hypotheses 1-5", and it
// follows it to the letter: where the brief writes a label in capitals, the
// label is in capitals here. (Kirill, 29 Aug 2026: "делай, как в ТЗ сказано".)
// The one house convention still applied is the long dash, which becomes a
// comma - the same rule the first version was written under.

export const nav = {
  logo: "TranscribeToText.AI",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Reviews", href: "#reviews" },
    { label: "Languages", href: "#languages" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
  ],
  login: "Log in",
  cta: "Try it for free",
};

// 1. HERO - the meeting use case, shown as the product rather than described.
export const hero = {
  eyebrow: "AI MEETING & TRANSCRIPTION ASSISTANT",
  // Two deliberate lines, so "Get" opens the second one beside "Transcripts"
  // instead of dangling at the end of the first. No full stops in headings
  // (Kirill, 29 Aug: "во всех заголовках уберём точки"), so the two halves are
  // joined with a comma - the client asked for a mark between them and a comma
  // is the one that does not break that rule.
  titleLine1: "Record Meetings,",
  titleLine2: "Get Transcripts, Summaries & Action Items Automatically",
  subtitle:
    "Record meetings or upload any audio or video file and turn it into accurate, searchable text in seconds.",
  primaryCta: "Start for Free",
  chips: ["Speaker detection", "AI Summary", "Action Items", "117+ languages", "Export"],
  // What the mockup inside the hero shows. Kept as data so the frame and the
  // copy can never drift apart. The participant photos are cropped from the
  // meeting scene Kirill generated himself for V2 (service-meeting-v2.jpg) -
  // his own approved asset, with our captions drawn over the baked-in ones.
  demo: {
    meeting: "Weekly product sync",
    platform: "Google Meet",
    recording: "Recording",
    elapsed: "24:18",
    live: "Live transcript",
    participants: [
      { name: "Sarah Chen", photo: "/brand/people/p1.jpg" },
      { name: "Marcus Webb", photo: "/brand/people/p2.jpg" },
      { name: "Elena Petrova", photo: "/brand/people/p3.jpg" },
      { name: "You", photo: "/brand/people/p4.jpg" },
    ],
    lines: [
      { who: "Sarah Chen", at: "00:12", text: "Let's start with the onboarding numbers from last week." },
      { who: "Marcus Webb", at: "00:26", text: "Sign-ups are up eleven percent, and the drop-off moved to the upload step." },
      { who: "Sarah Chen", at: "00:41", text: "Then we ship the shorter upload flow first and measure again on Friday." },
    ],
    summaryTitle: "AI Summary",
    summary: [
      "Sign-ups up 11% week over week.",
      "Drop-off has moved to the upload step.",
      "Shorter upload flow goes first.",
    ],
    actionsTitle: "Action Items",
    // No assignee badges: a name chip beside every checkbox read as clutter,
    // and the transcript above already names the people.
    actions: [
      { text: "Ship the shorter upload flow", done: true },
      { text: "Re-measure drop-off on Friday", done: false },
      { text: "Share the sign-up chart with support", done: false },
    ],
  },
};

// 2. TRUST
export const trust = {
  title: "Powerful transcription",
  subtitle: "Built for fast, effortless transcription",
  cards: [
    { value: "55K+", label: "Users", body: "Join thousands of happy users worldwide" },
    { value: "117+", label: "Languages", body: "Transcribe and translate in 117+ languages" },
    { value: "10 hrs / 5GB", label: "Max file size", body: "Upload files up to 10 hours or 5GB per file" },
    { value: "Zoom · Meet · Teams", label: "Meeting transcription", body: "Record and transcribe your meetings automatically" },
  ],
};

// 3. FEATURES - the site's own "Our Transcription Services" block: four
// services as four tab states, meeting transcription first and preselected
// (Kirill, round 7: "Покажи 4 фич, как мы их видим. Надо четыре состояния").
// Each state pairs the brief's copy with a generated editorial photo.
export const services = {
  title: "Our Transcription Services",
  items: [
    {
      key: "meeting",
      tab: "Meeting Transcription",
      titlePre: "Never Take",
      titleAccent: "Meeting Notes",
      titlePost: "Again",
      body: [
        "Record and transcribe your Zoom, Google Meet and Microsoft Teams calls automatically.",
        "Get a complete searchable transcript with speakers, summaries and key action items, ready as soon as your meeting ends.",
      ],
      benefits: [
        "Automatic meeting transcription",
        "Speaker recognition",
        "AI-generated summaries",
        "Key points & action items",
      ],
      cta: "Transcribe My Meeting",
      photo: "/brand/features/meeting.jpg",
    },
    {
      key: "audio",
      tab: "Audio to Text",
      titlePre: "Audio to",
      titleAccent: "Text",
      titlePost: "",
      body: ["Upload any audio file, interviews, lectures, podcasts, and get instant, accurate transcripts powered by AI."],
      benefits: [
        "MP3, M4A, WAV & more",
        "Speaker recognition",
        "Files up to 10 hours / 5GB",
        "DOCX, PDF & TXT export",
      ],
      cta: "Transcribe an Audio File",
      photo: "/brand/features/audio.jpg",
    },
    {
      key: "video",
      tab: "Video to Text",
      titlePre: "Video to",
      titleAccent: "Text",
      titlePost: "",
      body: ["Upload any video and get the full transcript with every speaker separated, ready for subtitles, articles or notes."],
      benefits: [
        "MP4, MOV, MPEG & more",
        "SRT & VTT subtitles",
        "Speaker recognition",
        "117+ languages",
      ],
      cta: "Transcribe a Video",
      photo: "/brand/features/video.jpg",
    },
    {
      key: "cloud",
      tab: "Cloud File Transcription",
      titlePre: "Your Content",
      titleAccent: "Wherever It Lives",
      titlePost: "",
      body: ["Import content directly from your favorite platforms and turn it into searchable text."],
      benefits: [],
      cta: "Transcribe From the Cloud",
      photo: "/brand/features/cloud.jpg",
      platforms: ["YouTube", "Google Drive", "Dropbox", "Zoom", "Google Meet", "Microsoft Teams"],
    },
  ],
};

// 4. SOCIAL PROOF - Trustpilot format, straight after the features.
//
// The reviews are the ones the site already carried; nothing here is written
// for the mockup (Kirill, 29 Aug 2026: "оставь наши те же отзывы"). What the
// brief asks to drop is the generic headline over each one - "Finally", "really
// works!", "nice nice" - and those are gone: the brief's own card is stars, the
// review, the name and the Trustpilot attribution, with no headline at all.
export const reviews = {
  title: "Trusted by Thousands of Users",
  source: "Trustpilot",
  // 4.8, not 4.9: the client asked for a figure that reads as real rather than
  // rounded up, and named 4.8 as the ceiling (round 20).
  ratingLabel: "Rated 4.8 based on 300+ reviews",
  items: [
    { stars: 5, quote: "The effective and easy-to-use transcription service I needed has finally arrived, and it's fantastic!", name: "sovvin01" },
    { stars: 5, quote: "This service has nailed it, simple to use with exceptional performance. It's everything I've been looking for in transcription.", name: "Jacob" },
    { stars: 5, quote: "A simple, yet robust transcription service that has revolutionized how we handle our audio files.", name: "johny45" },
    { stars: 5, quote: "Absolutely what I needed, a transcription service that's both powerful and straightforward.", name: "Quang" },
    { stars: 5, quote: "The high-quality, easy-to-use transcription solution I've long been searching for has finally arrived!", name: "tbrman" },
    { stars: 5, quote: "I've found my go-to for reliable, high-quality transcriptions. It's just so simple and effective!", name: "amarizzz01" },
    { stars: 5, quote: "Really impressed with this online transcription tool. It handles multiple speakers and background noise like a pro. Affordable pricing and great customer support. Saved me hours of work!", name: "Mike" },
    { stars: 5, quote: "This transcription service is a game-changer! Super fast turnaround and the accuracy is spot-on, even with tricky audio. The interface is clean and easy to use.", name: "Kate" },
    { stars: 5, quote: "Solid service! The transcripts are accurate, and delivery is always on time. I love how user-friendly the platform is, uploading files is a breeze.", name: "Peter" },
  ],
};

// 5. PRODUCT VALUE - what you get after the transcript exists.
export const productValue = {
  title: "Everything You Need After Transcription",
  cards: [
    { key: "summary", name: "AI Summaries", claim: "Skip the rewatch. Get the important parts instantly", body: "Turn long recordings into concise summaries." },
    { key: "speakers", name: "Speaker Recognition", claim: "Know exactly who said what", body: "Automatically identify different speakers in meetings, interviews and conversations." },
    { key: "actions", name: "Action Items", claim: "Turn conversations into next steps", body: "Automatically extract decisions, tasks and follow-ups from meetings." },
    { key: "translate", name: "Translate", claim: "117+ languages. One workflow", body: "Transcribe and translate recordings without switching tools." },
    { key: "search", name: "Search", claim: "Find any moment instantly", body: "Search your transcripts instead of replaying recordings." },
    { key: "export", name: "Export", claim: "Use your transcript anywhere", body: "Export to DOCX, PDF, TXT, SRT and VTT." },
  ],
};

// 6. THREE STEPS - unchanged by the brief.
export const howItWorks = {
  title: "Just 3 easy steps to transcribe you audio or video to text!",
  subtitle: "Experience the fastest and most accurate transcription service available.",
  steps: [
    {
      n: "1",
      title: "Upload Your File",
      body: "Start by easily uploading your audio or video file through our secure platform. You can upload multiple files, supporting all common media formats: mp3, mp4, m4a, mov, aac, wav, ogg, opus, mpeg, wma, wmv.",
    },
    {
      n: "2",
      title: "Choose Language",
      body: "Select the language of the audio or video content from our list, accommodating over 100 languages and dialects. This ensures the transcription is tailored accurately to the specific linguistic nuances.",
    },
    {
      n: "3",
      title: "Receive Result",
      body: "Once your file is uploaded and language selected, our advanced AI-powered system begins transcribing immediately. You'll receive a highly accurate transcription, which you can download in DOCX, PDF, or TXT, or even as subtitles and captions.",
    },
  ],
  cta: "Start now for free",
};

// 7. LANGUAGES - same words, smaller block, flags without their names.
export const languages = {
  title: "Supported Languages",
  subtitle:
    "Here you can find a list of popular languages people use to transcribe audio and video to text.",
  count: "117",
  list: [
    "English", "German", "Italian", "Spanish",
    "French", "Chinese", "Polish", "Japanese",
    "Turkish", "Portuguese", "Arabic", "Greek",
  ],
  extra: [
    "Swedish", "Afrikaans", "Armenian", "Azerbaijani",
    "Bosnian", "Bulgarian", "Catalan", "Croatian",
  ],
  seeAll: "See all languages",
  seeFewer: "Close all languages",
  cta: "TRY NOW",
};

// 8. PRICING - matches the paywall, no monthly/yearly switch.
export const pricing = {
  titleLine1: "Simple Pricing",
  titleLine2: "Unlimited Transcription",
  premium: {
    badge: "Premium",
    priceFrom: "FROM",
    price: "$0.31",
    priceUnit: "/Day",
    note: "Billed as a 3-month plan. Cancel anytime.",
    /* The brief lists eight benefits; the reference groups them into four lines
       that each carry a title and what it means, which is what a reader can
       actually take in. Every one of the brief's eight words survives here -
       four as titles, the other four inside the third line's sentence. */
    highlights: [
      { icon: "infinity", title: "Unlimited transcriptions", body: "Transcribe as much as you need, every day." },
      { icon: "upload", title: "Extended uploads", body: "Files up to 10 hours or 5 GB each." },
      { icon: "sparkle", title: "Meeting transcription", body: "Plus AI summaries, speaker recognition, 117+ languages and all export formats." },
      { icon: "bolt", title: "Priority processing", body: "Your files are transcribed first, always." },
    ],
    // The brief writes "Upgrate NOW"; that is a typo for Upgrade, and a
    // misspelt word on the paying button is not something to ship on purpose.
    cta: "UPGRADE NOW",
  },
  free: {
    badge: "Free",
    price: "Absolutely free",
    features: [
      { title: "1 Free Upload Daily", body: "One file per day, up to 10 minutes max." },
      { title: "100% Free Access", body: "Try AI transcription with basic limits." },
      { title: "Slower Processing", body: "Free users have lower priority, so transcription may take longer." },
    ],
    cta: "TRY FOR FREE",
  },
};

// 9. INDUSTRIES - one tool, six kinds of conversation, each card carrying a
// miniature of the product doing that job (the brief's reference layout).
export const industries = {
  title: "One Tool for Every Conversation",
  popularTag: "Most popular",
  subtitle:
    "Record meetings, transcribe content and turn hours of audio into searchable, actionable text.",
  cards: [
    { key: "meetings", name: "Meetings", body: "Record Zoom, Google Meet & Teams calls automatically." },
    { key: "interviews", name: "Interviews", body: "Get accurate transcripts with speaker recognition." },
    { key: "podcasts", name: "Podcasts & Videos", body: "Turn long-form content into transcripts and summaries." },
    { key: "research", name: "Research", body: "Search, organize and analyze recorded conversations." },
    { key: "education", name: "Education", body: "Transcribe lectures, classes and study materials.", short: "Lectures, classes and study notes" },
    { key: "content", name: "Content Creation", body: "Create subtitles, articles and repurpose recorded content." },
  ],
  footnote: ["Works with 117+ languages", "Your data is safe and secure"],
};

// 10. FINAL CTA
export const finalCta = {
  titleLine1: "Stop Rewatching",
  titleLine2: "Start Reading",
  subtitle:
    "Turn your meetings, recordings and videos into accurate transcripts, summaries and action items.",
  cta: "Start for Free",
  ctaNote: "Get started in seconds",
};

// 11. FAQ - unchanged by the brief.
export const faq = {
  title: "Frequently Asked Questions",
  items: [
    { q: "What is AI Transcriber?", a: "TranscribeToText.AI is an AI transcription service that turns audio and video into accurate text. Upload a file or paste a link and get a clean, searchable transcript in seconds, powered by Whisper AI." },
    { q: "What languages are supported?", a: "We transcribe in 117 languages and dialects, and can translate your transcript between them. Popular choices include English, Spanish, French, German, Chinese, Japanese, Arabic and Portuguese." },
    { q: "Is my data secure?", a: "Yes. Your files are protected with end-to-end encryption and processed privately. We never sell your data, and you can delete your files at any time." },
    { q: "Can I transcribe meetings from Zoom, Google Meet, or Microsoft Teams?", a: "Yes. You can record and transcribe meetings in Zoom, Google Meet and Microsoft Teams, and get the full transcript automatically once the call ends." },
    { q: "How large can my files be?", a: "On Premium you can upload files up to 10 hours long or 5GB each, and process up to 20 files at once. The free plan supports one file per day, up to 10 minutes." },
    { q: "How do I cancel my subscription?", a: "You can cancel anytime from your account settings in a couple of clicks. Your Premium features stay active until the end of the current billing period." },
    { q: "Can I transcribe from YouTube, Google Drive, or Dropbox?", a: "Yes. Paste a YouTube URL or connect Google Drive and Dropbox to transcribe files directly, without downloading anything first." },
  ],
  supportTitle: "More questions?",
  support: "Contact us by email for prompt support and any further inquiries. We are here to assist you!",
  supportEmail: "support@transcribetotext.ai",
};

export const footer = {
  columns: [
    {
      title: "Top Services",
      links: ["MP3 to Text", "M4A to Text", "MP4 to Text", "MP4 to VTT", "WAV to Text"],
    },
    {
      title: "Company",
      links: ["Premium Access to AI Transcription", "How it works?", "Supported Languages", "Pricing", "Customers Reviews", "FAQs"],
    },
    {
      title: "Information",
      links: ["Privacy Policy", "Terms of Use", "Subscription & Refund Policy", "Blog"],
    },
  ],
  followTitle: "Follow us on",
  copyright: "© TranscribeToText.AI, 2024",
  companyDetails: "Mithrilmobile OU, Tallinn, J. Vilmsi 47, 10115, info@transcribetotext.ai",
};

export const serviceQuickLinks = [
  "Audio to Text",
  "Video to Text",
  "Meeting Transcription",
  "Cloud File Transcription",
  "Voice Memos to Text",
  "Transcribe Youtube Video to Text",
  "TikTok Transcription",
  "Lyrics Transcriber",
];

export const stickyCta = { label: "Continue", href: "/subscribe" };

// Features mega-menu: one entry per service (live-site dropdown).
export const navServices = [
  { key: "meeting", label: "Meeting Transcription", desc: "Record and transcribe meetings from Zoom, Google Meet, and Teams. Capture every word and generate accurate summaries automatically." },
  { key: "audio", label: "Audio to Text", desc: "Upload any audio file, interviews, lectures, podcasts, and get instant, accurate transcripts powered by AI.", formats: true },
  { key: "video", label: "Video to Text", desc: "Transcribe videos with audio in 125+ languages. Extract subtitles or full transcripts while preserving clarity and speaker separation." },
  { key: "cloud", label: "Cloud File Transcription", desc: "Connect Google Drive, Dropbox, or OneDrive and transcribe audio or video directly from the cloud, no uploads needed." },
  { key: "memos", label: "Voice Memos to Text", desc: "Turn iPhone and Android voice memos into clean, searchable text in seconds." },
  { key: "youtube", label: "Transcribe Youtube Video to Text", desc: "Paste a YouTube link and get the full video transcript, no download needed." },
  { key: "tiktok", label: "TikTok Transcription", desc: "Transcribe TikTok videos to text for captions, subtitles, and content ideas." },
  { key: "lyrics", label: "Lyrics Transcriber", desc: "Extract accurate song lyrics from any audio or music video track." },
];

export const audioToText = {
  heading: "Audio to Text",
  description:
    "Upload any audio file, interviews, lectures, podcasts, and get instant, accurate transcripts powered by AI.",
  formats: ["MP3 to Text", "M4A to Text", "AAC to Text", "WAV to Text", "WMA to Text", "OGG to Text"],
};

// /login page copy (mirrors app.transcribetotext.ai/login, system-component version).
export const login = {
  tabs: { login: "Login", signup: "Sign up" },
  signup: {
    title: "Sign up",
    subtitle: "Welcome to TranscribeToText.AI! Let's get started.",
    submit: "Continue",
    switchPrompt: "Already have an account?",
    switchAction: "Sign in",
  },
  signupPassword: {
    title: "Choose a password",
    subtitle: "Create a password for",
    label: "Password",
    placeholder: "Create your password",
    submit: "Sign up",
  },
  signin: {
    title: "Welcome back",
    subtitle: "Sign in to your TranscribeToText account",
    submit: "Sign in",
    switchPrompt: "Don't have an account?",
    switchAction: "Sign up",
    forgot: "Reset your password?",
  },
  reset: {
    title: "Reset password",
    subtitle: "Enter your email and we'll send you a reset link.",
    submit: "Reset password",
    back: "Back to log in",
  },
  resetSent: {
    message: "Reset link sent. Please check your email.",
    hint: "Didn't get it? Check your spam folder or try again in a minute.",
  },
  newPassword: {
    title: "Set a new password",
    subtitle: "Enter and confirm your new password.",
    newLabel: "New password",
    newPlaceholder: "Enter your new password",
    confirmLabel: "Confirm password",
    confirmPlaceholder: "Repeat your new password",
    submit: "Set password",
  },
  newPasswordDone: {
    title: "Password updated",
    message: "Your password has been changed. You can now log in with it.",
    cta: "Back to log in",
  },
  errors: {
    emailEmpty: "Please enter your email",
    emailNotFound: "No account found with this email",
    passwordEmpty: "Please enter a password",
    passwordWrong: "Incorrect password. Please try again or",
    passwordWrongLink: "reset your password",
    mismatch: "Passwords do not match",
  },
  google: "Continue with Google",
  microsoft: "Continue with Microsoft",
  divider: "or",
  email: { label: "Email", placeholder: "you@example.com" },
  password: { label: "Password", placeholder: "Enter your password" },
  terms: {
    prefix: "By using our service, you agree to",
    links: ["terms", "privacy policy", "subscription & refund policy"],
  },
  help: { prefix: "Need help? Contact us at", email: "support@transcribetotext.ai" },
};
