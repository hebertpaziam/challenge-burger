'use client';

import './banner.scss';

import React, { useContext } from 'react';

import { ConfigContext } from '@/contexts/config';
import { IConfig } from '@/interfaces/config';

export default function Banner(){
  const config = useContext<IConfig>(ConfigContext);
  return (
    <div className="banner">
      <img className="banner__image" src={config?.webSettings?.bannerImage} alt="Banner image" />;
    </div>
  );
};
