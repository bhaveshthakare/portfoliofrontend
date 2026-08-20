export const profile = {
  name: "Bhavesh Thakare",
  role: "Full Stack Developer",
  tagline:
    "CS graduate (2026) building secure full-stack applications with Java, Spring Boot, React.js and MySQL.",
  objective:
    "Computer Science Engineering graduate (2026) with hands-on internship experience across the full stack — Java, Spring Boot, REST APIs, Hibernate/JPA, and MySQL. Built and deployed CRUD-based backend services and full-stack web applications, including a JWT-secured insurance management system and an AI-driven analytics platform. Strong foundation in OOP, SDLC, and Git-based collaboration. Seeking a Full Stack Developer role to apply and grow these skills on production-grade projects.",
  phone: "8668837681",
  email: "bhaveshthakare866@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhaveshthakare7/",
  linkedinLabel: "linkedin.com/in/bhaveshthakare7",
  github: "https://github.com/bhaveshthakare",
  githubLabel: "github.com/bhaveshthakare",
  resumeUrl: "/resume.pdf",
};

export const heroDiagram = {
  frontend: ["React.js", "Tailwind CSS"],
  api: ["REST API", "JWT Auth"],
  backend: ["Spring Boot", "Java"],
  data: ["MySQL", "Hibernate/JPA"],
};

export const skills = [
  { name: "Java", level: 90, note: "Core Java, OOP, Collections" },
  { name: "Spring Boot", level: 85, note: "REST APIs, annotation config" },
  { name: "React.js", level: 78, note: "Hooks, components, state" },
  { name: "Tailwind CSS", level: 82, note: "Utility-first styling" },
  { name: "REST APIs", level: 88, note: "Design, build, consume, Postman" },
  { name: "Hibernate / JPA", level: 84, note: "Entities, repositories, CRUD" },
  { name: "MySQL", level: 85, note: "Schema design, joins, CRUD" },
  { name: "SQL & Data Modeling", level: 80, note: "Normalization, queries" },
  { name: "Python (Pandas/NumPy)", level: 72, note: "Data analysis, Matplotlib" },
  { name: "Git & GitHub", level: 80, note: "Branches, PRs, collaboration" },
];

export const skillChips = [
  "C",
  "HTML",
  "CSS",
  "Bootstrap",
  "JDBC",
  "JWT Authentication",
  "MongoDB (Basics)",
  "Maven",
  "Git",
  "GitHub",
  "Eclipse",
  "Postman",
  "VS Code",
  "Matplotlib",
  "Seaborn",
  "OOP",
  "Data Structures",
  "SDLC",
];

export const experience = [
  {
    company: "Labmentix",
    role: "Java Developer Intern",
    location: "Bangalore",
    period: "July 2026 - Present",
    current: true,
    points: [
      "Working on Java-based backend development using Spring Boot and REST APIs.",
      "Contributing to the design and implementation of RESTful services as part of an ongoing internship.",
    ],
  },
  {
    company: "Soham Global",
    role: "Full Stack Java Developer (Intern)",
    location: "",
    period: "2025",
    current: false,
    points: [
      "Developed and maintained Java applications using Spring Boot, applying Core Java and OOP principles.",
      "Built and consumed REST APIs for backend services and tested endpoints using Postman.",
      "Performed database design and CRUD operations using MySQL and Spring Data JPA (Hibernate).",
    ],
  },
];

export const education = [
  {
    type: "Bachelor of Engineering",
    degree: "Computer Science and Engineering",
    school: "P.R. Pote Patil College of Engineering and Management",
    location: "Amravati",
    period: "2022 - 2026",
  },
  {
    type: "Class XII",
    degree: "Higher Secondary (Science)",
    school: "Government Vidarbha Institute of Science and Humanities (VMV)",
    location: "Amravati",
    period: "2021 - 2022",
  },
];

// Shown only when the backend is offline — uploaded certificates come from the API.
export const fallbackCertificates = [
  {
    id: "static-1",
    name: "Full Stack Java Internship",
    issuer: "Soham Global",
    year: "2025",
    fileUrl: "",
  },
  {
    id: "static-2",
    name: "Full Stack Developer Virtual Internship",
    issuer: "EduSkills",
    year: "2024",
    fileUrl: "",
  },
  {
    id: "static-3",
    name: "Enterprise Java Development",
    issuer: "Soham Global",
    year: "2025",
    fileUrl: "",
  },
];

// Shown only when the backend is offline — projects come from the API once connected.
export const fallbackProjects = [
  {
    id: "static-1",
    title: "Insurance Management System",
    description:
      "Full-stack insurance management application with a Spring Boot backend and HTML/CSS frontend. JWT-based authentication and authorization secure all REST endpoints, with persistence managed by Spring Data JPA and Hibernate.",
    techStack: "Java, Spring Boot, JWT Authentication, Spring Data JPA, Hibernate, HTML, CSS, MySQL",
    liveDemoUrl: "https://github.com/bhaveshthakare",
    githubUrl: "https://github.com/bhaveshthakare/insurance-management-system",
    imageUrl: "",
  },
  {
    id: "static-2",
    title: "Used Cars Hub",
    description:
      "Full-stack web application for browsing used cars with a Spring Boot backend and HTML/CSS frontend. Annotation-based configuration and Spring Data JPA handle all database operations.",
    techStack: "Java, Spring Boot, Spring Data JPA, HTML, CSS, MySQL",
    liveDemoUrl: "https://github.com/bhaveshthakare",
    githubUrl: "https://github.com/bhaveshthakare/used-cars-hub",
    imageUrl: "",
  },
  {
    id: "static-3",
    title: "Spring AI Chat Engine",
    description:
      "AI chatbot integrating Java Spring Boot with the OpenAI API. REST APIs handle communication between the frontend and backend, streaming conversational responses.",
    techStack: "Java, Spring Boot, OpenAI API, REST APIs, Maven",
    liveDemoUrl: "https://github.com/bhaveshthakare",
    githubUrl: "https://github.com/bhaveshthakare/spring-ai-chat-engine",
    imageUrl: "",
  },
  {
    id: "static-4",
    title: "NADARAI — Anti-Doping Analytics",
    description:
      "AI-driven anti-doping platform using machine learning-based anomaly detection. Implements REST APIs, authentication, and analytics dashboards for athlete risk assessment.",
    techStack: "Python, FastAPI, SQLite, Pandas, NumPy, Scikit-learn, REST APIs",
    liveDemoUrl: "https://github.com/bhaveshthakare",
    githubUrl: "https://github.com/bhaveshthakare/nadarai",
    imageUrl: "",
  },
];
