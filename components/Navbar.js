import Link from "next/link";
import { supabase } from "../utils/supabase";

const Navbar = ({ session }) => {
  return (
    <div className="text-cinza-claro flex justify-between items-center py-8 px-12">
      <div>
        <p className="text-2xl font-medium text-laranja-opaco">Adrenargy</p>
      </div>
      {session?.user ? (
        <ul className="flex items-center">
          <Link href="/">
            <li className="mr-8 text-laranja-opaco cursor-pointer">Home</li>
          </Link>

          <button
            className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mr-6"
            onClick={() => supabase.auth.signOut()}
          >
            Logout
          </button>

          <Link href="/create">
            <button className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mr-6">
              Criar Novo Treino
            </button>
          </Link>
        </ul>
      ) : (
        <ul className="flex items-center">
          <Link href="/login">
            <li className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mr-6">
              Login
            </li>
          </Link>
          <Link href="/signup">
            <li className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mr-6">
              Inscrever-se
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
