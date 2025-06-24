import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

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
          <Link
            key={post.slug}
            className="group block p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-200 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
            href={post.metadata.externalLink || `/blog/${post.slug}`}
            target={post.metadata.externalLink ? "_blank" : undefined}
            rel={post.metadata.externalLink ? "noopener noreferrer" : undefined}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-shrink-0">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums font-mono">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
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
                {post.metadata.summary && (
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
