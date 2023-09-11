import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";

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
      <div className="mt-10 mx-32">
        <p>Bem vindo, Escola {user.name}.</p>
        <div className="mt-10">
          <h1 className="font-bold">Perfil</h1>
          <p>Seu email é: {user.email}</p>
          <p>Descrição: {user.description}</p>
          <p>Seu telefone é: {user.phone}</p>
          <p>Seu endereço é: {user.address}</p>
          <p>Cpnj: {user.cnpj}</p>
        </div>
        <div className="mt-10">
          <h2 className="font-bold">Formulário de edição da Escola</h2>
          <div>
            <form onSubmit={handleSubmitProfile} className="flex flex-col">
              <label>Nome da Escola</label>
              <input
                name="name"
                value={formProfile.name}
                onChange={handleChangeProfile}
                type="text"
                placeholder={user.name}
              />
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
              />
              <label>Descrição</label>
              <input
                name="description"
                placeholder={user.description}
                value={formProfile.description}
                onChange={handleChangeProfile}
              />
              <label>Telefone</label>
              <input
                name="telefone"
                placeholder={user.phone}
                value={formProfile.phone}
                onChange={handleChangeProfile}
              />
              <label>Endereço</label>
              <input
                name="address"
                placeholder={user.address}
                value={formProfile.address}
                onChange={handleChangeProfile}
              />
              <label>CNPJ</label>
              <input
                name="cnpj"
                placeholder={user.cnpj}
                value={formProfile.cnpj}
                onChange={handleChangeProfile}
              />
              <button
                type="submit"
                className="border mt-5 bg-slate-600 text-white rounded-md"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
