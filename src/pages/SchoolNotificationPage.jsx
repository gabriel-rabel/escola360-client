import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import formatarData from "../utils/dateFormatter";

export default function SchoolNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [formNotification, setFormNotification] = useState({
    title: "",
    description: "",
  });
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await api.get("/notification/get_all");
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNotifications();
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
      const response = await api.post("/notification/create", formNotification);
      setReload(!reload);
      toast.success("Notificação adicionada com sucesso!");
      // Limpar os campos do formulário após a adição
      setFormNotification({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteNotification(notificationId) {
    try {
      await api.delete(`/notification/delete/${notificationId}`);
      setReload(!reload); // Recarregue a lista de matérias após a exclusão
      toast.success("Notificação excluída com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#6D7DFF] h-screen w-screen">
      <NavbarSchool />
      <div className="flex flex-col mt-10 max-w-2xl">
        <div className="mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <h1 className="text-center text-2xl font-bold text-gray-600">
            Cadastre uma notificação
          </h1>
          <form
            onSubmit={handleSubmitNotification}
            className="flex flex-col mt-6 bg-white p-4 rounded-lg"
          >
            <label htmlFor="title" className="text-gray-500">
              Título
            </label>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formNotification.title}
              onChange={handleChangeNotification}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
            <label htmlFor="description" className="text-gray-500 mt-3">
              Descrição
            </label>
            <textarea
              type="text"
              rows={5}
              name="description"
              placeholder="Descrição"
              value={formNotification.description}
              onChange={handleChangeNotification}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white border p-3 mt-5 rounded-lg"
            >
              Cadastrar
            </button>
          </form>
        </div>
        <div className="mt-8">
          <table className="min-w-full divide-y divide-gray-200 shadow">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr key={notification._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {notification.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatarData(notification.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                    <Link to={`/notification/edit/${notification._id}`}>
                      Editar
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 cursor-pointer hover:underline">
                    <button
                      onClick={() => handleDeleteNotification(notification._id)}
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
    </div>
  );
}
