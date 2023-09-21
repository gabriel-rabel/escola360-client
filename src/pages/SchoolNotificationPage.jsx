import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Separar from "../assets/separacao.svg";
import formatarData from "../utils/dateFormatter";
import Voltar from "../assets/voltar.svg";
import SchoolNotificationEdit from "../components/SchoolNotificationEdit";

export default function SchoolNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [formNotification, setFormNotification] = useState({
    title: "",
    description: "",
  });
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await api.get("/notification/get_all");
        setNotifications(response.data);
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
      await api.post("/notification/create", formNotification);
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

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const openEditModal = (notificationId) => {
    setSelectedNotificationId(notificationId);
  };

  const closeEditModal = () => {
    setSelectedNotificationId(null);
    setReload(!reload);
  };

  return (
    <div className="w-screen scroll-hidden">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/6">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/school">
            <img src={Voltar} />
          </Link>
          <h1 className="text-[18px]">Cadastre uma notificação</h1>
        </div>

        <form onSubmit={handleSubmitNotification} className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="block">
              Título
            </label>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formNotification.title}
              onChange={handleChangeNotification}
              className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="block">
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
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-10 mb-4">
          <img src={Separar} />
        </div>

        <div className="mt-4 max-w-full rounded-md border-gray-300">
          <div className="text-[24px] text-center font-bold h-[30px] flex items-center">
            <h1>Lista de Notificações</h1>
          </div>
          <div className="flex flex-col mt-6 mb-6">
            <input
              placeholder="Pesquise"
              type="search"
              value={search}
              onChange={handleSearch}
              className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
            />
          </div>
          <table className="w-full divide-y divide-gray-200 border-gray-200 scroll-hidden">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-wider"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="text-left text-md font-medium text-gray-500 tracking-normal py-2 px-2"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  className="flex flex-col   items-end py-3 px-6 text-left text-md font-medium text-gray-500  tracking-wider"
                >
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications
                .filter((notification) =>
                  notification.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((notification) => (
                  <tr key={notification._id}>
                    <td className="flex flex-col items-start  py-4 whitespace-normal text-sm font-medium text-gray-900">
                      <button
                        onClick={() => openEditModal(notification._id)}
                        className="text-[#6D7DFF] font-bold"
                      >
                        {" "}
                        {notification.title}
                      </button>
                    </td>
                    <td className="py-4 px-2 whitespace-normal text-sm text-gray-900">
                      {notification.description}
                    </td>
                    <td className="flex flex-col items-end py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatarData(notification.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedNotificationId && (
        <SchoolNotificationEdit
          notificationId={selectedNotificationId}
          onClose={closeEditModal}
          onEdit={() => {
            setReload(!reload);
          }}
        />
      )}
    </div>
  );
}
