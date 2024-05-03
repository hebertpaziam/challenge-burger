'use client';

import React, { useEffect } from 'react';

export type IconProps = Readonly<{
  name: string;
  size?: number;
}>;

export const Icon = ({ size = 24, name }: IconProps) => {
  const [href, setHref] = React.useState('');

  useEffect(() => {
    setHref(`/feather-sprite.svg#${name}`);
  }, [name]);

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={'icon-' + name}
    >
      <use href={href} />
    </svg>
  );
};
