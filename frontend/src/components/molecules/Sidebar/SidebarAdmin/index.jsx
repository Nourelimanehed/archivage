import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLinkGroup from '../SidebarLinkGroup';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TfiPrinter } from 'react-icons/tfi';
import { logoutUser } from '../../../../config/redux/action';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { reset } from '../../../../config/redux/reducer/authReducer';

const SidebarAdmin = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const onLogout = () => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        dispatch(reset());
        Swal.fire({
          title: 'Déconnexion réussie',
          text: 'Vous vous êtes déconnecté avec succès.',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  // Fermer en cliquant à l'extérieur
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Fermer si la touche "Échap" est pressée
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* En-tête de la barre latérale */}
      <div className='flex items-center justify-center px-6 py-5.5 lg:py-6.5 object-cover'>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'
        >
          <AiOutlineArrowLeft className="text-xl" />
        </button>
      </div>
      
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='mt-4 px-4 lg:mt-9 lg:px-6'>
          <div>
            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* Données des utilisateurs */}
              <NavLink
                to='/usersdata'
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <RxDashboard />
                Utilisateurss
              </NavLink>
              {/* Données des Utilisateurss */}

              {/* télégrammes */}
              <NavLink
                to='/telegramsAdmin'
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <TfiPrinter />
                Télégrammes
              </NavLink>
              {/* télégrammes */}
               

              {/* Paramètres de l'admin */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/pengaturan' || pathname.includes('pengaturan')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to='#'
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/pengaturan' ||
                          pathname.includes('pengaturan')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <FiSettings />
                        Paramètres
                        <MdKeyboardArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl ${open && 'rotate-180'
                          }`} />
                      </NavLink>
                      {/* Menu déroulant Start */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
                          <li>
                            <NavLink
                              to='/ubah-password'
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Modifier le mot de passe
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              onClick={onLogout}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Se déconnecter
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* Menu déroulant End */}
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Paramètres de l'admin */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
