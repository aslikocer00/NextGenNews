import { Link } from "wouter";
import { popularItems } from "@/lib/mockData";

export function PopularSection() {
  return (
    <div className="bg-card p-6 rounded-sm border border-white/5">
      <h3 className="text-lg font-bold font-serif italic text-white mb-6 border-b border-secondary/50 pb-2">
        En Popüler
      </h3>
      
      <div className="flex flex-col gap-0">
        {popularItems.map((item) => (
          <Link key={item.id} href={`/haber/${item.id}`} className="group py-4 border-b border-white/5 last:border-0 flex gap-4 items-start">
            <span className="text-2xl font-black font-serif text-white/10 group-hover:text-secondary transition-colors leading-none -mt-1">
              {item.rank}
            </span>
            <h4 className="text-base font-bold leading-tight group-hover:text-secondary transition-colors">
              {item.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
