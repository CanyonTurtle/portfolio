import { CareerCard, GameCard } from 'app/components/cards'
import { BlogPosts } from 'app/components/posts'
import { getCareerPosts } from 'app/career/utils'
import { getGames } from 'app/games/utils'
import { getBlogPosts } from 'app/blog/utils'

export default function Page() {
  const careerPosts = getCareerPosts()
  const games = getGames()
  const blogPosts = getBlogPosts()
  
  // Get the latest career post (most recent publishedAt)
  const latestCareer = careerPosts
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())[0]
  
  // Get a featured game (you can change this to any specific game slug)
  const featuredGame = games.find(game => game.slug === 'zelda-tears-of-kingdom') || games[0]

  // Get the latest 3 blog posts
  const latestBlogs = blogPosts
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3)

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Cannon Tuttle
      </h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {`I'm a dedicated software engineer with a natural curiosity for and a growing skillset of fullstack skills like programming, system design, networking, and security. Not only do I have industry experience working at Redo, but I also love to make my own projects - especially games!`}
      </p>
      
      <div className="space-y-12">
        {/* Latest Career Highlight */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest Experience</h2>
            <a 
              href="/career" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all experience →
            </a>
          </div>
          {latestCareer && (
            <CareerCard 
              post={latestCareer} 
              href={`/career/${latestCareer.slug}`}
            />
          )}
        </div>

        {/* Featured Game */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Featured Game</h2>
            <a 
              href="/games" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all games →
            </a>
          </div>
          {featuredGame && (
            <GameCard 
              game={featuredGame} 
              href={`/games/${featuredGame.slug}`}
            />
          )}
        </div>

        {/* Latest Blog Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest Posts</h2>
            <a 
              href="/blog" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all posts →
            </a>
          </div>
          <div className="space-y-4">
            {latestBlogs.map((post) => (
              <a
                key={post.slug}
                className="group block p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-200 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                href={post.metadata.externalLink || `/blog/${post.slug}`}
                target={post.metadata.externalLink ? "_blank" : undefined}
                rel={post.metadata.externalLink ? "noopener noreferrer" : undefined}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-shrink-0">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums font-mono">
                      {new Date(post.metadata.publishedAt).toLocaleDateString('en-us', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
