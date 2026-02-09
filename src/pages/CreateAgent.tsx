import { useState } from 'react';
import { Agent, Category } from '../types';

interface CreateAgentProps {
  onNavigate: () => void;
  onCreate: (agent: Omit<Agent, 'id' | 'createdAt'>) => void;
}

export default function CreateAgent({ onNavigate, onCreate }: CreateAgentProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    goal: '',
    backstory: '',
    description: '',
    category: 'other' as Category,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Agent name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.goal.trim()) newErrors.goal = 'Goal is required';
    if (!formData.backstory.trim()) newErrors.backstory = 'Backstory is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate({
      name: formData.name,
      role: formData.role,
      goal: formData.goal,
      backstory: formData.backstory,
      description: formData.description,
      category: formData.category,
    });
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Create Agent</h1>
          <p>Define a new threat agent profile.</p>
        </div>

        <div className="divider-line mt-lg mb-lg" />

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Agent Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rogue Administrator"
              className={errors.name ? 'form-error' : ''}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., System Administrator"
              className={errors.role ? 'form-error' : ''}
            />
            {errors.role && <p className="error-text">{errors.role}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <textarea
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              rows={4}
              className={errors.goal ? 'form-error' : ''}
            />
            {errors.goal && <p className="error-text">{errors.goal}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="backstory">Backstory</label>
            <textarea
              id="backstory"
              name="backstory"
              value={formData.backstory}
              onChange={handleChange}
              rows={6}
              className={errors.backstory ? 'form-error' : ''}
            />
            {errors.backstory && <p className="error-text">{errors.backstory}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="insider_threat">Insider Threat</option>
              <option value="outsider_threat">Outsider Threat</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="divider-line mt-lg mb-lg" />

          <div className="form-actions">
            <button type="submit" className="btn-primary">Create Agent</button>
            <button type="button" onClick={onNavigate} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
