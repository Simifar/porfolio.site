export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  year?: string;
  role?: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
  status?: 'Live' | 'In development' | 'Archived';
  size: 'large' | 'medium' | 'small';
  problem?: string;
  decisions?: { problem: string; decision: string; why: string }[];
  reflection?: { limitation: string; hypothesis: string; experiment: string }[];
}

export const projects: Project[] = [
  {
    slug: 'taskfocus',
    name: 'TaskFocus',
    subtitle: 'Task management & focus system',
    category: 'Productivity / Product',
    year: '2024',
    role: 'Product, UX, Development',
    description: 'A system for managing tasks and maintaining deep focus. Built around the idea that active focus should be the primary UI object, not the entire task list.',
    tags: ['Product', 'UX', 'Development', 'AI'],
    github: 'https://github.com',
    featured: true,
    status: 'Live',
    size: 'large',
    problem: 'Too many tasks compete for attention. Users feel overwhelmed by long lists and lose track of what matters right now.',
    decisions: [
      { problem: 'Too many tasks compete for attention', decision: 'Make active focus the primary UI object instead of the entire task list', why: 'Reduce cognitive load and help users commit to one thing' },
      { problem: 'Users forget what they planned', decision: 'Daily focus review prompt at session start', why: 'Create intentional engagement with priorities' },
      { problem: 'No sense of progress', decision: 'Visual focus streak and completion patterns', why: 'Motivate through visible consistency' }
    ],
    reflection: [
      { limitation: 'No cross-device sync yet', hypothesis: 'Users need their focus state everywhere', experiment: 'Implement cloud sync with conflict resolution' }
    ]
  },
  {
    slug: 'cortexmap',
    name: 'CortexMap',
    subtitle: 'Knowledge visualization tool',
    category: 'Knowledge / Visualization',
    year: '2024',
    role: 'Product, Data, UX, Development',
    description: 'A tool for visualizing knowledge structures and relationships between concepts. Helps users see connections they wouldn\'t notice in linear notes.',
    tags: ['Product', 'Data', 'UX', 'Development'],
    featured: true,
    status: 'In development',
    size: 'medium',
    problem: 'Linear notes hide relationships between ideas. Users accumulate knowledge but can\'t see the bigger picture.',
    decisions: [
      { problem: 'Knowledge feels disconnected', decision: 'Spatial graph as primary interface', why: 'Leverage human spatial cognition for understanding relationships' },
      { problem: 'Graphs become unreadable at scale', decision: 'Progressive disclosure with zoom levels', why: 'Maintain clarity regardless of data size' }
    ],
    reflection: [
      { limitation: 'Performance with large graphs', hypothesis: 'Virtual rendering and clustering needed', experiment: 'Implement LOD rendering for 1000+ node graphs' }
    ]
  },
  {
    slug: 'mindtrack',
    name: 'Mindtrack',
    subtitle: 'Web product for self-tracking',
    category: 'Web Product',
    year: '2024',
    role: 'Product, UX, AI, Development',
    description: 'A web product combining self-tracking with AI-powered insights. Helps users understand their patterns without manual analysis.',
    tags: ['Product', 'UX', 'AI', 'Development'],
    featured: true,
    status: 'In development',
    size: 'small',
    problem: 'Self-tracking tools generate data but not understanding. Users log habits but don\'t learn from patterns.',
    decisions: [
      { problem: 'Data without insight', decision: 'AI-generated weekly pattern summaries', why: 'Transform raw data into actionable understanding' }
    ],
    reflection: [
      { limitation: 'AI insights can feel generic', hypothesis: 'Context-aware prompts improve relevance', experiment: 'Personalize AI analysis based on user history' }
    ]
  },
  {
    slug: 'englishpath',
    name: 'EnglishPath',
    subtitle: 'Structured English learning system',
    category: 'EdTech',
    year: '2023',
    role: 'Product, Education, AI, Web',
    description: 'A personal learning system for structured English study. Combines spaced repetition, AI-generated content and progress tracking.',
    tags: ['Product', 'Education', 'AI', 'Web'],
    featured: true,
    status: 'Live',
    size: 'medium',
    problem: 'Language learning apps lack personal structure. Users jump between resources without a coherent path.',
    decisions: [
      { problem: 'No clear learning path', decision: 'Adaptive curriculum based on level assessment', why: 'Give users a clear starting point and progression' },
      { problem: 'Content feels impersonal', decision: 'AI generates examples from user\'s interests', why: 'Increase engagement through personal relevance' }
    ],
    reflection: [
      { limitation: 'Speaking practice is limited', hypothesis: 'Voice AI can fill the gap', experiment: 'Integrate conversational AI tutor' }
    ]
  },
  {
    slug: 'telegram-growth-analytics',
    name: 'Telegram Growth Analytics',
    subtitle: 'Advertising placement evaluation system',
    category: 'Growth / Analytics',
    year: '2024',
    role: 'Growth, Analytics, Development',
    description: 'A system for evaluating Telegram advertising placements based on real performance metrics. Helps make data-driven decisions about channel investments.',
    tags: ['Growth', 'Analytics', 'Data', 'Development'],
    featured: true,
    status: 'Live',
    size: 'small',
    problem: 'Telegram ad buying is opaque. Marketers lack reliable metrics for comparing placements.',
    decisions: [
      { problem: 'No standardized evaluation', decision: 'Build scoring system across ERR, CPM, CPS, CR', why: 'Enable apples-to-apples comparison of placements' },
      { problem: 'Reach metrics are misleading', decision: 'Track subscriber quality, not just quantity', why: 'Focus on actual business outcomes' }
    ],
    reflection: [
      { limitation: 'Manual data collection', hypothesis: 'API integration can automate', experiment: 'Connect to Telegram Bot API for automated tracking' }
    ]
  }
];

export const labProjects = [
  { name: 'AI Research Agent', description: 'Automated competitor analysis pipeline using LLMs', status: 'Active', tags: ['AI', 'Automation'] },
  { name: 'Home Server', description: 'Self-hosted infrastructure for development and experiments', status: 'Active', tags: ['Infrastructure', 'DevOps'] },
  { name: 'Data Pipeline Tool', description: 'ETL pipeline for product metrics aggregation', status: 'In progress', tags: ['Data', 'Python'] },
  { name: 'UI Component Kit', description: 'Reusable component library for rapid prototyping', status: 'Active', tags: ['React', 'Design System'] },
  { name: 'Automation Scripts', description: 'Workflow automations for repetitive tasks', status: 'Active', tags: ['Automation', 'Tools'] },
  { name: 'Open Source Contributions', description: 'Various contributions to open source projects', status: 'Ongoing', tags: ['Open Source', 'Community'] }
];
