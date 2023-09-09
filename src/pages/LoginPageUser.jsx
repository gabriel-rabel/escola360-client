import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/escola360logo.svg";
import toast from 'react-hot-toast';

function LoginPageUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //Faça a requisição para a rota /login da sua api aqui.
      let response;
      response = await axios.post("http://localhost:4000/user/login", form);

      //GUARDAR O TOKEN E ID DE QUEM LOGOU
      const token = response.data.token;
      const userId = response.data.user._id;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      toast.success('Login realizado com sucesso!')

      navigate("/user");

    } catch (error) {
      toast.error("Senha ou usuário incorreto, tente novamente!")
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen w-screen">
      {/*   <!-- Coluna esquerda com o logotipo e background indigo --> */}
      <div className="flex-1 flex justify-center items-center bg-indigo-700 w-1/2">
        <img src={logo} alt="Your Company" className="w-32" />
      </div>

      {/*   <!-- Coluna direita com o formulário de login --> */}
      <div className="flex-1 flex justify-center items-center w-1/2">
        <div>
          <div className="mb-4 w-64">
            <h1 className="text-4xl font-raleway font-semibold mb-6 text-gray-900">
              Bem Vindo Aluno!{" "}
            </h1>
            <p>Entre com seu login e senha</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-64">
              <label htmlFor="email" className="block font-ligth ">
                Email*
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 w-360 h-10 w-64"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-ligth">
                Senha*
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 py-2 h-10 w-64"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="mt-4 w-full bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    
  );
}

export default LoginPageUser;
