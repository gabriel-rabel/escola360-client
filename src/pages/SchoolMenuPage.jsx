import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";


export default function SchoolMenuPage() {
  const [user, setUser] = useState([]);
  const [formMenu, setFormMenu] = useState({
    menu: "",
  });
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const id_user = localStorage.getItem("userId");

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
    <div className="h-screen w-screen">
      <NavbarSchool />
      
      <div className=" flex flex-col justify-center items-center">
        <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
        <Link to="/school">
          <div className="flex items-center gap-2 mb-2">
            <img src={Voltar} />
            <h1 className="text-[18px]">Edite o cardápio</h1>
          </div>
        </Link>
          <form onSubmit={handleSubmitMenu}>
            <div className="flex flex-col">

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
                className="self-center border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
