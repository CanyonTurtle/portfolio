import Link from 'next/link'
import { formatDate, getGames } from 'app/games/utils'

// Import RoundedImage from the MDX components
function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

export function GamesList() {
  let allGames = getGames()

  return (
    <div className="space-y-4">
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
            className="group block"
            href={game.metadata.externalLink || `/games/${game.slug}`}
            target={game.metadata.externalLink ? "_blank" : undefined}
            rel={game.metadata.externalLink ? "noopener noreferrer" : undefined}
          >
            <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {game.metadata.image ? (
                    <RoundedImage
                      src={game.metadata.image}
                      alt={game.metadata.title}
                      className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-200 rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg">
                      <div className="text-neutral-400 dark:text-neutral-500 text-2xl font-bold">
                        {game.metadata.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {game.metadata.title}
                    </h3>
                    {game.metadata.externalLink && (
                      <svg
                        className="w-4 h-4 text-neutral-400 dark:text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                    {game.metadata.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                    <span>{formatDate(game.metadata.publishedAt, false)}</span>
                    {game.metadata.genre && (
                      <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                        {game.metadata.genre}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
} 