import { Link } from "react-router-dom"

export default function HomePage() {

    return (
        <main>
            
            <div className="flex justify-center gap-3 mt-50">
                <Link to="/loginschool"> <p className="mx-4 my-2 bg-blue-600 text-white rounded-lg p-3">Link para pagina de login School</p> </Link>
                <Link to="/login"> <p className="mx-4 my-2 bg-blue-600 text-white rounded-lg p-3">Link para pagina de login Aluno</p>  </Link>
                
            </div>
            <div className="flex justify-center gap-3 mt-50">
            <p className="text-gray-400 italic">Links adicionados apenas para usarmos como referência, antes do frontend</p>
            </div>
            
        </main>

    )
    
};
