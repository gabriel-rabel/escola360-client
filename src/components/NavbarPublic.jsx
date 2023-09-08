import { Link } from "react-router-dom";

function NavbarPublic() {
  return (
    <nav>

      <div className="navbar px-10">
        
        <span className="logo"></span>
        <div className="menu">

            {/* Links NAVBAR */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <p className="text-white-400">Fale Conosco</p>
            <Link to="/loginschool">
              <button className="login-school">Login School</button>
            </Link>
            <Link to="/login">
              <button className="login-student">Login Aluno</button>
            </Link>
          </div>


        </div>
      </div>
    </nav>
  );
}

export default NavbarPublic;
