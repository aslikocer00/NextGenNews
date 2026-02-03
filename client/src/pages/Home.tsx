import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturedSection } from "@/components/FeaturedSection";
import { LatestStream } from "@/components/LatestStream";
import { PopularSection } from "@/components/MostPopular";
import { FreeToday } from "@/components/FreeToday";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/lib/articles";
import { Link } from "wouter";
import { featuredStories, mainFeedStories } from "@/lib/mockData";

export default function Home() {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });
  const hasApiContent = articles.length > 0;
  const fallbackFeatured: Article[] = featuredStories.map((s, idx) => ({
    id: s.id,
    slug: s.id,
    title: s.title,
    summary: s.description ?? "",
    content: s.description ?? "",
    category: s.category,
    author: s.author,
    coverImage: s.image,
    isFeatured: idx === 0,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  const fallbackFeed: Article[] = mainFeedStories.map((s) => ({
    id: s.id,
    slug: s.id,
    title: s.title,
    summary: s.description ?? "",
    content: s.description ?? "",
    category: s.category,
    author: s.author,
    coverImage: s.image,
    isFeatured: false,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  const featured = hasApiContent ? articles.filter((a) => a.isFeatured).slice(0, 4) : fallbackFeatured;
  const feed = hasApiContent ? articles.filter((a) => !a.isFeatured) : fallbackFeed;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-8">
        {/* Hero / Featured */}
        <FeaturedSection stories={featured.length ? featured : articles.slice(0, 4)} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Main Feed Column */}
          <div className="lg:col-span-8">
             <FreeToday />
             
             <div className="flex items-center gap-2 mb-6 mt-12">
                <h2 className="text-2xl font-serif font-bold text-white">Son Haberler</h2>
                <div className="h-px bg-white/10 flex-1 ml-4" />
             </div>

             <div className="flex flex-col gap-10">
                {(feed.length ? feed : articles).map((story) => (
                  <article key={story.id} className="group grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-1 aspect-video md:aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                        <img 
                          src={story.coverImage}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={story.title}
                        />
                     </div>
                     <div className="md:col-span-2 flex flex-col justify-center">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{story.category}</span>
                        <Link href={`/haber/${story.slug}`} className="block">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-3 group-hover:text-primary transition-colors cursor-pointer">
                             {story.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                           {story.summary}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                           <span className="text-foreground">{story.author}</span>
                           <span>•</span>
                           <span>{new Date(story.publishedAt).toLocaleDateString("tr-TR")}</span>
                        </div>
                     </div>
                  </article>
                ))}
                {!isLoading && articles.length === 0 && <p>Su an mock icerik gosteriliyor. /admin uzerinden makale ekledikce burasi otomatik guncellenir.</p>}
             </div>

             <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg" className="w-full md:w-auto font-bold uppercase tracking-widest px-12 border-white/10 hover:bg-white/5">
                   Daha Fazla Haber
                </Button>
             </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-12">
            <PopularSection />
            <LatestStream />
            
            {/* Newsletter Box */}
            <div className="p-8 bg-gradient-brand rounded-sm text-center">
               <h3 className="text-2xl font-serif font-bold text-white mb-2">NextGen'e Katılın</h3>
               <p className="text-white/80 text-sm mb-6">En son teknoloji haberleri her sabah e-postanızda.</p>
               <input 
                 type="email" 
                 placeholder="E-posta adresiniz" 
                 className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm font-mono mb-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
               />
               <button className="w-full bg-black text-white font-bold uppercase tracking-widest py-3 text-xs hover:bg-black/80 transition-colors rounded-sm">
                  Abone Ol
               </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
