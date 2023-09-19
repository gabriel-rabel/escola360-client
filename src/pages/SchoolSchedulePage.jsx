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

  const [primeiroBi, setPrimeiroBi] = useState([
    {
      subjects: "matematica",
      notas: "",
      faltas: "",
    },

    {
      subjects: "portugues",
      notas: "",
      faltas: "",
    },

    {
      subjects: "historia",
      notas: "",
      faltas: "",
    },

    {
      subjects: "geografia",
      notas: "",
      faltas: "",
    },
  ]);

  const [segundoBi, setSegundoBi] = useState([
    {
      subjects: "matematica",
      notas: "",
      faltas: "",
    },

    {
      subjects: "portugues",
      notas: "",
      faltas: "",
    },

    {
      subjects: "historia",
      notas: "",
      faltas: "",
    },

    {
      subjects: "geografia",
      notas: "",
      faltas: "",
    },
  ]);

  const [terceiroBi, setTerceiroBi] = useState([
    {
      subjects: "matematica",
      notas: "",
      faltas: "",
    },

    {
      subjects: "portugues",
      notas: "",
      faltas: "",
    },

    {
      subjects: "historia",
      notas: "",
      faltas: "",
    },

    {
      subjects: "geografia",
      notas: "",
      faltas: "",
    },
  ]);

  const [quartoBi, setQuartoBi] = useState([
    {
      subjects: "matematica",
      notas: "",
      faltas: "",
    },

    {
      subjects: "portugues",
      notas: "",
      faltas: "",
    },

    {
      subjects: "historia",
      notas: "",
      faltas: "",
    },

    {
      subjects: "geografia",
      notas: "",
      faltas: "",
    },
  ]);

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

  function handlePrimeiroBi(e) {
    const array = primeiroBi;
    array[e.target.id];
    setPrimeiroBi([]);
  }

  return (
    <div className="w-screen scroll-hidden">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="mt-4">
          <Link to="/school">
            <div className="flex items-center gap-2 mb-2">
              <img src={Voltar} />

              {/* Título */}
              <h1 className="text-[18px]">Criar um Boletim</h1>
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
                <p className="font-bold text-[16px] mb-4 ">{selectUser.name}</p>
              </div>
            )}

            {/* Bimestres */}

            {/* PRIMEIRO BIMESTRE */}
            <div className="mt-4 border-2 p-4 border-gray-800 rounded-lg">
              <h1 className="text-2xl font-bold mb-4">1 Bim</h1>
              <div className="flex flex-col">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="">
                      <th className="text-left">Matéria</th>
                      <th className="text-left">Nota</th>
                      <th className="text-left">Faltas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Matemática */}
                    <tr>
                      <td>Matemática</td>
                      <td>
                        <input
                          type="number"
                          id="0"
                          value={primeiroBi[0].notas}
                          className="d-flex align-items-center justify-content-center"
                          onChange={handlePrimeiroBi}
                        />
                      </td>
                      <td>
                        <input type="number" value={primeiroBi[0].faltas} />
                      </td>
                    </tr>

                    {/* Português */}
                    <tr>
                      <td>Português</td>
                      <td>
                        <input
                          type="number"
                          id="1"
                          value={primeiroBi[1].notas}
                          className="d-flex align-items-center justify-content-center"
                        />
                      </td>
                      <td>
                        <input type="number" value={primeiroBi[1].faltas} />
                      </td>
                    </tr>

                    {/* História */}
                    <tr>
                      <td>História</td>
                      <td>
                        <input
                          type="number"
                          id="2"
                          value={primeiroBi[2].notas}
                          className="d-flex align-items-center justify-content-center"
                        />
                      </td>
                      <td>
                        <input type="number" value={primeiroBi[2].faltas} />
                      </td>
                    </tr>

                    {/* Geografia */}
                    <tr>
                      <td>Geografia</td>
                      <td>
                        <input
                          type="number"
                          id="3"
                          value={primeiroBi[3].notas}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input type="number" value={primeiroBi[3].faltas} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Botão */}
              <div className="mt-4 flex justify-center items-center">
                <button className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
