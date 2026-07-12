// Subscribe / paywall funnel copy. Structure mirrors app.transcribetotext.ai/subscribe,
// restyled in our design system. No all-caps, no long dashes.

export const subscribe = {
  discount: { label: "Applied limited discount", offer: "Welcome 50% off" },
  countdownSeconds: 8 * 60 + 39, // 08:39
  cta: "Get my plan",
  heading: "Choose your plan",
  subheading: "Unlock unlimited, high-accuracy transcription. Cancel anytime.",
  promo: { label: "Your promo code applied", code: "welcome50" },
  plans: [
    { key: "week", name: "1-Week Trial", was: "$13.99", now: "$5.99", perDayWas: "$1.99", perDay: "$0.85", popular: false },
    { key: "month", name: "1-Month Plan", was: "$13.99", now: "$5.99", perDayWas: "$1.99", perDay: "$0.85", popular: true },
    { key: "quarter", name: "3-Month Plan", was: "$54.99", now: "$6.99", perDayWas: "$0.61", perDay: "$0.31", popular: false },
  ],
  guarantee: {
    title: "30-day money-back guarantee",
    body: "We believe our transcription tool will help you work faster, smarter and with more clarity. If you are not satisfied with the results, we will give you a full refund, no questions asked.",
  },
  benefitsTitle: "What you get with TranscribeToText.AI",
  benefits: [
    { icon: "zap", title: "Automatic transcription of audio and video", body: "Turn recordings into text in minutes, no manual work or delays." },
    { icon: "users", title: "Speaker recognition", body: "Easily identify who said what in interviews, meetings, or group discussions." },
    { icon: "captions", title: "Subtitle generation", body: "Create accurate subtitles for videos, ideal for content, education, or accessibility." },
    { icon: "phone", title: "Call transcription support", body: "Transcribe your Zoom, Meet, and Teams calls automatically, capture every detail." },
    { icon: "languages", title: "Multi-language transcription and translation", body: "Transcribe and translate content across languages, with cultural accuracy in mind." },
    { icon: "pencil", title: "Edit transcripts directly in the app", body: "Refine and update your text without switching tools." },
    { icon: "search", title: "Keyword and text search", body: "Find key parts of your transcript instantly with smart search." },
    { icon: "upload", title: "Export in multiple formats", body: "Download transcripts in TXT, DOCX, SRT and more, ready for content or subtitles." },
    { icon: "sparkles", title: "Summary generation", body: "Turn long recordings into concise summaries and key takeaways in seconds." },
    { icon: "globe", title: "Multilingual support", body: "Transcribe content in multiple languages with accuracy and confidence." },
  ],
  feedbacksTitle: "Our users' feedback",
  feedbacksSub: "These users have long-term plans to use the service and shared their feedback to help us improve the experience.",
  feedbacks: [
    { name: "Mike", avatar: 0, quote: "Really impressed with this online transcription tool. It handles multiple speakers and background noise like a pro. Affordable pricing and great customer support. Saved me hours of work!" },
    { name: "Kate", avatar: 3, quote: "This transcription service is a game-changer! Super fast turnaround and the accuracy is spot-on, even with tricky audio. The interface is clean and easy to use. Definitely recommend it for anyone needing quick, reliable transcripts." },
    { name: "Peter", avatar: 1, quote: "Solid service! The transcripts are accurate, and delivery is always on time. I love how user-friendly the platform is, uploading files is a breeze. Perfect for professionals or students needing quality transcription." },
  ],
  safeCheckout: "Guaranteed safe and secure checkout",
  payments: ["Visa", "Mastercard", "Amex", "Google Pay", "Apple Pay", "PayPal"],
  checkout: {
    title: "Complete checkout",
    summaryLabel: "Order summary",
    // Order summary composition mirrors the source funnel (Figma 8079-4):
    // one priced line + one free bonuses line, and the total equals the priced line.
    regularLabel: "Regular 4-week price",
    bonusLabel: "30+ Exclusive bonuses",
    bonusValue: "Free",
    totalLabel: "Total today:",
    cardLabel: "Card number",
    expiryLabel: "Expiry date MM / YY",
    cvcLabel: "CVC",
    continue: "Continue",
    terms: "By proceeding with the purchase, you agree to our Terms of Service, Privacy Policy, and Subscription Policy. You can cancel anytime in your account settings.",
    success: { title: "You're all set", body: "Welcome to Premium. Your transcription superpowers are unlocked." },
  },
};
