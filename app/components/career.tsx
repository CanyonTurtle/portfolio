import Link from 'next/link'
import { formatDate, getCareerPosts } from 'app/career/utils'

// Import RoundedImage from the MDX components
function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

export function CareerList() {
  let allCareerPosts = getCareerPosts()

  return (
    <div className="space-y-4">
      {allCareerPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <div key={post.slug} className="group">
            <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {post.metadata.image ? (
                    <RoundedImage
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-200 rounded-lg"
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
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.metadata.title}
                  </h3>
                  {post.metadata.position && post.metadata.company && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {post.metadata.position} at {post.metadata.company}
                    </p>
                  )}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                    {post.metadata.summary}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                      <span>{formatDate(post.metadata.publishedAt, false)}</span>
                      {post.metadata.technologies && (
                        <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                          {post.metadata.technologies}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.externalLink && (
                        <Link
                          href={post.metadata.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                        >
                          View Project
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
                      <Link
                        href={`/career/${post.slug}`}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
} 