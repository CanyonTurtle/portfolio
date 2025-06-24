import { GamesList } from 'app/components/games'

export const metadata = {
  title: 'Games',
  description: 'Read my game reviews and thoughts.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Games</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        A collection of games I've played, reviewed, and enjoyed. From indie gems to AAA titles, these are the experiences that have shaped my appreciation for interactive storytelling and game design.
      </p>
      <GamesList />
    </section>
  )
} 