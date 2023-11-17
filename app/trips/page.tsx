import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Bark dostępu'
          subtitle='Zaloguj się'
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='Nie znaleziono podróży'
          subtitle='Wygląda na to, że nie zarezerwowałeś żadnych podróży.'
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>Trips client</ClientOnly>;
};

export default TripsPage;
