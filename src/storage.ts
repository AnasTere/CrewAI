import { Agent } from './types';

const STORAGE_KEY = 'redteam_agents';

const DEFAULT_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Malicious Insider',
    role: 'System Administrator',
    goal: 'Compromise critical infrastructure and establish persistent access',
    backstory: 'A disgruntled IT administrator with deep knowledge of the organization\'s infrastructure who seeks to sabotage systems for personal gain.',
    category: 'insider_threat',
    description: 'Intentional threat actor with administrative privileges',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: '2',
    name: 'Negligent Insider',
    role: 'Data Analyst',
    goal: 'Accidentally expose sensitive data through careless practices',
    backstory: 'A well-intentioned employee who lacks security awareness and frequently violates data handling protocols.',
    category: 'insider_threat',
    description: 'Unintentional threat actor due to lack of security training',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: '3',
    name: 'Corporate Spy',
    role: 'Contractor',
    goal: 'Steal intellectual property and competitive intelligence',
    backstory: 'A contract worker hired by a competitor to gather proprietary information and trade secrets.',
    category: 'insider_threat',
    description: 'Espionage threat actor with external motivation',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: '4',
    name: 'Opportunistic Burglar',
    role: 'Physical Intruder',
    goal: 'Steal valuable equipment and access restricted areas',
    backstory: 'A criminal opportunist who targets facilities for theft of hardware, devices, and sensitive documents.',
    category: 'outsider_threat',
    description: 'External threat focused on physical theft',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: '5',
    name: 'Organized Crime Member',
    role: 'Criminal Network Operative',
    goal: 'Infiltrate systems for financial fraud and data theft',
    backstory: 'Part of a sophisticated criminal organization conducting targeted attacks on financial institutions.',
    category: 'outsider_threat',
    description: 'Organized external threat with significant resources',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: '6',
    name: 'Substance Abuser',
    role: 'Disgruntled Employee',
    goal: 'Access systems while impaired to cause chaos',
    backstory: 'An employee struggling with substance abuse who may inadvertently or intentionally cause security incidents.',
    category: 'other',
    description: 'Unpredictable threat actor with impaired judgment',
    createdAt: Date.now() - 86400000 * 2,
  },
];

export function loadAgents(): Agent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load agents from storage:', error);
  }
  return DEFAULT_AGENTS;
}

export function saveAgents(agents: Agent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  } catch (error) {
    console.error('Failed to save agents to storage:', error);
  }
}

export function addAgent(agent: Omit<Agent, 'id' | 'createdAt'>): Agent {
  const agents = loadAgents();
  const newAgent: Agent = {
    ...agent,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  agents.push(newAgent);
  saveAgents(agents);
  return newAgent;
}

export function getAgent(id: string): Agent | undefined {
  const agents = loadAgents();
  return agents.find(a => a.id === id);
}

export function updateAgent(id: string, updates: Partial<Agent>): Agent | undefined {
  const agents = loadAgents();
  const index = agents.findIndex(a => a.id === id);
  if (index !== -1) {
    agents[index] = { ...agents[index], ...updates };
    saveAgents(agents);
    return agents[index];
  }
  return undefined;
}

export function deleteAgent(id: string): boolean {
  const agents = loadAgents();
  const filtered = agents.filter(a => a.id !== id);
  if (filtered.length < agents.length) {
    saveAgents(filtered);
    return true;
  }
  return false;
}

export function getAgentsByCategory(category: string): Agent[] {
  const agents = loadAgents();
  return agents.filter(a => a.category === category);
}
