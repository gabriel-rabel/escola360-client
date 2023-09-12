import React, { useState, useEffect } from "react";
import api from "../axios/api";
import Flor2 from "../assets/flor2.svg";
import Voltar from "../assets/voltar.svg";
import NavbarSchool from "../components/NavbarSchool";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SchoolStudentPage() {
  // state para armazenar a lista de alunos
  const [users, setUsers] = useState([]);
  const [formStudent, setFormStudent] = useState({
    name: "",
    parentsName: "",
    email: "",
    class: "",
    register: "",
    password: "",
  });
  const [reload, setReload] = useState(false);

  //funcao p mostrar os estudantes
  useEffect(() => {
    async function getStudents() {
      try {
        const response = await api.get("/user/get_all");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudents();
  }, [reload]);

  function handleChangeStudent(e) {
    setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
  }

  //funcao para criar um estudante
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/signup", formStudent);
      setReload(!reload);
      toast.success("Aluno criado com sucesso!");

      // Limpar os campos do formulário após a adição
      setFormStudent({
        name: "",
        parentsName: "",
        email: "",
        class: "",
        register: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  function formatTurma(turma) {
    // Mapeie os valores da turma para as strings formatadas correspondentes
    const turmaMap = {
      "1ano": "1º ano",
      "2ano": "2º ano",
      "3ano": "3º ano",
      "4ano": "4º ano",
      "5ano": "5º ano",
      "6ano": "6º ano",
      "7ano": "7º ano",
      "8ano": "8º ano",
      "9ano": "9º ano",
      "1anoEM": "1º ano EM",
      "2anoEM": "2º ano EM",
      "3anoEM": "3º ano EM",
    };

    // Verifique se a turma existe no mapeamento e retorne a string formatada correspondente
    return turmaMap[turma] || turma;
  }

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
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#6A7AF5]">
              Nome do aluno
            </label>
            <input
              type="text"
              name="name"
              value={formStudent.name}
              onChange={handleChangeStudent}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="parentsName" className="block text-[#6A7AF5]">
              Nome dos pais
            </label>
            <textarea
              type="text"
              name="parentsName"
              value={formStudent.parentsName}
              onChange={handleChangeStudent}
              className="w-full p-2 border rounded"
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
              value={formStudent.email}
              onChange={handleChangeStudent}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="class" className="block text-[#6A7AF5]">
              Turma
            </label>
            <select
              name="class"
              value={formStudent.class}
              onChange={handleChangeStudent}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione a turma</option>
              <option value="1ano">1º ano</option>
              <option value="2ano">2º ano</option>
              <option value="3ano">3º ano</option>
              <option value="4ano">4º ano</option>
              <option value="5ano">5º ano</option>
              <option value="6ano">6º ano</option>
              <option value="7ano">7º ano</option>
              <option value="8ano">8º ano</option>
              <option value="9ano">9º ano</option>
              <option value="1anoEM">1º ano EM</option>
              <option value="2anoEM">2º ano EM</option>
              <option value="3anoEM">3º ano EM</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="register" className="block text-[#6A7AF5]">
              Número de matrícula
            </label>
            <input
              type="text"
              name="register"
              value={formStudent.register}
              onChange={handleChangeStudent}
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
              name="password"
              value={formStudent.password}
              onChange={handleChangeStudent}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-800 text-white border p-3 mt-5 rounded-lg"
            >
              Salvar
            </button>
          </div>
        </form>

        {/* LISTA DE ALUNOS AGRUPADA POR CLASSE (ANO) */}
        {/*<div className="mb-10 bg-white rounded-lg p-4 w-[800px] relative mt-8">*/}
        <div className="mt-10 max-w-full">
        <table className="w-full divide-y divide-gray-200 shadow">
  <thead className="bg-white">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Nome
      </th>
      <th
        scope="col"
        className="flex flex-col items-end mx-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Ano
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Editar
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {Object.entries(groupedUsers).map(([year, users]) => (
      <tr key={year}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <ul>
            {users.map((user) => (
              <li key={user._id} className="text-[#525252] font-bold">
                {user.name}
              </li>
            ))}
          </ul>
        </td>
        <td className="flex flex-col items-end mx-4 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {formatTurma(year)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <Link to={`/school/student/${users[0]._id}`} className="text-[#525252] font-bold">
            Editar
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
    </div>
  );
}
