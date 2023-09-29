import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMe } from '../../../config/redux/action';
import Layout from '../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../components';
import { TfiPrinter } from 'react-icons/tfi';

const DetailDataGaji = () => {
    const [data, setData] = useState({
        subject: '',
        sender: '',
        receiver:'',
        details: '',
        date:'',
        transmission_method:'',
        urgency_level:'',
        telegram_type:'',
    });
    const { name } = useParams();
    const [index] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const onSubmitPrint = () => {
        navigate("/telegrams/print");
    };
    const onSubmitPrint1 = () => {
        navigate("/telegrams/printAttachment");
    };

    useEffect(() => {
        const getDataEmployé = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data_gaji/name/${name}`);
                const data = response.data[0];

                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        getDataEmployé();
    }, [name]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.hak_akses !== 'admin') {
            navigate('/tableau_de_bord');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName="Détails du télégramme" />
            <Link to='/telegrams'>
                <ButtonTwo>
                    <span>Retour</span>
                </ButtonTwo>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between'>
                </div>

                <div className='max-w-full overflow-x-auto'>
                    <div className='md:w-2/3'>
                        <div className='w-full md:text-lg'>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Objet</span>
                                <span className='inline-block w-7'>:</span>
                                {data.subject}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Expiditeur</span>
                                <span className='inline-block w-6'>:</span>{' '}
                                <span className='pl-[-10] md:pl-0'></span>
                                {data.sender}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Destintaire</span>
                                <span className='inline-block w-7'>:</span>
                                {data.receiver}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Details</span>
                                <span className='pl-[-8] md:pl-0'></span>
                                <span className='inline-block w-7'>:</span>
                                <span className='inline-block w-7'></span>
                                {data.details}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Degre d'Urgence</span>
                                <span className='inline-block w-7'>:</span>
                                {data.urgency_level}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Methode de transmisson</span>
                                <span className='inline-block w-7'>:</span>
                                {data.transmission_method}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-55'>Type</span>
                                <span className='inline-block w-7'>:</span>
                                {data.telegram_type}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                            
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 md:justify-end py-6'>
                        <div className='w-full md:w-auto'>
                            <ButtonOne
                                onClick={onSubmitPrint1}
                            >
                                <span>Imprimer la piece jointe</span>
                                <span>
                                    <TfiPrinter />
                                </span>
                            </ButtonOne>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 md:justify-end py-6'>
                        
                        <div className='w-full md:w-auto'>
                            <ButtonOne
                                onClick={onSubmitPrint}
                            >
                                <span>Imprimer </span>
                                <span>
                                    <TfiPrinter />
                                </span>
                            </ButtonOne>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailDataGaji;
