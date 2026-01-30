import { Link } from "wouter";
import { freeTodayItems } from "@/lib/mockData";

export function FreeToday() {
  return (
    <div className="mb-12">
       <div className="flex items-center gap-2 mb-6">
        <span className="h-3 w-3 rounded-full bg-accent animate-pulse" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent">Bugün Ücretsiz</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {freeTodayItems.map((item) => (
           <Link key={item.id} href={`/haber/${item.id}`} className="group block bg-muted aspect-square relative overflow-hidden rounded-sm">
              <img 
                src={item.image}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                alt={item.title}
              />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                 <span className="text-accent text-xs font-bold uppercase block mb-1">{item.subtitle}</span>
                 <p className="text-white text-sm font-bold leading-tight">{item.title}</p>
              </div>
           </Link>
        ))}
      </div>
    </div>
  );
}
