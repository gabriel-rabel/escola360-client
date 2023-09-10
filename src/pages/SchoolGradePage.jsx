import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NovabarSchool";

export default function SchoolGradePage() {
  const [subjects, setSubjects] = useState([]); // Altere subject para subjects
  const [formSubject, setFormSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  });
  const [reload, setReload] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="" >
      <div>
        <div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h1 className="font-bold mt-10">Crie uma matéria</h1>
        <form onSubmit={handleSubmitSubject} className="flex flex-col">
          <label htmlFor="name">Nome da matéria</label>
          <input
            type="text"
            name="name"
            value={formSubject.name}
            onChange={handleChangeSubject}
          />

          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            name="description"
            value={formSubject.description}
            onChange={handleChangeSubject}
          />

          <label htmlFor="teacher">Professor</label>
          <input
            type="text"
            name="teacher"
            value={formSubject.teacher}
            onChange={handleChangeSubject}
          />

          <button type="submit" className="border p-1 mt-2 rounded-md">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}
