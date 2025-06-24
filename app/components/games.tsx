import Link from 'next/link'
import { formatDate, getGames } from 'app/games/utils'

export function GamesList() {
  let allGames = getGames()

  return (
    <div>
      {allGames
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((game) => (
          <Link
            key={game.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/games/${game.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(game.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {game.metadata.title}
              </p>
              {game.metadata.genre && (
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  • {game.metadata.genre}
                </span>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
} 