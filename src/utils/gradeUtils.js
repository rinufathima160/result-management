// Centralised grading rules. Kept as pure functions so a future backend
// can reuse the exact same logic (e.g. copy into a Mongoose virtual
// or an Express service) without behaviour drifting between client and server.

const PASS_MARK = 35;

export function calcTotal(marks = {}) {
  return Object.values(marks).reduce((sum, m) => sum + (Number(m) || 0), 0);
}

export function calcPercentage(marks = {}, maxMarksPerSubject = 100) {
  const subjectCount = Object.keys(marks).length;
  if (subjectCount === 0) return 0;
  const total = calcTotal(marks);
  const maxTotal = subjectCount * maxMarksPerSubject;
  return Math.round((total / maxTotal) * 10000) / 100; // 2 decimal places
}

export function calcGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= PASS_MARK) return 'E';
  return 'F';
}

export function isPassing(marks = {}) {
  const hasFailedSubject = Object.values(marks).some((m) => Number(m) < PASS_MARK);
  const percentage = calcPercentage(marks);
  return !hasFailedSubject && percentage >= PASS_MARK;
}

export function buildResultSummary(marks, maxMarksPerSubject = 100) {
  const total = calcTotal(marks);
  const percentage = calcPercentage(marks, maxMarksPerSubject);
  const grade = calcGrade(percentage);
  const pass = isPassing(marks);
  return { total, percentage, grade, pass };
}
