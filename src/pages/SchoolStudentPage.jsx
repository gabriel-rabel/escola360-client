import React, { useState, useEffect } from "react";
import api from "../axios/api";
import Flor2 from "../assets/flor2.svg";
import Voltar from "../assets/voltar.svg";
import NavbarSchool from "../components/NavbarSchool";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Separar from "../assets/separacao.svg";

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

  const [search, setSearch] = useState("");

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

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  console.log(search);

  return (
    <div className="w-screen">
      <NavbarSchool />

      {/* Título */}
      <div className="mt-10 mx-auto w-[1200px] mt-10">
        <Link to="/school">
          <div className="flex items-center gap-2 mb-2">
            <img src={Voltar} />
            <h1 className="text-[18px]">Cadastre um aluno</h1>
          </div>
        </Link>
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 ">
          <div className="flex flex-col">
            <label htmlFor="name" className="block">
              Nome do aluno
            </label>
            <input
              type="text"
              name="name"
              value={formStudent.name}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="parentsName" className="block">
              Nome dos pais
            </label>
            <input
              type="text"
              name="parentsName"
              value={formStudent.parentsName}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formStudent.email}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="class" className="block">
              Turma
            </label>
            <select
              name="class"
              value={formStudent.class}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
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

          <div className="flex flex-col">
            <label htmlFor="register" className="block">
              Número de matrícula
            </label>
            <input
              type="text"
              name="register"
              value={formStudent.register}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formStudent.password}
              onChange={handleChangeStudent}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              required
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>

        {/* Divisor */}
        <div className="flex justify-center mt-10 mb-4">
          <img src={Separar} />
        </div>

        {/* LISTA DE ALUNOS AGRUPADA POR CLASSE (ANO) */}
        {/*<div className="mb-10 bg-white rounded-lg p-4 w-[800px] relative mt-8">*/}
        <div className="mt-4 max-w-full rounded-md border-gray-300">
          {/* Título */}
          <div className="text-[24px] text-center font-bold h-[30px] flex items-center">
            <h1>Lista de Alunos</h1>
          </div>

          {/* Filter */}
          <div className="flex flex-col mt-6 mb-6">
            <input
              placeholder="Pesquise"
              type="search"
              value={search}
              onChange={handleSearch}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <table className="w-full divide-y divide-gray-200 border-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="flex flex-col items-end mx-4  py-3 text-left text-md font-medium text-gray-500  tracking-wider"
                >
                  Ano
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {Object.entries(groupedUsers).map(([year, users]) => (
                <tr key={year}>
                  <td className="py-4 text-md">
                    <ul>
                      {users
                        .filter((user) => {
                          return user.active === true;
                        })
                        .filter((user) => {
                          return user.name
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase());
                        })

                        .map((user) => (
                          <li
                            key={user._id}
                            className="text-[#525252] font-bold mb-2"
                          >
                            <Link
                              to={`/school/student/${user._id}`}
                              className="text-[#6D7DFF] font-bold"
                            >
                              {user.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td className="flex flex-col items-end mx-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatTurma(year)}
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
