import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NovabarSchool";

export default function SchoolNotificationPage() {

    const [notifications, setNotifications] = useState([]);
    const [formNotification, setFormNotification] = useState({
        title: "",
        description: ""

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
        setFormNotification({ ...formNotification, [e.target.name]: e.target.value });
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
                description: ""
            });
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <div className="w-screen">
            <NavbarSchool />
            <p>Página de Notificações</p>
            {
                notifications.map((notification) => {

                    return (
                        <div className="flex flex-col gap-3 max-w-[60%] m-auto">
                            <div className="border border-blue-600 rounded-md shadow-sm p-3">
                                <div className="mx-8">
                                    <p>{notification.title}</p>
                                    <p>{notification.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <form onSubmit={handleSubmitNotification} className="flex flex-col mt-6">
                <label htmlFor="title" className="text-gray-500">Título</label>
                <input

                    type="text"
                    name="title"
                    placeholder="Título"
                    value={formNotification.title}
                    onChange={handleChangeNotification}
                    className="rounded-md border border-gray-300 p-2 text-gray-500"
                />
                <label htmlFor="description" className="text-gray-500">Descrição</label>
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={formNotification.description}
                    onChange={handleChangeNotification}
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
    )
    
};
