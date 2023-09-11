import { useEffect, useState } from "react";
import api from "../axios/api";
import NavbarSchool from "../components/NovabarSchool";

export default function CreateStudent() {
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

  function handleChangeStudent(e) {
    setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
  }

  async function handleSubmitStudent(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/signup", formStudent);
      setReload(!reload);
      toast.success("Aluno criado com sucesso!");

      setFormSubject({
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

  return (
    <div className="bg-[#6D7DFF] h-screen w-screen ">
      <NavbarSchool />
      <div className=" flex flex-col justify-center items-center">
        <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <h1 className="text-center text-2xl font-bold text-gray-600">
            Adicionar Aluno
          </h1>

          <form onSubmit={handleSubmitSudent} className="flex flex-col mt-6">
            <label htmlFor="name" className="text-gray-500">
              Nome
            </label>
            <input
              type="text"
              name="name"
              placeholder={student.name}
              value={formStudent.name}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="parentsName" className="text-gray-500 mt-5">
              Nome dos pais
            </label>
            <textarea
              type="text"
              name="parentsName"
              placeholder={student.parentsName}
              value={formStudent.parentsName}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="email" className="text-gray-500 mt-5">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder={student.email}
              value={formStudent.email}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="class" className="text-gray-500 mt-5">
              Turma
            </label>
            <input
              type="text"
              name="class"
              placeholder={student.class}
              value={formStudent.class}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="register" className="text-gray-500 mt-5">
              Número de matrícula
            </label>
            <input
              type="text"
              name="register"
              placeholder={student.register}
              value={formStudent.register}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="password" className="text-gray-500 mt-5">
              Senha
            </label>
            <input
              type="text"
              name="password"
              placeholder={student.password}
              value={formStudent.password}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <button
              type="submit"
              className="bg-blue-800 text-white border p-3 mt-5 rounded-lg"
            >
              Salvar Edição
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
