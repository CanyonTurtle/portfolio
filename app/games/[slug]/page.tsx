import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getGames } from 'app/games/utils'
import { baseUrl } from 'app/sitemap'
import Link from 'next/link'

// Import RoundedImage from the MDX components
function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

export async function generateStaticParams() {
  let games = getGames()

  return games.map((game) => ({
    slug: game.slug,
  }))
}

export function generateMetadata({ params }) {
  let game = getGames().find((game) => game.slug === params.slug)
  if (!game) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = game.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/games/${game.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Game({ params }) {
  let game = getGames().find((game) => game.slug === params.slug)

  if (!game) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Game',
              name: game.metadata.title,
            },
            headline: game.metadata.title,
            datePublished: game.metadata.publishedAt,
            dateModified: game.metadata.publishedAt,
            description: game.metadata.summary,
            image: game.metadata.image
              ? `${baseUrl}${game.metadata.image}`
              : `/og?title=${encodeURIComponent(game.metadata.title)}`,
            url: `${baseUrl}/games/${game.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      
      {/* Game Header with Image and CTA */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Game Image */}
          <div className="flex-shrink-0">
            {game.metadata.image ? (
              <RoundedImage
                src={game.metadata.image}
                alt={game.metadata.title}
                className="w-64 h-auto object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg shadow-md">
                <div className="text-neutral-400 dark:text-neutral-500 text-6xl font-bold">
                  {game.metadata.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          {/* Game Info and CTA */}
          <div className="flex-1 min-w-0">
            <h1 className="title font-semibold text-3xl tracking-tighter mb-4">
              {game.metadata.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <p className="text-neutral-600 dark:text-neutral-400">
                {formatDate(game.metadata.publishedAt)}
              </p>
              {game.metadata.genre && (
                <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-700 dark:text-neutral-300">
                  {game.metadata.genre}
                </span>
              )}
              {game.metadata.platform && (
                <span className="text-neutral-500 dark:text-neutral-500">
                  {game.metadata.platform}
                </span>
              )}
            </div>
            
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              {game.metadata.summary}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              {game.metadata.externalLink && (
                <Link
                  href={game.metadata.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Play Now
                </Link>
              )}
              <Link
                href="/games"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                ← Back to Games
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Content */}
      <article className="prose max-w-none">
        <CustomMDX source={game.content} />
      </article>
    </section>
  )
} 