import { getExamsNewestFirst } from '../../data/exams';
import ExamCard from '../../components/ExamCard';

export default function AdminDashboard() {
  const exams = getExamsNewestFirst();

  return (
    <div>
      <span className="eyebrow">Result Management Console</span>
      <h1 className="section-heading">Examinations</h1>
      <hr className="ledger-rule" />
      <p className="text-muted mb-4" style={{ maxWidth: 640 }}>
        Select an examination to manage class-wise result tables: create new tables, enter
        marks, update existing records, or print division-wise result sheets.
      </p>

      <div className="row g-4">
        {exams.map((exam) => (
          <div className="col-sm-6 col-lg-3" key={exam.id}>
            <ExamCard exam={exam} to={`/admin/manage/${exam.id}`} footerLabel="Manage" />
          </div>
        ))}
      </div>
    </div>
  );
}
