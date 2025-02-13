import { db } from "../config/firebase.js";
import Course from "../models/Course.js";

const coursesData = [
  {
    id: 1,
    name: "Advanced JavaScript Development",
    instructor: "Dr. Sarah Mitchell",
    description:
      "Master modern JavaScript concepts including ES6+, async programming, and design patterns. Learn to build scalable applications with advanced JavaScript features.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 7:00 PM - 9:00 PM EST",
    location: "Online",
    prerequisites: [
      "Basic JavaScript knowledge",
      "Understanding of HTML/CSS",
      "Basic programming concepts",
    ],
    syllabus: [
      {
        week: 1,
        topic: "ES6+ Features",
        content:
          "Arrow functions, destructuring, spread/rest operators, template literals",
      },
      {
        week: 2,
        topic: "Async Programming",
        content: "Promises, async/await, event loop",
      },
      {
        week: 3,
        topic: "Design Patterns",
        content: "Module pattern, factory pattern, observer pattern",
      },
      {
        week: 4,
        topic: "Performance Optimization",
        content: "Memory management, code splitting, lazy loading",
      },
    ],
  },
  {
    id: 2,
    name: "React.js Mastery",
    instructor: "James Turner",
    description:
      "Comprehensive React course covering hooks, context API, Redux, and best practices for building modern web applications.",
    enrollmentStatus: "In Progress",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    duration: "10 weeks",
    schedule: "Mondays and Wednesdays, 6:00 PM - 8:00 PM EST",
    location: "Online",
    prerequisites: [
      "JavaScript fundamentals",
      "Basic React knowledge",
      "npm/yarn experience",
    ],
    syllabus: [
      {
        week: 1,
        topic: "React Fundamentals",
        content: "Components, props, state, lifecycle methods",
      },
      {
        week: 2,
        topic: "Hooks Deep Dive",
        content: "useState, useEffect, custom hooks",
      },
      {
        week: 3,
        topic: "State Management",
        content: "Context API, Redux toolkit",
      },
      {
        week: 4,
        topic: "Performance",
        content: "Memoization, lazy loading, Suspense",
      },
    ],
  },
  {
    id: 3,
    name: "Python for Data Science",
    instructor: "Dr. Michael Chen",
    description:
      "Learn Python programming with a focus on data science libraries including NumPy, Pandas, and Matplotlib.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    duration: "12 weeks",
    schedule: "Fridays, 5:00 PM - 8:00 PM EST",
    location: "Online",
    prerequisites: ["Basic programming knowledge", "Mathematics fundamentals"],
    syllabus: [
      {
        week: 1,
        topic: "Python Basics",
        content: "Data types, control structures, functions",
      },
      {
        week: 2,
        topic: "NumPy",
        content: "Arrays, broadcasting, vectorization",
      },
      {
        week: 3,
        topic: "Pandas",
        content: "DataFrames, data cleaning, analysis",
      },
      { week: 4, topic: "Data Visualization", content: "Matplotlib, Seaborn" },
    ],
  },
  {
    id: 4,
    name: "UI/UX Design Fundamentals",
    instructor: "Emma Rodriguez",
    description:
      "Learn the principles of user interface and user experience design, from wireframing to prototyping.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
    duration: "6 weeks",
    schedule: "Tuesdays, 6:00 PM - 9:00 PM EST",
    location: "Online",
    prerequisites: ["None"],
    syllabus: [
      {
        week: 1,
        topic: "Design Principles",
        content: "Color theory, typography, layout",
      },
      {
        week: 2,
        topic: "Wireframing",
        content: "Low-fidelity designs, user flows",
      },
      {
        week: 3,
        topic: "Prototyping",
        content: "High-fidelity designs, interactions",
      },
    ],
  },
  {
    id: 5,
    name: "Full Stack Web Development",
    instructor: "Alex Thompson",
    description:
      "Comprehensive course covering both frontend and backend development using the MERN stack.",
    enrollmentStatus: "In Progress",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    duration: "16 weeks",
    schedule: "Saturdays, 10:00 AM - 2:00 PM EST",
    location: "Online",
    prerequisites: [
      "HTML/CSS",
      "JavaScript basics",
      "Basic command line knowledge",
    ],
    syllabus: [
      { week: 1, topic: "Frontend Basics", content: "HTML5, CSS3, JavaScript" },
      { week: 2, topic: "React", content: "Components, state management" },
      { week: 3, topic: "Node.js", content: "Express, REST APIs" },
      {
        week: 4,
        topic: "MongoDB",
        content: "Database design, CRUD operations",
      },
    ],
  },
  {
    id: 6,
    name: "Mobile App Development with Flutter",
    instructor: "Lisa Wang",
    description:
      "Build cross-platform mobile applications using Flutter and Dart programming language.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    duration: "10 weeks",
    schedule: "Thursdays, 7:00 PM - 9:00 PM EST",
    location: "Online",
    prerequisites: [
      "Basic programming knowledge",
      "Object-oriented programming concepts",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Dart Basics",
        content: "Syntax, data types, functions",
      },
      {
        week: 2,
        topic: "Flutter Widgets",
        content: "Material design, layouts",
      },
      { week: 3, topic: "State Management", content: "Provider, Bloc pattern" },
    ],
  },
  {
    id: 7,
    name: "Cloud Computing with AWS",
    instructor: "Robert Martinez",
    description:
      "Learn to architect and deploy applications on Amazon Web Services (AWS).",
    enrollmentStatus: "Closed",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    duration: "8 weeks",
    schedule: "Wednesdays, 6:00 PM - 8:00 PM EST",
    location: "Online",
    prerequisites: ["Basic Linux administration", "Networking fundamentals"],
    syllabus: [
      { week: 1, topic: "AWS Basics", content: "IAM, VPC, EC2" },
      { week: 2, topic: "Storage Solutions", content: "S3, EBS, EFS" },
      { week: 3, topic: "Database Services", content: "RDS, DynamoDB" },
    ],
  },
  {
    id: 8,
    name: "Machine Learning Fundamentals",
    instructor: "Dr. Amanda Foster",
    description:
      "Introduction to machine learning concepts, algorithms, and practical applications.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800",
    duration: "14 weeks",
    schedule: "Mondays, 7:00 PM - 9:00 PM EST",
    location: "Online",
    prerequisites: ["Python programming", "Basic statistics", "Linear algebra"],
    syllabus: [
      {
        week: 1,
        topic: "ML Basics",
        content: "Types of learning, model evaluation",
      },
      {
        week: 2,
        topic: "Supervised Learning",
        content: "Classification, regression",
      },
      {
        week: 3,
        topic: "Unsupervised Learning",
        content: "Clustering, dimensionality reduction",
      },
    ],
  },
  {
    id: 9,
    name: "Cybersecurity Essentials",
    instructor: "David Wilson",
    description:
      "Learn fundamental concepts of cybersecurity, including network security and ethical hacking.",
    enrollmentStatus: "In Progress",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    duration: "10 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM EST",
    location: "Online",
    prerequisites: ["Networking basics", "Command line proficiency"],
    syllabus: [
      {
        week: 1,
        topic: "Security Fundamentals",
        content: "CIA triad, threat modeling",
      },
      { week: 2, topic: "Network Security", content: "Firewalls, IDS/IPS" },
      {
        week: 3,
        topic: "Ethical Hacking",
        content: "Penetration testing, vulnerability assessment",
      },
    ],
  },
  {
    id: 10,
    name: "Blockchain Development",
    instructor: "Mark Anderson",
    description:
      "Explore blockchain technology and learn to build decentralized applications using Ethereum.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800",
    duration: "12 weeks",
    schedule: "Fridays, 6:00 PM - 9:00 PM EST",
    location: "Online",
    prerequisites: ["JavaScript proficiency", "Basic cryptography knowledge"],
    syllabus: [
      {
        week: 1,
        topic: "Blockchain Basics",
        content: "Distributed ledgers, consensus mechanisms",
      },
      { week: 2, topic: "Smart Contracts", content: "Solidity, Web3.js" },
      {
        week: 3,
        topic: "DApp Development",
        content: "Truffle, MetaMask integration",
      },
    ],
  },
];

export const populateFirebase = async () => {
  try {
    const batch = db.batch();

    for (const courseData of coursesData) {
      const course = new Course(courseData);
      const docRef = db.collection("courses").doc();
      batch.set(docRef, course.toFirestore());
    }

    await batch.commit();
    console.log("Firebase populated successfully!");
  } catch (error) {
    console.error("Error populating Firebase:", error);
    throw error;
  }
};

// Run the population script
populateFirebase();
