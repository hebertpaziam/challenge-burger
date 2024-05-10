'use client';

import './navbar.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Icon } from '@/components/icon';

export type NavbarProps = Readonly<{}>;

export default ({}: NavbarProps) => {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState(false);

  const menuList = [
    { name: 'Menu', href: '/' },
    { name: 'Sign In', href: '/sign-in' },
    { name: 'Contact', href: '/contact' },
  ];

  const closeMenu = () => {
    setIsOpened(false);
  };

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  return (
    <nav className={'navbar' + (isOpened ? ' navbar--opened' : '')}>
      <ul className="navbar__list">
        {menuList.map(({ name, href }) => (
          <li key={name} className={`navbar__item ${pathname === href ? 'navbar__item--active' : ''}`}>
            <Link onClick={closeMenu} href={href}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" className="navbar__trigger" onClick={toggleMenu}>
        <Icon name={isOpened ? 'x' : 'menu'} />
      </button>
    </nav>
  );
};
