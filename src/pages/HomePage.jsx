import NavbarPublic from "../components/NavbarPublic";
import ImageKids from "../assets/Images.svg";

export default function HomePage() {
  return (
    <div className="bg-custom">
      <NavbarPublic />

      <div className="content flex items-center">
        <div className="w-1/2 p-20 mx-auto text-left">
          <h1 className=" mb-3 text-6xl font-bold text-white">
            Seu filho sempre conectado!
          </h1>
          <p className="mb-3 text-white font-medium">
            Conecte-se à jornada educacional de seus filhos, <br /> acompanhando
            cada passo, juntos em uma parceria pela excelência.
          </p>
          <img src={ImageKids} />
        </div>
        {/* CARDS */}
        <div className="w-1/2 p-10 flex flex-col justify-center items-center space-y-4">
          <div className="border-2 p-2 rounded-lg text-white w-80">
            <h1 className="font-bold text-2xl">Cardápio</h1>
            <p>Desfrute de um acompanhamento diário do cardápio escolar.</p>
          </div>

          <div className="border-2 p-2 rounded-lg text-white w-80">
            <h1 className="font-bold text-2xl">Frequência</h1>
            <p>Mantenha o controle da frequência escolar do seu filho.</p>
          </div>

          <div className="border-2 p-2 rounded-lg text-white w-80">
            <h1 className="font-bold text-2xl">Notificações</h1>
            <p>Receba todas as notificações em tempo real.</p>
          </div>

          <div className="border-2 p-2 rounded-lg text-white w-80">
            <h1 className="font-bold text-2xl">Boletim</h1>
            <p>Esteja ciente das notas e performances</p>
          </div>
        </div>
      </div>
    </div>
  );
}
