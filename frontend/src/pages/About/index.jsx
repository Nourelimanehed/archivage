import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./About.css";
import aboutImg from '../../assets/images/aboutImg.svg'
import '../../shared/Shared.css';
import { BottomLine } from "../../components/atoms";
import { Footer, Navbar } from "../../components";

const About = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            <Navbar />
            <div className="dark:bg-boxdark">
                <div className="parent pt-16 my-16">
                    <div>
                        <motion.div
                            className="mb-10"
                            initial={{ y: -200, opacity: 0 }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1, type: "spring" },
                            }}
                        >
                            <h3 className="text-neutral text-center dark:text-white">Qu'est-ce que Notre Application ?</h3>
                            <h1 className="text-4xl font-semibold drop-shadow-md text-center text-accent dark:text-white">
                                À Propos de <span className="text-primary">Nous</span>
                            </h1>
                            <BottomLine />
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <motion.div
                                initial={{ x: -200, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: 1, delay: 1.25 },
                                }}
                            >
                                <img
                                    src={aboutImg}
                                    alt="À Propos de Notre Application"
                                    className="w-100 h-100 transform translate-y-[-12%]"
                                    title="À Propos de Notre Application"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ x: 200, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: 1, delay: 1.25 },
                                }}
                            >
                                <p className="font-medium text-center translate-y-[-60%] sm:translate-y-[-0%] sm:mb-2 md:text-left dark:text-white">
                                    Notre application, conçue pour l'archivage des télégrammes, des courriers, des fax, et bien plus encore, est un système sophistiqué utilisé par les organisations pour gérer efficacement et avec précision le processus d'archivage.
                                    Elle joue un rôle clé dans l'automatisation de diverses tâches liées à l'archivage, telles que la catégorisation des documents, la tenue des registres et la garantie de la sécurité des données.
                                </p>
                                <br />
                                <p className="font-medium text-center translate-y-[-50%] sm:translate-y-[-0%] sm:mb-2 md:text-left dark:text-white">
                                    Dans notre application, tous les types de télégrammes et de documents, depuis les courriers traditionnels jusqu'à la correspondance numérique, peuvent être archivés et organisés de manière transparente.
                                    Le système centralise les informations sur les documents, facilitant ainsi la recherche et la récupération de leur contenu archivé. Notre application garantit l'intégrité des données et le respect des normes d'archivage.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                {!isHomePage && <Footer />}
            </div>
        </>
    );
};

export default About;
