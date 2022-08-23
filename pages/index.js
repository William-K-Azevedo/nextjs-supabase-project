import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import WorkoutCard from "../components/WorkoutCard";

export default function Home({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (supabase.auth.user() !== null) fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="text-laranja-opaco mt-4 text-center flex items-center justify-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          Carregando Treinos...
        </div>
      </>
    );
  }

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchWorkouts();
      if (error) throw error;
      alert("Treino deletado com sucesso");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="text-cinza-claro h-screen flex justify-center items-center">
      <head>
        <title>Next.js X Supabase</title>
        <meta name="description" content="Geenereted by create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <div classsName="flex flex-col justify-center items-center">
        {!session?.user ? (
          <div>
            <p>
              Bem vindo a Adrenargy. Por favor, logue-se em sua conta ou
              cadastre-se para uma demonstração.
            </p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <p>
              Olá,{" "}
              <span className="text-laranja-opaco">{session.user.email}</span>,{" "}
              bem vindo ao seu painel de treinos!
            </p>

            {data?.length === 0 ? (
              <div className="flex flex-col justify-center items-center mt-4">
                <p>Você não tem treinos ainda </p>
                <Link href="/create">
                  <button className="border border-solid border-laranja-opaco py-2 px-8 rounded-radius-customizado cursor-pointer transition-all duration-300 ease-in-out mt-6">
                    {" "}
                    Criar novo treino
                  </button>
                </Link>
              </div>
            ) : (
              <div className="text-center mt-4">
                <p>Aqui estão seus treinos:</p>
                <WorkoutCard data={data} handleDelete={handleDelete} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
