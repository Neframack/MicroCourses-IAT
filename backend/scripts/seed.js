const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Course = require('../models/Course');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleCourses = [
  {
    title: "React Basics",
    description: "Learn the fundamentals of React including components, hooks, and JSX.",
    instructor: "Jane Doe",
    duration: 5,
    category: "Frontend",
    image: "http://localhost:5000/uploads/react.png",
    modules: ["Intro", "JSX", "Components", "Hooks"]
  },
  {
    title: "Node.js Essentials",
    description: "Understand how to build backend services with Node and Express.",
    instructor: "John Smith",
    duration: 6,
    category: "Backend",
    image: "http://localhost:5000/uploads/node.png",
    modules: ["Intro", "Routing", "Middleware", "Databases"]
  },
  {
    title: "Fullstack Web Dev",
    description: "End-to-end project using MongoDB, Express, React, and Node.js.",
    instructor: "Joel Dufty",
    duration: 10,
    category: "Fullstack",
    image: "http://localhost:5000/uploads/fullstack.png",
    modules: ["Setup", "Frontend", "Backend", "Deployment"]
  },
  {
    title: "Introduction to Databases",
    description: "An overview of relational and non-relational databases, focusing on real-world applications and data modeling.",
    instructor: "Blake Zenere",
    duration: 4,
    category: "Data",
    image: "http://localhost:5000/uploads/databases.png",
    modules: ["SQL", "NoSQL", "Schemas", "Indexing"]
  },
  {
    title: "History of the Internet",
    description: "Explore the evolution of the internet from ARPANET to modern web 3.0 technologies, tracing pivotal moments in global connectivity.",
    instructor: "Jason Lee",
    duration: 3,
    category: "Theory",
    image: "http://localhost:5000/uploads/history.png",
    modules: ["ARPANET", "WWW", "Modern Browsers", "Web 3.0"]
  },
  {
    title: "Maths for Computer Science",
    description: "Foundational math concepts like logic, sets, combinatorics, and graph theory relevant to programming and algorithms.",
    instructor: "Joe Rogan",
    duration: 8,
    category: "Theory",
    image: "http://localhost:5000/uploads/maths.png",
    modules: ["Logic", "Combinatorics", "Graphs", "Sets"]
  },
  {
    title: "Software Design",
    description: "Learn the architecture and design patterns that form the foundation of robust applications.",
    instructor: "Elon Musk",
    duration: 6,
    category: "Engineering",
    image: "http://localhost:5000/uploads/design.png",
    modules: ["SOLID", "MVC", "Layered", "Patterns"]
  },
  {
    title: "Software Engineering",
    description: "A complete guide to the software development lifecycle, team workflows, testing, and deployment practices.",
    instructor: "Joel Dufty",
    duration: 7,
    category: "Engineering",
    image: "http://localhost:5000/uploads/engineering.png",
    modules: ["SDLC", "Agile", "CI/CD", "Testing"]
  },
  {
    title: "Networks",
    description: "Explore how computer networks work — from IP addressing and protocols to packet routing and security.",
    instructor: "Blake Zenere",
    duration: 5,
    category: "Backend",
    image: "http://localhost:5000/uploads/networks.png",
    modules: ["OSI Model", "IP/TCP", "DNS", "Firewalls"]
  },
  {
    title: "Ethical Hacking",
    description: "Learn how to ethically break into systems to find vulnerabilities and prevent malicious attacks. This course includes practical labs and case studies to equip learners with real-world skills in penetration testing, vulnerability analysis, and security hardening. By the end, students will understand ethical hacking methodologies and tools, and will be able to report and fix security flaws responsibly.",
    instructor: "Edward Snowden",
    duration: 9,
    category: "Security",
    image: "http://localhost:5000/uploads/hacking.png",
    modules: ["Footprinting", "Exploits", "Pentesting", "Reporting"]
  },
  {
    title: "Why C Rules the World",
    description: "Discover why C continues to power major systems and embedded devices worldwide.",
    instructor: "Linus Torvalds",
    duration: 6,
    category: "Low-Level",
    image: "http://localhost:5000/uploads/c_language.png",
    modules: ["Memory", "Pointers", "Embedded", "Performance"]
  },
  {
    title: "Android App Development",
    description: "Build native Android apps using Java and Kotlin with a focus on UI/UX and data persistence.",
    instructor: "Jason Lee",
    duration: 7,
    category: "Mobile",
    image: "http://localhost:5000/uploads/android.png",
    modules: ["Layouts", "Activities", "Databases", "Publishing"]
  },
  {
    title: "Modern Web APIs",
    description: "Understand REST and GraphQL and how to build APIs that scale with users and features.",
    instructor: "Joel Dufty",
    duration: 5,
    category: "Backend",
    image: "http://localhost:5000/uploads/apis.png",
    modules: ["REST", "GraphQL", "Testing", "Security"]
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(MONGO_URI);
    await Course.deleteMany();
    await Course.insertMany(sampleCourses);
    console.log("Sample courses inserted!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.disconnect();
  }
}

seedCourses();
