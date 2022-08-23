import { supabase } from "../utils/supabase";
import { useState } from "react";
import { useRouter } from "next/router";

const Create = () => {
  const initialState = {
    title: "",
    loads: "",
    reps: "",
  };

  const router = useRouter();
  const [workoutData, setWorkoutData] = useState(initialState);

  const { title, loads, reps } = workoutData;

  const HandleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const CreateWorkout = async () => {
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from("workouts")
        .insert([
          {
            title,
            loads,
            reps,
            user_id: user?.id,
          },
        ])
        .single();

      if (error) throw error;

      alert("Treino criado com sucesso!");
      setWorkoutData(initialState);
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[30rem] h-[30rem] border border-solid border-cinza-claro rounded-radius-customizado">
          <p className="text-cinza-claro mb-[0.4rem]">Adicionar Novo Treino</p>
          <label className="text-cinza-claro">Titulo:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={HandleChange}
            className="w-4/5 h-8 my-4 p-2 border border-solid border-cinza-claro rounded-radius-customizado outline-0 bg-transparent text-[#fff]"
            placeholder="Insira um título"
          />
          <label className="text-cinza-claro">Pesos (Kg):</label>
          <input
            type="text"
            name="loads"
            value={loads}
            onChange={HandleChange}
            className="w-4/5 h-8 my-4 p-2 border border-solid border-cinza-claro rounded-radius-customizado outline-0 bg-transparent text-[#fff]"
            placeholder="Insira a massa dos Pesos"
          />
          <label className="text-cinza-claro">Repetições:</label>
          <input
            type="text"
            name="reps"
            value={reps}
            onChange={HandleChange}
            className="w-4/5 h-8 my-4 p-2 border border-solid border-cinza-claro rounded-radius-customizado outline-none bg-transparent text-[#fff]"
            placeholder="Insira o número de repetições"
          />
          <button
            className="border border-solid border-laranja-opaco bg-transparent text-cinza-claro py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-4"
            onClick={CreateWorkout}
          >
            Criar Treino
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
