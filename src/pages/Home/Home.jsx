import { exams } from '../../data/exams';
import { schoolProfile, notices, newsItems, upcomingEvents } from '../../data/schoolInfo';
import ExamCard from '../../components/ExamCard';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* HERO */}
      

      

      {/* RESULTS */}
      <section id="results" className="section results-section">
        <div className="container-page">
          <span className="eyebrow">Examination Office</span>
          <h2 className="section-heading">Check Your Result</h2>
          <hr className="ledger-rule" />
          <p className="section-intro">
            Select the examination below to search for a result by class, division and roll
            number.
          </p>
          <div className="exam-list">
  {exams.map((exam) => (
    <ExamCard
      key={exam.id}
      exam={exam}
      to={`/results/${exam.id}`}
    />
  ))}
</div>
        </div>
      </section>

      
    </>
  );
}
