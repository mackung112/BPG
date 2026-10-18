import React from 'react';

export type ButtonVariant = 'subscribe' | 'subscribed' | 'icon' | 'outlined' | 'chip';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  isActive?: boolean;
  'aria-label'?: string;
}

/**
 * Reusable Button Component based on Red Broadcast Design System
 * Strict compliance with agents.md (Zero hardcoding, token-first, a11y compliant)
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'subscribe',
  children,
  icon,
  isActive = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  // Base classes according to typography and interaction tokens
  const baseClasses = 'inline-flex items-center justify-center font-display font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant mappings using Tailwind config tokens
  const variantClasses: Record<ButtonVariant, string> = {
    // Subscribe button: Dark #0F0F0F fill, white text, 36px height, 16px px, full radius, 14px/20px
    subscribe: 'h-9 px-2 bg-text-primary text-text-inverse rounded-full text-btn hover:bg-neutral',
    
    // Subscribed state: #F2F2F2 fill, #0F0F0F text, 36px height, 16px px, full radius
    subscribed: 'h-9 px-2 bg-surface text-text-primary rounded-full text-btn hover:bg-surface-hover',
    
    // Icon button: 40px circle, transparent, neutral text/icon, hover #F2F2F2, full radius
    icon: 'w-10 h-10 rounded-full text-neutral hover:bg-surface hover:text-text-primary',
    
    // Outlined button: 1px #E5E5E5 border, full radius, #0F0F0F text, hover #F2F2F2
    outlined: 'h-9 px-2 border border-border text-text-primary rounded-full text-btn hover:bg-surface',
    
    // Category Chip: Pill-shaped, 8px/12px padding, Roboto 14px weight 500
    chip: isActive
      ? 'h-8 px-1.5 bg-text-primary text-text-inverse rounded-full text-btn'
      : 'h-8 px-1.5 bg-surface text-text-primary rounded-full text-btn hover:bg-surface-hover',
  };

  // Enforce accessibility: Icon-only buttons must have an aria-label
  if (variant === 'icon' && !ariaLabel && !children) {
    console.warn('Button: Icon-only buttons must provide an aria-label for accessibility.');
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <span className={children ? 'mr-1 inline-flex' : 'inline-flex'}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
