import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Layout from '../../../../../layout';
import { createDataPegawai, getMe } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';

const FormAddDataPotongan = () => {
    const [formData, setFormData] = useState({
        nik: '',
       subject: '',
        sender: '',
        receiver:'',
        details: '',
        date:'',
        transmission_method:'',
        urgency_level:'',
        telegram_type:'',
        attachment: null,
    });

    const {
        nik,
       subject,
        sender,
        receiver,
        date,
        details,
        transmission_method,
        urgency_level,
        telegram_type,
        attachment,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const submitDataPegawai = (e) => {
        e.preventDefault();
        const newFormData = new FormData();

        newFormData.append('subject', subject);
        newFormData.append('sender', sender);
        newFormData.append('date', date);
        newFormData.append('transmission_method', transmission_method);
        newFormData.append('urgency_level', urgency_level);
        newFormData.append('telegram_type', telegram_type);
        newFormData.append('details', details);
        if (attachment) {
            newFormData.append('attachment', attachment);
        }
    
     

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
        if (e.target.name === 'attachment') {
            setFormData({
                ...formData,
                attachment: e.target.files[0], // Stockez le fichier d'attachment
            });}
    else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
                });
            };
        }

    

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
            <Breadcrumb pageName="Formulaire d'ajout d'un télégramme" />
            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>

                        <form onSubmit={submitDataPegawai}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                        Objet <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='subject'
                                            name='subject'
                                            value={subject}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Objet'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Expiditeur <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            id='sender'
                                            name='sender'
                                            value={sender}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Adresse email d'expiditeur"
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                        Destinataire <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            id='receiver'
                                            name='receiver'
                                            value={receiver}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Adresse email de destinataire'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Details<span className='text-meta-1'></span>
                                        </label>
                                        <input
                                            type='text'
                                            id='details'
                                            name='details'
                                            value={details}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder=""
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                        Date <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='date'
                                            name='date'
                                            value={date}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Objet'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Degre d'Urgence <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='urgency_level'
                                                name='urgency_level'
                                                value={urgency_level}
                                                onChange={handleChange}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Sélectionnez</option>
                                                <option value='Urgent'>Urgent</option>
                                                <option value='Semi-urgent'>Semi-Urgent</option>
                                                <option value='Non urgent'>Non Urgent</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                            <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                <div className='w-full xl:w-1/2'>
                                    <label className='mb-2.5 block text-black dark:text-white'>
                                        Methode de transmisson <span className='text-meta-1'>*</span>
                                    </label>
                                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                        <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                            id='transmission_method'
                                            name='transmission_method'
                                            value={transmission_method}
                                            onChange={handleChange}
                                            required={true}
                                        >
                                            <option value='' disabled={true}>Sélectionnez</option>
                                            <option value='Messagerie'>Messagerie</option>
                                            <option value='Fax'>Fax</option>
                                            <option value='Porte'>Porte</option>
                                            <option value='Autre'>Autre</option>
                                        </select>
                                        <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                            <MdOutlineKeyboardArrowDown />
                                        </span>
                                    </div>
                                </div>

                                <div className='w-full xl:w-1/2'>
                                    <label className='mb-2.5 block text-black dark:text-white'>
                                        Type <span className='text-meta-1'>*</span>
                                    </label>
                                    <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                        <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                            id='telegram_type'
                                            name='telegram_type'
                                            value={telegram_type}
                                            onChange={handleChange}
                                            required={true}
                                        >
                                            <option value='' disabled={true}>Sélectionnez</option>
                                            <option value='depart'>Depart</option>
                                            <option value='arrive'>Arrive</option>
                                            <option value='transit'>Transit</option>
                                        </select>
                                        <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                            <MdOutlineKeyboardArrowDown />
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                <div className='w-full xl:w-1/2'>
                                    <label className='mb-2.5 block text-black dark:text-white'>
                                        Pièce Jointe
                                    </label>
                                    <input
                                        type='file'
                                        id='attachment'
                                        name='attachment'
                                        onChange={handleChange}
                                        accept='.pdf, .doc, .docx, .jpg, .jpeg, .png' // Types de fichiers acceptés
                                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
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
                                <Link to="/telegrams">
                                    <ButtonTwo>
                                        <span>Retour</span>
                                    </ButtonTwo>
                                </Link>
                            </div>
                                    
                            </div>  
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormAddDataPotongan;
