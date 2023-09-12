import React, { useState, useEffect } from "react";
import api from "../axios/api";
/* import Flor1 from "../assets/flor1.svg"; */
import Flor2 from "../assets/flor2.svg";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";
import { Link } from "react-router-dom";

export default function SchoolStudentPage() {
  // state para armazenar a lista de alunos
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    async function getStudents() {
      const response = await api.get("/user/get_all");
      setUsers(response.data);
    }
    getStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/signup", formData);
      alert("Aluno cadastrado com sucesso!");

      // Limpar o formulário após o sucesso
      setFormData({
        nome: "",
        password: "",
        email: "",
      });

      // Você pode fazer algo com a resposta do servidor, se necessário
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

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
    <div className="w-screen">
      <NavbarSchool />

      {/* Título */}
      <div className="mt-10 mx-32">
        <Link to="/school">
          <div className="flex items-center gap-2 mb-2">
            <img src={Voltar} />
            <h1 className="text-[18px]">Cadastre um aluno</h1>
          </div>
        </Link>
        <div></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#6A7AF5]">
              Nome do aluno
            </label>
            <input
              type="text"
              id="name"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#6A7AF5]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#6A7AF5]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#6A7AF5] text-white py-2 px-4 rounded hover:bg-[#4E5DD7]"
          >
            Cadastrar
          </button>
        </form>

        {/* LISTA DE ALUNOS AGRUPADA POR CLASSE (ANO) */}
        <div className="relative mb-10 bg-white rounded-lg p-4 w-[800px]">
          <img
            src={Flor2}
            alt=""
            className="absolute top-[200px] left-[1000px]"
          />
          <ul>
            {Object.entries(groupedUsers).map(([year, users]) => (
              <li key={`${year}-${users[0].id}`} className="mb-4">
                <div>
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
  );
}
