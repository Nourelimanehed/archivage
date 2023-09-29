import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Layout from '../../../../../layout';
import { createDataPegawai, getMe } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';

const FormAddDataPegawai = () => {
    const [formData, setFormData] = useState({
        nik: '',
        email: '',
        username: '',
        password: '',
        confPassword: '',
        details: '',
        is_admin: '',
    });

    const {
        nik,
        email,
        username,
        password,
        confPassword,
        details,
        is_admin,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const submitDataPegawai = (e) => {
        e.preventDefault();
        const newFormData = new FormData();

        newFormData.append('email', email);
        newFormData.append('username', username);
        newFormData.append('password', password);
        newFormData.append('confPassword', confPassword);
        newFormData.append('details', details);
        newFormData.append('is_admin', is_admin);

        dispatch(createDataPegawai(newFormData, navigate))
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.msg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec',
                        text: error.response.data.msg,
                        confirmButtonText: 'Ok',
                    });
                } else if (error.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec',
                        text: error.message,
                        confirmButtonText: 'Ok',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec',
                        text: 'Une erreur est survenue',
                        confirmButtonText: 'Ok',
                    });
                }
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.hak_akses !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName="Formulaire d'ajout d'un employé" />
            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>

                        <form onSubmit={submitDataPegawai}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Nom Complet <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='username'
                                            name='username'
                                            value={username}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Nom complet'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Adresse email <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            value={email}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Adresse email"
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Mot de passe <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='password'
                                            id='password'
                                            name='password'
                                            value={password}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Entrez le mot de passe'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>

                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Confirmer votre mot de passe <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='password'
                                            id='confPassword'
                                            name='confPassword'
                                            value={confPassword}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Confirmez votre mot de passe'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='w-full xl:w-1/2'>
                                    <label className='mb-2.5 block text-black dark:text-white'>
                                        Type <span className='text-meta-1'>*</span>
                                    </label>
                                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                        <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                            id='is_admin'
                                            name='is_admin'
                                            value={is_admin}
                                            onChange={handleChange}
                                            required={true}
                                        >
                                            <option value='' disabled={true}>Sélectionnez</option>
                                            <option value='admin'>Administrateur</option>
                                            <option value='pegawai'>Utilisateur</option>
                                        </select>
                                        <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                            <MdOutlineKeyboardArrowDown />
                                        </span>
                                       
                                    </div>
                                </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                            <div className='w-full md:w-1/2'>
                                <div className='md:mr-4 mb-4'> {/* Apply margin-right and margin-bottom here */}
                                    <ButtonOne>
                                        <span>Enregistrer</span>
                                    </ButtonOne>
                                </div>
                            </div>
                            <Link to="/usersdata">
                                <ButtonTwo>
                                    <span>Retour</span>
                                </ButtonTwo>
                            </Link>
                        </div>
                                
                           
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormAddDataPegawai;
