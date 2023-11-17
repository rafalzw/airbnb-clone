import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <EmptyState
        title='Nie zanelziono ulubionych'
        subtitle='Wygląda na to, że nie masz ulubionych nieruchomości.'
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
