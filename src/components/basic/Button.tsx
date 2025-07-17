import React from 'react';

export default function Button({
  onClick,
  children,
  type = 'button',
  disabled = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
}) {
  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
