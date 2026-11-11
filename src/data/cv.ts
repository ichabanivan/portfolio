// Single source of truth for the page. Content mirrors "CV - ATS.txt".

export interface Project {
  name: string;
  description: string;
  tech?: string;
  responsibilities?: string;
}

export type LogoKey = 'fiverr' | 'auto1' | 'intelliceed' | 'brightgrove' | 'alevel';

/** Keys of the certificate and diploma scans in src/assets (see src/lib/documents.ts). */
export type DocumentKey =
  | 'efset'
  | 'htmlCss'
  | 'javascript'
  | 'php'
  | 'masterComputerScience'
  | 'masterOilGas'
  | 'bachelorMining';

export interface Role {
  company: string;
  /** Optional: a role without a logo simply shows the company name. */
  logo?: LogoKey;
  location: string;
  title: string;
  start: { label: string; iso: string };
  end: { label: string; iso?: string };
  summary?: string;
  tech?: string;
  bullets?: string[];
  projects?: Project[];
}

export const profile = {
  name: 'Ivan Chaban',
  firstName: 'Ivan',
  lastName: 'Chaban',
  title: 'Senior Software Engineer',
  location: 'Poznań, Poland',
  email: 'ichabanivan@gmail.com',
  // Set to a string such as '+48 ...' to show the phone number on the page.
  phone: null as string | null,
  linkedin: 'https://www.linkedin.com/in/ivanchaban/',
  cvDoc: 'https://docs.google.com/document/d/1MK_L2FU4hosFpplFxnm-wJyn8X-SpZWBd6DNlu_4K70/edit?tab=t.0',
  github: 'https://github.com/ichabanivan',
  summary: [
    'Senior Software Engineer building web products since 2016, currently at Fiverr. I work across the stack with React, TypeScript, Node.js, NestJS and Next.js, with a focus on scalable front-end architecture, design systems and measurable product impact.',
    'I have led front-end teams, run interviews and code reviews, mentored engineers, and shipped everything from micro-frontends and SSR applications to React Native and Flutter apps.',
  ],
};

export const marquee = [
  'React',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Next.js',
  'React Native',
  'GraphQL',
  'Micro-Frontends',
  'GSAP',
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Programming Languages & Frameworks',
    items: [
      'JavaScript',
      'TypeScript',
      'ReactJS',
      'React Native',
      'Angular 2+',
      'NodeJS',
      'NestJS',
      'Dart',
      'Flutter',
      'NextJS (SSR/CSR)',
      'Prisma.io',
    ],
  },
  {
    group: 'Frontend Development & CSS Methodologies',
    items: [
      'CSS',
      'PostCSS',
      'SCSS',
      'Styled Components',
      'BEM',
      'OOCSS',
      'Mobile/Desktop-first markup',
      'HTML',
      'Handlebars',
      'Jade (Pug)',
    ],
  },
  {
    group: 'React & JavaScript Libraries',
    items: [
      'React Apollo',
      'React Query',
      'Redux',
      'Redux Toolkit',
      'Redux Saga',
      'React DnD',
      'Reactstrap',
      'Antd',
      'MUI',
      'Apollo',
      'Formik',
      'React Hook Form',
      'Redux Form',
      'jQuery',
      'Lodash',
      'Moment',
      'Axios',
      'GSAP',
      'Survey JS',
      'Form.io',
      'Zod',
      'Yup',
    ],
  },
  { group: 'Databases & Data Tools', items: ['MongoDB', 'PostgreSQL', 'Athena (AWS)'] },
  {
    group: 'Testing & Build Tools',
    items: ['Jest', 'Playwright', 'Docker', 'Gulp', 'Webpack', 'Rollup', 'CircleCI', 'Jenkins'],
  },
  {
    group: 'Monitoring, Logging & Analytics',
    items: ['Grafana', 'Coralogix', 'Groundcover', 'Rollout', 'A/B Testing', 'VictorOps'],
  },
  {
    group: 'Design & UI Tools',
    items: ['Figma', 'Figma MCP', 'Zeplin', 'Avocode', 'Adobe Photoshop', 'InDesign', 'Cursor'],
  },
  {
    group: 'Version Control & Collaboration Tools',
    items: ['Git (GitHub, GitLab, BitBucket)', 'Jira', 'Asana', 'Monday'],
  },
  { group: 'Linters & Code Quality Tools', items: ['ESLint', 'Stylelint', 'Prettier'] },
  { group: 'IDEs & Development Environments', items: ['IntelliJ IDEA', 'WebStorm', 'VS Code'] },
  { group: 'Other DevOps & Infrastructure Tools', items: ['Consul'] },
  { group: 'Operating Systems', items: ['Mac OS', 'Windows', 'Linux'] },
];

export const experience: Role[] = [
  {
    company: 'Fiverr',
    logo: 'fiverr',
    location: 'Israel, Remote',
    title: 'Senior Software Engineer',
    start: { label: 'July 2023', iso: '2023-07' },
    end: { label: 'Present' },
    summary:
      'Fiverr is a leading digital marketplace for freelance services, connecting businesses with independent professionals worldwide. The platform handles millions of transactions, requiring highly scalable architecture, seamless user experience, and continuous innovation across its ecosystem of web applications and internal tools.',
    tech: 'React, Node.js, TypeScript, NestJS, Next.js (SSR/CSR), React Hook Form, Zod, Docker, Kubernetes, Okteto, Grafana, Mixpanel, Coralogix, Athena, CircleCI, Figma, Cursor',
    bullets: [
      'Collaborated with design and development teams to adopt a company-wide design system, adopting FigmaMCP, DevMCP, and Cursor to accelerate front-end delivery and maintain UI/UX consistency.',
      'Provided 24/7 on-call support, monitoring production systems and creating Grafana and Mixpanel dashboards to ensure reliability, performance, and rapid incident resolution.',
      'Conducted rollout releases and A/B tests, analyzing user behavior to optimize feature adoption and improve platform engagement and usage metrics.',
      'Led the front-end development of Microsoft subscriptions sales project, delivering end-to-end functionality and maintaining high-quality UI/UX standards.',
      'Conducted onboarding for new developers, mentoring team members on code standards, architecture, and best practices.',
      'Maintained Logo Maker project.',
      'Designed and implemented a seamless authentication flow including signup forms, social login providers, account activation, and user questionnaire; streamlined onboarding, ensured GDPR compliance, and delivered measurable impact, increased sign-in success rate by 15%, boosted registrations by 18%, raised Average Selling Price (ASP) by 22%, and improved Sales per Buyer (SPB) by 10%.',
      'Created a scalable code activation flow and a package with reusable components, fully integrated into the company’s development workflow. Designed with a centralized update mechanism and trigger API, the package reached hundreds of consumers across projects, improving maintainability, ensuring UI/UX consistency.',
      'Developed Buyer Profile as a standalone React application, implementing both Server-Side Rendering (SSR) and Client-Side Rendering (CSR) with an API structured in the Backend-for-Frontend (BFF) pattern.',
      'Worked extensively with the main React monorepo, migrating it to pnpm to reduce build time by up to 20%.',
      'Worked extensively with Okteto and Kubernetes for deployment, scaling, and maintaining system stability.',
      'Developed numerous type-safe forms using React Hook Form with Zod and TypeScript, ensuring robust and maintainable frontend code.',
    ],
  },
  {
    company: 'Auto1 Group',
    logo: 'auto1',
    location: 'Berlin, Germany, Remote',
    title: 'Senior Software Engineer',
    start: { label: 'December 2021', iso: '2021-12' },
    end: { label: 'July 2023', iso: '2023-07' },
    summary:
      'Auto1 Group is Europe’s leading digital automotive platform that connects buyers and sellers across multiple markets, streamlining car sales and purchases through innovative technology. The engineering team builds scalable web applications, internal tools, and micro-frontends to support customer experience, operations, and business growth.',
    tech: 'React, Node.js, TypeScript, Micro-Frontend Architecture (MFE), Ant Design (Antd), Jenkins, Docker, Git, GraphQL, REST APIs',
    bullets: [
      'Developed modern, scalable Micro-Frontend (MFE) applications to replace legacy systems, improving maintainability, modularity, and application performance.',
      'Planned and executed the migration to the latest Ant Design (Antd) UI framework across all front-end applications, ensuring consistent UI/UX and enabling faster feature delivery with new reusable components.',
      'Designed and delivered a back-office application to streamline administrative workflows, improving internal efficiency and reducing manual effort.',
      'Created and optimized Jenkins CI/CD pipelines to support MFE applications, increasing deployment reliability and reducing release times.',
      'Migrated multiple applications to the latest Node.js, ensuring security compliance, performance improvements, and long-term maintainability.',
    ],
  },
  {
    company: 'Intelliceed Inc.',
    logo: 'intelliceed',
    location: 'Kharkiv, Ukraine, On-site',
    title: 'Team Lead',
    start: { label: 'May 2020', iso: '2020-05' },
    end: { label: 'December 2021', iso: '2021-12' },
    bullets: [
      'Led the Front-End team, overseeing multiple projects and ensuring delivery of high-quality, scalable solutions.',
      'Conducted interviews for candidates across Junior, Middle, Senior, and Lead roles, ensuring strong team growth and alignment with company standards.',
      'Performed code reviews for developers and cross-company teams, providing actionable feedback to improve code quality, maintainability, and adherence to best practices.',
      'Analyzed codebases across multiple projects, identifying potential issues and recommending solutions to optimize performance and reliability.',
      'Tutored and mentored colleagues and junior developers, sharing knowledge, best practices, and technical guidance to strengthen team skills.',
      'Developed new projects and architectures, leveraging technical expertise to design innovative and maintainable solutions.',
      'Implemented new features for existing projects, demonstrating proficiency in complex systems and delivering timely, high-quality results.',
    ],
  },
  {
    company: 'Brightgrove',
    logo: 'brightgrove',
    location: 'Kharkiv, Ukraine, Subcontract from Intelliceed Inc.',
    title: 'Senior Software Engineer',
    start: { label: 'November 2020', iso: '2020-11' },
    end: { label: 'November 2021', iso: '2021-11' },
    summary:
      'Event Management software: CRM system for managing company sales processes with multiple admin areas to control and monitor customer communications, deal creation, feedback collection, and production workflows (textiles, papers, etc.). The platform also included event management functionality, enabling organizers to create public events, issue digital tickets, and support real-time ticket validation and attendee check-in through a React Native mobile application.',
    tech: 'React, React Native, Apollo, GraphQL, i18n, Jest, DnD, Bootstrap, Reactstrap, Formik, Yup, lodash, moment, classnames',
    bullets: [
      'Developed a React-based CRM with admin areas for sales, communication tracking, feedback processing, and production management.',
      'Built a ticketing module supporting event creation, ticket distribution, and attendee management.',
      'Delivered a public events web application (React) and a ticket-checking mobile application (React Native) for real-time validation of invited attendees.',
      'Implemented producer & sponsor tools for product sales and order management.',
      'Designed and launched a Survey Client application with an Admin dashboard for managing responses and insights.',
      'Integrated Apollo + GraphQL for optimized data handling and seamless communication between client and server.',
    ],
  },
  {
    company: 'Intelliceed Inc.',
    logo: 'intelliceed',
    location: 'Kharkiv, Ukraine, On-site',
    title: 'Senior Software Engineer',
    start: { label: 'January 2020', iso: '2020-01' },
    end: { label: 'April 2021', iso: '2021-04' },
    projects: [
      {
        name: 'Motorsport management software',
        description: 'Timing and flagging software for circuit racing, marathon and biking events.',
        tech: 'Dart, Flutter, provider, get_it, sqflite, geolocator, connectivity',
      },
      {
        name: 'Healthcare Platform',
        description:
          'Medicare project that aims to manage patients’ treatment process by generating weekly plans of individual diets.',
        tech: 'HTML5, CSS3, JavaScript, Git, redux, redux-saga, React Native',
      },
    ],
  },
  {
    company: 'Intelliceed Inc.',
    logo: 'intelliceed',
    location: 'Kharkiv, Ukraine, On-site',
    title: 'Middle Software Engineer',
    start: { label: 'April 2018', iso: '2018-04' },
    end: { label: 'December 2019', iso: '2019-12' },
    projects: [
      {
        name: 'News Extra',
        description:
          'Presentation of related TV Channel news content; multilingual project, contains commerce advertising content, integrated with the most popular social media.',
        tech: 'HTML5, CSS3, JavaScript, Git, redux, redux-saga, React Native, integration with YouTube API, different API usage, responsive design',
        responsibilities: 'Front-End Developer, implementing features, improvements, bug fixing.',
      },
      {
        name: 'TV Drama',
        description:
          'Entertainment content for audience community; multilingual, supporting English and Arabic languages, contains commerce advertising content, integrated with the most popular social media.',
        tech: 'HTML5, CSS3, JavaScript, Git, React.js, redux, redux-saga, React Native, integration with YouTube API, different API usage',
        responsibilities:
          'Front-End Developer, implementation of new functionality and improvements, bug fixing.',
      },
      {
        name: 'Sofra',
        description:
          'Presentation of related TV Channel entertainment (culinary) content for audience community; multilingual, contains commerce advertising content, integrated with the most popular social media.',
        tech: 'HTML5, CSS3, JavaScript, jQuery, Git, React.js, redux, redux-saga, redux-thunk, integration with YouTube API, multi translations, different API usage',
        responsibilities:
          'Front-End Developer, new features development, improvements implementation, bug fixing.',
      },
    ],
  },
  {
    company: 'A-level Ukraine',
    logo: 'alevel',
    location: 'Kharkiv, Ukraine, On-site',
    title: 'Junior Software Engineer',
    start: { label: 'September 2016', iso: '2016-09' },
    end: { label: 'February 2018', iso: '2018-02' },
    summary: 'Markup for different services.',
    tech: 'HTML5, CSS3, JavaScript, jQuery, Git, Redux-saga, Redux-thunk',
    bullets: [
      'Front-End Engineer, taking part in implementing features, improvements, bug fixing.',
    ],
  },
];

export const education = [
  {
    school: 'National Technical University “Kharkiv Polytechnic Institute”',
    location: 'Kharkiv, Ukraine',
    degree: 'Master’s degree, Computer Sciences',
    diploma: 'masterComputerScience' as DocumentKey,
    start: { label: 'September 2020', iso: '2020-09' },
    end: { label: 'December 2021', iso: '2021-12' },
    details: [
      'Program Subject Area: Computer Sciences.',
      'Educational Program: Computer Science. Modeling, Designing and Computer Graphics.',
      'Main fields of study: ISCE-061 Information and Communication Technologies, ISCE-0611 Computer use, ISCE-0613 Software and applications development and analysis.',
    ],
  },
  {
    school: 'National University “Yuri Kondratyuk Poltava Polytechnic”',
    location: 'Kharkiv, Ukraine',
    degree: 'Master’s degree, Oil and Gas Engineering',
    diploma: 'masterOilGas' as DocumentKey,
    start: { label: 'September 2019', iso: '2019-09' },
    end: { label: 'December 2020', iso: '2020-12' },
    details: [
      'Program Subject Area: Oil and Gas Engineering and Technology.',
      'Educational Program: Oil and Gas Engineering and Technology.',
    ],
  },
  {
    school: 'National University “Yuri Kondratyuk Poltava Polytechnic”',
    location: 'Kharkiv, Ukraine',
    degree: 'Bachelor’s degree, Mining. Drilling Wells',
    diploma: 'bachelorMining' as DocumentKey,
    start: { label: 'September 2016', iso: '2016-09' },
    end: { label: 'June 2019', iso: '2019-06' },
    details: ['Program Subject Area: Mining.', 'Educational Program: Drilling wells.'],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  year?: number;
  /** Public verification page at the issuer. */
  url?: string;
  image?: DocumentKey;
}

export const certifications: Certification[] = [
  {
    title: 'EF SET English Certificate 57/100 (B2 Upper Intermediate)',
    issuer: 'EF SET',
    year: 2024,
    url: 'https://cert.efset.org/cbSU9g',
    image: 'efset',
  },
  {
    title: 'HTML, CSS',
    issuer: 'Test Provider',
    year: 2017,
    url: 'https://testprovider.com/ru/Certificate/Search/TP50742782',
    image: 'htmlCss',
  },
  {
    title: 'JavaScript',
    issuer: 'Test Provider',
    year: 2017,
    url: 'https://testprovider.com/ru/Certificate/Search/TP87878809',
    image: 'javascript',
  },
  {
    title: 'PHP',
    issuer: 'Test Provider',
    url: 'https://testprovider.com/ru/Certificate/Search/TP29131587',
    image: 'php',
  },
  { title: 'Front-End', issuer: 'A-level Ukraine', year: 2016 },
  { title: 'Development Basics', issuer: 'A-level Ukraine', year: 2016 },
];

export const volunteering = [
  'A-Level Ukraine: Mentoring “Programming for Children”, June 2017 to September 2017. Project from the City Administration: #Itforyou.',
];

export const languages = [
  { name: 'English', level: 'B2, Upper Intermediate' },
  { name: 'Ukrainian', level: 'C2, Fluent' },
  { name: 'Russian', level: 'C2, Fluent' },
  { name: 'Polish', level: 'B1, Intermediate' },
];
