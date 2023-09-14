import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Separar from "../assets/separacao.svg";
import Voltar from "../assets/voltar.svg";

export default function SchoolProfilePage() {
  const [user, setUser] = useState({});
  const [formProfile, setFormProfile] = useState({
    name: "",
    phone: "",
    description: "",
    email: "",
    address: "",
    cnpj: "",
  });
  const [reload, setReload] = useState(false);

  const navigate = useNavigate(); //sem uso ainda

  const id_user = localStorage.getItem("userId"); //sem uso auinda

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/school/profile");
        setUser(response.data);
        console.log(response.data);
        setFormProfile(response.data); //carrega os campos ja preenchidos
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, [reload]);

  //handlechange do form de dedição do profile
  function handleChangeProfile(e) {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  }

  //handle do logout

  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const response = await api.put("/school/edit", formProfile);

      setReload(!reload);
      toast.success("Edição realizada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen">
      <NavbarSchool />

      {/* Saudação */}
      <div className="mx-auto w-[1200px] mt-10">
        <p className="text-4xl text-center mb-10">
          Bem vindo, <span className="font-bold">{user.name}</span>
        </p>
        <div className="mt-10 ">

          
          {/* Seta - Voltar */}
          <Link to="/school">
            <div className="flex items-center gap-2 mb-2">
              <img src={Voltar} />
              <h1 className="text-[18px]">Perfil</h1>
            </div>
          </Link>

          {/* Perfil */}
          <p className="text-[16px] text-[#6D7DFF] font-bold">
            {" "}
            Seu email é:{" "}
            <span className="text-[18px] text-black font-medium">
              {user.email}
            </span>
          </p>
          <p className="text-[16px] text-[#6D7DFF] font-bold">
            Descrição:{" "}
            <span className="text-[18px] text-black font-medium">
              {user.description}
            </span>
          </p>
          <p className="text-[16px] text-[#6D7DFF] font-bold">
            Seu telefone é:{" "}
            <span className="text-[18px] text-black font-medium">
              {user.phone}
            </span>
          </p>
          <p className="text-[16px] text-[#6D7DFF] font-bold">
            Seu endereço é:{" "}
            <span className="text-[18px] text-black font-medium">
              {user.address}
            </span>
          </p>
          <p className="text-[16px] text-[#6D7DFF] font-bold">
            Cpnj:{" "}
            <span className="text-[18px] text-black font-medium">
              {user.cnpj}
            </span>
          </p>
        </div>

        {/* Divisor */}
        <div className="flex justify-center mt-4 mb-4">
          <img src={Separar} />
        </div>

        {/* Form */}
        <div className="mt-10">
          {/* Título */}
          <h2 className="text-[18px] mb-4">Formulário de edição da Escola</h2>

          {/* Inputs */}
          <div>
            <form onSubmit={handleSubmitProfile} className="flex flex-col">
              {/* Nome da escola */}
              <label>Nome da Escola</label>
              <input
                name="name"
                value={formProfile.name}
                onChange={handleChangeProfile}
                type="text"
                placeholder={user.name}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              {/* E-MAIL */}
              <label>
                Email{" "}
                <span className="italic text-xs">
                  *este campo não é editável
                </span>
              </label>
              <input
                name="email"
                disabled
                placeholder={user.email}
                value={formProfile.email}
                onChange={handleChangeProfile}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              {/* Descrição */}
              <label>Descrição</label>
              <input
                name="description"
                placeholder={user.description}
                value={formProfile.description}
                onChange={handleChangeProfile}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              {/* telefone */}
              <label>Telefone</label>
              <input
                name="telefone"
                placeholder={user.phone}
                value={formProfile.phone}
                onChange={handleChangeProfile}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              {/* Endereço */}
              <label>Endereço</label>
              <input
                name="address"
                placeholder={user.address}
                value={formProfile.address}
                onChange={handleChangeProfile}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              {/* CNPJ */}
              <label>CNPJ</label>
              <input
                name="cnpj"
                placeholder={user.cnpj}
                value={formProfile.cnpj}
                onChange={handleChangeProfile}
                className="border border-gray-400 rounded-md px-4 py-2 h-10 mb-4"
              />

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-md w-[250px] h-[44px]"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
