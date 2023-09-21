import api from "../axios/api";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Flor1 from "../assets/flor1.svg";
import Flor2 from "../assets/flor2.svg";

export default function UserHomePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Adicione um estado para verificar se os dados estão carregando

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setIsLoading(false); // Defina isLoading como false quando os dados forem carregados
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Defina isLoading como false em caso de erro
      }
    }

    getProfile();
  }, []);

  if (isLoading) {
    // Mostrar um indicador de carregamento enquanto os dados estão sendo carregados
    return <p>Carregando...</p>;
  }

  console.log(user);

  function capturarNotaPorMateria(bimestre, materia) {
    if (bimestre) {
      const subject = bimestre.find((s) => s.subject === materia);
      return subject ? subject.note : ""; // Retorna a nota ou uma string vazia se não encontrada
    }
    return "";
  }

  function capturarFaltasDoBimestre(bimestre, materia) {
    if (bimestre) {
      const subject = bimestre.find((s) => s.subject === materia);
      return subject ? subject.missed : ""; // Retorna a falta (missed) ou uma string vazia se não encontrada
    }
    return "";
  }

  function capturarNotasDoFirstBimester(user) {
    if (user.firstBimester) {
      const notas = user.firstBimester.map((subject) =>
        parseFloat(subject.note)
      );
      return notas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarNotasDoSecondBimester(user) {
    if (user.secondBimester) {
      const notas = user.secondBimester.map((subject) =>
        parseFloat(subject.note)
      );
      return notas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarNotasDoThirdBimester(user) {
    if (user.thirdBimester) {
      const notas = user.thirdBimester.map((subject) =>
        parseFloat(subject.note)
      );
      return notas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarNotasDoFourthBimester(user) {
    if (user.fourthBimester) {
      const notas = user.fourthBimester.map((subject) =>
        parseFloat(subject.note)
      );
      return notas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarFaltasDoFirstBimester(user) {
    if (user.firstBimester) {
      const faltas = user.firstBimester.map((subject) => subject.missed);
      return faltas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarFaltasDoSecondBimester(user) {
    if (user.secondBimester) {
      const faltas = user.secondBimester.map((subject) => subject.missed);
      return faltas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarFaltasDoThirdBimester(user) {
    if (user.thirdBimester) {
      const faltas = user.thirdBimester.map((subject) => subject.missed);
      return faltas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function capturarFaltasDoFourthBimester(user) {
    if (user.fourthBimester) {
      const faltas = user.fourthBimester.map((subject) => subject.missed);
      return faltas;
    }
    return null; // Retorna null se o firstBimester estiver vazio ou ausente
  }

  function calcularMediaFinal(notasBimestres) {
    if (notasBimestres.length === 0) {
      return "N/A"; // Retorna "N/A" se não houver notas
    }

    const notasFinais = [];

    for (let i = 0; i < notasBimestres[0].length; i++) {
      let somaNotas = 0;

      for (let j = 0; j < notasBimestres.length; j++) {
        somaNotas += parseFloat(notasBimestres[j][i]);
      }

      const mediaMateria = somaNotas / notasBimestres.length;
      notasFinais.push(mediaMateria.toFixed(2));
    }

    return notasFinais;
  }

  // Usando a função para capturar as notas do firstBimester
  const notasDoFirstBimester = capturarNotasDoFirstBimester(user);

  const notasDoSecondBimester = capturarNotasDoSecondBimester(user);

  const notasDoThirdBimester = capturarNotasDoThirdBimester(user);

  const notasDoFourthBimester = capturarNotasDoFourthBimester(user);

  const todasAsNotas = [
    notasDoFirstBimester,
    notasDoSecondBimester,
    notasDoThirdBimester,
    notasDoFourthBimester,
  ].filter((notas) => notas && notas.length > 0);

  // Calcule a média final
  const mediasFinais = calcularMediaFinal(todasAsNotas);

  function calcularMediaFaltas(bimestres) {
    if (!bimestres || !Array.isArray(bimestres) || bimestres.length === 0) {
      return [];
    }

    const numBimestres = bimestres.length;
    const numMaterias = bimestres[0].length;
    const mediasFaltas = Array(numMaterias).fill(0);

    for (let i = 0; i < numBimestres; i++) {
      for (let j = 0; j < numMaterias; j++) {
        const missed = parseFloat(bimestres[i][j].missed);
        mediasFaltas[j] += missed;
      }
    }

    return mediasFaltas.map((media) => {
      // Arredonda para o número inteiro mais próximo
      const roundedMedia = Math.round(media);

      // Converte para 0 se for menor ou igual a 0.5, para 1 caso contrário
      return roundedMedia <= 0.5 ? 0 : 1;
    });
  }

  const mediasFaltas = calcularMediaFaltas([
    user.firstBimester,
    user.secondBimester,
    user.thirdBimester,
    user.fourthBimester,
  ]);

  const faltasDoSecondBimester = capturarFaltasDoSecondBimester(user);

  const faltasDoThirdBimester = capturarFaltasDoThirdBimester(user);

  const faltasDoFourthBimester = capturarFaltasDoFourthBimester(user);

  const faltasDoFirstBimester = capturarFaltasDoFirstBimester(user);

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
          <section className="flex gap-5 w-[800px]">
            <div className="relative mb-10 bg-white rounded-lg p-4 w-3/5">
              <img
                src={Flor2}
                alt=""
                className="absolute top-[200px] left-[1020px]"
              />
              <div className="flex justify-between">
                <p className="text-[#6A7AF5]">Matrícula:</p>
                <span className="text-[#525252] font-bold">
                  {user.register}
                </span>
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
                          self.findIndex(
                            (s) => s.subject === subject.subject
                          ) === index
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
            <div className="relative mb-10 bg-white rounded-lg p-4 w-2/5">
              <h1 className="text-[#6A7AF5]">Cardápio do mês</h1>
              <pre className="text-[#525252] whitespace-pre-line font-raleway">
                {user.menu}
              </pre>
            </div>
          </section>

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
              <div className="p-3 rounded-lg bg-white">
                <h1 className="text-l text-[#6A7AF5] mb-2 text-center">
                  Média final
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
                    {user.firstBimester &&
                      user.secondBimester &&
                      user.thirdBimester &&
                      user.fourthBimester.map((subject, index) => (
                        <tr key={subject._id}>
                          <td className="border px-4 py-2">
                            {subject.subject}
                          </td>
                          <td className="border px-4 py-2">
                            {mediasFinais[index]}
                          </td>
                          <td className="border px-4 py-2">
                            {mediasFaltas[index]}
                          </td>
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
