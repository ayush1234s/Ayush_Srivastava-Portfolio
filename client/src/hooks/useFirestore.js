import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Default fallback data (shown before Firestore loads or if not configured)
export const DEFAULT_ABOUT = {
  bio: `I'm a B.Tech student in Electronics and Communication Engineering and a passionate developer who enjoys building clean UI, fun web apps, and visually attractive projects that stand out from normal templates. I'm particularly interested in IoT and Embedded Systems, combining my engineering background with modern development practices.`,
  tagline: 'IoT + Embedded / Full Stack Developer',
};

export const DEFAULT_SKILLS = [
  { id: '1', name: 'Embedded Systems', percentage: 75, order: 1 },
  { id: '2', name: 'React', percentage: 100, order: 2 },
  { id: '3', name: 'Git / GitHub', percentage: 100, order: 3 },
  { id: '4', name: 'HTML / CSS / JavaScript', percentage: 90, order: 4 },
];

export const DEFAULT_PROJECTS = [
  {
    id: 'p1',
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
    id: 'p2',
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
    id: 'p3',
    title: 'Visualize LeetCode',
    shortDesc: 'DSA learning & revision platform that visually explains algorithms and data structures.',
    description: 'Visualize LeetCode | DSA Learning & Revision Platform — interactive visual explanations of LeetCode problems.',
    tags: ['React', 'DSA', 'Algorithms', 'Visualization'],
    githubUrl: 'https://github.com/ayush1234s/visualiseleetcode',
    liveUrl: 'https://visualiseleetcode.vercel.app/',
    thumbnailUrl: '',
    emoji: '💡',
    featured: false,
    order: 3,
  },
  {
    id: 'p4',
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
    id: 'p5',
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
    id: 'p6',
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
    id: 'p7',
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

// ── Hooks ──────────────────────────────────────────────

export const useAbout = () => {
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(doc(db, 'about', 'main'), (snap) => {
        if (snap.exists()) setAbout({ ...DEFAULT_ABOUT, ...snap.data() });
        setLoading(false);
      }, () => setLoading(false));
      return unsubscribe;
    } catch {
      setLoading(false);
    }
  }, []);

  return { about, loading };
};

export const useSkills = () => {
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, 'skills'), orderBy('order'));
      const unsubscribe = onSnapshot(q, (snap) => {
        if (!snap.empty) {
          setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
      }, () => setLoading(false));
      return unsubscribe;
    } catch {
      setLoading(false);
    }
  }, []);

  return { skills, loading };
};

export const useProjects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, 'projects'), orderBy('order'));
      const unsubscribe = onSnapshot(q, (snap) => {
        if (!snap.empty) {
          setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
      }, () => setLoading(false));
      return unsubscribe;
    } catch {
      setLoading(false);
    }
  }, []);

  return { projects, loading };
};
