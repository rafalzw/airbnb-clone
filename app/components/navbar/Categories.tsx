'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbPool } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';

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

];

const Categories = () => {
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
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;