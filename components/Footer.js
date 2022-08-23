import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t border-solid border-cinza-claro flex flex-col items-center justify-center text-cinza-claro pb-6">
      <h1 className="mt-8">
        Built with{" "}
        <Link href="https://nextjs.org/">
          <span className="text-laranja-opaco cursor-pointer">Next.Js</span>
        </Link>{" "}
        and{" "}
        <Link href="https://supabase.com/">
          <span className="text-laranja-opaco cursor-pointer">Supabase</span>
        </Link>
      </h1>
      <Link href="https://github.com/William-K-Azevedo/nextjs-supabase-project">
        <p className="underline cursor-pointer mt-4">Repositório do Git Hub</p>
      </Link>
    </div>
  );
};

export default Footer;
