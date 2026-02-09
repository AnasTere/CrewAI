import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search agents by title...' }: SearchBarProps) {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Search className="search-bar-icon" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-bar-input"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="search-bar-clear"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
