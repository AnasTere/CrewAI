import { useState, useEffect } from 'react';
import { Agent } from './types';
import { loadAgents, saveAgents } from './storage';
import Home from './pages/Home';
import AgentDetail from './pages/AgentDetail';
import CreateAgent from './pages/CreateAgent';
import './index.css';

type Page = 'home' | 'agent' | 'create';

interface PageState {
  page: Page;
  agentId?: string;
}

export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [pageState, setPageState] = useState<PageState>({ page: 'home' });

  useEffect(() => {
    setAgents(loadAgents());
  }, []);

  useEffect(() => {
    saveAgents(agents);
  }, [agents]);

  const navigateTo = (page: Page, agentId?: string) => {
    setPageState({ page, agentId });
    window.scrollTo(0, 0);
  };

  const handleCreateAgent = (newAgent: Omit<Agent, 'id' | 'createdAt'>) => {
    const agent: Agent = {
      ...newAgent,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setAgents([...agents, agent]);
    navigateTo('agent', agent.id);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
    navigateTo('home');
  };

  const handleUpdateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(agents.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {pageState.page === 'home' && (
          <Home 
            agents={agents}
            onNavigate={(agentId?: string) => navigateTo('agent', agentId)}
            onCreate={() => navigateTo('create')}
          />
        )}
        
        {pageState.page === 'agent' && pageState.agentId && (
          <AgentDetail 
            agent={agents.find(a => a.id === pageState.agentId)}
            onNavigate={() => navigateTo('home')}
            onDelete={handleDeleteAgent}
          />
        )}
        
        {pageState.page === 'create' && (
          <CreateAgent 
            onNavigate={() => navigateTo('home')}
            onCreate={handleCreateAgent}
          />
        )}
      </main>
    </div>
  );
}
