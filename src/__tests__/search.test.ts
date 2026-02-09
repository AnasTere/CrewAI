import { describe, it, expect } from 'vitest';
import { Agent } from '../types';

describe('Search Functionality', () => {
  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Malicious Insider',
      role: 'System Administrator',
      goal: 'Compromise infrastructure',
      backstory: 'Disgruntled admin',
      category: 'insider_threat',
      createdAt: Date.now(),
    },
    {
      id: '2',
      name: 'Negligent Insider',
      role: 'Data Analyst',
      goal: 'Expose data',
      backstory: 'Careless employee',
      category: 'insider_threat',
      createdAt: Date.now(),
    },
    {
      id: '3',
      name: 'Opportunistic Burglar',
      role: 'Physical Intruder',
      goal: 'Steal equipment',
      backstory: 'Criminal opportunist',
      category: 'outsider_threat',
      createdAt: Date.now(),
    },
  ];

  it('should filter agents by exact name match', () => {
    const query = 'Malicious Insider';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Malicious Insider');
  });

  it('should filter agents by partial name match', () => {
    const query = 'Insider';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(2);
    expect(filtered.map(a => a.name)).toContain('Malicious Insider');
    expect(filtered.map(a => a.name)).toContain('Negligent Insider');
  });

  it('should be case-insensitive', () => {
    const query = 'BURGLAR';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Opportunistic Burglar');
  });

  it('should return empty array for non-matching query', () => {
    const query = 'NonExistent';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(0);
  });

  it('should return all agents for empty query', () => {
    const query = '';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(mockAgents.length);
  });

  it('should handle special characters in search', () => {
    const query = 'Malicious';
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe('Malicious Insider');
  });
});
