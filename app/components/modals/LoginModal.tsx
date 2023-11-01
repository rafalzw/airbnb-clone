'use client';

import React, { useCallback, useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '@/app/components/Button';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success('Pomyślnie zalogowano');
          router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error('Niepoprawne dane logowania');
        }
      });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Witaj ponownie'
        subtitle='Zaloguj się!'
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
          <div>
            Pierwszy raz na Airbnb?
          </div>
          <div
            onClick={toggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
          '
          >
            Zarejestruj się
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Logowanie'
      actionLabel='Dalej'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;