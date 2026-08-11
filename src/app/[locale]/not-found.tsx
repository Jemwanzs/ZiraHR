import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-teal">404</p>
      <h1 className="text-3xl font-semibold text-gray-900">
        We couldn&apos;t find that page.
      </h1>
      <p className="max-w-md text-gray-600">
        The page you&apos;re looking for may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white"
      >
        Back to SoftHR
      </Link>
    </main>
  );
}
