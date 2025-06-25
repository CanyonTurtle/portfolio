import { CareerCard, GameCard, BlogCard, ProjectCard } from 'app/components/cards'
import { getCareerPosts } from 'app/career/utils'
import { getGames } from 'app/games/utils'
import { getBlogPosts } from 'app/blog/utils'
import { getProjects } from 'app/projects/utils'
import Link from 'next/link'

export default function Page() {
  const careerPosts = getCareerPosts()
  const games = getGames()
  const blogPosts = getBlogPosts()
  const projects = getProjects()
  
  // Get the latest career post (most recent publishedAt)
  const latestCareer = careerPosts
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())[0]
  
  // Get a featured game (you can change this to any specific game slug)
  const featuredGame = games.find(game => game.slug === 'zelda-tears-of-kingdom') || games[0]

  // Get a featured project
  const featuredProject = projects.find(project => project.slug === 'see-sharp') || projects[0]

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
        {`I'm a dedicated software engineer with a natural curiosity for and a growing skillset of fullstack skills like programming, system design, networking, and security. Not only do I have industry experience working at Redo, but I also love to make my own projects - especially games! I also have a mathematical literacy that allows me to model and optimize complex systems, especially with uncertainties.`}
      </p>
      
      <div className="space-y-12">
        {/* Latest Career Highlight */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest experience</h2>
            <Link 
              href="/career" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all experience →
            </Link>
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
            <h2 className="text-xl font-semibold tracking-tight">Featured game</h2>
            <Link 
              href="/games" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all games →
            </Link>
          </div>
          {featuredGame && (
            <GameCard 
              game={featuredGame} 
              href={`/games/${featuredGame.slug}`}
            />
          )}
        </div>

        {/* Featured Project */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Featured project</h2>
            <Link 
              href="/projects" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all projects →
            </Link>
          </div>
          {featuredProject && (
            <ProjectCard 
              project={featuredProject} 
              href={`/projects/${featuredProject.slug}`}
            />
          )}
        </div>

        {/* Latest Blog Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest posts</h2>
            <Link 
              href="/blog" 
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View all posts →
            </Link>
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
