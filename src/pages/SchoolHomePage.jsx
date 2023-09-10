import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NovabarSchool";

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
    <div className="w-screen">
      <NavbarSchool />
      <div className="mx-40">
        <div className="flex justify-center mt-10">
          <p>Bem vindo, Escola {user.name}</p>
        </div>
        <div className="flex flex-col gap-3 max-w-[60%] m-auto">
          <Link to="/school/student" className="border border-blue-600 rounded-md shadow-sm p-3">
            <div className="mx-8">
              <p>Alunos</p>
            </div>
          </Link>
          <Link to="/school/grade" className="border border-blue-600 rounded-md shadow-sm p-3">
            <div className="mx-8">
              <p>Matérias</p>
            </div>
          </Link>
          <Link to="/school/menu" className="border border-blue-600 rounded-md shadow-sm p-3">
            <div className="mx-8">
              <p>Cardápio</p>
            </div>
          </Link>
          <Link to="/school/notification" className="border border-blue-600 rounded-md shadow-sm p-3">
            <div className="mx-8">
              <p>Notificações</p>
            </div>
          </Link>
          <Link to="/school/report-card" className="border border-blue-600 rounded-md shadow-sm p-3">
            <div className="mx-8">
              <p>Boletins</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
