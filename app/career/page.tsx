import { CareerList } from 'app/components/career'

export const metadata = {
  title: 'Career',
  description: 'My professional experience and career highlights.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Career</h1>
      <CareerList />
    </section>
  )
} 