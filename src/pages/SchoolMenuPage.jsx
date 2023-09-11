import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NovabarSchool";
import formatarData from "../utils/dateFormatter";

export default function SchoolMenuPage() {

      const [user, setUser] = useState([]);
      const [formMenu, setFormMenu] = useState({
        menu:"",
      });
      const [reload, setReload] = useState(false);

      const navigate = useNavigate();
      const id_user = localStorage.getItem("userId")

      useEffect(() => {
        async function getProfile() {
          try {
            const response = await api.get("/school/profile");
            setUser(response.data);
            console.log(response.data);
            setFormMenu(response.data); //carrega os campos ja preenchidos
          } catch (error) {
            console.log(error);
          }
        }
        getProfile();
      }, [reload]);

      //handlechange do form de de edição do menu
      function handleChangeMenu(e) {
        setFormMenu({ ...formMenu, [e.target.name]: e.target.value });
      }

      async function handleSubmitMenu(e) {
        e.preventDefault();
        try {
          const response = await api.put("/school/edit", formMenu);
    
          setReload(!reload);
          toast.success("Cardápio atualizado com sucesso!");
        } catch (error) {
          console.log(error);
        }
      }


  return (
    <div className="bg-[#6D7DFF] h-screen w-screen">
      <NavbarSchool />
      <div className=" flex flex-col justify-center items-center">
        <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
          <h1 className="text-center text-2xl font-bold text-gray-600">
            Cardápio
          </h1>
          <p className="text-center text-gray-500 mb-10 font-medium">
            Edite o cardapio abaixo.
          </p>
          <form onSubmit={handleSubmitMenu}>
            <div className="flex flex-col">
              <label className="text-gray-500 font-medium">Semana</label>
              <textarea
                type="text"
                rows={10}
                name="menu"
                value={formMenu.menu}
                onChange={handleChangeMenu}
                className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 mt-4 hover:bg-blue-400"
              >
                Salvar
              </button>

              <Link
                to="/school/profile"
                className="text-blue-500 text-center mt-4"
              >
                Voltar
              </Link>

              </div>

              </form>
              </div>
              </div>

    </div>
  );
}
