'use client';
import './action-button.scss';

import React, { HTMLAttributes, ReactNode } from 'react';

export type ActionButtonProps = Readonly<{
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}>;

export default function ActionButton({
  className,
  children,
  disabled,
  onClick,
}: ActionButtonProps & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" disabled={disabled} className={`action-button ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
