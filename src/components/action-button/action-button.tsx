'use client';
import './action-button.scss';

import React, { HTMLAttributes } from 'react';

export type ActionButtonProps = Readonly<{
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}>;

export default ({ className, children, disabled, onClick }: ActionButtonProps & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" disabled={disabled} className={`action-button ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};
