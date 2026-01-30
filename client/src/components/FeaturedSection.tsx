import { Link } from "wouter";
import { featuredStories } from "@/lib/mockData";

export function FeaturedSection() {
  const stories = featuredStories;
  const mainStory = stories[0];
  const sideStories = stories.slice(1);

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Öne Çıkanlar</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
        {/* Main Feature - Takes up 8 columns */}
        <div className="lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-sm bg-muted h-[400px] lg:h-full">
          <Link href={`/haber/${mainStory.id}`}>
            <div className="absolute inset-0">
               <img 
                 src={mainStory.image} 
                 alt={mainStory.title}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
            </div>
            
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-4/5">
              <span className="inline-block px-2 py-1 bg-primary text-black text-xs font-bold uppercase tracking-wider mb-4">
                {mainStory.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4 shadow-black drop-shadow-lg">
                {mainStory.title}
              </h1>
              <p className="text-lg text-gray-300 font-medium mb-2">
                {mainStory.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                <span className="uppercase text-primary font-bold">{mainStory.author}</span>
                <span>•</span>
                <span>{mainStory.date}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Side Stack - Takes up 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          {sideStories.map((story) => (
            <Link key={story.id} href={`/haber/${story.id}`} className="flex-1 group relative overflow-hidden rounded-sm bg-muted min-h-[180px]">
              <div className="absolute inset-0">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                  {story.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <div className="text-xs text-gray-500 font-mono mt-auto">
                  {story.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
