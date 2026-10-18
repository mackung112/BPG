import React, { useState } from 'react';

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchInput Component
 * 44px height, white background, 1px #E5E5E5 border, attached search button (#F8F8F8, 64px width)
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'ค้นหา',
  className = '',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center w-full max-w-xl h-11 ${className}`}
    >
      <div className="relative flex-grow h-full">
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label="ค้นหาวิดีโอ"
          className="w-full h-full px-2 bg-background border border-border rounded-l-full font-body text-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
        />
      </div>

      <button
        type="submit"
        aria-label="กดเพื่อค้นหา"
        className="w-16 h-full flex items-center justify-center bg-surface-search border border-l-0 border-border rounded-r-full text-neutral hover:bg-surface hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
};

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * General TextInput Component
 * 40px height, 16px horizontal padding, 1px #E5E5E5 border with token-based feedback
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-label text-text-primary tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`h-10 px-2 bg-surface rounded-md font-body text-body text-text-primary border ${
          error ? 'border-status-error' : 'border-border'
        } focus:outline-none focus:border-secondary focus:bg-background transition-colors`}
        aria-invalid={!!error}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span
          id={inputId ? `${inputId}-error` : undefined}
          className="font-body text-metadata text-status-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export interface CommentInputProps {
  avatarUrl: string;
  onSubmit: (content: string) => void;
  placeholder?: string;
}

/**
 * CommentInput Component
 * Expanding bottom border comment input with Cancel and Submit actions
 */
export const CommentInput: React.FC<CommentInputProps> = ({
  avatarUrl,
  onSubmit,
  placeholder = 'เพิ่มความคิดเห็น...',
}) => {
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment('');
    setIsFocused(false);
  };

  const handleCancel = () => {
    setComment('');
    setIsFocused(false);
  };

  return (
    <div className="flex gap-2 w-full">
      <img
        src={avatarUrl}
        alt="รูปโปรไฟล์ของคุณ"
        className="w-10 h-10 rounded-full object-cover bg-surface flex-shrink-0"
        loading="lazy"
      />
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          aria-label="เขียนความคิดเห็น"
          rows={isFocused ? 3 : 1}
          className="w-full bg-transparent border-b border-border focus:border-border-dark text-text-primary font-body text-body resize-none focus:outline-none transition-all py-1 placeholder:text-text-secondary"
        />

        {isFocused && (
          <div className="flex justify-end gap-1 mt-1.5">
            <button
              type="button"
              onClick={handleCancel}
              className="h-9 px-2 rounded-full font-body text-btn text-text-primary hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={!comment.trim()}
              className="h-9 px-2 rounded-full font-body text-btn bg-text-primary text-text-inverse disabled:bg-surface disabled:text-text-secondary disabled:cursor-not-allowed hover:bg-neutral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              แสดงความคิดเห็น
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
