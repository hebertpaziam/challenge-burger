'use client';

import './banner.scss';

import React, { useEffect, useState } from 'react';

export type BannerProps = Readonly<{}>;

export const Banner = ({}: BannerProps) => {
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    const image = getComputedStyle(document.documentElement)?.getPropertyValue('--banner-image');
    setBannerImage(JSON.parse(image));
  }, []);

  return (
    <div className="banner">
      <img className="banner__image" src={bannerImage} alt="Banner image" />;
    </div>
  );
};
