import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NovabarSchool";
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
      <div className="max-w-[448px] rounded-3xl border-2 p-12 border-blue-800">
        <h1 className="text-center text-2xl font-bold text-gray-600">
          Cadastre uma matéria
        </h1>
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
      </div>

      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Descrição
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Professor
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Editar
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Deletar
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="py-2 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                  {subject.name}
                </td>
                <td className="px-3 py-2 text-left text-sm text-gray-900">
                  {subject.description}
                </td>
                <td className="px-3 py-2 text-left text-sm text-gray-900">
                  {subject.teacher}
                </td>
                <td className="px-3 py-2 text-left text-sm text-gray-900">
                  {subject.status}
                </td>
                <td className="px-3 py-2 text-left text-sm text-gray-900">
                  <Link to={`/school/subject-edit/${subject._id}`}>Editar</Link>
                </td>
                <td className="px-3 py-2 text-left text-sm text-gray-900">
                  <button
                    onClick={() => handleDeleteSubject(subject._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
