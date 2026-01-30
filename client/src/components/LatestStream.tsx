import { Link } from "wouter";
import { streamItems } from "@/lib/mockData";

export function LatestStream() {
  return (
    <div className="w-full border-l border-white/10 pl-0 lg:pl-8 mt-12 lg:mt-0">
      <div className="flex items-center justify-between mb-6 border-b border-primary/50 pb-2">
        <h3 className="text-lg font-bold font-serif italic text-white">Bugünün Akışı</h3>
        <span className="text-xs font-mono text-primary animate-pulse">CANLI</span>
      </div>

      <div className="flex flex-col gap-8 relative">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10" />
        
        {streamItems.map((item) => (
          <div key={item.id} className="relative pl-6 group">
            <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors ring-4 ring-background" />
            
            <div className="text-xs font-mono text-primary mb-1 opacity-70">
              {item.time}
            </div>
            
            <Link href={`/haber/${item.id}`} className="block">
              <h4 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors mb-1">
                {item.title}
              </h4>
            </Link>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>{item.commentCount} Yorum</span>
            </div>
          </div>
        ))}
        
        <button className="w-full py-3 mt-4 text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors text-muted-foreground hover:text-white">
          Daha Fazla Yükle
        </button>
      </div>
    </div>
  );
}
