import { useState } from 'react';
import { updateStudentMarks } from '../../utils/resultTablesStore';
import { buildResultSummary } from '../../utils/gradeUtils';

export default function UpdateTable({ examId, classId, division, table, onSaved }) {
  const [editingRoll, setEditingRoll] = useState(null);
  const [draftMarks, setDraftMarks] = useState({});
  const [message, setMessage] = useState('');

  function startEdit(student) {
    setEditingRoll(student.roll);
    setDraftMarks({ ...student.marks });
    setMessage('');
  }

  function cancelEdit() {
    setEditingRoll(null);
    setDraftMarks({});
  }

  function handleChange(subject, value) {
    setDraftMarks((m) => ({ ...m, [subject]: value }));
  }

  function saveEdit(roll) {
    const numericMarks = {};
    for (const subject of table.subjects) {
      numericMarks[subject] = Number(draftMarks[subject]) || 0;
    }
    updateStudentMarks(examId, classId, division, roll, numericMarks);
    setEditingRoll(null);
    onSaved();
    setMessage(`Marks updated for Roll ${roll}.`);
  }

  if (table.students.length === 0) {
    return (
      <div>
        <h2 className="panel-title">Update Old Table</h2>
        <p className="text-muted">No students recorded yet. Add students first from &ldquo;Add Student Marks&rdquo;.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="panel-title">Update Old Table</h2>
      <p className="panel-subtitle">
        Class {classId} &ndash; Division {division} &middot; subjects loaded automatically from
        the existing table
      </p>

      {message && <div className="alert-success">{message}</div>}

      <div className="table-responsive">
        <table className="table update-table align-middle">
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              {table.subjects.map((s) => (
                <th key={s} className="text-end">{s}</th>
              ))}
              <th className="text-end">%</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {table.students.map((student) => {
              const isEditing = editingRoll === student.roll;
              const { percentage } = buildResultSummary(student.marks, table.maxMarksPerSubject);
              return (
                <tr key={student.roll}>
                  <td className="mono">{student.roll}</td>
                  <td>{student.name}</td>
                  {table.subjects.map((subject) => (
                    <td key={subject} className="text-end">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          max={table.maxMarksPerSubject}
                          className="form-control form-control-sm text-end"
                          value={draftMarks[subject]}
                          onChange={(e) => handleChange(subject, e.target.value)}
                        />
                      ) : (
                        <span className="mono">{student.marks[subject]}</span>
                      )}
                    </td>
                  ))}
                  <td className="text-end mono">{percentage}%</td>
                  <td className="text-end">
                    {isEditing ? (
                      <div className="d-flex gap-1 justify-content-end">
                        <button className="btn btn-sm btn-navy" onClick={() => saveEdit(student.roll)}>
                          Save
                        </button>
                        <button className="btn btn-sm btn-outline-navy" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-outline-navy" onClick={() => startEdit(student)}>
                        <i className="bi bi-pencil" aria-hidden="true"></i> Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
