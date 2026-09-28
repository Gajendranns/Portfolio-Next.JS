import { ExperienceItem, Project, SkillCategory } from '../types';

export const PERSONAL_DETAILS = {
  name: 'Gajendran N.S',
  title: 'Frontend Developer | Angular | React | Web3',
  tagline: 'Crafting high-performance Web3 exchanges, reactive Angular 21+ architectures, and fluid multi-platform user experiences.',
  email: 'gajans2003@gmail.com',
  phone: '+91-9786799197',
  github: 'https://github.com/Gajendranns',
  githubUsername: 'Gajendranns',
  linkedin: 'https://linkedin.com/in/gajendran-ns',
  linkedinUsername: 'gajendran-ns',
  location: 'Bengaluru, Karnataka, India',
  fullAddress: '10, Aai Matha Temple Street, Muneshwara Nagar, 6th Sector, Bengaluru, Karnataka - 560068',
  status: 'Open to High-Impact Opportunities',
  yearsExperience: '2+ Years',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'firebee',
    role: 'Frontend Developer',
    company: 'Firebee Technologies Pvt. Ltd.',
    location: 'Madurai, Tamil Nadu',
    period: 'Jan 2025 – Present',
    isCurrent: true,
    highlights: [
      'Spearheading frontend development of Web3 and enterprise applications leveraging Angular 21+ (Standalone Architecture, Signal Forms, Signals, and Signal Store).',
      'Contributed extensively to Zenx Exchange crypto platform: designed high-performance P2P trading interfaces, NFT marketplace displays, and systematized decentralized token swaps (De-Swap).',
      'Created Web3.js & MetaMask wallet integrations for decentralized authentication, signature validations, and mechanized smart contract transactions on De-Swap liquidity pools.',
      'Integrated Socket.io real-time WebSocket pipelines for live order books depth sync and executed TradingView interactive candlestick charting.',
      'Currently constructing an enterprise E-Learning product (Udemy clone) utilizing Signal Forms validation pipelines, Spartan UI, and Tailwind CSS.',
    ],
    technologies: [
      'Angular 21+',
      'Signals & Signal Store',
      'Signal Forms',
      'Web3.js',
      'MetaMask',
      'Socket.io',
      'TradingView API',
      'Spartan UI',
      'Tailwind CSS',
    ],
  },
  {
    id: 'supreme',
    role: 'Frontend Developer',
    company: 'Supreme Technologies',
    location: 'Chennai, Tamil Nadu',
    period: 'Jan 2024 – Dec 2024',
    isCurrent: false,
    highlights: [
      'Developed production-ready web and mobile interfaces using Angular, React, and React Native across core commercial client applications.',
      'Constructed the User Module for "Become a Skiller" EdTech platform from the ground up: applied route-level Lazy Loading and code splitting, boosting FCP.',
      'Built centralized HTTP Interceptors for seamless JWT bearer token injection, computerized token refresh cycles, and global API error handling across asynchronous requests.',
      'Delivered the cross-platform mobile application using React Native with native video streaming, offline bookmarks, and course progress tracking.',
    ],
    technologies: [
      'Angular',
      'React.js',
      'React Native',
      'RxJS',
      'JWT Interceptors',
      'Angular Material',
      'REST APIs',
      'Bootstrap',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'zenx-exchange',
    title: 'Zenx Exchange',
    subtitle: 'Decentralized Crypto Trading, P2P Escrow & De-Swap Engine',
    description:
      'High-throughput Web3 crypto exchange platform engineered for instantaneous peer-to-peer (P2P) trading, live order book depth visualization, and decentralized token liquidity pool swaps.',
    image: '/src/assets/images/project_zenx_crypto_1790611862617.jpg',
    category: 'web3',
    liveDemoType: 'crypto-swap',
    technologies: [
      'Angular',
      'Socket.io',
      'NgRx Store',
      'Web3.js',
      'MetaMask',
      'TradingView API',
      'Tailwind CSS',
    ],
    keyFeatures: [
      'Real-time crypto trading interface featuring live order books, transaction history, and peer-to-peer (P2P) escrow trading modules.',
      'Seamless MetaMask wallet connectivity with Web3.js to execute automated token swaps and smart contract interaction for De-Swap pools.',
      'Live order book depth sync via low-latency Socket.io WebSocket streaming pipelines.',
      'Interactive TradingView financial candlestick charts with dynamic timeframe and technical indicator toggles.',
    ],
    architectureDetails: [
      'Separated stateful trading data using NgRx Store with action reducers for orders, ticker streams, and user wallets.',
      'Zero-latency WebSocket events bound to pure UI render loops, maintaining 60 FPS even during high market volatility.',
      'Safe EIP-712 typed signature verification and transaction receipt polling with customizable gas estimation.',
    ],
    metrics: [
      { label: 'WebSocket Latency', value: '<120ms' },
      { label: 'Smart Contract Calls', value: 'Instant' },
      { label: 'Trading Engine', value: 'P2P + De-Swap' },
    ],
  },
  {
    id: 'elearning-platform',
    title: 'Modern E-Learning Platform',
    subtitle: 'Scalable Enterprise LMS with Angular 21+ & Signals',
    description:
      'An enterprise-grade online education and course distribution platform (Udemy architecture) built with modern Angular 21+ Standalone Components, zero NgModules, and fine-grained Angular Signals for reactive UI performance.',
    image: '/src/assets/images/project_elearning_platform_1790611878509.jpg',
    category: 'enterprise',
    liveDemoType: 'elearning-curriculum',
    technologies: [
      'Angular 21+',
      'Standalone Architecture',
      'Angular Signals',
      'Signal Store',
      'Signal Forms',
      'Spartan UI',
      'Tailwind CSS',
    ],
    keyFeatures: [
      'Architected on Angular 21+ utilizing 100% Standalone Components with zero NgModule overhead and fine-grained Angular Signals.',
      'Dynamic validation pipelines built with modern Signal Forms, ensuring high-performance real-time error checking without redundant change detection cycles.',
      'Modular curriculum explorer with multi-chapter video player, interactive code exercises, and student progress synchronizer.',
      'Polished accessible design system using Spartan UI components paired with fluid Tailwind CSS utility styling.',
    ],
    architectureDetails: [
      'Eliminated Zone.js overhead by adopting Angular Zoneless/Signal-based change tracking.',
      'Unified reactive state handling using Signal Store with computed properties for user course progression.',
      'Optimized asset streaming and instant curriculum tree virtualization.',
    ],
    metrics: [
      { label: 'Component Architecture', value: '100% Standalone' },
      { label: 'Change Detection', value: 'Zero Zone Overhead' },
      { label: 'Validation Pipeline', value: 'Signal Forms' },
    ],
  },
  {
    id: 'become-skiller',
    title: 'Become a Skiller',
    subtitle: 'Multi-Module Learning Hub & Cross-Platform Native App',
    description:
      'Full-featured corporate and student learning ecosystem featuring a modular web portal architecture and a companion React Native mobile application with offline learning capabilities.',
    image: '/src/assets/images/project_become_skiller_1790611889995.jpg',
    category: 'mobile',
    liveDemoType: 'jwt-interceptor',
    technologies: [
      'Angular',
      'React.js',
      'React Native',
      'Angular Material',
      'Bootstrap',
      'REST APIs',
      'JWT Auth',
    ],
    keyFeatures: [
      'Enforced modular User portal architecture with route-level Lazy Loading and code splitting, boosting FCP significantly.',
      'Built centralized HTTP Interceptors for seamless JWT bearer token injection, automatic token refresh cycles, and global API error handling across asynchronous requests.',
      'Delivered cross-platform mobile application using React Native with native video streaming, offline bookmarks, and course progress tracking.',
      'Cross-platform responsive design ensuring parity between desktop browser, tablet, and mobile views.',
    ],
    architectureDetails: [
      'HTTP Interceptors intercepting 401 Unauthorized responses to queue requests while quietly refreshing JWT tokens in the background.',
      'Granular route preloading strategy balancing initial bundle size with instant next-page transitions.',
      'Hardware-accelerated mobile video rendering with localized cache storage for offline lesson consumption.',
    ],
    metrics: [
      { label: 'FCP Optimization', value: '+40% Faster' },
      { label: 'Platform Coverage', value: 'Web + Mobile' },
      { label: 'Auth Reliability', value: 'Auto-Refresh JWT' },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Frameworks',
    slug: 'frameworks',
    description: 'Modern component-driven development across both Angular and React ecosystems.',
    skills: [
      { name: 'Angular (v16 - v21+)', level: 'Specialist', proficiency: 96, years: '2+ yrs', contextNote: 'Standalone components, Signal Forms & Spartan UI' },
      { name: 'React.js', level: 'Proficient', proficiency: 88, years: '1.5+ yrs', contextNote: 'Hooks, custom state pipelines, SSR / CSR' },
      { name: 'React Native', level: 'Proficient', proficiency: 84, years: '1+ yr', contextNote: 'Native video streaming, navigation stacks' },
    ],
  },
  {
    title: 'Architecture & State Management',
    slug: 'architecture',
    description: 'Modern reactive paradigms, fine-grained reactivity, and enterprise data flow.',
    skills: [
      { name: 'Angular Signals', level: 'Specialist', proficiency: 95, years: 'Modern', contextNote: 'Zoneless change detection, fine-grained graph' },
      { name: 'Signal Forms & Store', level: 'Advanced', proficiency: 92, years: 'Modern', contextNote: 'Zero-overhead validation pipelines' },
      { name: 'NgRx Store & State', level: 'Advanced', proficiency: 88, years: '1.5+ yrs', contextNote: 'Actions, reducers, selectors for trading orderbooks' },
      { name: 'Standalone Architecture', level: 'Specialist', proficiency: 96, years: 'Modern', contextNote: '100% zero NgModule overhead' },
      { name: 'Lazy Loading & Code Splitting', level: 'Advanced', proficiency: 92, years: '2+ yrs', contextNote: '+40% FCP optimization on EdTech portal' },
      { name: 'HTTP Interceptors & Auth', level: 'Specialist', proficiency: 94, years: '2+ yrs', contextNote: 'Automatic JWT 401 refresh queueing' },
    ],
  },
  {
    title: 'Web3 & Decentralized Protocols',
    slug: 'web3',
    description: 'Decentralized applications, smart contract integrations, and wallet authentication.',
    skills: [
      { name: 'Web3.js', level: 'Specialist', proficiency: 93, years: '1.5+ yrs', contextNote: 'EIP-712 typed signing, liquidity contract calls' },
      { name: 'MetaMask Integration', level: 'Specialist', proficiency: 94, years: '1.5+ yrs', contextNote: 'Wallet handshakes, chain switching, approvals' },
      { name: 'DeFi & De-Swap Pools', level: 'Advanced', proficiency: 90, years: '1+ yr', contextNote: 'Uniswap v2/v3 AMM math, slippage management' },
      { name: 'TradingView Charting API', level: 'Advanced', proficiency: 90, years: '1+ yr', contextNote: 'Live financial candlestick & orderbook depth' },
      { name: 'Smart Contract Interaction', level: 'Proficient', proficiency: 86, years: '1+ yr', contextNote: 'ABI parsing, event listeners, gas estimation' },
      { name: 'NFT Marketplace UI', level: 'Proficient', proficiency: 85, years: '1+ yr', contextNote: 'Metadata rendering, minting & escrow interfaces' },
    ],
  },
  {
    title: 'Languages & Core Web',
    slug: 'languages',
    description: 'Strong foundation in typed programming and modern web specifications.',
    skills: [
      { name: 'TypeScript', level: 'Specialist', proficiency: 95, years: '2+ yrs', contextNote: 'Strict type safety, generics, mapped types' },
      { name: 'JavaScript (ES6+)', level: 'Specialist', proficiency: 94, years: '2+ yrs', contextNote: 'Async/await, event loop, closures, prototypes' },
      { name: 'HTML5 & Semantic Web', level: 'Mastery', proficiency: 95, years: '2+ yrs', contextNote: 'Accessible WCAG AA standards, semantic layout' },
      { name: 'CSS3 / SCSS', level: 'Advanced', proficiency: 91, years: '2+ yrs', contextNote: 'Flexbox, CSS Grid, custom properties' },
    ],
  },
  {
    title: 'UI Libraries & Styling',
    slug: 'ui-styling',
    description: 'Building accessible, fast, and responsive user interfaces.',
    skills: [
      { name: 'Tailwind CSS', level: 'Specialist', proficiency: 95, contextNote: 'Tailwind v3/v4 utility architecture, responsive layouts' },
      { name: 'Spartan UI', level: 'Advanced', proficiency: 90, contextNote: 'Modern accessible Angular UI primitives' },
      { name: 'Angular Material', level: 'Advanced', proficiency: 89, contextNote: 'Enterprise tables, dialogs, forms' },
      { name: 'Bootstrap', level: 'Advanced', proficiency: 88, contextNote: 'Commercial responsive grid frameworks' },
    ],
  },
  {
    title: 'Tooling, APIs & Concepts',
    slug: 'tooling',
    description: 'Production workflows, real-time protocols, and engineering hygiene.',
    skills: [
      { name: 'Socket.io (WebSockets)', level: 'Specialist', proficiency: 93, contextNote: '<120ms real-time trading order book sync' },
      { name: 'RxJS Reactive Streams', level: 'Advanced', proficiency: 92, contextNote: 'Observables, operators, debouncing, memory leak prevention' },
      { name: 'Performance Optimization', level: 'Advanced', proficiency: 91, contextNote: 'Lighthouse scoring, bundle budget analysis, FCP/LCP tuning' },
      { name: 'RESTful APIs', level: 'Advanced', proficiency: 94, contextNote: 'Contract-first API consumption, error pipelines' },
      { name: 'Git & GitHub', level: 'Advanced', proficiency: 92, contextNote: 'Branch workflows, pull requests, CI integration' },
      { name: 'Bun, npm, pnpm, Vite', level: 'Proficient', proficiency: 88, contextNote: 'Fast build pipelines and dependency management' },
    ],
  },
];

export const SKILL_RADAR_DATA = [
  { domain: 'Angular 21+ & Signals', proficiency: 96, fullMark: 100 },
  { domain: 'Web3 & DeFi Swaps', proficiency: 93, fullMark: 100 },
  { domain: 'TypeScript / JS (ES6+)', proficiency: 95, fullMark: 100 },
  { domain: 'State Architecture', proficiency: 94, fullMark: 100 },
  { domain: 'WebSockets & Realtime', proficiency: 92, fullMark: 100 },
  { domain: 'React & React Native', proficiency: 86, fullMark: 100 },
  { domain: 'Tailwind & UI Systems', proficiency: 94, fullMark: 100 },
  { domain: 'Performance & FCP', proficiency: 91, fullMark: 100 },
];


export const EDUCATION = {
  degree: 'Bachelor of Science (B.Sc.) in Chemistry',
  institution: 'Sourashtra College of Arts and Science',
  location: 'Madurai, Tamil Nadu',
  duration: '2020 – 2023',
  grade: 'CGPA: 7.6 / 10 (76%)',
  description:
    'Gained strong analytical reasoning, quantitative experimentation skills, and methodical problem-solving fundamentals, creating an analytical mindset applied directly to high-order frontend engineering, state machines, and decentralized protocols.',
};
