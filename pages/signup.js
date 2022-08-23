import { useState } from "react";
import { supabase } from "../utils/supabase";

const Signup = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[30rem] h-[30rem] border border-solid border-cinza-claro rounded-radius-customizado">
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
          className="w-4/5 h-8 my-4 p-2 border border-solid border-laranja-opaco rounded-radius-customizado outline-none bg-transparent text-[#fff] "
          placeholder="Insira seu e-mail"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className="w-4/5 h-8 my-4 p-2 border border-solid border-laranja-opaco rounded-radius-customizado outline-none bg-transparent text-[#fff]"
          placeholder="Insira sua senha"
        />
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signUp({
              email,
              password,
            });

            if (error) alert(error.message);
            alert("Cheque o link de login no seu email!");
            setForm(initialState);
          }}
          className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer tranition-all duration-300 ease-in-out mt-4"
        >
          Inscrever-se
        </button>
      </div>
    </div>
  );
};

export default Signup;
