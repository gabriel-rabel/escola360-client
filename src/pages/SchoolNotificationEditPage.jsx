import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";

export default function SchoolNotificationEdit() {
  const [notification, setNotification] = useState({});
  const [formNotification, setFormNotification] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getNotification() {
      try {
        const response = await api.get(
          `/notification/get_one/${params.id_notification}`
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
        `/notification/edit/${params.id_notification}`,
        formNotification
      );
      setReload(!reload);
      navigate("/school/notification");
      toast.success("Notificação editada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#6D7DFF] h-screen w-screen ">
      <div className=" flex flex-col justify-center items-center">
        <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <h1 className="text-center text-2xl font-bold text-gray-600">
            Editar Notificação
          </h1>
          <p className="text-center text-gray-500 mb-10 font-medium">
            Edite os campos abaixo para alterar a notificação.
          </p>

          <form onSubmit={handleSubmitNotification}>
            <div className="flex flex-col">
              <label className="text-gray-500 font-medium">Título</label>
              <input
                type="text"
                name="title"
                value={formNotification.title}
                onChange={handleChangeNotification}
                className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
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
                className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 font-medium"
              >
                Salvar Edição
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
