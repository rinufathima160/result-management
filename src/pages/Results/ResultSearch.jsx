import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getExamById, classList, divisionList } from '../../data/exams';
import { findStudent } from '../../utils/resultTablesStore';
import ResultSlip from '../../components/ResultSlip';
import './ResultSearch.css';

export default function ResultSearch() {
  const { examId } = useParams();
  const exam = getExamById(examId);

  const [form, setForm] = useState({ classId: '', division: '', roll: '' });
  const [result, setResult] = useState(null); // { student, subjects, maxMarksPerSubject } | 'not-found' | null

  if (!exam) {
    return <Navigate to="/" replace />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.classId || !form.division || !form.roll.trim()) return;
    const found = findStudent(exam.id, form.classId, form.division, form.roll.trim());
    setResult(found || 'not-found');
  }

  function handlePrint() {
    window.print();
  }

  return (
    <section className="result-search-page">
      <div className="container-page">
        <nav aria-label="breadcrumb" className="no-print">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{exam.name} Results</li>
          </ol>
        </nav>

        <span className="eyebrow no-print">Examination Office</span>
        <h1 className="section-heading no-print">{exam.name} Results</h1>
        <hr className="ledger-rule no-print" />

        <div className="card-office search-form-card no-print">
          <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
            <div className="col-sm-6 col-lg-3">
              <label className="form-label" htmlFor="classId">Select Class</label>
              <select
                id="classId"
                name="classId"
                className="form-select"
                value={form.classId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choose class</option>
                {classList.map((c) => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="form-label" htmlFor="division">Select Division</label>
              <select
                id="division"
                name="division"
                className="form-select"
                value={form.division}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choose division</option>
                {divisionList.map((d) => (
                  <option key={d} value={d}>Division {d}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="form-label" htmlFor="roll">Roll Number</label>
              <input
                id="roll"
                name="roll"
                type="text"
                className="form-control"
                placeholder="e.g. 12"
                value={form.roll}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <button type="submit" className="btn btn-navy w-100">
                <i className="bi bi-search me-1" aria-hidden="true"></i>
                Get Result
              </button>
            </div>
          </form>
          
        </div>

        {result === 'not-found' && (
          <div className="alert alert-warning-box no-print" role="alert">
            <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
            No Result Found for the class, division and roll number entered.
          </div>
        )}

        {result && result !== 'not-found' && (
          <>
            <ResultSlip
              exam={exam}
              classId={form.classId}
              division={form.division}
              student={result.student}
              subjects={result.subjects}
              maxMarksPerSubject={result.maxMarksPerSubject}
            />
            <div className="result-actions no-print">
              <button className="btn btn-navy" onClick={handlePrint}>
                <i className="bi bi-printer me-1" aria-hidden="true"></i>
                Print Result
              </button>
              
            </div>
          </>
        )}
      </div>
    </section>
  );
}
