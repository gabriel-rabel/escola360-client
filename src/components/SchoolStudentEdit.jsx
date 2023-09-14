import React, { useState, useEffect, useRef } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {XCircleIcon} from "@heroicons/react/24/outline";

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

  const params = useParams();

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
  }, [userId]);

  function handleChangeStudent(e) {
    setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
  }

  async function handleSubmitStudent(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/school/edit_one/${userId}`, formStudent);
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
      onClose(); // Fecha o modal
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
      <div ref={formRef} className="bg-white p-8 w-[50%] rounded-lg shadow-lg">
        <XCircleIcon onClick={onClose} className="w-6 h-6 text-[#6A7AF5]"/>
        <h1 className="text-2xl font-bold text-gray-600 mb-4">Editar Aluno</h1>
        <form onSubmit={handleSubmitStudent}>
          <div className="flex flex-col mt-6">
            <label htmlFor="name" className="text-gray-500 font-medium">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formStudent.name}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="parentsName" className="text-gray-500 font-medium">
              Nome dos pais
            </label>
            <input
              type="text"
              name="parentsName"
              id="parentsName"
              value={formStudent.parentsName}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <div className="flex flex-col mt-6">
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
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="class" className="text-gray-500 font-medium">
              Turma
            </label>
            <input
              type="text"
              name="class"
              id="class"
              value={formStudent.class}
              onChange={handleChangeStudent}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <div className="flex flex-col mt-6">
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
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <div className="flex flex-col mt-6">
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
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-[#6A7AF5] text-white border p-3 mt-5 rounded-lg"
          >
            Salvar Edição
          </button>

          <button
            onClick={HandleDelete}
            className="bg-[#6A7AF5] text-white border p-3 mt-5 rounded-lg"
          >
            Excluir Aluno
          </button>
        </form>
        <button
          onClick={onClose}
          className="bg-[#6A7AF5] text-white border p-3 mt-2 rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
