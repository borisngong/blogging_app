import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white p-8 md:p-16 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Modern Blogging, Beautifully Simple
        </h2>
        <p className="mt-4 text-lg md:text-xl text-indigo-100/90 max-w-2xl">
          A fast, accessible, and delightful place to read and share ideas.
          Built with modern web best practices and a focus on content.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-3 rounded-md font-semibold shadow-md hover:shadow-lg"
          >
            Explore Posts
          </Link>
          <Link
            href="/posts/create"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-3 rounded-md font-medium hover:bg-white/10"
          >
            Start Writing
          </Link>
        </div>
      </div>
    </section>
  );
}
