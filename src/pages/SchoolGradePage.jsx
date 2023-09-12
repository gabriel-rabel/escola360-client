import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";
import SubjectEditPage from "./SchoolSubjectEditPage";

export default function SchoolGradePage() {
  const [subjects, setSubjects] = useState([]);
  const [formSubject, setFormSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  });
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getSubjects() {
      try {
        const response = await api.get("/subject/get_all");
        setSubjects(response.data);
        console.log(response.data);
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

  return (
    <div className="w-screen">
      <NavbarSchool />
      <div className="mt-10 mx-32">
        <Link to="/school">
          <div className="flex items-center gap-2 mb-2">
            <img src={Voltar} />
            <h1 className="text-[18px]">Cadastre uma matéria</h1>
          </div>
        </Link>
        <form onSubmit={handleSubmitSubject} className="flex flex-col mt-6">
          <label className="text-gray-500">Nome da matéria</label>
          <input
            type="text"
            name="name"
            value={formSubject.name}
            onChange={handleChangeSubject}
            className="rounded-md border border-gray-300 p-2 text-gray-500"
          />

          <label htmlFor="description" className="text-gray-500 mt-5">
            Descrição
          </label>
          <textarea
            type="text"
            name="description"
            value={formSubject.description}
            onChange={handleChangeSubject}
            className="rounded-md border border-gray-300 p-2 text-gray-500"
          />

          <label htmlFor="teacher" className="text-gray-500 mt-5">
            Professor
          </label>
          <input
            type="text"
            name="teacher"
            value={formSubject.teacher}
            onChange={handleChangeSubject}
            className="rounded-md border border-gray-300 p-2 text-gray-500"
          />

          <button
            type="submit"
            className="bg-blue-800 text-white border p-3 mt-5 rounded-lg"
          >
            Salvar
          </button>
        </form>

        <div className="mt-10 max-w-xs">
          <table className="divide-y divide-gray-200 shadow">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  className=" max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Professor
                </th>
                <th
                  scope="col"
                  className="max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  className="max-w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="max-w-full px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.name}
                  </td>
                  <td className="max-w-full px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.teacher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                    <Link to={`/school/subject-edit/${subject._id}`}>
                      Editar
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 cursor-pointer hover:underline">
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
    </div>
  );
}
