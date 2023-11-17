'use client';

import React, { useCallback, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '@/app/components/Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Pomyślnie zarejestrowano');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => {
        toast.error('Coś poszło nie tak.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Witaj w Airbnb'
        subtitle='Zarejestruj się!'
      />
      <Input
        id='email'
        label='Adres email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Nazwa użytkownika'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Hasło'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Kontynuuj, używając Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Kontynuuj, używając Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <div className='flex flex-row justify-center items-center gap-2'>
          <div>Masz już konto?</div>
          <div
            onClick={toggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
          '
          >
            Zaloguj się
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Rejestracja'
      actionLabel='Dalej'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
