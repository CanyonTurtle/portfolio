import Link from 'next/link'
import { formatDate } from 'app/lib/mdx'
import { getImageFullPath } from 'base-path'
import { getBlogPosts } from 'app/blog/utils'

// Import RoundedImage from the MDX components
function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

// Career card component
export function CareerCard({ post, compact = false, href }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {post.metadata.image ? (
            <RoundedImage
              src={getImageFullPath(post.metadata.image)}
              alt={post.metadata.title}
              className="w-24 object-contain hover:scale-105 transition-transform duration-200 rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg">
              <div className="text-neutral-400 dark:text-neutral-500 text-2xl font-bold">
                {post.metadata.position?.charAt(0) || post.metadata.title.charAt(0)}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.metadata.position}
          </h3>
          {post.metadata.company && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {post.metadata.company}
            </p>
          )}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {post.metadata.summary}
          </p>
          {!compact && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                <span>
                  {post.metadata.startDate && post.metadata.endDate 
                    ? `${formatDate(post.metadata.startDate, false)} - ${formatDate(post.metadata.endDate, false)}`
                    : post.metadata.startDate 
                    ? `${formatDate(post.metadata.startDate, false)} - Present`
                    : formatDate(post.metadata.publishedAt, false)
                  }
                </span>
                {post.metadata.technologies && (
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                    {post.metadata.technologies}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
              <Link
                  href={href}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  Read more
                </Link>
                {post.metadata.externalLink && (
                  <Link
                    href={post.metadata.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                  >
                    View LinkedIn
                  </Link>
                )}
                {post.metadata.source && (
                  <Link
                    href={post.metadata.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
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
                    Source
                  </Link>
                )}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Game card component
export function GameCard({ game, compact = false, href }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {game.metadata.image ? (
            <RoundedImage
              src={getImageFullPath(game.metadata.image)}
              alt={game.metadata.title}
              className="w-24 object-contain hover:scale-105 transition-transform duration-200 rounded-lg"
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
          <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {game.metadata.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {game.metadata.summary}
          </p>
          {!compact && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                <span>{formatDate(game.metadata.publishedAt, false)}</span>
                {game.metadata.genre && (
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                    {game.metadata.genre}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {game.metadata.externalLink && (
                  <Link
                    href={game.metadata.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  >
                    Play now
                  </Link>
                )}
                {game.metadata.source && (
                  <Link
                    href={game.metadata.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
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
                    Source
                  </Link>
                )}
                <Link
                  href={href}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                >
                  Read more
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Project card component
export function ProjectCard({ project, compact = false, href }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {project.metadata.image ? (
            <RoundedImage
              src={getImageFullPath(project.metadata.image)}
              alt={project.metadata.title}
              className="w-24 object-contain hover:scale-105 transition-transform duration-200 rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg">
              <div className="text-neutral-400 dark:text-neutral-500 text-2xl font-bold">
                {project.metadata.title.charAt(0)}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {project.metadata.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {project.metadata.summary}
          </p>
          {!compact && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                <span>{formatDate(project.metadata.publishedAt, false)}</span>
                {project.metadata.category && (
                  <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                    {project.metadata.category}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.metadata.externalLink && (
                  <Link
                    href={project.metadata.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  >
                    View project
                  </Link>
                )}
                {project.metadata.source && (
                  <Link
                    href={project.metadata.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
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
                    Source
                  </Link>
                )}
                <Link
                  href={href}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                >
                  Read more
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Blog card component
export function BlogCard({ post, compact = false, href }) {
  const cardContent = (
    <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {post.metadata.image ? (
            <RoundedImage
              src={getImageFullPath(post.metadata.image)}
              alt={post.metadata.title}
              className="w-24 object-contain group-hover:scale-105 transition-transform duration-200 rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center rounded-lg">
              <div className="text-neutral-400 dark:text-neutral-500 text-2xl font-bold">
                {post.metadata.title.charAt(0)}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {post.metadata.title}
            </h3>
            {post.metadata.externalLink && (
              <svg
                className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-1"
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
          <p className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums font-mono mb-2">
            {formatDate(post.metadata.publishedAt, false)}
          </p>
          {post.metadata.summary && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {post.metadata.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <Link 
        href={href} 
        className="group block"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

// Blog posts list component
export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-4">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            href={post.metadata.externalLink || `/blog/${post.slug}`}
          />
        ))}
    </div>
  )
} 