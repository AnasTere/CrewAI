import { Agent, CATEGORY_LABELS } from '../types';
import { Trash2, ArrowLeft } from 'lucide-react';

interface AgentDetailProps {
  agent?: Agent;
  onNavigate: () => void;
  onDelete: (id: string) => void;
}

export default function AgentDetail({ agent, onNavigate, onDelete }: AgentDetailProps) {
  if (!agent) {
    return (
      <div className="page-container">
        <div className="container">
          <button onClick={onNavigate} className="back-button">
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <p>Agent not found.</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Delete this agent?')) {
      onDelete(agent.id);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <button onClick={onNavigate} className="back-button">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="agent-detail-header">
          <div>
            <h1>{agent.name}</h1>
            <p className="agent-category">{CATEGORY_LABELS[agent.category]}</p>
          </div>
          <button onClick={handleDelete} className="btn-danger">
            <Trash2 size={18} />
            Delete
          </button>
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <div className="agent-profile">
          <div className="profile-section">
            <h5>Role</h5>
            <p>{agent.role}</p>
          </div>
          <div className="profile-section">
            <h5>Goal</h5>
            <p>{agent.goal}</p>
          </div>
          <div className="profile-section">
            <h5>Created</h5>
            <p>{new Date(agent.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <div className="backstory-section">
          <h5>Backstory</h5>
          <p>{agent.backstory}</p>
        </div>

        {agent.description && (
          <>
            <div className="divider-line mt-lg mb-lg" />
            <div className="description-section">
              <h5>Description</h5>
              <p>{agent.description}</p>
            </div>
          </>
        )}

        {agent.analysis && (
          <>
            <div className="divider-line mt-lg mb-lg" />
            <div className="analysis-section">
              <h2>Analysis</h2>
              <div>{agent.analysis}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
