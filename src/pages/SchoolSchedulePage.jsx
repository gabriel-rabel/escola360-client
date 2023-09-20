import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";
import Voltar from "../assets/voltar.svg";

export default function SchoolSchedulePage() {
  const [users, setUsers] = useState([]);

  const [primeiroBi, setPrimeiroBi] = useState([
    {
      subject: "matematica",
      note: "",
      missed: "",
    },

    {
      subject: "portugues",
      note: "",
      missed: "",
    },

    {
      subject: "historia",
      note: "",
      missed: "",
    },

    {
      subject: "geografia",
      note: "",
      missed: "",
    },
  ]);

  const [segundoBi, setSegundoBi] = useState([
    {
      subject: "matematica",
      note: "",
      missed: "",
    },

    {
      subject: "portugues",
      note: "",
      missed: "",
    },

    {
      subject: "historia",
      note: "",
      missed: "",
    },

    {
      subject: "geografia",
      note: "",
      missed: "",
    },
  ]);

  const [terceiroBi, setTerceiroBi] = useState([
    {
      subject: "matematica",
      note: "",
      missed: "",
    },

    {
      subject: "portugues",
      note: "",
      missed: "",
    },

    {
      subject: "historia",
      note: "",
      missed: "",
    },

    {
      subject: "geografia",
      note: "",
      missed: "",
    },
  ]);

  const [quartoBi, setQuartoBi] = useState([
    {
      subject: "matematica",
      note: "",
      missed: "",
    },

    {
      subject: "portugues",
      note: "",
      missed: "",
    },

    {
      subject: "historia",
      note: "",
      missed: "",
    },

    {
      subject: "geografia",
      note: "",
      missed: "",
    },
  ]);

  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");
  const [selectUser, setSelectUser] = useState({});

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await api.get("/user/get_all");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudents();
  }, [reload]);

  /* Para selecionar um seu */
  function handleSelectUser(e, user) {
    e.preventDefault();

    setSelectUser(user);
    setSearch("");
  }

  //COPIAR ESSAS DUAS FUNCOES 1 bi
  function handlePrimeiroBi(index, type, value) {
    const array = primeiroBi; //É AQUI QUE TEM QUE MUDAR O BIMESTRE
    if (type === "note") {
      array[index].note = value;
    }
    if (type === "missed") {
      array[index].missed = value;
    }
    setPrimeiroBi([...array]); //É AQUI QUE TEM QUE MUDAR O BIMESTRE
  }

  // Primeiro bimestre
  async function handleSubmitPrimeiroBi(e) {
    e.preventDefault();

    try {
      await api.put(`/school/edit_one/${selectUser._id}`, {
        firstBimester: primeiroBi,
      });
      toast.success("Boletim do primeiro bimestre editado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  //COPIAR ESSAS DUAS FUNCOES 2 bi
  function handleSegundoBi(index, type, value) {
    const array = segundoBi; //É AQUI QUE TEM QUE MUDAR O BIMESTRE
    if (type === "note") {
      array[index].note = value;
    }
    if (type === "missed") {
      array[index].missed = value;
    }
    setSegundoBi([...array]); //É AQUI QUE TEM QUE MUDAR O BIMESTRE
  }

  // Segundo bimestre
  async function handleSubmitSegundoBi(e) {
    e.preventDefault();

    try {
      await api.put(`/school/edit_one/${selectUser._id}`, {
        secondBimester: segundoBi,
      });
      toast.success("Boletim do segundo bimestre editado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  //COPIAR ESSAS DUAS FUNCOES 3 bi
  function handleTerceiroBi(index, type, value) {
    const array = terceiroBi; //É AQUI QUE TEM QUE MUDAR O BIMESTRE
    if (type === "note") {
      array[index].note = value;
    }
    if (type === "missed") {
      array[index].missed = value;
    }
    setTerceiroBi([...array]); //É AQUI QUE TEM QUE MUDAR O BIMESTRE
  }

  async function handleSubmitTerceiroBi(e) {
    e.preventDefault();

    try {
      await api.put(`/school/edit_one/${selectUser._id}`, {
        thirdBimester: terceiroBi, //É AQUI QUE TEM QUE MUDAR O BIMESTRE
      });
      toast.success("Boletim editado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  //COPIAR ESSAS DUAS FUNCOES 4 bi
  function handleQuartoBi(index, type, value) {
    const array = quartoBi; //É AQUI QUE TEM QUE MUDAR O BIMESTRE
    if (type === "note") {
      array[index].note = value;
    }
    if (type === "missed") {
      array[index].missed = value;
    }
    setQuartoBi([...array]); //É AQUI QUE TEM QUE MUDAR O BIMESTRE
  }

  async function handleSubmitQuartoBi(e) {
    e.preventDefault();

    try {
      await api.put(`/school/edit_one/${selectUser._id}`, {
        fourthBimester: quartoBi, //É AQUI QUE TEM QUE MUDAR O BIMESTRE
      });
      toast.success("Boletim editado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-screen scroll-hidden">
      <NavbarSchool />
      <div className="mt-10 mx-auto w-4/5">
        <div className="mt-4">
          <Link to="/school">
            <div className="flex items-center gap-2 mb-2">
              <img src={Voltar} />

              {/* Título */}
              <h1 className="text-[18px]">Criar um Boletim</h1>
            </div>
          </Link>

          {/* Form */}
          <div>
            {/* Pesquisa */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 w-full rounded-md px-4 py-2 h-10 mb-2"
              placeholder="Selecione um Aluno"
            />

            {search.length > 0 && (
              <div>
                {users

                  .filter((user) =>
                    user.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  )

                  .map((user) => {
                    return (
                      <div
                        key={user._id}
                        onClick={(e) => handleSelectUser(e, user)}
                      >
                        <p>{user.name}</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {selectUser && (
              <div>
                <p className="font-bold text-[16px] mb-4 ">{selectUser.name}</p>
              </div>
            )}

            {/* Bimestres */}

            {/* TERCEIRO BIMESTRE */}
            <div className=" flex gap-6 justify-center">
              <form
                onSubmit={handleSubmitPrimeiroBi}
                className="flex flex-col mt-6 bg-white rounded-lg"
              >
                <div className="mt-4 w-1/3">
                  <div className="text-center p-2">
                    <h1 className="text-[18px] font-bold mb-4">
                      Primeiro Bimestre
                    </h1>
                  </div>
                  <div className="flex flex-col border-[1.5px] rounded-lg">
                    <table className="  rounded-lg">
                      <thead>
                        <tr className=" ">
                          <th className="text-left py-2 px-4 font-medium bg-[#6D7DFF]/10 rounded-l-lg rounded-r-none ">
                            Matérias
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10  rounded-r-none ">
                            Notas
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10 rounded-r-lg rounded--none ">
                            Faltas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Matemática */}
                        <tr>
                          <td className="py-2 px-4 text-[16px]">Matemática</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[0].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(0, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[0].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(0, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Português */}
                        <tr>
                          <td className="py-2 px-4">Português</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[1].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(1, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[1].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(1, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* História */}
                        <tr>
                          <td className="py-2 px-4">História</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[2].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(2, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[2].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(2, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Geografia */}
                        <tr>
                          <td className="py-2 px-4">Geografia</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[3].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(3, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={primeiroBi[3].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handlePrimeiroBi(3, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Botão */}
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-[100px] w-[100px] h-[44px]"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </form>

              {/* Segundo Bimestre */}
              <form
                onSubmit={handleSubmitSegundoBi}
                className="flex flex-col mt-6 bg-white rounded-lg"
              >
                <div className="mt-4  w-1/3">
                  <div className="text-center p-2">
                    <h1 className="text-[18px] font-bold mb-4">
                      Segundo Bimestre
                    </h1>
                  </div>
                  <div className="flex flex-col border-[1.5px] rounded-lg">
                    <table className="  rounded-lg">
                      <thead>
                        <tr className=" ">
                          <th className="text-left py-2 px-4 font-medium bg-[#6D7DFF]/10 rounded-l-lg rounded-r-none ">
                            Matérias
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10  rounded-r-none ">
                            Notas
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10 rounded-r-lg rounded--none ">
                            Faltas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Matemática */}
                        <tr>
                          <td className="py-2 px-4 text-[16px]">Matemática</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={segundoBi[0].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleSegundoBi(0, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={segundoBi[0].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleSegundoBi(0, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Português */}
                        <tr>
                          <td className="py-2 px-4">Português</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={segundoBi[1].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleSegundoBi(1, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={segundoBi[1].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleSegundoBi(1, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* História */}
                        <tr>
                          <td className="py-2 px-4">História</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[2].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(2, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[2].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(2, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Geografia */}
                        <tr>
                          <td className="py-2 px-4">Geografia</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[3].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(3, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[3].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(3, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Botão */}
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-[100px] w-[100px] h-[44px]"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Segunda Linha */}
            <div className="mt-6 flex gap-6 justify-center mb-20">
              <form
                onSubmit={handleSubmitTerceiroBi}
                className="flex flex-col mt-6 bg-white rounded-lg"
              >
                <div className="mt-4 w-1/3">
                  <div className="text-center p-2">
                    <h1 className="text-[18px] font-bold mb-4">
                      Terceiro Bimestre
                    </h1>
                  </div>
                  <div className="flex flex-col border-[1.5px] rounded-lg">
                    <table className="  rounded-lg">
                      <thead>
                        <tr className=" ">
                          <th className="text-left py-2 px-4 font-medium bg-[#6D7DFF]/10 rounded-l-lg rounded-r-none ">
                            Matérias
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10  rounded-r-none ">
                            Notas
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10 rounded-r-lg rounded--none ">
                            Faltas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Matemática */}
                        <tr>
                          <td className="py-2 px-4 text-[16px]">Matemática</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[0].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(0, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[0].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(0, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Português */}
                        <tr>
                          <td className="py-2 px-4">Português</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[1].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(1, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[1].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(1, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* História */}
                        <tr>
                          <td className="py-2 px-4">História</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[2].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(2, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[2].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(2, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Geografia */}
                        <tr>
                          <td className="py-2 px-4">Geografia</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[3].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(3, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={terceiroBi[3].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleTerceiroBi(3, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Botão */}
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-[100px] w-[100px] h-[44px]"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </form>

              {/* Segundo Bimestre */}
              <form
                onSubmit={handleSubmitQuartoBi}
                className="flex flex-col mt-6 bg-white rounded-lg"
              >
                <div className="mt-4  w-1/3">
                  <div className="text-center p-2">
                    <h1 className="text-[18px] font-bold mb-4">
                      Quarto Bimestre
                    </h1>
                  </div>
                  <div className="flex flex-col border-[1.5px] rounded-lg">
                    <table className="  rounded-lg">
                      <thead>
                        <tr className=" ">
                          <th className="text-left py-2 px-4 font-medium bg-[#6D7DFF]/10 rounded-l-lg rounded-r-none ">
                            Matérias
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10  rounded-r-none ">
                            Notas
                          </th>
                          <th className="text-left py-2 px-4 font-medium  bg-[#6D7DFF]/10 rounded-r-lg rounded--none ">
                            Faltas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Matemática */}
                        <tr>
                          <td className="py-2 px-4 text-[16px]">Matemática</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[0].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(0, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[0].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(0, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Português */}
                        <tr>
                          <td className="py-2 px-4">Português</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[1].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(1, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[1].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(1, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* História */}
                        <tr>
                          <td className="py-2 px-4">História</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[2].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(2, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[2].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(2, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>

                        {/* Geografia */}
                        <tr>
                          <td className="py-2 px-4">Geografia</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[3].note}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(3, "note", e.target.value)
                              }
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={quartoBi[3].missed}
                              className="w-24 py-1 px-2 border rounded border-gray-200"
                              onChange={(e) =>
                                handleQuartoBi(3, "missed", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Botão */}
                  <div className=" flex justify-center items-center">
                    <button
                      type="submit"
                      className="border mt-5 bg-[#6D7DFF] text-white font-bold rounded-[100px] w-[100px] h-[44px]"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
