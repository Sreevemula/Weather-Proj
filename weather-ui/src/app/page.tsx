export const revalidate = 0; // no caching

type Weather = { city: string; temp_c: number; conditions: string };

async function getWeather(): Promise<Weather> {
  const url = process.env.NEXT_PUBLIC_WEATHER_URL!;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export default async function Page() {
  try {
    const data = await getWeather();
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white shadow p-6">
          <h1 className="text-xl font-semibold">{data.city}</h1>
          <p className="text-6xl font-bold mt-2">{Math.round(data.temp_c)}°C</p>
          <p className="mt-1 text-slate-600 capitalize">{data.conditions}</p>
          <p className="mt-6 text-xs text-slate-400">Powered by AWS Lambda</p>
        </div>
      </main>
    );
  } catch (e: any) {
    return <main className="p-6 text-red-600">Failed to load: {e.message}</main>;
  }
}
