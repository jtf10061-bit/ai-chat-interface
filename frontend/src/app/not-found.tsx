import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 font-sans text-gray-900 dark:bg-black">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-4xl font-mdedium">Page Not Found</p>
        <Link href="/" className="mt-4 text-xl text-blue-600 hover:underline">
          Go back home
        </Link>
    </div>
  );
}

export default NotFound;