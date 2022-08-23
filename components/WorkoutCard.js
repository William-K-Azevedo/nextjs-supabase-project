import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const WorkoutCard = ({ data }) => {
  return (
    <div className="flex justify-center flex-wrap items-center mt-8">
      {data?.map((item) => (
        <div
          key={item.id}
          className="w-25 h-48 mr-6 mb-6 border border-solid border-laranja-opaco rounded-lg flex flex-col justify-center items-center relative"
        >
          <p className="text-[0.9rem]"> Title: {item.title}</p>
          <p className="mt-2 text-[0.9rem]"> Load(Kg): {item.loads}</p>
          <p className="mt-2 text-[0.9rem]">Reps:{item.reps}</p>
          <p className="mt-2 text-[0.9rem]">
            created:{" "}
            {formatDistanceToNow(new Date(item.inserted_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutCard;
