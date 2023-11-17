import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Brak dostępu'
          subtitle='Zaloguj się'
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='Nie znaleziono rezerwacji'
          subtitle='Wygląda na to, że nie masz żadnych rezerwacji.'
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>ReservationsClient</ClientOnly>;
};

export default ReservationsPage;
