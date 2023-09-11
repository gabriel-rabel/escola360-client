import React, { useState, useEffect } from "react";
import api from "../axios/api";
import Navbar from "../components/Navbar";
import Flor1 from "../assets/flor1.svg";
import Flor2 from "../assets/flor2.svg";

export default function SchoolStudentPage() {
  // state para armazenar a lista de alunos
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const response = await api.get("/user/get_all");
      setUsers(response.data);
    }
    getStudents();
  }, []);

  return (
    <div className="bg-[#6D7DFF] h-screen w-screen">
      <Navbar />

      {/* TÍTULO */}
      <div className="relative">
        <img
          src={Flor1}
          alt=""
          className="absolute top-9 left-[200px] transform -translate-x-1/2"
        />
        <div className="flex justify-center items-center flex-col mt-20">
          <div>
            <h1 className="text-4xl text-center mb-10 text-white">
              Bem-vindo à página de alunos
            </h1>
          </div>

          {/* LISTA DE ALUNOS */}
          <div className="relative mb-10 bg-white rounded-lg p-4 w-[800px]">
            <img
              src={Flor2}
              alt=""
              className="absolute top-[200px] left-[1000px]"
            />
            {/* Renderize a lista de alunos aqui */}
            <ul>
              <p className="text-[#6A7AF5]">Alunos:</p>
              {users.map((user) => (
                <li key={user.id}>
                  <p className="text-[#525252] font-bold">
                    {user.name} - {user.class}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Resto do conteúdo da página */}
        </div>
      </div>
    </div>
  );
}
{
  /*<div>
      <p>Página de Alunos</p>
      <h2>Lista de Alunos</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.class}
          </li>
        ))}
      </ul>
    </div>
  );
}*/
}
