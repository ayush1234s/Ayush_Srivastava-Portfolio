// ============================================
// Cleanup Script — Remove duplicate projects
// Keeps one of each project title, deletes rest
// Run: node cleanup.mjs (from Portfolio/client/)
// ============================================

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVi7oTXlAOWA7QZ89cOYT18F4JZ3EC_z0',
  authDomain: 'portfolio-ae955.firebaseapp.com',
  projectId: 'portfolio-ae955',
  storageBucket: 'portfolio-ae955.firebasestorage.app',
  messagingSenderId: '972141777497',
  appId: '1:972141777497:web:d59b1b8703bac6a6ce1748',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanup() {
  console.log('\n🧹  Duplicate Project Cleanup');
  console.log('════════════════════════════\n');

  const q = query(collection(db, 'projects'), orderBy('order'));
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  console.log(`Found ${all.length} project documents total.\n`);

  // Group by title — keep FIRST occurrence, delete the rest
  const seen = {};
  const toDelete = [];

  for (const project of all) {
    const key = project.title?.trim().toLowerCase();
    if (!key) continue;
    if (seen[key]) {
      toDelete.push(project);
    } else {
      seen[key] = project;
    }
  }

  if (toDelete.length === 0) {
    console.log('✅  No duplicates found! Everything looks clean.\n');
    process.exit(0);
  }

  console.log(`Found ${toDelete.length} duplicate(s) to remove:`);
  for (const p of toDelete) {
    console.log(`  - "${p.title}" (id: ${p.id})`);
  }

  console.log('\nDeleting duplicates...');
  for (const p of toDelete) {
    await deleteDoc(doc(db, 'projects', p.id));
    console.log(`  🗑️  Deleted: "${p.title}"`);
  }

  const remaining = Object.keys(seen).length;
  console.log(`\n✅  Done! ${remaining} unique projects remain in Firestore.\n`);
  process.exit(0);
}

cleanup().catch((e) => {
  console.error(`\n❌  Error: ${e.message}\n`);
  process.exit(1);
});
