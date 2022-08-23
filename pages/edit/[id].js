import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const Edit = () => {
  const [workout, setWorkout] = useState("");
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const user = supabase.auth.user();
    const getWorkout = async () => {
      const { data } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user?.id)
        .filter("id", "eq", id)
        .single();
      setWorkout(data);
    };
    getWorkout();
  }, [id]);

  const handleOnChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const { title, loads, reps } = workout;
  const updateWorkout = async () => {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("workouts")
      .update({
        title,
        loads,
        reps,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    alert("Treino atualizado com sucesso");
    router.push("/");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[30rem] h-[30rem] border border-solid border-cinza-claro rounded-radius-customizado">
        <h1 className="font-3xl text-cinza-claro mb-4">Editar Treino</h1>
        <label className="text-[#fff]"> Título:</label>
        <input
          type="text"
          name="title"
          value={workout.title}
          onChange={handleOnChange}
          className="w-4/5 h-8 my-4 p-1 border border-solid border-laranja-opaco rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-4"
        />
        <label className="text-[#fff]"> Peso (kg):</label>
        <input
          type="text"
          name="loads"
          value={workout.loads}
          onChange={handleOnChange}
          className="w-4/5 h-8 my-4 p-1 border border-solid border-laranja-opaco rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-4"
        />
        <label className="text-[#fff]"> Repetições:</label>
        <input
          type="text"
          name="reps"
          value={workout.reps}
          onChange={handleOnChange}
          className="w-4/5 h-8 my-4 p-1 border border-solid border-laranja-opaco rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-4"
        />

        <button
          onClick={updateWorkout}
          className="w-4/5 h-8 my-4 p-1 text-cinza-claro border border-solid border-laranja-opaco rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-4"
        >
          Atualizar treino
        </button>
      </div>
    </div>
  );
};

export default Edit;
