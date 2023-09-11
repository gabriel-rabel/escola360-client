import NavbarSchool from "../components/NovabarSchool";
import { useEffect, useState } from "react";

export default function SchoolMenuPage(params) {
  const [formMenu, setFormMenu] = useState({
    name: "",
    description: "",
    teacher: "",
  });

  useEffect(() => {
    async function getMenus() {}
  });
  async function handleSubmitMenu(e) {
    e.preventDefault();
  }

  function handleChangeMenu(e) {}

  return (
    <div className="w-screen">
      <NavbarSchool />
      <p>Página de Cardápio</p>
      <div className=" flex flex-col justify-center items-center">
        <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <h1 className="text-center text-2xl font-bold text-gray-600">
            Cadastro de Cardápio
          </h1>
          <form onSubmit={handleSubmitMenu} className="flex flex-col mt-6">
            <label className="text-gray-500">Nome da matéria</label>
            <input
              type="text"
              name="name"
              value={formSubject.name}
              onChange={handleChangeMenu}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="description" className="text-gray-500 mt-5">
              Descrição
            </label>
            <textarea
              type="text"
              name="description"
              value={formSubject.description}
              onChange={handleChangeMenu}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />

            <label htmlFor="teacher" className="text-gray-500 mt-5">
              Professor
            </label>
            <input
              type="text"
              name="teacher"
              value={formSubject.teacher}
              onChange={handleChangeMenu}
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
      </div>
    </div>
  );
}
