import { GamesList } from 'app/components/games'

export const metadata = {
  title: 'Games',
  description: 'Read my game reviews and thoughts.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Games</h1>
      <GamesList />
    </section>
  )
} 