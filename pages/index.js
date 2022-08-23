import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import WorkoutCard from "../components/WorkoutCard";

export default function Home({ session }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Workouts")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setWorkouts(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-laranja-opaco mt-4">Carregando Treinos...</div>;
  }

  return (
    <div className="text-cinza-claro h-screen flex justify-center items-center">
      <head>
        <title>Next.js X Supabase</title>
        <meta name="description" content="Geenereted by create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <div classsName="flex flex-col justify-center items-center">
        {session?.user ? (
          <div>
            <p>
              Bem vindo a Adrenargy. Por favor, logue-se em sua conta ou
              cadastre-se para uma demonstração.
            </p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <p>
              Olá, <span className="">{session.user.email}</span>, Bem vindo ao
              seu painel de treinos
            </p>

            {workouts?.length === 0 ? (
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
                <p>Aqui estão seus treinos</p>
                <WorkoutCard data={workouts} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
