import type { IconName } from '../shared/components/icon/icon.component';

export type LayerId = 'interface' | 'service' | 'data';

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  contributions: string[];
  tech: string[];
  visual: 'documents' | 'reports' | 'api';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: IconName;
}

export interface SkillGroup {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  skills: string[];
  layers: LayerId[];
}

export interface ExperienceEntry {
  period: string;
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work', index: '01' },
  { id: 'services', label: 'Services', index: '02' },
  { id: 'skills', label: 'Toolkit', index: '03' },
  { id: 'about', label: 'About', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'document-systems',
    title: 'Document management systems',
    kicker: 'Business applications & automation',
    summary:
      'Business teams needed web applications that could manage documents and keep related background jobs running. I maintained and improved the .NET applications behind that daily work.',
    contributions: [
      'Maintained and improved .NET web applications used by business teams day to day.',
      'Kept Windows services and background jobs running alongside the main applications.',
      'Built automation that reduced repetitive bulk data entry into grids.'
    ],
    tech: ['.NET', 'C#', 'Windows Services', 'Web applications'],
    visual: 'documents'
  },
  {
    id: 'batch-reporting',
    title: 'Batch reporting for business data',
    kicker: 'Excel & PDF output',
    summary:
      'Reporting often has to leave the application as files people can share. I built batch-based reporting modules that turned application data into review-ready output.',
    contributions: [
      'Developed batch-based reporting modules from application data.',
      'Generated Excel and PDF output shaped around how the business reviews information.',
      'Worked within background processing so reports could be produced in batches.'
    ],
    tech: ['.NET', 'Excel reporting', 'PDF generation', 'Background processing'],
    visual: 'reports'
  },
  {
    id: 'business-apis',
    title: 'Backend APIs for business operations',
    kicker: 'Service migration & feature work',
    summary:
      'I migrated backend services and improved APIs used in business applications, including work on banking-related solutions. The work covered both dependable data handling and new functionality.',
    contributions: [
      'Migrated backend services while keeping business applications operational.',
      'Implemented features such as limit management and transaction history.',
      'Focused on API performance and dependable data handling.'
    ],
    tech: ['REST APIs', '.NET', 'SQL', 'Feature development'],
    visual: 'api'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'backend',
    title: 'Backend development',
    description:
      'I build and extend the server-side of business applications: the rules, workflows, and data handling that keep daily operations running.',
    meta: 'C# · .NET Framework · modern .NET · ASP.NET MVC',
    icon: 'server'
  },
  {
    id: 'api',
    title: 'API development & integration',
    description:
      'I create REST APIs and connect existing systems so screens, services, and databases can share information reliably.',
    meta: 'ASP.NET Web API · REST · frontend–backend integration',
    icon: 'network'
  },
  {
    id: 'frontend',
    title: 'Frontend application work',
    description:
      'I implement forms, data-driven screens, and application behaviour so users can complete tasks without fighting the interface.',
    meta: 'Angular · JavaScript · jQuery · HTML · CSS',
    icon: 'window'
  },
  {
    id: 'end-to-end',
    title: 'End-to-end features',
    description:
      'When a feature needs a screen, an API, and a database change, I can carry that work through instead of stopping at one layer.',
    meta: 'Frontend · backend · APIs · databases',
    icon: 'layers'
  },
  {
    id: 'enhancement',
    title: 'Existing application enhancement',
    description:
      'I debug, maintain, and add features to established codebases, including older .NET applications that still need to serve the business — Windows services, background processing, and reporting included.',
    meta: 'Maintenance · debugging · legacy .NET · Windows Services',
    icon: 'wrench'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    shortTitle: 'Backend',
    summary:
      'The core of my work: application logic, APIs, and database-driven features in C# and .NET, including both older Framework apps and more modern .NET services.',
    skills: ['C#', '.NET Framework', '.NET / .NET Core', 'ASP.NET MVC', 'ASP.NET Web API'],
    layers: ['service', 'data']
  },
  {
    id: 'frontend',
    title: 'Frontend',
    shortTitle: 'Frontend',
    summary:
      'I build the screens and forms that talk to those services, so users can complete tasks without a separate frontend specialist for every change.',
    skills: ['JavaScript', 'jQuery', 'Angular', 'HTML', 'CSS'],
    layers: ['interface']
  },
  {
    id: 'data',
    title: 'Database & integration',
    shortTitle: 'Data',
    summary:
      'I connect applications to data and other systems, including SQL databases, Entity Framework, and REST-based integrations.',
    skills: ['SQL', 'MySQL', 'Entity Framework', 'REST APIs', 'Database integration'],
    layers: ['data', 'service']
  },
  {
    id: 'application',
    title: 'Application work',
    shortTitle: 'Applications',
    summary:
      'I maintain and extend existing software: Windows services, background jobs, reporting, debugging, and improvements to established codebases.',
    skills: [
      'Windows Services',
      'Background processing',
      'Legacy application maintenance',
      'Debugging and enhancement',
      'Excel and PDF reporting'
    ],
    layers: ['interface', 'service', 'data']
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2023 — Present',
    title: 'Software engineer · freelance & remote projects',
    description:
      'Continuing work on .NET applications, APIs, Windows services, reporting modules, and application maintenance for existing business systems.'
  },
  {
    period: '2021 — 2023',
    title: 'Software engineer · freelance & remote projects',
    description:
      'Backend service migration, API improvements, and feature development in established applications, including collaboration with stakeholders and QA on delivery.'
  }
];

export const PRINCIPLES: Principle[] = [
  {
    title: 'Understand before changing',
    description:
      'I start by learning how the existing system actually works, not how it was supposed to work. That is where most avoidable mistakes are found.'
  },
  {
    title: 'Build for the next developer',
    description:
      'Clear structure and predictable integrations matter more than a clever shortcut. The code should still make sense after the feature ships.'
  },
  {
    title: 'Finish the whole feature',
    description:
      'When a change needs a screen, an API, and a database update, I can carry it through instead of stopping at one layer.'
  }
];

export const STACK_MARQUEE = [
  'C#',
  '.NET',
  'ASP.NET',
  'REST APIs',
  'SQL',
  'Entity Framework',
  'Angular',
  'JavaScript',
  'Windows Services',
  'Excel / PDF reporting',
  'jQuery',
  'MySQL'
];
