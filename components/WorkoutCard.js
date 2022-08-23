import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const WorkoutCard = ({ data, handleDelete }) => {
  return (
    <div className="flex justify-center flex-wrap items-center mt-8">
      {data?.map((item) => (
        <div
          key={item.id}
          className="w-25 h-48 mr-6 mb-6 border border-solid border-laranja-opaco rounded-radius-customizado flex flex-col justify-center items-center relative"
        >
          <p className="text-[0.9rem]"> Título: {item.title}</p>
          <p className="mt-2 text-[0.9rem]"> Peso(Kg): {item.loads}</p>
          <p className="mt-2 text-[0.9rem]"> Repetições: {item.reps}</p>
          <p className="mt-2 text-[0.9rem]">
            Criado a:{" "}
            {formatDistanceToNow(new Date(item.inserted_at), {
              addSuffix: false,
              locale: ptBR,
            })}
          </p>
          <div className="absolute flex bottom-[0.1rem] right-[1rem]">
            <Link href={`/edit/${item.id}`}>
              <a className="bg-transparent border-none outline-none cursor-pointer text-laranja-opaco text-base mr-4 mb-4">
                <FiEdit />
              </a>
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-transparent border-none outline-none cursor-pointer text-laranja-opaco text-base mb-4"
            >
              <BsTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutCard;
