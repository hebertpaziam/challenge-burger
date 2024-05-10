'use client';

import React, { HTMLAttributes, useEffect, useState } from 'react';

export type IconProps = Readonly<{
  name: string;
}>;

export default function Icon({ name, className }: IconProps & HTMLAttributes<HTMLDivElement>) {
  const [href, setHref] = useState('');

  useEffect(() => {
    setHref(`/feather-sprite.svg#${name}`);
  }, [name]);

  return (
    <svg
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || 'icon-' + name}
    >
      <use href={href} />
    </svg>
  );
}
