import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { getImageFullPath } from 'base-path'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
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
      url: `${baseUrl}/blog/${post.slug}`,
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

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
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
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? getImageFullPath(post.metadata.image)
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      
      {/* Header with image and metadata */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image */}
          <div className="flex-shrink-0">
            {post.metadata.image ? (
              <img
                src={getImageFullPath(post.metadata.image)}
                alt={post.metadata.title}
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg shadow-md">
                <div className="text-neutral-400 dark:text-neutral-500 text-4xl md:text-6xl font-bold">
                  {post.metadata.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h1 className="title font-semibold text-2xl md:text-3xl tracking-tighter mb-4">
              {post.metadata.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              <p className="tabular-nums font-mono">
                {formatDate(post.metadata.publishedAt)}
              </p>
              {post.metadata.externalLink && (
                <a
                  href={post.metadata.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <svg
                    className="w-4 h-4"
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
                  External Link
                </a>
              )}
            </div>
            
            {post.metadata.summary && (
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                {post.metadata.summary}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Article content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
