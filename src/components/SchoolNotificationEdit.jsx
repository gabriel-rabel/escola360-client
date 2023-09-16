import { useEffect, useState, useRef } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function SchoolNotificationEdit({
  notificationId,
  onClose,
  onEdit
}) {
  const formRef = useRef(null);
  const [notification, setNotification] = useState({});
  const [formNotification, setFormNotification] = useState({
    title: "",
    description: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getNotification() {
      try {
        const response = await api.get(
          `/notification/get_one/${notificationId}`
        );
        setNotification(response.data);
        console.log(response.data);
        setFormNotification(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNotification();
  }, [reload]);

  function handleChangeNotification(e) {
    setFormNotification({
      ...formNotification,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitNotification(e) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/notification/edit/${notificationId}`,
        formNotification
       
      );
      toast.success("Notificação editada com sucesso!");
      onEdit(); // Chama a função de atualização da lista
      onClose(); // Fecha o modal
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function HandleDelete(e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/notification/delete/${notificationId }`);
      toast.error("Notificação excluída com sucesso!");
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
      <div ref={formRef} className="bg-white p-8 w-[50%] rounded-lg shadow-lg max-w-screen-sm">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-600 mb-2">
          Editar Notificação
        </h1>
        <div>
          <XCircleIcon onClick={onClose} className="w-6 h-6 text-[#6A7AF5]" />
        </div>
        </div>

        <form onSubmit={handleSubmitNotification}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-500 font-medium">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formNotification.title}
              onChange={handleChangeNotification}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-gray-500 font-medium">Descrição</label>
            <textarea
              type="text"
              rows={5}
              name="description"
              value={formNotification.description}
              onChange={handleChangeNotification}
              className="rounded-md border border-gray-300 p-2 text-gray-500"
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-[#6A7AF5] text-white border p-3 mt-4 rounded-lg w-[250px]"
            >
              Salvar Edição
            </button>
            <button
              onClick={HandleDelete}
              className=" text-red-500 font-bold p-3 pb-0 rounded-lg w-[250px]"
            >
              Excluir Notificação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
