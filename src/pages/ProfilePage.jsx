import api from "../axios/api";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState({});

  const id_user = localStorage.getItem("userId");

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
    <div>
      <Navbar />
      <div className="fle flex-row bg-white rounded-lg mt-10 p-3">
        <h1 className="text-lg">
          Bem vindo ao seu perfil <span className="italic">{user.name}</span>!
        </h1>
        <div>
          <h1>Dados pessoais:</h1>
          <p>Matrícula: {user.register}</p>
          <p>Nome: {user.name}</p>
          <p>
            Responsável:{" "}
            {user.parentsName ? user.parentsName : "Não cadastrado"}
          </p>
          <p>email: {user.email}</p>
          <p>Turma: {user.class}</p>
          <p>
            Matérias cadastradas:{" "}
           {user.schedule &&
              user.schedule.map((schedule, index) => (
                <span className="font-bold" key={index}>
                  {schedule.name}{" "}
                </span>
              ))}
          </p>
          <div>
            <h1 className="font-bold">Boletim:</h1>
            <div className="flex gap-3">
              <div className="border p-3">
                <h1 className="self-center">1º Bimestre</h1>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Matéria</th>
                      <th className="px-4 py-2">Nota</th>
                      <th className="px-4 py-2">Faltas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.firstBimester &&
                      user.firstBimester.map((subject, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{subject.subject.name}</td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="border p-3">
                <h1 className="self-center">2º Bimestre</h1>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Matéria</th>
                      <th className="px-4 py-2">Nota</th>
                      <th className="px-4 py-2">Faltas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.secondBimester &&
                      user.secondBimester.map((subject, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{subject.subject.name}</td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="border p-3">
                <h1 className="self-center">3º Bimestre</h1>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Matéria</th>
                      <th className="px-4 py-2">Nota</th>
                      <th className="px-4 py-2">Faltas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.thirdBimester &&
                      user.thirdBimester.map((subject, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{subject.subject.name}</td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="border p-3">
                <h1 className="self-center">4º Bimestre</h1>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Matéria</th>
                      <th className="px-4 py-2">Nota</th>
                      <th className="px-4 py-2">Faltas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.fourthBimester &&
                      user.fourthBimester.map((subject, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{subject.subject.name}</td>
                          <td className="border px-4 py-2">{subject.note}</td>
                          <td className="border px-4 py-2">{subject.missed}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
