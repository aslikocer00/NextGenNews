import { useParams } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PopularSection } from "@/components/MostPopular";

export default function Article() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main>
         {/* Article Header */}
         <div className="relative w-full h-[50vh] md:h-[60vh] bg-muted">
            <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop" 
                 className="w-full h-full object-cover"
                 alt="Article Cover"
               />
               <div className="absolute inset-0 bg-black/60" />
            </div>
            
            <div className="container mx-auto px-4 h-full relative flex items-end pb-12">
               <div className="max-w-4xl">
                  <span className="inline-block px-3 py-1 bg-primary text-black font-bold uppercase tracking-wider text-xs mb-6">
                     Yapay Zeka
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
                     OpenAI'ın yeni modeli 'o2' düşünme yeteneğiyle şaşırttı (ID: {id})
                  </h1>
                  <p className="text-xl text-gray-300 font-medium max-w-2xl leading-relaxed">
                     Yapay zeka dünyasında kartlar yeniden dağıtılıyor. Yeni model, karmaşık mantık problemlerini çözmede insan seviyesini aşıyor.
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
                     <span className="font-serif font-bold text-lg text-primary">Canan Yılmaz</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tarih</span>
                     <span className="font-mono text-sm">24 Ocak 2026</span>
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
                  <p className="lead text-2xl font-serif leading-relaxed text-white">
                     Yapay zeka teknolojileri her geçen gün gelişmeye devam ederken, OpenAI cephesinden gelen son haberler teknoloji dünyasını bir kez daha sarstı.
                  </p>
                  
                  <p>
                     Şirketin bugün tanıttığı yeni dil modeli, sadece metin üretmekle kalmıyor, aynı zamanda karmaşık mantık yürütme süreçlerini de şeffaf bir şekilde kullanıcıya sunuyor. Bu gelişme, yapay zekanın "kara kutu" problemini çözme yolunda atılmış dev bir adım olarak nitelendiriliyor.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 text-white border-l-4 border-primary pl-6">Neden Bu Kadar Önemli?</h2>
                  
                  <p>
                     Geleneksel dil modelleri, bir sonraki kelimeyi tahmin etme prensibiyle çalışır. Ancak yeni model, tıpkı bir insan gibi "düşünme molaları" vererek problemleri adım adım analiz edebiliyor. Matematik, kodlama ve bilimsel makale analizi gibi alanlarda %40'a varan performans artışı gözlemlendi.
                  </p>

                  <figure className="my-12">
                     <img 
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" 
                        alt="AI Chip" 
                        className="w-full rounded-sm"
                     />
                     <figcaption className="text-center text-sm text-muted-foreground font-mono mt-4">Yeni nesil işlemciler yapay zeka devrimini hızlandırıyor.</figcaption>
                  </figure>

                  <h3>Uzman Görüşleri</h3>
                  
                  <p>
                     MIT Bilgisayar Bilimleri Laboratuvarı'ndan Prof. Dr. James Smith, "Bu sadece bir güncelleme değil, bir paradigma değişimi" diyor. Smith'e göre, yapay zekanın muhakeme yeteneği kazanması, otonom sistemlerin güvenilirliğini artıracak en kritik faktör.
                  </p>

                  <blockquote>
                     "Gelecek, cevapları bilen değil, doğru soruları sorabilen makinelerin olacak."
                  </blockquote>

                  <p>
                     Ancak eleştiriler de yok değil. Bazı etik uzmanları, bu denli gelişmiş bir muhakeme yeteneğinin kötü niyetli kullanımlara kapı aralayabileceği konusunda uyarıyor. Özellikle siber güvenlik alanında, yeni modelin yetenekleri iki ucu keskin bir bıçak gibi.
                  </p>
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
