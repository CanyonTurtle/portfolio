import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getGames } from 'app/games/utils'
import { baseUrl } from 'app/sitemap'

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
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {game.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(game.metadata.publishedAt)}
        </p>
        {game.metadata.genre && (
          <span className="text-sm text-neutral-500 dark:text-neutral-500">
            {game.metadata.genre}
          </span>
        )}
      </div>
      <article className="prose">
        <CustomMDX source={game.content} />
      </article>
    </section>
  )
} 