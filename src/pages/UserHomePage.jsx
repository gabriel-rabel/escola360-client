import api from "../axios/api";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Flor1 from "../assets/flor1.svg";
import Flor2 from "../assets/flor2.svg";

export default function UserHomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
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
              className="absolute top-[200px] left-[1020px]"
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
                {user.firstBimester &&
                  user.secondBimester &&
                  user.thirdBimester &&
                  user.fourthBimester &&
                  user.firstBimester
                    .concat(
                      user.secondBimester,
                      user.thirdBimester,
                      user.fourthBimester
                    )
                    .filter(
                      (subject, index, self) =>
                        self.findIndex((s) => s.subject === subject.subject) ===
                        index
                    )
                    .map((subject, index, array) => (
                      <span className="font-bold" key={index}>
                        {subject.subject}
                        {index < array.length - 1 && ", "}
                      </span>
                    ))}
              </span>
            </div>
          </div>

          {/* BOLETIM */}
          <div className="mt-4">
            <div className="rounded-lg flex gap-2">
              <div className="p-3 rounded-lg bg-white">
                <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                  1º Bimestre
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
                    {user[`firstBimester`] &&
                      user["firstBimester"].map((subject) => (
                        <tr key={subject._id}>
                          <td className="border px-4 py-2">
                            {subject.subject}
                          </td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                  2º Bimestre
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
                    {user[`secondBimester`] &&
                      user["secondBimester"].map((subject) => (
                        <tr key={subject._id}>
                          <td className="border px-4 py-2">
                            {subject.subject}
                          </td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                  3º Bimestre
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
                    {user[`thirdBimester`] &&
                      user["thirdBimester"].map((subject) => (
                        <tr key={subject._id}>
                          <td className="border px-4 py-2">
                            {subject.subject}
                          </td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-lg bg-white">
                <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                  4º Bimestre
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
                    {user[`fourthBimester`] &&
                      user["fourthBimester"].map((subject) => (
                        <tr key={subject._id}>
                          <td className="border px-4 py-2">
                            {subject.subject}
                          </td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ---- */}
        </div>
      </div>
    </div>
  );
                      }
