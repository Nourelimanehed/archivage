import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';

import {
  FormAddDataJabatan,
  FormEditDataJabatan,
  FormAddDataKehadiran,
  FormEditDataKehadiran,
  FormAddDataPegawai,
  FormEditDataPegawai,
  FormAddDataPotongan,
  FormEditDataPotongan,
  PrintPdfLaporanGaji,
  DetailDataGaji,
  PrintPdfSlipGaji,
  PrintPdfLaporanAbsensi,
  PrintPdfDataGajiPegawai
} from '../../components';
import {
  DataPegawai,
  DataJabatan,
  DataKehadiran,
  DataGaji,
  LaporanGaji,
  LaporanAbsensi,
  SlipGaji,
  UbahPasswordAdmin,
  DataGajiPegawai,
  UbahPasswordPegawai,
  DataPotongan
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route
        path='/usersdata'
        element={<DataPegawai />}
      />
      <Route
        path='/usersdata/form-usersdata/add'
        element={<FormAddDataPegawai />}
      />
      <Route
        path='/usersdata/form-usersdata/edit/:id'
        element={<FormEditDataPegawai />}
      />
 
      <Route
        path='/telegramsAdmin'
        element={<DataPotongan />}
      />
      
      
      <Route
        path='/data-gaji'
        element={<DataGaji />}
      />
      <Route
        path='/data-gaji/detail-data-gaji/name/:name'
        element={<DetailDataGaji />}
      />

      <Route
        path='/data-gaji/cetak-gaji/slip-gaji/name/:name'
        element={<PrintPdfSlipGaji />}
      />

      {/* Laporan Admin */}
      
      <Route
        path='/laporan/gaji/print-page'
        element={<PrintPdfLaporanGaji />}
      />
      <Route
        path='/laporan/absensi'
        element={<LaporanAbsensi />}
      />
      <Route
        path='/laporan/absensi/print-page'
        element={<PrintPdfLaporanAbsensi />}
      />
      <Route
        path='/laporan/slip-gaji'
        element={<SlipGaji />}
      />
      <Route
        path='/laporan/slip-gaji/print-page'
        element={<PrintPdfSlipGaji />}
      />

      {/*   Mot de passe admin Admin */}
      <Route
        path='/changepasswordAdmin'
        element={<UbahPasswordAdmin />}
      />

      {/* Route Utilisateur */}
      
     
      {/* Dashboard Utilisateur */}
      <Route
        path='/telegrams'
        element={<DataPotongan />}
      />
      <Route
        path='/telegrams/form-telegrams/add'
        element={<FormAddDataPotongan />} />
      <Route
        path='/telegrams/form-telegrams/edit/:id'
        element={<FormEditDataPotongan />} />

     
      <Route
        path='/changepassword'
        element={<UbahPasswordPegawai />}
      />
      

      {/* Route Not Found 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default AppRoutes;
