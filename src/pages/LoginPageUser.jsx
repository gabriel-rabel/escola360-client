import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/escola360logo.svg"

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

         //GUARDAR O TOKEN E ID DE QUEM LOGOU
         //const token = response.data.token;
         //const userId = response.data.user._id;

         //localStorage.setItem("userToken", token);
         //localStorage.setItem("userId", userId);

/*          navigate("/profile"); */

console.log(form)

      } catch (error) {
         // lógica se der erro na requisição
         console.log(error);
      }
   }

   function handleRadio(e) {
      setUserType(e.target.value);
   }

   return (
      <div>
      <div>
         <img
            src={logo}
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
