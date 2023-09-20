import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";
import logo from "../assets/escola360logo.svg";


//página nao sera usada. apenas para teste


function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState();

  const [userType, setUserType] = useState("user");

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getUrl(photo) {
    //photo = state com a foto guardada
    try {
      const multiPartForm = new FormData();
      multiPartForm.append("picture", photo);
      const response = await api.post("/upload/file", multiPartForm);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    //lógica de submit do form
    e.preventDefault();
    try {
      //chamada para api de upload
      const url = await getUrl(photo);

      const formWithPhoto = {
        ...form,
        profilePicture: url,
      };

      await axios.post("http://localhost:4000/school/signup", formWithPhoto);

      navigate("/login");
    } catch (error) {
      // lógico se der erro na requisição
      alert("Erro ao cadastrar usuário");
      console.log(error);
    }
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
  }


  return (
    <div className="flex h-screen w-screen">
       {/*   <!-- Coluna esquerda com o logotipo e background indigo --> */}
       <div className="bg-login flex-1 flex justify-center items-center w-1/2">
        <Link to="/">
        <img src={logo} alt="Your Company" className="w-40" />
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center w-1/2">
        <div>
          <div className="mb-4 w-64">
            <h1 className="text-4xl font-raleway font-semibold mb-2 text-gray-900">
              Bem Vindo{" "}
            </h1>
            <p className="mb-10 font-raleway font-medium">
              Área de cadastro de escola.
            </p>
            
          </div>
      {/*   <!-- Coluna direita com o formulário de login --> */}
        

          <form className="mt-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Foto de perfil
              </label>
              <div className="flex items-center mt-1 ">
                <label
                  htmlFor="photo"
                  className="w-full text-center cursor-pointer bg-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-600 rounded-md shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Escolher Foto
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                CADASTRE-SE
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Problemas com o cadastro?{" "}
            <a
              href="https://wa.me/+5511999999999/?text=Não%20consegui%20me%20cadastrar%20no%20site"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              Entre em contato com a gente
            </a>
          </p>
          <p className="text-xs">*Seu cadastro passará por um processo de aprovação. Aguarde, em até 48 horas você receberá um e-mail de confirmação.</p>
        </div>
      </div> 
      </div>

  );
}

export default SignupPage;

