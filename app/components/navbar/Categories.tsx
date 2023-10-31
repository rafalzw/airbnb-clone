'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
  {
    label: 'Plaża',
    icon: TbBeach,
    description: 'Nieruchomości przy plaży!',
  },
  {
    label: 'Nowoczesne',
    icon: MdOutlineVilla,
    description: 'Nowoczesne nieruchomości!',
  },
  {
    label: 'Z basenem',
    icon: TbPool,
    description: 'Nieruchomości z basenem!',
  },
  {
    label: 'Na wsi',
    icon: TbMountain,
    description: ''
  },
  {
    label: 'Wiatraki',
    icon: GiWindmill,
    description: '',
  },
  {
    label: 'Wyspy',
    icon: GiIsland,
    description: ''
  },
  {
    label: 'Nad jeziorem',
    icon: GiBoatFishing,
    description: ''
  },
  {
    label: 'Przy stoku',
    icon: FaSkiing,
    description: ''
  },
  {
    label: 'Zamki',
    icon: GiCastle,
    description: ''
  },
  {
    label: 'Jaskinie',
    icon: GiCaveEntrance,
    description: ''
  },
  {
    label: 'Kemping',
    icon: GiForestCamp,
    description: ''
  },
  {
    label: 'Arktyczne',
    icon: BsSnow,
    description: ''
  },
  {
    label: 'Pustynia',
    icon: GiCactus,
    description: ''
  },
  {
    label: 'Stodoły',
    icon: GiBarn,
    description: ''
  },
  {
    label: 'Luxe',
    icon: IoDiamond,
    description: ''
  }

];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className='
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        '
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;