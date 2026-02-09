import { useState } from 'react';
import { Agent } from '../types';
import SearchBar from '../components/SearchBar';

interface HomeProps {
  agents: Agent[];
  onNavigate: (agentId?: string) => void;
  onCreate: () => void;
}

export default function Home({ agents, onNavigate, onCreate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const insiderCount = agents.filter(a => a.category === 'insider_threat').length;
  const outsiderCount = agents.filter(a => a.category === 'outsider_threat').length;
  const otherCount = agents.filter(a => a.category === 'other').length;

  const stats = [
    { label: 'Insider Threat', count: insiderCount },
    { label: 'Outsider Threat', count: outsiderCount },
    { label: 'Other', count: otherCount },
    { label: 'Total Agents', count: agents.length },
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Red Team Agent Hub</h1>
          <p className="page-subtitle">
            Explore and analyze threat agent profiles for physical red team operations.
          </p>
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <div className="search-section">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search agents..."
          />
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <h3 className="stat-card-label">{stat.label}</h3>
              <p className="stat-card-number">{stat.count}</p>
            </div>
          ))}
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <div className="quick-actions">
          <h2>Actions</h2>
          <button onClick={onCreate} className="btn-primary">
            Create New Agent
          </button>
        </div>

        <div className="divider-line mt-lg mb-lg" />

        {filteredAgents.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">
              {agents.length === 0 
                ? 'No agents yet. Create one to get started.' 
                : `No agents found matching "${searchQuery}"`}
            </p>
          </div>
        ) : (
          <div className="agents-list">
            <h2>Agents ({filteredAgents.length})</h2>
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="agent-item">
                <div className="agent-item-content" onClick={() => onNavigate(agent.id)}>
                  <h4>{agent.name}</h4>
                  <p className="agent-role">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
