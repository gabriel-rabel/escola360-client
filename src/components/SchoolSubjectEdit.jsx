import React, { useState, useEffect, useRef } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function SubjectEditPage({ subjectId, onClose, onEdit }) {
  const formRef = useRef(null);
  const [subject, setSubject] = useState({});
  const [formSubject, setFormSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  });

  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getSubject() {
      try {
        const response = await api.get(`/subject/get_one/${subjectId}`);
        console.log(response.data);
        setFormSubject(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubject();
  }, [subjectId]);

  function handleChangeSubject(e) {
    setFormSubject({ ...formSubject, [e.target.name]: e.target.value });
  }

  async function handleSubmitSubject(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/subject/edit/${subjectId}`, formSubject);
      console.log(response);
      toast.success("Matéria editada com sucesso!");
      onEdit();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSubject(subjectId, e) {
    console.log(e);
    console.log(subjectId);
    e.preventDefault();
    try {
      const response = await api.delete(`/subject/delete/${subjectId}`);
      console.log(response);
      setReload(!reload); // Recarregue a lista de matérias após a exclusão
      toast.success("Matéria excluída com sucesso!");
      onClose()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center"
      onClick={(e) => {
        // Função para fechar o modal ao clicar fora
        if (
          e.target === e.currentTarget &&
          !formRef.current.contains(e.target)
        ) {
          onClose();
        }
      }}
    >
      <div ref={formRef} className="bg-white p-8 w-[50%] rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-600">
            Editar Disciplina
          </h1>
          <div className="cursor-pointer">
            <XCircleIcon onClick={onClose} className="w-6 h-6 text-[#6A7AF5]" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitSubject} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-500 font-medium">
              Nome
            </label>
            <input
              type="text"
              name="name"
              placeholder={subject.name}
              value={formSubject.name}
              onChange={handleChangeSubject}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="teacher" className="text-gray-500 font-medium">
              Professor
            </label>
            <input
              type="text"
              name="teacher"
              placeholder={subject.teacher}
              value={formSubject.teacher}
              onChange={handleChangeSubject}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="description" className="text-gray-500 font-medium">
              Descrição
            </label>
            <textarea
              type="text"
              name="description"
              placeholder={subject.description}
              value={formSubject.description}
              onChange={handleChangeSubject}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>

          {/* Salvar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
            >
              Salvar Edição
            </button>
          </div>

          {/* Deletar correto */}
          <button
            className="px-6 py-4 whitespace-nowrap text-sm text-red-500 cursor-pointer hover:underline font-bold "
            onClick={(e) => handleDeleteSubject(formSubject._id, e)}
          >
            Deletar Matéria
          </button>
        </form>
      </div>
    </div>
  );
}
