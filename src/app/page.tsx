import React, { ReactNode } from 'react';

import { Banner } from '@/components/banner';

export type MenuProps = {
  children?: ReactNode;
};
export default function Menu({ children }: MenuProps) {
  return (
    <>
      <Banner />
      {children}
    </>
  );
}
