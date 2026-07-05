import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getExamById, classList, divisionList } from '../../data/exams';
import { getTable } from '../../utils/resultTablesStore';
import CreateTable from './CreateTable';
import AddMarks from './AddMarks';
import UpdateTable from './UpdateTable';
import PrintResults from './PrintResults';
import './AdminManage.css';

const ACTIONS = [
  {
    key: 'create',
    icon: 'bi-table',
    title: 'Create New Table',
    desc: 'Set up subjects for this class and division before entering marks.',
  },
  {
    key: 'add',
    icon: 'bi-person-plus',
    title: 'Add Student Marks',
    desc: 'Enter a new student\u2019s roll number, name and subject marks.',
  },
  {
    key: 'update',
    icon: 'bi-pencil-square',
    title: 'Update Old Table',
    desc: 'Edit marks already recorded for existing students.',
  },
  {
    key: 'print',
    icon: 'bi-printer',
    title: 'Print Division Results',
    desc: 'View and print the full result sheet for this class and division.',
  },
];

export default function AdminManage() {
  const { examId } = useParams();
  const exam = getExamById(examId);

  const [classId, setClassId] = useState('');
  const [division, setDivision] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!exam) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const table = classId && division ? getTable(examId, classId, division) : null;
  const selectionMade = Boolean(classId && division);

  function handleSelectionChange(setter) {
    return (e) => {
      setter(e.target.value);
      setActiveAction(null);
    };
  }

  function refreshTable() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <div>
      <span className="eyebrow">{exam.session}</span>
      <h1 className="section-heading">{exam.name} &mdash; Manage Results</h1>
      <hr className="ledger-rule" />

      <div className="card-office mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-sm-6 col-md-4">
            <label className="form-label" htmlFor="mClass">Select Class</label>
            <select
              id="mClass"
              className="form-select"
              value={classId}
              onChange={handleSelectionChange(setClassId)}
            >
              <option value="" disabled>Choose class</option>
              {classList.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-6 col-md-4">
            <label className="form-label" htmlFor="mDivision">Select Division</label>
            <select
              id="mDivision"
              className="form-select"
              value={division}
              onChange={handleSelectionChange(setDivision)}
            >
              <option value="" disabled>Choose division</option>
              {divisionList.map((d) => (
                <option key={d} value={d}>Division {d}</option>
              ))}
            </select>
          </div>
        </div>

        {selectionMade && (
          <div className="table-status" key={refreshKey}>
            {table ? (
              <span className="status-line status-exists">
                <i className="bi bi-check-circle me-2" aria-hidden="true"></i>
                Table exists &mdash; {table.subjects.length} subjects, {table.students.length}{' '}
                students recorded for Class {classId}-{division}.
              </span>
            ) : (
              <span className="status-line status-missing">
                <i className="bi bi-exclamation-circle me-2" aria-hidden="true"></i>
                No table exists for Class {classId}-{division}. Create one to begin.
              </span>
            )}
          </div>
        )}
      </div>

      {selectionMade && (
        <>
          <div className="row g-3 mb-4">
            {ACTIONS.map((action) => {
              const disabled =
                (action.key === 'add' || action.key === 'update' || action.key === 'print') &&
                !table;
              return (
                <div className="col-sm-6 col-lg-3" key={action.key}>
                  <button
                    className={`action-card ${activeAction === action.key ? 'active' : ''}`}
                    onClick={() => setActiveAction(action.key)}
                    disabled={disabled}
                    type="button"
                  >
                    <i className={`bi ${action.icon}`} aria-hidden="true"></i>
                    <span className="action-card-title">{action.title}</span>
                    <span className="action-card-desc">{action.desc}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="action-panel">
            {activeAction === 'create' && (
              <CreateTable
                examId={examId}
                classId={classId}
                division={division}
                existingTable={table}
                onCreated={() => {
                  refreshTable();
                  setActiveAction('add');
                }}
              />
            )}
            {activeAction === 'add' && table && (
              <AddMarks
                examId={examId}
                classId={classId}
                division={division}
                table={table}
                onSaved={refreshTable}
              />
            )}
            {activeAction === 'update' && table && (
              <UpdateTable
                examId={examId}
                classId={classId}
                division={division}
                table={table}
                onSaved={refreshTable}
              />
            )}
            {activeAction === 'print' && table && (
              <PrintResults exam={exam} classId={classId} division={division} table={table} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
