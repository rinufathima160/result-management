import { useState } from 'react';
import { createTable } from '../../utils/resultTablesStore';

export default function CreateTable({ examId, classId, division, existingTable, onCreated }) {
  const [subjectCount, setSubjectCount] = useState('');
  const [subjectNames, setSubjectNames] = useState([]);
  const [maxMarks, setMaxMarks] = useState(100);
  const [error, setError] = useState('');

  function handleCountSubmit(e) {
    e.preventDefault();
    const count = parseInt(subjectCount, 10);
    if (!count || count < 1 || count > 12) {
      setError('Enter a number of subjects between 1 and 12.');
      return;
    }
    setError('');
    setSubjectNames(Array.from({ length: count }, () => ''));
  }

  function handleSubjectNameChange(index, value) {
    setSubjectNames((names) => names.map((n, i) => (i === index ? value : n)));
  }

  function handleCreate(e) {
    e.preventDefault();
    if (subjectNames.some((n) => !n.trim())) {
      setError('Please name every subject before creating the table.');
      return;
    }
    createTable(examId, classId, division, subjectNames.map((n) => n.trim()), Number(maxMarks) || 100);
    onCreated();
  }

  return (
    <div>
      <h2 className="panel-title">Create Result Table</h2>
      <p className="panel-subtitle">
        Class {classId} &ndash; Division {division}
        {existingTable && ' (this will replace the current table for this class and division)'}
      </p>

      {error && <div className="alert-error">{error}</div>}

      {subjectNames.length === 0 ? (
        <form className="row g-3 align-items-end" onSubmit={handleCountSubmit}>
          <div className="col-sm-6 col-md-4">
            <label className="form-label" htmlFor="subjectCount">Number of Subjects</label>
            <input
              id="subjectCount"
              type="number"
              min="1"
              max="12"
              className="form-control"
              placeholder="e.g. 5"
              value={subjectCount}
              onChange={(e) => setSubjectCount(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-6 col-md-4">
            <label className="form-label" htmlFor="maxMarks">Maximum Marks per Subject</label>
            <input
              id="maxMarks"
              type="number"
              min="10"
              className="form-control"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
            />
          </div>
          <div className="col-sm-6 col-md-4">
            <button type="submit" className="btn btn-navy">
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCreate}>
          <div className="row g-3">
            {subjectNames.map((name, idx) => (
              <div className="col-sm-6 col-md-4" key={idx}>
                <label className="form-label" htmlFor={`subject-${idx}`}>
                  Subject {idx + 1}
                </label>
                <input
                  id={`subject-${idx}`}
                  type="text"
                  className="form-control"
                  placeholder={`e.g. ${['English', 'Mathematics', 'Science', 'Social Studies', 'Computer Science'][idx] || 'Subject name'}`}
                  value={name}
                  onChange={(e) => handleSubjectNameChange(idx, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-navy">
              <i className="bi bi-table me-1" aria-hidden="true"></i>
              Create Table
            </button>
            <button type="button" className="btn btn-outline-navy" onClick={() => setSubjectNames([])}>
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
