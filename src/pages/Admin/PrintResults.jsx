import { buildResultSummary } from '../../utils/gradeUtils';
import SchoolSeal from '../../components/SchoolSeal';
import { schoolProfile } from '../../data/schoolInfo';

export default function PrintResults({ exam, classId, division, table }) {
  function handlePrint() {
    window.print();
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 no-print">
        <div>
          <h2 className="panel-title">Print Division Results</h2>
          <p className="panel-subtitle">
            {exam.name} &middot; Class {classId} &ndash; Division {division}
          </p>
        </div>
        <button className="btn btn-navy" onClick={handlePrint}>
          <i className="bi bi-printer me-1" aria-hidden="true"></i>
          Print Division Results
        </button>
      </div>

      <div className="print-area">
        <div className="d-flex align-items-center gap-2 mb-2 d-print-flex">
          <SchoolSeal size={38} />
          <div>
            <strong>{schoolProfile.name}</strong>
            <div className="small text-muted">
              {exam.name} &middot; Class {classId} - Division {division}
            </div>
          </div>
        </div>
        <hr className="ledger-rule full" />

        <div className="table-responsive">
          <table className="table result-table align-middle">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th className="text-end">Total</th>
                <th className="text-end">Percentage</th>
                <th className="text-end">Grade</th>
                <th className="text-end">Status</th>
              </tr>
            </thead>
            <tbody>
              {table.students.map((student) => {
                const { total, percentage, grade, pass } = buildResultSummary(
                  student.marks,
                  table.maxMarksPerSubject
                );
                return (
                  <tr key={student.roll}>
                    <td className="mono">{student.roll}</td>
                    <td>{student.name}</td>
                    <td className="text-end mono">{total}</td>
                    <td className="text-end mono">{percentage}%</td>
                    <td className="text-end mono">{grade}</td>
                    <td className="text-end">
                      <span className={`status-badge ${pass ? 'pass' : 'fail'}`}>
                        {pass ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {table.students.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No students recorded for this class and division yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
