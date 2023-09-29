import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSipeka from "../../../../assets/images/logo/logo-sipeka.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLaporanGajiByMonth,
  fetchLaporanGajiByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

  const PrintPdfLaporanGaji = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");

    const { isError, user } = useSelector((state) => state.auth);
    const { dataLaporanGaji } = useSelector((state) => state.laporanGaji);

    const getDataByYear = async (selectedYear) => {
      dispatch(fetchLaporanGajiByYear(selectedYear));
    };

    const getDataByMonth = async (selectedMonth) => {
      dispatch(fetchLaporanGajiByMonth(selectedMonth));
    };

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: " Télégramme",
    });

    useEffect(() => {
      getDataByYear(year);
      getDataByMonth(month);
    }, [year, month]);

    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
      if (isError) {
        navigate("/connexion");
      }
      if (user && user.hak_akses !== "admin") {
        navigate("/tableau-de-bord");
      } else {
        handlePrint();
      }
    }, [isError, user, navigate, handlePrint]);

    useEffect(() => {
      const today = new Date();
      const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const month = monthNames[today.getMonth()];
      const year = today.getFullYear();
      setBulan(month);
      setTahun(year);
    }, []);

    return (
      <>
        <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
          <div>
            <ButtonOne onClick={handlePrint}>
              <span>Imprimer</span>
            </ButtonOne>
          </div>
          <div>
            <ButtonTwo
              onClick={() => navigate(-1)}
            >
              <span>Retour</span>
            </ButtonTwo>
          </div>
        </div >
        <div ref={componentRef} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
          <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
            
            <h1 className="text-black text-2xl font-bold boder  dark:text-white">
            Télégramme
            </h1>
            
          </div>
          <h1 className="text-center text-black my-4 text-xl font-medium boder py-2 dark:text-white">
          Détails du télégramme
          </h1>
          <div className="w-full md:text-lg">
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Objet</span>
              <span className="pl-[-8] md:pl-0"></span>
              <span className="inline-block w-7">:</span>
              {month}
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Date</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Expiditeur</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Destintaire</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Details</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Degre d'Urgence</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Methode de transmisson</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
            <h2 className="font-medium mb-4 block text-black dark:text-white">
              <span className="inline-block w-32 md:w-40">Type</span>
              <span className="inline-block w-7">:</span>
              {year}
              <span className="pl-[-8] md:pl-0"></span>
            </h2>
          </div>
          <div className="max-w-full overflow-x-auto py-4">
            
          </div>
          <div className="py-6">
            <div className="font-medium text-black text-right dark:text-white">
              <span> {`${new Date().getDate()} ${bulan} ${tahun}`}</span>
              <br />
              
              
              <br />
              <span className="p-8 italic text-black dark:text-white">Signature</span>
            </div>
          </div>
          
        </div>
      </>
    );
  };

export default PrintPdfLaporanGaji;
