// ============================================
// Firebase Seed Script
// Seeds: admin user, all projects, skills, about
// Run: node seed.mjs (from Portfolio/client/)
// ============================================

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

// ── Firebase Config ──────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyCVi7oTXlAOWA7QZ89cOYT18F4JZ3EC_z0',
  authDomain: 'portfolio-ae955.firebaseapp.com',
  projectId: 'portfolio-ae955',
  storageBucket: 'portfolio-ae955.firebasestorage.app',
  messagingSenderId: '972141777497',
  appId: '1:972141777497:web:d59b1b8703bac6a6ce1748',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ── Admin Credentials ────────────────────────
const ADMIN_EMAIL = 'Ayush@2003.in';   // Firebase requires TLD — closest to Ayush@2003
const ADMIN_PASSWORD = '200325Ayush';

// ── About Data ───────────────────────────────
const aboutData = {
  bio: "I'm a B.Tech student in Electronics and Communication Engineering and a passionate developer who enjoys building clean UI, fun web apps, and visually attractive projects that stand out from normal templates. I'm particularly interested in IoT and Embedded Systems, combining my engineering background with modern development practices.",
  tagline: 'IoT + Embedded / Full Stack Developer',
};

// ── Skills Data ──────────────────────────────
const skillsData = [
  { name: 'Embedded Systems', percentage: 75, order: 1 },
  { name: 'React', percentage: 100, order: 2 },
  { name: 'Git / GitHub', percentage: 100, order: 3 },
  { name: 'HTML / CSS / JavaScript', percentage: 90, order: 4 },
];

// ── Projects Data ────────────────────────────
const projectsData = [
  {
    title: 'Obstacle Avoiding Robot',
    shortDesc: 'A smart autonomous robot using Arduino Uno, ultrasonic sensor, servo motor, and DC motors for intelligent navigation without human intervention.',
    description: 'A smart autonomous obstacle avoiding robot developed using Arduino Uno, ultrasonic sensor, servo motor, motor shield, and DC motors for intelligent robotic navigation and automation applications. The robot can automatically detect obstacles, scan surroundings, and choose the safest direction for movement without human intervention.',
    tags: ['Arduino Uno', 'Ultrasonic Sensor', 'Servo Motor', 'Motor Shield', 'DC Motors'],
    githubUrl: 'https://github.com/ayush1234s/Obstacle-Avoiding-Robot-Using-Arduino-UNO',
    liveUrl: '',
    thumbnailUrl: '',
    emoji: '🤖',
    featured: true,
    order: 1,
  },
  {
    title: 'Home Automation — Voltura4',
    shortDesc: 'ESP32-based Smart Home Automation via SMS and Bluetooth. Control appliances remotely even without internet.',
    description: 'Voltura4 is a powerful ESP32-based Smart Home Automation System that allows users to control home appliances from anywhere using SMS commands or nearby using Bluetooth. Combines GSM remote control, Bluetooth automation, relay switching, buzzer notifications, memory state saving, and network monitoring.',
    tags: ['ESP32', 'GSM', 'Bluetooth', 'Relay Switching', 'Notifications'],
    githubUrl: 'https://github.com/ayush1234s/Home-Automation-',
    liveUrl: '',
    thumbnailUrl: '',
    emoji: '🏠',
    featured: true,
    order: 2,
  },
  {
    title: 'Visualize LeetCode',
    shortDesc: 'DSA learning & revision platform that visually explains algorithms and data structures.',
    description: 'Visualize LeetCode | DSA Learning & Revision Platform — interactive visual explanations of LeetCode problems and algorithms.',
    tags: ['React', 'DSA', 'Algorithms', 'Visualization'],
    githubUrl: 'https://github.com/ayush1234s/visualiseleetcode',
    liveUrl: 'https://visualiseleetcode.vercel.app/',
    thumbnailUrl: '',
    emoji: '💡',
    featured: false,
    order: 3,
  },
  {
    title: 'Flight One',
    shortDesc: 'Smart travel & flight intelligence platform for seamless flight discovery and booking insights.',
    description: 'Flight One | Smart Travel & Flight Intelligence Platform — making air travel smarter and more intuitive.',
    tags: ['React', 'API', 'Travel', 'UI/UX'],
    githubUrl: 'https://github.com/ayush1234s/FlightOne',
    liveUrl: 'https://flightone.vercel.app/',
    thumbnailUrl: '',
    emoji: '✈️',
    featured: false,
    order: 4,
  },
  {
    title: 'MovieShow',
    shortDesc: 'Movie browsing web app built with React.js for exploring popular movies with rich UI.',
    description: 'A movie browsing web app using React.js, where users can explore popular movies with a clean and rich interface.',
    tags: ['React.js', 'API', 'Movies', 'UI'],
    githubUrl: 'https://lnkd.in/gpp2jaip',
    liveUrl: 'https://lnkd.in/gCFjX_dN',
    thumbnailUrl: '',
    emoji: '🎬',
    featured: false,
    order: 5,
  },
  {
    title: 'Laughing Jokes Bot',
    shortDesc: 'A fun Telegram bot built with Node.js that delivers jokes on demand via the Telegram Bot API.',
    description: 'Laughing Jokes Bot is a fun Telegram bot built using Node.js and the Telegram Bot API.',
    tags: ['Node.js', 'Telegram Bot', 'API'],
    githubUrl: 'https://lnkd.in/eTuTrv6F',
    liveUrl: 'https://lnkd.in/eHpbryiQ',
    thumbnailUrl: '',
    emoji: '😂',
    featured: false,
    order: 6,
  },
  {
    title: 'Skill Rathi',
    shortDesc: 'Startup-style e-learning platform developed as a group project — a full EdTech experience.',
    description: 'Startup-style e-learning platform developed as a group project. A full-featured EdTech experience at skillrathi.com.',
    tags: ['EdTech', 'Group Project', 'Full Stack', 'React'],
    githubUrl: 'https://github.com/ayush1234s/SkillRathi',
    liveUrl: 'https://skillrathi.com/',
    thumbnailUrl: '',
    emoji: '📚',
    featured: false,
    order: 7,
  },
];

// ── Helper ────────────────────────────────────
const log = (emoji, msg) => console.log(`  ${emoji}  ${msg}`);
const err = (msg) => console.error(`  ❌  ${msg}`);

// ── Main Seed Function ────────────────────────
async function seed() {
  console.log('\n🌱  Ayush Portfolio — Firebase Seed Script');
  console.log('══════════════════════════════════════════\n');

  // 1. Create Admin User
  console.log('Step 1: Creating admin user...');
  try {
    const cred = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    log('✅', `Admin user created: ${cred.user.email}`);
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      log('ℹ️ ', `Admin user already exists: ${ADMIN_EMAIL} — skipping`);
      // Sign in to continue
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    } else if (e.code === 'auth/operation-not-allowed') {
      err('Email/Password Auth is NOT enabled in Firebase Console!');
      err('→ Go to: https://console.firebase.google.com/project/portfolio-ae955/authentication/providers');
      err('→ Enable Email/Password provider, then re-run this script.');
      process.exit(1);
    } else {
      err(`Failed to create user: ${e.message}`);
      process.exit(1);
    }
  }

  // 2. Seed About
  console.log('\nStep 2: Seeding About section...');
  try {
    await setDoc(doc(db, 'about', 'main'), aboutData);
    log('✅', 'About section saved to Firestore');
  } catch (e) {
    err(`About seed failed: ${e.message}`);
  }

  // 3. Seed Skills
  console.log('\nStep 3: Seeding Skills...');
  try {
    // Clear existing
    const existing = await getDocs(collection(db, 'skills'));
    for (const d of existing.docs) await deleteDoc(d.ref);
    // Add fresh
    for (const skill of skillsData) {
      await addDoc(collection(db, 'skills'), skill);
    }
    log('✅', `${skillsData.length} skills added to Firestore`);
  } catch (e) {
    err(`Skills seed failed: ${e.message}`);
  }

  // 4. Seed Projects
  console.log('\nStep 4: Seeding Projects...');
  try {
    // Fetch existing titles to avoid duplicates
    const existingSnap = await getDocs(collection(db, 'projects'));
    const existingTitles = new Set(
      existingSnap.docs.map((d) => d.data().title?.trim().toLowerCase())
    );

    let added = 0;
    let skipped = 0;
    for (const project of projectsData) {
      const key = project.title.trim().toLowerCase();
      if (!existingTitles.has(key)) {
        await addDoc(collection(db, 'projects'), project);
        added++;
      } else {
        skipped++;
      }
    }
    if (added > 0) log('✅', `${added} project(s) added to Firestore`);
    if (skipped > 0) log('ℹ️ ', `${skipped} project(s) already existed — skipped`);
  } catch (e) {
    err(`Projects seed failed: ${e.message}`);
    if (e.code === 'permission-denied') {
      err('Firestore rules blocked write. Enable test mode:');
      err('→ https://console.firebase.google.com/project/portfolio-ae955/firestore/rules');
    }
  }

  console.log('\n══════════════════════════════════════════');
  console.log('✨  Seeding Complete!\n');
  console.log('   Admin Login:');
  console.log(`   Email    →  ${ADMIN_EMAIL}`);
  console.log(`   Password →  ${ADMIN_PASSWORD}`);
  console.log('\n   Admin Panel:  http://localhost:5174');
  console.log('   Portfolio:    http://localhost:5173');
  console.log('══════════════════════════════════════════\n');

  process.exit(0);
}

seed().catch((e) => {
  err(`Unexpected error: ${e.message}`);
  process.exit(1);
});
