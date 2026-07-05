// Data access layer for result tables.
//
// Today this reads the seed data in `src/data/mockResults.js` and persists
// admin edits to localStorage, so the demo behaves statefully across page
// reloads with no backend at all.
//
// Every function here maps directly onto a future REST endpoint:
//   getTable(examId, cls, div)        -> GET    /api/results/:examId/:class/:division
//   createTable(examId, cls, div, ..) -> POST   /api/results/:examId/:class/:division
//   addStudent(examId, cls, div, ..)  -> POST   /api/results/:examId/:class/:division/students
//   updateStudent(..)                 -> PUT    /api/results/:examId/:class/:division/students/:roll
//
// Swapping localStorage for `fetch()` calls later will not require touching
// any page component, since pages only ever call these functions.

import { seedResultTables } from '../data/mockResults';

const STORAGE_PREFIX = 'srm_table_';

function keyFor(examId, classId, division) {
  return `${examId}_${classId}_${division}`;
}

function loadFromLocalStorage(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToLocalStorage(key, table) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(table));
}

export function getTable(examId, classId, division) {
  const key = keyFor(examId, classId, division);
  const stored = loadFromLocalStorage(key);
  if (stored) return stored;
  if (seedResultTables[key]) return seedResultTables[key];
  return null;
}

export function tableExists(examId, classId, division) {
  return Boolean(getTable(examId, classId, division));
}

export function createTable(examId, classId, division, subjects, maxMarksPerSubject = 100) {
  const key = keyFor(examId, classId, division);
  const table = { subjects, maxMarksPerSubject, students: [] };
  saveToLocalStorage(key, table);
  return table;
}

export function addStudent(examId, classId, division, student) {
  const key = keyFor(examId, classId, division);
  const table = getTable(examId, classId, division);
  if (!table) throw new Error('No table exists for this class and division.');
  const updated = {
    ...table,
    students: [...table.students.filter((s) => s.roll !== student.roll), student],
  };
  saveToLocalStorage(key, updated);
  return updated;
}

export function updateStudentMarks(examId, classId, division, roll, marks) {
  const key = keyFor(examId, classId, division);
  const table = getTable(examId, classId, division);
  if (!table) throw new Error('No table exists for this class and division.');
  const updated = {
    ...table,
    students: table.students.map((s) => (s.roll === roll ? { ...s, marks } : s)),
  };
  saveToLocalStorage(key, updated);
  return updated;
}

export function findStudent(examId, classId, division, roll) {
  const table = getTable(examId, classId, division);
  if (!table) return null;
  const student = table.students.find((s) => String(s.roll) === String(roll));
  if (!student) return null;
  return { student, subjects: table.subjects, maxMarksPerSubject: table.maxMarksPerSubject };
}
