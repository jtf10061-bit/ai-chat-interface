import Image from "next/image";

export default function Home() {
  // throw new Error("Test error page");  // エラーページ確認のためのコード
  return (
      <main className="flex flex-col text-gray-800 w-full h-full overflow-y-auto">
        <div className="flex bg-slate-300 h-5/6 p-4 justify-center">
          Message Area
        </div>
        <div className="flex h-1/6 p-4 justify-center items-center">
          FormArea
        </div>
      </main>
  );
}
