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
    <div className="w-screen scroll-hidden">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/school">
            <img src={Voltar} />
          </Link>
          <h1 className="text-[18px]">Edite o cardápio</h1>
        </div>

        <form onSubmit={handleSubmitMenu} className="mt-4">
          <div className="flex flex-col">
            <textarea
              type="text"
              rows={10}
              name="menu"
              value={formMenu.menu}
              onChange={handleChangeMenu}
              className="border border-gray-400 rounded-md px-4 py-2 mb-4"
            />
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
