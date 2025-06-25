import { ProjectsList } from 'app/components/projects'

export const metadata = {
  title: 'Projects',
  description: 'Read about my projects and technical work.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My projects</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        A collection of projects I've built, contributed to, and learned from. From web applications to open source contributions, these are the technical endeavors that showcase my skills and passion for development.
      </p>
      <ProjectsList />
    </section>
  )
} 