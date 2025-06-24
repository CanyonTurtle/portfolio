import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Cannon Tuttle
      </h1>
      <p className="mb-4">
        {`I'm a dedicated software engineer with a natural curiosity for and a growing skilset of fullstack skills like programming, system design, networking, and security. Not only do I have industry experience working at Redo, but I also love to make my own projects - especially games!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
