'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }


  }, [currentUser, loginModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          '
        >
          Wynajmij swój dom w Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className='
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                  }}
                  label='Moje podróże'
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label='Ulubione'
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label='Moje rezerwacje'
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label='Wynajmij swój dom'
                />
                <MenuItem
                  onClick={() => {
                  }}
                  label='Konto'
                />
                <MenuItem
                  onClick={() => signOut()}
                  label='Wyloguj'
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Zarejestruj'
                />
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Zaloguj'
                />
              </>
            )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;