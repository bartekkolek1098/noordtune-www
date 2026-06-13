import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-center">
      <div className="max-w-xl">
        <p className="racing-title text-xl text-primary">404</p>
        <h1 className="racing-title mt-3 text-5xl text-white">Pagina niet gevonden</h1>
        <p className="mt-4 text-white/62">
          De pagina bestaat niet of is verplaatst. Ga terug naar de Nederlandse homepage.
        </p>
        <Link
          className="mt-7 inline-flex rounded-[3px] border border-primary bg-primary px-5 py-3 text-sm font-black uppercase"
          href="/nl"
        >
          Naar home
        </Link>
      </div>
    </main>
  );
}
