import api from "../axios/api";
import { useState, useEffect } from "react";

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

        // Tratando matérias
        // Recupera todos os objetos subject
        const subjectsResponse = await api.get("/subject/get_all");
        const allSubjects = subjectsResponse.data;

        // Mapeia os nomes das matérias com base nos IDs em user.schedule
        const subjectNames = response.data.schedule.map((subjectId) => {
          const subject = allSubjects.find((item) => item._id === subjectId);
          return subject ? subject.name : "Matéria não encontrada";
        });

        setSubjects(subjectNames);

        // Mapeia os nomes de todas as matérias e armazena em subjectNames
        const allSubjectNames = {};
        allSubjects.forEach((subject) => {
          allSubjectNames[subject._id] = subject.name;
        });
        setSubjectNames(allSubjectNames);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  return (
    <div className="fle flex-row bg-white rounded-lg mt-10 p-3">
      <h1 className="text-lg">
        Bem vindo ao seu perfil <span className="italic">{user.name}</span>!
      </h1>
      <div>
        <h1>Dados pessoais: </h1>
        <p>Matrícula: {user.register}</p>
        <p>Nome: {user.name}</p>
        <p>
          Responsável: {user.parentsName ? user.parentsName : "Não cadastrado"}
        </p>
        <p>email: {user.email}</p>
        <p>Turma: {user.class}</p>

        <p>
          Matérias cadastradas:{" "}
          {subjects.map((name, index) => (
            <span className="font-bold" key={index}>
              {name}{" "}
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
                        <td className="border px-4 py-2">
                          {subjectNames[subject.subject] ||
                            "Matéria não encontrada"}
                        </td>
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
                        <td className="border px-4 py-2">
                          {subjectNames[subject.subject] ||
                            "Matéria não encontrada"}
                        </td>
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
                        <td className="border px-4 py-2">
                          {subjectNames[subject.subject] ||
                            "Matéria não encontrada"}
                        </td>
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
                        <td className="border px-4 py-2">
                          {subjectNames[subject.subject] ||
                            "Matéria não encontrada"}
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
      </div>
    </div>
  );
}

export default ProfilePage;
