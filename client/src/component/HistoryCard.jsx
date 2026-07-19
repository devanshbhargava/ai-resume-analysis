import "./HistoryCard.css";

const HistoryCard = ({ item, onView, onDelete }) => {
  const analysis = item.analysis || {};

  const ats =
    analysis.ats?.ats_score ??
    analysis.ats?.score ??
    analysis.atsScore ??
    0;

  const name =
    analysis.resume?.name ||
    analysis.name ||
    "Unknown Candidate";

  const email =
    analysis.resume?.email ||
    analysis.email ||
    "No Email";

  return (
    <div className="history-card">

      <div className="history-header">

        <div>
          <h3>{name}</h3>
          <p>{email}</p>
        </div>

        <div className="score-badge">
          {ats}%
        </div>

      </div>

      <div className="history-date">
        {new Date(item.createdAt).toLocaleString()}
      </div>

      <div className="history-buttons">

        <button
          className="view-btn"
          onClick={() => onView(item._id)}
        >
          View Analysis
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default HistoryCard;