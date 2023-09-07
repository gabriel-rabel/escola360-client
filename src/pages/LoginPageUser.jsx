import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/escola360logo.svg";

function LoginPageUser() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");

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

      navigate("/profile");

      console.log(form);
    } catch (error) {
      // lógica se der erro na requisição
      console.log(error);
    }
  }

  return (
    <div className="flex w-screen min-h-full justify-center items-center bg-gray-100">
      <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow">
        <img src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
          Entre na sua conta
        </h2>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPageUser;

/* 
VERSÃO SEM ESTILO
  <div>
      <div>
         <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
         />
         <h2>Entre na sua conta</h2>

         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="email">Email</label>
               <div>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="email"
                     required
                     value={form.email}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <div>
               <label htmlFor="password">Senha</label>
               <div>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     required
                     value={form.password}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <div>
               <button type="submit">Entrar</button>
            </div>
         </form>
      </div>
   </div>

*/
