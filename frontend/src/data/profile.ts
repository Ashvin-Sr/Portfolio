export const profile = {
  name: "Ashvin Sureskumar",
  title: "Software Developer",
  tagline:
    "Built SAP automation tools, backend systems, and AI-powered applications with hands-on experience across the full software development lifecycle.",
  location: "Toronto, ON",
  email: "a.sureskumar@alumni.utoronto.ca",
  links: {
    // TODO: replace with your real profile URLs
    github: "https://github.com/Ashvin-Sr",
    linkedin: "https://www.linkedin.com/in/ashvin-sureskumar/",
  },
};

export const education = {
  school: "University of Toronto",
  location: "Toronto, ON",
  degree: "Honours Bachelor of Science, Computer Science (GPA: 3.5/4.0)",
  period: "September 2021 – June 2026",
};

export const experience = [
  {
    role: "SAP Software Developer",
    company: "Aecon Group Inc",
    location: "Etobicoke, ON",
    period: "October 2023 – Present",
    highlights: [
      "Designed and developed Java and Python automation solutions that power production data pipelines for SAP user provisioning, role assignments, and account maintenance, cutting processing time by 75% while improving operational reliability.",
      "Partnered directly with 20+ end users across operations to gather requirements and engineered 5 new automation features, cutting manual SAP administration workload by an estimated 12 hours per week.",
      "Manage the full access lifecycle (provisioning, de-provisioning, role assignment) for 2,000+ users across 3–5 backend systems, handling 50+ requests per day through self-built API automation software with minute-level turnaround and 100% compliance.",
      "Established a centralized logging and monitoring framework for script execution, API activity, and system events on Unix, reducing troubleshooting and debugging time by 30–40% across multiple automation pipelines.",
    ],
  },
];

export const projects = [
  {
    name: "MEDAI",
    stack: "TypeScript, React, Node.js, Express.js, MongoDB, Cypress, Docker",
    period: "Team of 5, school project, 3 months",
    summary:
      "An AI-powered healthcare platform that lets doctors and patients securely share medical information, schedule appointments, and communicate. A full-stack web app I led a team of 5 to build in an Agile environment.",
    highlights: [
      "Built a RAG pipeline using OpenAI's APIs, chunking physician notes, generating embeddings, and using vector search to ground pre-appointment summaries in patient-specific context, cutting token usage by 30% while improving accuracy.",
      "Created an automated LLM evaluation framework that prompts the model, scores outputs against golden test cases, and surfaces strengths/weaknesses, driving iterative prompt refinement until we hit a 90% accuracy target.",
      "Planned and implemented backend APIs, secured the server with HTTPS certificates, and used up-to-date auth libraries for structured frontend/backend data exchange.",
      "Maintained CI/CD pipelines with GitHub Actions, cutting manual deployment steps by 5 hours per week and reducing deployment-related production incidents.",
      "Built a test suite of 50+ files covering unit, integration, and UI tests.",
    ],
    link: "https://github.com/Ashvin-Sr/MEDAI"
  },
  {
    name: "MyBNB",
    stack: "Java, JDBC, MySQL",
    period: "Solo school project, 1 month",
    summary:
      "A console-based Airbnb-style booking platform with a MySQL database designed from scratch — covering users, listings, availability, bookings, and reviews.",
    highlights: [
      "Implemented a price-suggestion algorithm recommending listing prices based on property value and amenities, plus a host toolkit suggesting amenities to improve competitiveness.",
      "Built search and booking with geo-distance search, date-range availability filtering, and price filtering.",
      "Designed a two-sided review system with duplicate-review prevention.",
      "Built a reporting module using advanced SQL (correlated subqueries, multi-level grouping) to analyze bookings, rank hosts, and surface cancellation trends.",
    ],
    link:"https://github.com/Ashvin-Sr/MyBNB"
  },
  {
    name: "Donkey Kong",
    stack: "MIPS Assembly",
    period: "Solo school project, 1 month",
    summary:
      "A fully playable Donkey Kong-style platformer built entirely in MIPS assembly, with no engine or graphics library to build on.",
    highlights: [
      "Wrote a custom rendering loop tracking the background and every game object's position, redrawing each frame based on input and game state.",
      "Implemented collision detection by checking position overlap between game objects every frame.",
    ],
    link: "https://www.youtube.com/watch?v=1ISWPXTK-_s"
  },
  {
    name: "System Statistics Monitor",
    stack: "C",
    period: "Solo school project, 1 month",
    summary:
      "A C application that retrieves and displays live system statistics — memory, CPU usage, power, and more — in a continuously refreshing command-line display.",
    highlights: [
      "Used WSL to access the Linux system calls needed to read underlying system statistics while developing on Windows.",
      "Called Linux system calls to retrieve system statistics, then parsed and formatted the output for display in a continuously refreshing command-line interface.",
    ],
    link: "https://github.com/Ashvin-Sr/SystemStatistics"
  },
  {
    name: "Course Scheduler",
    stack: "Java, Android SDK",
    period: "Team of 5, school project, 2 months",
    summary:
      "An Android app that lets students track completed and required courses, then auto-generates a valid schedule based on term availability using a constraint solver.",
    highlights: [
      "Focused on UI and logic for students to upload and edit completed/required courses.",
      "All course and schedule data stored locally on-device.",
    ],
    link: "https://github.com/Ashvin-Sr/CourseManagerAndroidApp"
  },
  {
    name: "Speed Demon",
    stack: "Unity, C#, GitHub",
    period: "Team of 10, indie project, 3 months",
    summary:
      "A small indie first-person platformer built in Unity with a team of 10, using GitHub for version control.",
    highlights: [
      "Focused on gameplay mechanics, game state management, and UI.",
      "Implemented core gameplay features and integrated them with the existing engine.",
      "Wired up the game state management system to handle player progress, level transitions, and scoring.",
      "Designed and implemented the user interface, including menus, HUD elements, and feedback systems.",
    ],
    link: "https://ashvinsr.itch.io/speed-demon"
  },
];

export const certifications = [
  { name: "Building with the Claude API", org: "Anthropic Education", date: "July 2026", proof: "/certifications/claude-api.pdf" },
  { name: "Introduction to Cybersecurity", org: "Cisco Networking Academy", date: "July 2026", proof: "/certifications/cisco-cybersecurity.pdf" },
  { name: "AWS Certified Cloud Practitioner", org: "AWS Training and Certification", date: "May 2024", proof: "/certifications/aws-cloud-practitioner.pdf" },
];

export const skills = {
  "Programming Languages": [
    "Java",
    "Python",
    "C/C++",
    "C#",
    "SQL (PostgreSQL)",
    "JavaScript",
    "TypeScript",
    "HTML/CSS",
    "MIPS Assembly",
  ],
  "Frameworks & Technologies": [
    "Spring Boot",
    "Fast API",
    "React",
    "Node.js",
    "Express.js",
    "REST APIs",
    "JUnit",
    "SAP",
    "Android SDK",
  ],
  "Developer Tools": ["Git", "Docker", "GitHub Actions", "Cypress", "Postman", "Supabase", "VS Code", "Jupyter", "Android Studio", "JIRA"],
  "Data Engineering": ["ETL/ELT", "Data Modeling", "Data Transformation", "SQL (PostgreSQL)", "MongoDB"],
  "Cloud & OS": ["Unix/Linux", "AWS"],
  "AI": ["OpenAI API", "Anthropic Claude API", "Gemini API", "RAG", "AI Agents", "Prompt Engineering", "Embeddings", "Vector Search"],
  "Libraries": ["pandas", "NumPy", "Matplotlib", "PyTorch"],
};
