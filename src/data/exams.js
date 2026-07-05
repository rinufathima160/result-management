// Mock examination catalogue.
// In production this collection would be served from
// GET /api/exams (Node + Express + MongoDB).
export const exams = [
  {
    id: 'final',
    name: 'Final Examination',
    session: '2025 - 2026',
    date: '2026-03-18',
    order: 4,
    description: 'Annual promotion examination covering the full year syllabus.',
  },
  {
    id: 'mid3',
    name: 'Mid Term 3',
    session: '2025 - 2026',
    date: '2026-01-22',
    order: 3,
    description: 'Third periodic assessment for classes 8 through 10.',
  },
  {
    id: 'mid2',
    name: 'Mid Term 2',
    session: '2025 - 2026',
    date: '2025-11-12',
    order: 2,
    description: 'Second periodic assessment for classes 8 through 10.',
  },
  {
    id: 'mid1',
    name: 'Mid Term 1',
    session: '2025 - 2026',
    date: '2025-09-08',
    order: 1,
    description: 'First periodic assessment for classes 8 through 10.',
  },
];

export const classList = ['8', '9', '10'];
export const divisionList = ['A', 'B', 'C'];

export function getExamById(examId) {
  return exams.find((e) => e.id === examId);
}

// Sorted newest examination first, used on the Admin Dashboard.
export function getExamsNewestFirst() {
  return [...exams].sort((a, b) => b.order - a.order);
}
