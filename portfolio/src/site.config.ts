// Edit this file to re-label the entire site. Header, Footer, the homepage
// and SEO defaults all read from here instead of hardcoding copy.
export const SITE = {
  name: 'Hong Huang',
  role: 'Full-stack engineer',
  email: 'bbc6bae9@gmail.com',
  tagline: 'Building for Apple platforms.',
  description:
    'The personal portfolio of Hong Huang, a full-stack engineer working on Apple platform apps at Tencent.',
  bio: 'I’m a full-stack engineer working on Apple platform apps at Tencent. My current interests include using AI-assisted coding to ship better products, generative UI, and streaming technology.',
  social: [
    { label: 'GitHub', href: 'https://github.com/BBC6BAE9' },
    { label: 'X', href: 'https://x.com/Bae9Bbc6' },
  ],
  locale: 'en',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/work/', reload: false },
  { label: 'About', href: '/about/', reload: false },
  { label: 'Blog', href: 'https://honghuang.foomansoft.com/', reload: true },
] as const;
