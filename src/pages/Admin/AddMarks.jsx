import { useState } from 'react';
import { addStudent } from '../../utils/resultTablesStore';

function emptyMarks(subjects) {
  return subjects.reduce((acc, s) => ({ ...acc, [s]: '' }), {});
}

export default function AddMarks({ examId, classId, division, table, onSaved }) {
  const [roll, setRoll] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState(emptyMarks(table.subjects));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleMarkChange(subject, value) {
    setMarks((m) => ({ ...m, [subject]: value }));
  }

  function handleReset() {
    setRoll('');
    setName('');
    setMarks(emptyMarks(table.subjects));
    setMessage('');
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!roll.trim() || !name.trim()) {
      setError('Roll number and student name are required.');
      return;
    }
    const numericMarks = {};
    for (const subject of table.subjects) {
      const val = Number(marks[subject]);
      if (marks[subject] === '' || Number.isNaN(val) || val < 0 || val > table.maxMarksPerSubject) {
        setError(`Enter a valid mark for ${subject} (0\u2013${table.maxMarksPerSubject}).`);
        return;
      }
      numericMarks[subject] = val;
    }
    setError('');
    const savedName = name.trim();
    const savedRoll = roll.trim();
    addStudent(examId, classId, division, { roll: savedRoll, name: savedName, marks: numericMarks });
    onSaved();
    handleReset();
    setMessage(`Marks saved for ${savedName} (Roll ${savedRoll}).`);
  }

  return (
    <div>
      <h2 className="panel-title">Add Student Marks</h2>
      <p className="panel-subtitle">
        Class {classId} &ndash; Division {division} &middot; {table.subjects.length} subjects
      </p>

      {error && <div className="alert-error">{error}</div>}
      {message && <div className="alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-2">
          <div className="col-sm-6 col-md-3">
            <label className="form-label" htmlFor="rollNo">Roll Number</label>
            <input
              id="rollNo"
              type="text"
              className="form-control"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-6 col-md-5">
            <label className="form-label" htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <hr className="ledger-rule full" />

        <div className="row g-3">
          {table.subjects.map((subject) => (
            <div className="col-sm-6 col-md-4" key={subject}>
              <label className="form-label" htmlFor={`marks-${subject}`}>
                {subject}{' '}
                <span className="text-muted fw-normal">(/ {table.maxMarksPerSubject})</span>
              </label>
              <input
                id={`marks-${subject}`}
                type="number"
                min="0"
                max={table.maxMarksPerSubject}
                className="form-control"
                value={marks[subject]}
                onChange={(e) => handleMarkChange(subject, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-navy">
            <i className="bi bi-person-plus me-1" aria-hidden="true"></i>
            Add Student
          </button>
          <button type="button" className="btn btn-outline-navy" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
