import { CareerCard, GameCard, BlogCard } from 'app/components/cards'
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
              <BlogCard
                key={post.slug}
                post={post}
                href={post.metadata.externalLink || `/blog/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
