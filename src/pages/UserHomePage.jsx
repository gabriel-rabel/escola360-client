import api from "../axios/api";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Flor1 from "../assets/flor1.svg";
import Flor2 from "../assets/flor2.svg";

function UserHomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  return (
    <div className="bg-[#6D7DFF] h-screen w-screen">
      <Navbar />

      {/* TÍTULO */}
      <div className="relative">
        <img
          src={Flor1}
          alt=""
          className="absolute top-9 left-[200px] transform -translate-x-1/2"
        />
        <div className="flex justify-center items-center flex-col mt-20">
          <div>
            <h1 className="text-4xl text-center mb-10 text-white">
              Bem vindo ao perfil de{" "}
              <span className="font-bold">{user.name}</span>
            </h1>
          </div>

          {/* DADOS PESSOAIS */}

          <div className="relative mb-10 bg-white rounded-lg p-4 w-[800px]">
            <img
              src={Flor2}
              alt=""
              className="absolute top-[200px] left-[1000px]"
            />
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">Matrícula:</p>
              <span className="text-[#525252] font-bold">{user.register}</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">Nome:</p>
              <span className="text-[#525252] font-bold">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">Responsável:</p>
              <span className="text-[#525252] font-bold">
                {user.parentsName ? user.parentsName : "Não cadastrado"}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">E-mail:</p>
              <span className="text-[#525252] font-bold">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">Turma:</p>
              <span className="text-[#525252] font-bold">{user.class}</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#6A7AF5]">Matérias cadastradas:</p>
              <span className="text-[#525252] font-bold">
                {user.schedule &&
                  user.schedule.map((schedule, index) => (
                    <span className="font-bold" key={index}>
                      {schedule.name}{" "}
                    </span>
                  ))}
              </span>
            </div>
          </div>

          {/* BOLETIM */}
          <div className="mt-4">
            {/*             <h1 className="mt-2 text-3xl font-bold text-white mb-4">Boletim:</h1> */}

            <div className=" rounded-lg ">
              <div className="flex gap-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white">
                    <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                      {index + 1}º Bimestre
                    </h1>
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-gray-600">Matéria</th>
                          <th className="px-4 py-2 text-gray-600">Nota</th>
                          <th className="px-4 py-2 text-gray-600">Faltas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user[`firstBimester${index + 1}`] &&
                          user[`firstBimester${index + 1}`].map(
                            (subject, subjectIndex) => (
                              <tr key={subjectIndex}>
                                <td className="border px-4 py-2">
                                  {subject.name}
                                </td>
                                <td className="border px-4 py-2">
                                  {subject.note}
                                </td>
                                <td className="border px-4 py-2">
                                  {subject.missed}
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
