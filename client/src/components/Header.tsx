import React from "react";
import { Link } from "wouter";
import { Search, Menu, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menü</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-white/10 bg-black">
              <nav className="flex flex-col gap-6 mt-10">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tighter hover:text-primary transition-colors">Ana Sayfa</Link>
                <Link href="/kategori/teknoloji" className="text-lg font-medium hover:text-primary transition-colors">Teknoloji</Link>
                <Link href="/kategori/bilim" className="text-lg font-medium hover:text-primary transition-colors">Bilim</Link>
                <Link href="/kategori/eglence" className="text-lg font-medium hover:text-primary transition-colors">Eğlence</Link>
                <Link href="/kategori/araclar" className="text-lg font-medium hover:text-primary transition-colors">Araçlar</Link>
                <div className="h-px bg-white/10 my-2" />
                <Link href="/login" className="text-lg font-medium text-muted-foreground hover:text-primary">Giriş Yap</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-brand rounded-sm flex items-center justify-center">
                <span className="font-bold font-mono text-white text-xl">N</span>
             </div>
             <span className="font-serif font-black text-2xl tracking-tighter uppercase hidden md:block">NextGen</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/kategori/teknoloji" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Teknoloji</Link>
          <Link href="/kategori/bilim" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Bilim</Link>
          <Link href="/kategori/eglence" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Eğlence</Link>
          <Link href="/kategori/araclar" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Otomobil</Link>
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
