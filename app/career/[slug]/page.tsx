import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getCareerPosts } from 'app/career/utils'
import { baseUrl } from 'app/sitemap'
import Link from 'next/link'
import { getImageFullPath } from 'base-path'

// Import RoundedImage from the MDX components
function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

export async function generateStaticParams() {
  let posts = getCareerPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getCareerPosts().find((post) => post.slug === params.slug)
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
      url: `${baseUrl}/career/${post.slug}`,
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

export default function CareerPost({ params }) {
  let post = getCareerPosts().find((post) => post.slug === params.slug)

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
            '@type': 'Article',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? getImageFullPath(post.metadata.image)
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/career/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      
      {/* Career Post Header with Image and CTA */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Post Image */}
          <div className="flex-shrink-0">
            {post.metadata.image ? (
              <RoundedImage
                src={getImageFullPath(post.metadata.image)}
                alt={post.metadata.title}
                className="w-64 h-auto object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg shadow-md">
                <div className="text-neutral-400 dark:text-neutral-500 text-6xl font-bold">
                  {post.metadata.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          {/* Post Info and CTA */}
          <div className="flex-1 min-w-0">
            <h1 className="title font-semibold text-3xl tracking-tighter mb-4">
              {post.metadata.title}
            </h1>
            
            {post.metadata.position && post.metadata.company && (
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-2">
                {post.metadata.position} at {post.metadata.company}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <p className="text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
              {post.metadata.location && (
                <span className="text-neutral-500 dark:text-neutral-500">
                  📍 {post.metadata.location}
                </span>
              )}
              {post.metadata.technologies && (
                <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-700 dark:text-neutral-300">
                  {post.metadata.technologies}
                </span>
              )}
            </div>
            
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              {post.metadata.summary}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              {post.metadata.externalLink && (
                <Link
                  href={post.metadata.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  View Project
                </Link>
              )}
              {post.metadata.source && (
                <Link
                  href={post.metadata.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  View Source
                </Link>
              )}
              <Link
                href="/career"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                ← Back to Career
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Career Post Content */}
      <article className="prose max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
} 