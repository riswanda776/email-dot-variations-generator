import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getDotVariations = (email: string): string[] => {
  const parts = email.split("@");
  if (parts.length !== 2) return [];

  const username = parts[0].replace(/\./g, ""); 
  const domain = parts[1];
  
  if (!/^[a-zA-Z0-9]+$/.test(username)) return [];

  const variations = new Set<string>();
  const n = username.length;

  for (let mask = 0; mask < 1 << (n - 1); mask++) {
    let u = "";
    for (let i = 0; i < n; i++) {
      u += username[i];
      if (i < n - 1 && (mask & (1 << i))) u += ".";
    }
    variations.add(`${u}@${domain}`);
  }

  return Array.from(variations);
};

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [page, setPage] = useState(0);
  const itemsPerPage = 50;

  const handleGenerate = () => {
    setTouched(true);
    const variations = getDotVariations(email);
    setResult(variations);
    setPage(0);
  };

  const totalPages = Math.ceil(result.length / itemsPerPage);
  const currentItems = result.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-[#f2db7c]">
      {/* background shapes */}
      <div className="absolute z-0 inset-0 w-full h-full">
        <div className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 rounded-[2rem] bg-[#1b8df1] rotate-[-18deg] shadow-2xl border-[5px] border-black" />
        <div className="absolute top-1/4 right-0 w-1/2 h-3/6 rounded-[2.5rem] bg-[#e94839] rotate-[14deg] shadow-2xl border-[5px] border-black" />
        <div className="absolute bottom-[-60px] left-0 w-2/4 h-2/5 rounded-[2.5rem] bg-[#59f14a] rotate-[-9deg] shadow-2xl border-[5px] border-black" />
      </div>

      {/* Card content */}
      <Card className="z-10 mx-4 w-full max-w-md p-8 rounded-[2.4rem] shadow-[8px_8px_0_#222] border-[4px] border-black bg-white/95 flex flex-col gap-6 items-center">
        <h1 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2 text-center" style={{textShadow: '2px 2px 0 #f7a400, 4px 4px 0 #222'}}>Email Dot Variations Generator</h1>

        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="youraddress@gmail.com"
          className="text-lg rounded-xl p-4 border-2 border-black focus:ring-none focus:outline-primary"
          onKeyDown={e => { if (e.key === "Enter") handleGenerate(); }}
          autoFocus
        />

        <Button
          className="w-full py-4 text-lg font-bold rounded-xl bg-[#f7a400] hover:bg-[#f7b253] border-2 border-black shadow-[4px_4px_0_#222] transition-all"
          onClick={handleGenerate}
        >
          Generate
        </Button>

        <div className="w-full bg-neutral-100/90 border-2 border-black rounded-2xl shadow-inner min-h-[160px] flex flex-col gap-2 px-4 py-4 mt-2 mb-1 max-h-60 overflow-y-auto">
          {touched && result.length === 0 && (
            <span className="text-red-600 font-medium">Enter a valid Gmail address (only a-z, 0-9)</span>
          )}
          {currentItems.map(v => (
            <span key={v} className="text-gray-800 font-medium text-[.99rem] leading-5">{v}</span>
          ))}
        </div>

        {result.length > 0 && (
          <div className="flex justify-between items-center w-full mt-1">
            <Button
              variant="outline"
              className="border-2 border-black shadow-sm px-4 py-2 text-sm font-semibold disabled:opacity-40"
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              className="border-2 border-black shadow-sm px-4 py-2 text-sm font-semibold disabled:opacity-40"
              onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        )}

        <div className="w-full flex items-center justify-center mt-1">
          <b className="text-base text-black">Total Variations: {result.length}</b>
        </div>

        <div className="text-center text-sm mt-2 text-gray-500">
          © 2025{" "}
          <a
            href="https://github.com/riswanda776"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-900 underline underline-offset-2 font-bold"
          >
            riswanda776
          </a>
        </div>
      </Card>
    </div>
  );
}


export default App;
