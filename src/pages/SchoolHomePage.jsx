import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import NavbarSchool from "../components/NavbarSchool";
import Seta from "../assets/seta.svg";
import Flor from "../assets/flor2.svg";

export default function SchoolHomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/school/profile");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

  return (
    <div className="w-screen bg-[#6D7DFF] h-screen w-screen">
      <NavbarSchool />
      <div className="mx-40 relative">
        <div className="mt-10 text-4xl text-center mb-10 text-white">
          <p>
            <img
              className="absolute top-[0px] left-2 transform -translate-x-1/2"
              src={Flor}
            />
            Bem vindo, <span className="font-bold">{user.name}</span>!
          </p>
        </div>

        {/* LINKS */}
        <div className=" flex flex-col gap-6 max-w-[60%] m-auto">
          {/* Alunos */}
          <Link
            to="/school/student"
            className="border border-white rounded-md shadow-sm p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="text-white">Alunos</p>
              </div>
              <img src={Seta} alt="Ícone da seta" />
            </div>
          </Link>

          {/* Matérias */}
          <Link
            to="/school/grade"
            className="border border-white rounded-md shadow-sm p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="text-white">Matérias</p>
              </div>
              <img src={Seta} alt="Ícone da seta" />
            </div>
          </Link>

          {/* Cardápio */}
          <Link
            to="/school/menu"
            className="border border-white rounded-md shadow-sm p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="text-white">Cardápio</p>
              </div>
              <img src={Seta} alt="Ícone da seta" />
            </div>
          </Link>

          {/* Notificações */}
          <Link
            to="/school/notification"
            className="border border-white rounded-md shadow-sm p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="text-white">Notificações</p>
              </div>
              <img src={Seta} alt="Ícone da seta" />
            </div>
          </Link>

          {/* Boletins */}
          <Link
            to="/school/report-card"
            className="border border-white rounded-md shadow-sm p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="text-white">Boletins</p>
              </div>
              <img src={Seta} alt="Ícone da seta" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
