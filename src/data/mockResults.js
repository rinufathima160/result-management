// Seeded demonstration tables.
// Key format: `${examId}_${classId}_${division}`
// Shape: { subjects: string[], maxMarksPerSubject: number, students: [{roll, name, marks: {subject: number}}] }
//
// This is the shape a Mongo collection `resultTables` would use:
// { examId, class, division, subjects: [...], students: [...] }

export const seedResultTables = {
  mid1_8_A: {
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Computer Science'],
    maxMarksPerSubject: 100,
    students: [
      {
        roll: '1',
        name: 'Aarav Mehta',
        marks: { English: 88, Mathematics: 92, Science: 85, 'Social Studies': 79, 'Computer Science': 95 },
      },
      {
        roll: '2',
        name: 'Diya Kapoor',
        marks: { English: 76, Mathematics: 64, Science: 71, 'Social Studies': 68, 'Computer Science': 82 },
      },
      {
        roll: '3',
        name: 'Kabir Sharma',
        marks: { English: 45, Mathematics: 38, Science: 52, 'Social Studies': 60, 'Computer Science': 55 },
      },
      {
        roll: '4',
        name: 'Ishita Rao',
        marks: { English: 91, Mathematics: 96, Science: 89, 'Social Studies': 90, 'Computer Science': 98 },
      },
      {
        roll: '5',
        name: 'Vihaan Nair',
        marks: { English: 30, Mathematics: 25, Science: 40, 'Social Studies': 33, 'Computer Science': 48 },
      },
    ],
  },
  mid1_9_B: {
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    maxMarksPerSubject: 100,
    students: [
      {
        roll: '1',
        name: 'Neha Joshi',
        marks: { English: 82, Mathematics: 78, Physics: 74, Chemistry: 80, Biology: 88 },
      },
      {
        roll: '2',
        name: 'Rohan Verma',
        marks: { English: 55, Mathematics: 60, Physics: 58, Chemistry: 50, Biology: 62 },
      },
    ],
  },
  final_10_A: {
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    maxMarksPerSubject: 100,
    students: [
      {
        roll: '1',
        name: 'Ananya Iyer',
        marks: { English: 94, Mathematics: 97, Physics: 91, Chemistry: 93, Biology: 89, 'Computer Science': 96 },
      },
      {
        roll: '2',
        name: 'Dev Patel',
        marks: { English: 67, Mathematics: 55, Physics: 60, Chemistry: 58, Biology: 62, 'Computer Science': 70 },
      },
      {
        roll: '3',
        name: 'Sara Khan',
        marks: { English: 28, Mathematics: 32, Physics: 30, Chemistry: 25, Biology: 34, 'Computer Science': 40 },
      },
    ],
  },
};
