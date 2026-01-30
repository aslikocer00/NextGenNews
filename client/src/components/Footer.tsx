import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 md:py-24 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-brand rounded-sm flex items-center justify-center">
                 <span className="font-bold font-mono text-white text-xl">N</span>
              </div>
              <span className="font-serif font-black text-2xl tracking-tighter uppercase">NextGen</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Geleceği şekillendiren teknoloji, bilim ve kültür haberleri. NextGen, yeni nesil haberciliğin öncüsü.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-sm text-primary mb-2">Bölümler</h3>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Teknoloji</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Bilim</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Eğlence</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">İncelemeler</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-sm text-secondary mb-2">Kurumsal</h3>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Reklam</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Kariyer</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">İletişim</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-sm text-accent mb-2">Takip Et</h3>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter / X</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">RSS Feed</Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>&copy; 2026 NextGen Media. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-foreground">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
