import React, { useState, useEffect } from "react";
import api from "../axios/api";
import Flor2 from "../assets/flor2.svg";
import Voltar from "../assets/voltar.svg";
import NavbarSchool from "../components/NavbarSchool";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SchoolReportCardPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [reload, setReload] = useState(false);

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

  //tem q ajeitar esse get p mandar o id do user pra requisicao,
  //mostrar o name em vez de id e organizar por bimestre
  async function getSchedules(studentId) {
    try {
      const response = await api.get(`/school/schedule/get_all`);
      setSchedules(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    // Chame a função getSchedules com o ID do aluno selecionado
    getSchedules(e.target.value);
  };

  return (
    <div className="w-screen">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/school">
            <img src={Voltar} alt="Voltar" />
          </Link>
          <h1 className="text-[18px]">Aluno</h1>
        </div>
        <select
          name="student"
          value={selectedUser}
          onChange={handleUserChange}
          className="block rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
        >
          <option value="">Selecione o aluno</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <h2 className="text-[18px] mb-2">1º Bimestre</h2>
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule._id}>
                <strong>Matérias:</strong> {schedule.subjects}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
