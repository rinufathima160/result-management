import { buildResultSummary } from '../utils/gradeUtils';
import SchoolSeal from './SchoolSeal';
import { schoolProfile } from '../data/schoolInfo';
import './ResultSlip.css';

// Renders one student's mark sheet. Used on the public Result Search page
// and reusable for a future "detailed subject report" print view.
export default function ResultSlip({ exam, classId, division, student, subjects, maxMarksPerSubject = 100 }) {
  const { total, percentage, grade, pass } = buildResultSummary(student.marks, maxMarksPerSubject);
  const maxTotal = subjects.length * maxMarksPerSubject;

  return (
    <div className="result-slip print-area" id="result-slip">
      <div className="result-slip-letterhead">
        <SchoolSeal size={52} />
        <div>
          <h2 className="result-slip-school">{schoolProfile.name}</h2>
          <p className="result-slip-address">{schoolProfile.address}</p>
        </div>
      </div>
      <hr className="ledger-rule full" />

      <div className="result-slip-heading">
        <h3>{exam.name} &mdash; Statement of Marks</h3>
        <span className="eyebrow">Session {exam.session}</span>
      </div>

      <div className="result-slip-meta">
        <div>
          <span className="meta-label">Student Name</span>
          <span className="meta-value">{student.name}</span>
        </div>
        <div>
          <span className="meta-label">Roll Number</span>
          <span className="meta-value mono">{student.roll}</span>
        </div>
        <div>
          <span className="meta-label">Class</span>
          <span className="meta-value">{classId}</span>
        </div>
        <div>
          <span className="meta-label">Division</span>
          <span className="meta-value">{division}</span>
        </div>
      </div>

      <table className="table result-table align-middle">
        <thead>
          <tr>
            <th style={{ width: '3.5rem' }}>#</th>
            <th>Subject</th>
            <th className="text-end">Marks Obtained</th>
            <th className="text-end">Maximum Marks</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, idx) => {
            const marks = Number(student.marks[subject]) || 0;
            const subjectFail = marks < 35;
            return (
              <tr key={subject}>
                <td className="mono">{idx + 1}</td>
                <td>{subject}</td>
                <td className={`text-end mono ${subjectFail ? 'text-danger fw-semibold' : ''}`}>
                  {marks}
                </td>
                <td className="text-end mono">{maxMarksPerSubject}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th className="text-end mono">{total}</th>
            <th className="text-end mono">{maxTotal}</th>
          </tr>
        </tfoot>
      </table>

      <div className="result-slip-summary">
        <div className="summary-item">
          <span className="meta-label">Percentage</span>
          <span className="summary-value mono">{percentage}%</span>
        </div>
        <div className="summary-item">
          <span className="meta-label">Grade</span>
          <span className="summary-value mono">{grade}</span>
        </div>
        <div className="summary-item">
          <span className="meta-label">Result</span>
          <span className={`status-badge ${pass ? 'pass' : 'fail'}`}>
            <i className={`bi ${pass ? 'bi-check-circle' : 'bi-x-circle'}`} aria-hidden="true"></i>
            {pass ? 'Pass' : 'Fail'}
          </span>
        </div>
      </div>

      <p className="result-slip-footnote no-print">
        This is a system-generated statement for demonstration purposes and is not an official
        transcript.
      </p>
    </div>
  );
}
