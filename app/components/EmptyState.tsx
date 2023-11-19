'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
  title = 'Brak dokładnych dopasowań',
  subtitle = 'Spróbuj zmienić lub usunąć niektóre filtry.',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className='
      h-[60vh]
      flex
      gap-2
      flex-col
      justify-center
      items-center
    '
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Usuń filtry'
            onClick={() => router.push('')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
