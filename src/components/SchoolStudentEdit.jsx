import React, { useState, useEffect, useRef } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function SchoolStudentEdit({ userId, onClose, onEdit }) {
  const formRef = useRef(null);
  const [formStudent, setFormStudent] = useState({
    name: "",
    parentsName: "",
    email: "",
    class: "",
    register: "",
    password: "",
  });

  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getStudent() {
      try {
        const response = await api.get(`/school/get_one/${userId}`);
        setFormStudent({ ...response.data, password: "" });
        console.log(formStudent);
      } catch (error) {
        console.log(error);
      }
    }
    getStudent();
  }, [userId, reload]);

  function handleChangeStudent(e) {
    setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
  }

  async function handleSubmitStudent(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/school/edit_one/${userId}`, formStudent);
      console.log(response);
      toast.success("Aluno editado com sucesso!");
      onEdit(); // Chama a função de atualização da lista
      onClose(); // Fecha o modal

    } catch (error) {
      console.log(error);
    }
  }

  async function HandleDelete(e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/school/delete/${userId}`);
      toast.error("Aluno excluído com sucesso!");
      onClose(); // Fecha o modal
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center"
      onClick={(e) => {
        //função para fechar o modal ao clicar fora
        if (
          e.target === e.currentTarget &&
          !formRef.current.contains(e.target)
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={formRef}
        className="bg-white p-8 w-[50%] rounded-lg shadow-lg max-w-screen-sm"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-600 mb-2">
            Editar Aluno
          </h1>
          <div>
            <XCircleIcon onClick={onClose} className="w-6 h-6 text-[#6A7AF5]" />
          </div>
        </div>

        <form onSubmit={handleSubmitStudent}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-500 font-medium">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formStudent.name}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mt-">
            <label
              htmlFor="parentsName"
              className="text-gray-500 font-medium mt-3"
            >
              Nome dos pais
            </label>
            <input
              type="text"
              name="parentsName"
              id="parentsName"
              value={formStudent.parentsName}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="email" className="text-gray-500 font-medium">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="current-password"
              value={formStudent.email}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="class" className="text-gray-500 font-medium">
              Turma
            </label>
            <input
              type="text"
              name="class"
              id="class"
              value={formStudent.class}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="register" className="text-gray-500 font-medium">
              Matrícula
            </label>
            <input
              type="text"
              name="register"
              id="register"
              autoComplete="off"
              value={formStudent.register}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="password" className="text-gray-500 font-medium">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              value={formStudent.password}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              className="bg-[#6A7AF5] text-white border p-3 mt-4 rounded-lg w-[250px]"
            >
              Salvar Edição
            </button>

            <button
              onClick={HandleDelete}
              className=" text-red-500 font-bold p-3 pb-0 rounded-lg w-[250px]"
            >
              Excluir Aluno
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
