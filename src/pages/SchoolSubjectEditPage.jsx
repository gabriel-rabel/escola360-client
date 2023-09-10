import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";

export default function SubjectEditPage() {
  const [subject, setSubject] = useState({});
  const [formSubject, setFormSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  });


  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSubject() {
      try {
        const response = await api.get(`/subject/get_one/${params.id_subject}`);
        setSubject(response.data);
        console.log(response.data);
        setFormSubject(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubject();
  }, []);

  function handleChangeSubject(e) {
    setFormSubject({ ...formSubject, [e.target.name]: e.target.value });
  }

  async function handleSubmitSubject(e) {
    e.preventDefault();
    try {
      const response = await api.put(
        `/subject/edit/${params.id_subject}`,
        formSubject
      );
      navigate("/school/grade");
      toast.success("Matéria editada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen">
    <div className="max-w-[448px] rounded-3xl border-2 p-12 border-blue-800">
  <h1 className="text-center text-2xl font-bold text-gray-600">Editar Matéria</h1>
  <p className="text-center text-gray-500 mb-10 font-medium">
    Edite os campos abaixo para alterar a matéria.
  </p>
  <form onSubmit={handleSubmitSubject} className="flex flex-col mt-6">
    <label htmlFor="name" className="text-gray-500">Nome</label>
    <input
      type="text"
      name="name"
      placeholder={subject.name}
      value={formSubject.name}
      onChange={handleChangeSubject}
      className="rounded-md border border-gray-300 p-2 text-gray-500"
    />

    <label htmlFor="description" className="text-gray-500 mt-5">Descrição</label>
    <textarea
      type="text"
      name="description"
      placeholder={subject.description}
      value={formSubject.description}
      onChange={handleChangeSubject}
      className="rounded-md border border-gray-300 p-2 text-gray-500"
    />

    <label htmlFor="teacher" className="text-gray-500 mt-5">Professor</label>
    <input
      type="text"
      name="teacher"
      placeholder={subject.teacher}
      value={formSubject.teacher}
      onChange={handleChangeSubject}
      className="rounded-md border border-gray-300 p-2 text-gray-500"
    />

    <button type="submit" className="bg-blue-800 text-white border p-3 mt-5 rounded-lg">
      Salvar Edição
    </button>
  </form>
</div>
</div>

  );
}
