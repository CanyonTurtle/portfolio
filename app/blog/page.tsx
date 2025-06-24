import { BlogPosts } from 'app/components/cards'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My blog</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        Thoughts, tutorials, and insights from my journey in software engineering. Here you'll find technical deep-dives, learning experiences, and reflections on building software.
      </p>
      <BlogPosts />
    </section>
  )
}
