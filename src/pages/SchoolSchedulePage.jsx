import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";
import Separar from "../assets/separacao.svg";

export default function SchoolSchedulePage() {
  const [schedules, setschedules] = useState([]);
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formSchedule, setFormSchedule] = useState({
    student: "",
    subjects: {},
    bimester: "",
  });
  const [reload, setReload] = useState(false);
  const selectedSubjects = Object.keys(formSchedule.subjects).filter(
    (subjectId) => formSchedule.subjects[subjectId]
  );

  const [search, setSearch] = useState("");
  const [selectUser, setSelectUser] = useState({});

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

  // Função de tratamento de mudança para as checkboxes
  function handleChangeSchedule(e) {
    const { name, value, checked } = e.target;

    if (name === "subjects") {
      setFormSchedule((prevState) => ({
        ...prevState,
        subjects: {
          ...prevState.subjects,
          [value]: checked,
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
      // Obtenha a lista de IDs das matérias selecionadas
      const selectedSubjectIds = Object.keys(formSchedule.subjects).filter(
        (subjectId) => formSchedule.subjects[subjectId]
      );

      // Verifique se pelo menos uma matéria foi selecionada
      if (selectedSubjectIds.length === 0) {
        toast.error("Selecione pelo menos uma matéria.");
        return;
      }

      // Crie um único cronograma com os assuntos selecionados
      const dataToSend = {
        student: selectUser._id,
        subjects: selectedSubjectIds,
        bimester: formSchedule.bimester,
      };

      const response = await api.post("/school/schedule/create", dataToSend);

      if (response.status === 201) {
        toast.success("Cronograma criado com sucesso!");
        // Limpar os campos do formulário após a adição
        setFormSchedule({
          student: "",
          subjects: {},
          bimester: "",
        });
        setSelectUser({});
        setReload(!reload);
      } else {
        toast.error("Erro ao criar cronograma.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar cronograma.");
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

  /* Para selecionar um seu */
  function handleSelectUser(e, user) {
    e.preventDefault();

    setSelectUser(user);
    setSearch("");
  }
  console.log(selectUser);

  return (
    <div className="w-screen scroll-hidden">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="mt-4">
          <Link to="/school">
            <div className="flex items-center gap-2 mb-2">
              <img src={Voltar} />

              {/* Título */}
              <h1 className="text-[18px] text-[#6D7DFF]">
                Cadastre um cronograma
              </h1>
            </div>
          </Link>

          {/* Form */}
          <form
            onSubmit={handleSubmitSchedule}
            className="flex flex-col mt-6 bg-white rounded-lg"
          >
            {/* Pesquisa */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-2"
              placeholder="Selecione um Aluno"
            />

            {search.length > 0 && (
              <div>
                {users

                  .filter((user) =>
                    user.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  )

                  .map((user) => {
                    return (
                      <div
                        key={user._id}
                        onClick={(e) => handleSelectUser(e, user)}
                      >
                        <p>{user.name}</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {selectUser && (
              <div>
                <p className="font-bold text-[16px] mb-4 ">
                  {selectUser.name}
                </p>
              </div>
            )}

            <label className="text-gray-500">Período</label>
            <select
              name="bimester"
              value={formSchedule.bimester}
              onChange={handleChangeSchedule}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
            >
              <option value="">Selecione o bimestre</option>
              <option value="1bim">1º bimestre</option>
              <option value="2bim">2º bimestre</option>
              <option value="3bim">3º bimestre</option>
              <option value="4bim">4º bimestre</option>
            </select>

            <label className="text-gray-500">Matérias</label>
            <div className="grid grid-cols-3 gap-2">
              {subjects.map((subject) => (
                <div key={subject._id} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject._id}
                    onChange={handleChangeSchedule}
                    checked={formSchedule.subjects[subject._id] || false}
                    className="mr-2 "
                  />
                  <span>{subject.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center mb-4">
              <button
                type="submit"
                className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <Link to="/school/report-card">
            <div className="flex justify-center items-center text-[#6D7DFF] font-bold">
              Ver Boletins
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex justify-center mt-10 mb-4">
          <img src={Separar} />
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
                      <span key={subjectId}> */
}
{
  /*index > 0 ? ", " : ""}{" "}
                        {/* Adicione uma vírgula entre os nomes, exceto para o primeiro }
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
        </div> */
}
