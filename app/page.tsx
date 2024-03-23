import Shortener from "./components/Shortener";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col py-20 items-center space-y-8 px-10 md:px-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shorten your URL for free</h1>
        <h2 className="text-gray-100 dark:text-gray-400">Enter a long URL to generate a shortened URL and QR code</h2>
      </div>
      <Shortener />
    </main>
  );
}
