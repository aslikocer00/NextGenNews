import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PopularSection } from "@/components/MostPopular";
import type { Article as ArticleType } from "@/lib/articles";

export default function Article() {
  const { id } = useParams();
  const { data: article, isLoading } = useQuery<ArticleType>({
    queryKey: [`/api/articles/${id}`],
  });
  if (isLoading) return <div>Yukleniyor...</div>;
  if (!article) return <div>Makale bulunamadi.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main>
         {/* Article Header */}
         <div className="relative w-full h-[50vh] md:h-[60vh] bg-muted">
            <div className="absolute inset-0">
                 <img 
                 src={article.coverImage}
                 className="w-full h-full object-cover"
                 alt="Article Cover"
               />
               <div className="absolute inset-0 bg-black/60" />
            </div>
            
            <div className="container mx-auto px-4 h-full relative flex items-end pb-12">
               <div className="max-w-4xl">
                  <span className="inline-block px-3 py-1 bg-primary text-black font-bold uppercase tracking-wider text-xs mb-6">
                     {article.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
                     {article.title}
                  </h1>
                  <p className="text-xl text-gray-300 font-medium max-w-2xl leading-relaxed">
                     {article.summary}
                  </p>
               </div>
            </div>
         </div>

         {/* Article Content & Sidebar Layout */}
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               
               {/* Metadata Column */}
               <div className="hidden lg:block lg:col-span-2 space-y-6 sticky top-24 self-start">
                  <div className="flex flex-col gap-1">
                     <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Yazar</span>
                     <span className="font-serif font-bold text-lg text-primary">{article.author}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tarih</span>
                     <span className="font-mono text-sm">{new Date(article.publishedAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex gap-4 text-muted-foreground">
                     {/* Share Icons placeholders */}
                     <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">X</div>
                     <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">f</div>
                     <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">in</div>
                  </div>
               </div>

               {/* Main Text Column */}
               <div className="lg:col-span-7 prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-p:font-sans prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80">
                  {article.content.split("\n").filter(Boolean).map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
               </div>

               {/* Right Sidebar */}
               <div className="lg:col-span-3 space-y-12">
                  <PopularSection />
                  
                  <div className="bg-muted p-6 rounded-sm">
                     <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">İlgili Konular</span>
                     <div className="flex flex-wrap gap-2">
                        {["Yapay Zeka", "Teknoloji", "Gelecek", "OpenAI", "Yazılım"].map(tag => (
                           <span key={tag} className="px-3 py-1 bg-background border border-white/10 text-xs font-mono hover:border-primary cursor-pointer transition-colors">
                              #{tag}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </main>

      <Footer />
    </div>
  );
}
