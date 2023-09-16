import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";
import Separar from "../assets/separacao.svg";
import SchoolSubjectEdit from "../components/SchoolSubjectEdit";

export default function SchoolGradePage() {
  const [subjects, setSubjects] = useState([]);
  const [formSubject, setFormSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  });
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

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

  function handleChangeSubject(e) {
    setFormSubject({ ...formSubject, [e.target.name]: e.target.value });
  }

  async function handleSubmitSubject(e) {
    e.preventDefault();
    try {
      const response = await api.post("/subject/create", formSubject);
      setReload(!reload);
      toast.success("Matéria adicionada com sucesso!");
      // Limpar os campos do formulário após a adição
      setFormSubject({
        name: "",
        description: "",
        teacher: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSubject(subjectId) {
    try {
      await api.delete(`/subject/delete/${subjectId}`);
      setReload(!reload); // Recarregue a lista de matérias após a exclusão
      toast.success("Matéria excluída com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  const openEditModal = (subjectId) => {
    setSelectedSubjectId(subjectId);
  };

  const closeEditModal = () => {
    setSelectedSubjectId(null);
  };

  return (
    <div className="w-screen">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/school">
            <img src={Voltar} />
          </Link>
          <h1 className="text-[18px]">Cadastre uma matéria</h1>
        </div>

        <form onSubmit={handleSubmitSubject} className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="block">
              Nome da matéria
            </label>
            <input
              type="text"
              name="name"
              value={formSubject.name}
              onChange={handleChangeSubject}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="block">
              Descrição
            </label>
            <textarea
              type="text"
              name="description"
              rows="4"
              value={formSubject.description}
              onChange={handleChangeSubject}
              className="border border-gray-400 rounded-md px-4 py-2 mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="teacher" className="block">
              Professor
            </label>
            <input
              type="text"
              name="teacher"
              value={formSubject.teacher}
              onChange={handleChangeSubject}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
            >
              Salvar
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-10 mb-4">
          <img src={Separar} />
        </div>

        <div className="mt-4 max-w-full rounded-md border-gray-300">
          <div className="text-[24px] text-center font-bold h-[30px] flex items-center">
            <h1>Lista de Disciplinas</h1>
          </div>
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
                  className="text-left text-md font-medium text-gray-500 tracking-wider px-4 py-2"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-wider px-4 py-2"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-normal px-4 py-2"
                >
                  Professor
                </th>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-wider px-4 py-2"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-wider px-4 py-2"
                >
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects
                .filter((subject) => subject.active === true)
                .filter((subject) =>
                  subject.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((subject) => (
                  <tr key={subject._id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        onClick={() => openEditModal(subject._id)}
                        className="text-[#6D7DFF] font-bold"
                      >
                        {subject.name}
                      </button>
                    </td>
                    <td className="px-4 py-2 whitespace-normal text-sm font-medium text-gray-900">
                      {subject.description}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {subject.teacher}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {subject.status}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-red-500 cursor-pointer hover:underline">
                      <button onClick={() => handleDeleteSubject(subject._id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSubjectId && (
        <SchoolSubjectEdit
          subjectId={selectedSubjectId}
          onClose={closeEditModal}
          onEdit={() => {
            setReload(!reload);
          }}
        />
      )}
    </div>
  );
}
