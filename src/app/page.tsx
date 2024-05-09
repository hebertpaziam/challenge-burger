import React, { ReactNode } from 'react';

import { Banner } from '@/components/banner';

export type HomeProps = Readonly<{
  children?: ReactNode;
}>;
export default ({ children }: HomeProps) => {
  return (
    <>
      <Banner />
      {children}
    </>
  );
};