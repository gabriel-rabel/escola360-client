import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import formatarData from "../utils/dateFormatter";
import Voltar from "../assets/voltar.svg";

export default function SchoolSchedulePage() {
  const [schedules, setschedules] = useState([]);
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formSchedule, setFormSchedule] = useState({
    student: "",
    subjects: {},
  });
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

  useEffect(() => {
    async function getSubjects() {
      try {
        const response = await api.get("/subject/get_all");
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubjects();
  }, [reload]);

  useEffect(() => {
    async function getSchedules() {
      try {
        const response = await api.get("/school/schedule/get_all");
        setschedules(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSchedules();
  }, [reload]);

  // Função para verificar se um valor está presente em uma matriz
  function isValueInArray(value, array) {
    return array.indexOf(value) !== -1;
  }

  // Função de tratamento de mudança para as checkboxes
  function handleChangeSchedule(e) {
    const { name, value, checked } = e.target;

    if (name === "subjects") {
      setFormSchedule((prevState) => ({
        ...prevState,
        subjects: {
          ...prevState.subjects,
          [value]: checked, // Atualizar o valor da matéria com base na seleção da checkbox
        },
      }));
    } else {
      setFormSchedule({
        ...formSchedule,
        [name]: value,
      });
    }
  }

  async function handleSubmitSchedule(e) {
    e.preventDefault();
    try {
      // Obtenha os IDs dos usuários e matérias selecionados do estado
      const studentId = formSchedule.student;
      const subjectIds = Object.keys(formSchedule.subjects).filter(
        (subjectId) => formSchedule.subjects[subjectId]
      );

      // Crie o objeto de dados a ser enviado com os IDs
      const dataToSend = {
        student: formSchedule.student, // Usar o ID do aluno selecionado no formulário
        subjects: subjectIds,
      };

      const response = await api.post("/school/schedule/create", dataToSend);
      setReload(!reload);
      toast.success("Cronograma criado com sucesso!");
      // Limpar os campos do formulário após a adição
      setFormSchedule({
        student: "",
        subjects: {},
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSchedule(scheduleId) {
    try {
      await api.delete(`/school/schedule/delete/${scheduleId}`);
      setReload(!reload); // Recarregue a lista de matérias após a exclusão
      toast.success("Cronograma excluído com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen">
      <NavbarSchool />
      <div className="mt-10 mx-auto max-w-2xl">
        <div className="mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <Link to="/school">
            <div className="flex items-center gap-2 mb-2">
              <img src={Voltar} />
              <h1 className="text-[18px] text-[#6D7DFF]">
                Cadastre um cronograma
              </h1>
            </div>
          </Link>
          <form
            onSubmit={handleSubmitSchedule}
            className="flex flex-col mt-6 bg-white p-4 rounded-lg"
          >
            <label htmlFor="student" className="text-gray-500">
              Aluno
            </label>
            <select
              name="student"
              value={formSchedule.student}
              onChange={handleChangeSchedule}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            >
              <option value="">Selecione o aluno</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}{" "}
                </option>
              ))}
            </select>

            <label className="text-gray-500">Matérias</label>
            {subjects.map((subject) => (
              <div key={subject._id} className="flex items-center mt-1">
                <input
                  type="checkbox"
                  name="subjects"
                  value={subject._id}
                  onChange={handleChangeSchedule}
                  checked={formSchedule.subjects[subject._id] || false}
                  className="mr-2"
                />
                <span>{subject.name}</span>
              </div>
            ))}

            <button
              type="submit"
              className="bg-[#6D7DFF] text-white border p-3 mt-5 rounded-lg"
            >
              Cadastrar
            </button>
          </form>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border-2 bg-white shadow-md border-blue-500">
          <table className="min-w-full divide-y divide-gray-200 shadow">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#6D7DFF]"
                >
                  Aluno
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#6D7DFF]"
                >
                  Matérias
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#6D7DFF]"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#6D7DFF]"
                >
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {schedule.student}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {schedule.subjects.map((subjectId, index) => (
                      <span key={subjectId}>
                        {index > 0 ? ", " : ""}{" "}
                        {/* Adicione uma vírgula entre os nomes, exceto para o primeiro */}
                        {
                          subjects.find((subject) => subject._id === subjectId)
                            ?.name
                        }
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D7DFF] hover:underline">
                    <Link to={`/schedule/edit/${schedule._id}`}>Editar</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 cursor-pointer hover:underline">
                    <button onClick={() => handleDeleteSchedule(schedule._id)}>
                      Deletar
                    </button>
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
