import { CareerList } from 'app/components/career'

export const metadata = {
  title: 'Career',
  description: 'My professional experience and career highlights.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Career</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        My professional journey in software engineering. Here you'll find details about my roles, responsibilities, and the technologies I've worked with across different companies and projects.
      </p>
      <CareerList />
    </section>
  )
} 