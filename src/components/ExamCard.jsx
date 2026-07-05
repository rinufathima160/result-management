import { Link } from "react-router-dom";
import "./ExamCard.css";

export default function ExamCard({ exam, to }) {
  return (
    <Link to={to} className="exam-card">
      <div className="exam-card-body">
        <h4 className="exam-title">{exam.name}</h4>
      </div>
    </Link>
  );
}