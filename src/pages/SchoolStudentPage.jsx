import React, { useState, useEffect } from "react";
import api from "../axios/api";
import Flor1 from "../assets/flor1.svg";
import Flor2 from "../assets/flor2.svg";
import NavbarSchool from "../components/NovabarSchool";
import { Link } from "react-router-dom";

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

  // Função para agrupar os alunos por ano
  const groupUsersByYear = (users) => {
    const groupedUsers = {};
    users.forEach((user) => {
      if (!groupedUsers[user.class]) {
        groupedUsers[user.class] = [];
      }
      groupedUsers[user.class].push(user);
    });
    return groupedUsers;
  };

  const groupedUsers = groupUsersByYear(users);
  return (
    <div className="bg-[#6D7DFF] h-screen w-screen">
      <NavbarSchool />

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

          <div className=" bg-white rounded p-2 mb-2">
            <Link to={``}>Cadastrar um aluno</Link>
          </div>

          {/* LISTA DE ALUNOS AGRUPADA POR CLASSE (ANO) */}
          <div className="relative mb-10 bg-white rounded-lg p-4 w-[800px]">
            <img
              src={Flor2}
              alt=""
              className="absolute top-[200px] left-[1000px]"
            />
            <ul>
              {Object.entries(groupedUsers).map(([year, users]) => (
                <li key={year}>
                  <div className="flex">
                    <p className="text-[#6A7AF5]">{year}</p>
                  </div>
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>
                        <p className="text-[#525252] font-bold">{user.name}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
