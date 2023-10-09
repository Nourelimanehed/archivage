import React, { useState, useEffect } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../../config/redux/action';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  useEffect(() => {
    if (user ||  isSuccess) {
      navigate("/usersdata");
    }
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: message,
      }).then(() => {
      });
    } else if (isSuccess && user) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 1500,
      }).then(() => {
      });
    }
  }, [isError, isSuccess, user, message, dispatch]);

  return (
    <form onSubmit={handleLogin}>
      <div className='mb-4'>
        <label className='mb-2.5 block font-medium text-black dark:text-white'>
          Adresse E-mail
        </label>
        <div className='relative'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            required
            placeholder='Entrez votre adresse email'
            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <FiUser className='absolute right-4 top-4 text-xl' />
        </div>
      </div>

      <div className='mb-6'>
        <label className='mb-2.5 block font-medium text-black dark:text-white'>
          Mot de passe
        </label>
        <div className='relative'>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Entrez votre adresse mot de passe'
            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <FiLock className='absolute right-4 top-4 text-xl' />
        </div>
      </div>

      <div className='mb-5'>
        <input
          type='submit'
          value={isLoading ? "Chargement..." : "Connexion"}
          className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
        />
      </div>
    </form>
  );
}

export default LoginInput;
