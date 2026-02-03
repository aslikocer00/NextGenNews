import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Article } from "@/lib/articles";

const emptyForm = {
  slug: "",
  title: "",
  summary: "",
  content: "",
  category: "",
  author: "",
  coverImage: "",
  isFeatured: false,
};

export default function Admin() {
  const queryClient = useQueryClient();
  const { data: me, isLoading: meLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/me"],
    retry: false,
  });
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const [username, setUsername] = useState("nextgenadmin");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/login", { username, password }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] }),
  });
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] }),
  });

  const saveMutation = useMutation({
    mutationFn: async () =>
      editingId
        ? (await apiRequest("PATCH", `/api/admin/articles/${editingId}`, form)).json()
        : (await apiRequest("POST", "/api/admin/articles", form)).json(),
    onSuccess: () => {
      setForm(emptyForm);
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/articles/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/articles"] }),
  });

  const filteredArticles = articles.filter((a) =>
    `${a.title} ${a.slug} ${a.category} ${a.author}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (meLoading) return <main className="container mx-auto p-6">Loading...</main>;
  if (!me?.isAdmin) {
    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-12">
        <div className="mx-auto max-w-md border border-white/10 bg-card/70 backdrop-blur p-8 rounded-xl space-y-4">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Lutfen editor hesabinizla giris yapin.</p>
          <input
            className="w-full rounded-md border border-white/20 bg-background px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        <input
          className="w-full rounded-md border border-white/20 bg-background px-3 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
          <button className="w-full rounded-md bg-primary text-black font-semibold py-2" onClick={() => loginMutation.mutate()}>
            {loginMutation.isPending ? "Giris yapiliyor..." : "Giris Yap"}
          </button>
          {loginMutation.isError && <p className="text-sm text-red-400">Giris basarisiz. Kullanici adi/sifreyi kontrol edin.</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Icerik Yonetimi</h1>
          <p className="text-sm text-muted-foreground">Yeni haber ekleyin, mevcut haberleri duzenleyin veya silin.</p>
        </div>
        <button className="rounded-md border border-white/20 px-4 py-2" onClick={() => logoutMutation.mutate()}>
          Cikis Yap
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <section className="xl:col-span-2 border border-white/10 rounded-xl p-5 bg-card/40 space-y-4">
          <h2 className="text-xl font-semibold">{editingId ? "Haberi Duzenle" : "Yeni Haber Ekle"}</h2>
          <input className="w-full rounded-md border border-white/20 bg-background px-3 py-2" placeholder="Slug (ornek: openai-yeni-model)" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
          <input className="w-full rounded-md border border-white/20 bg-background px-3 py-2" placeholder="Baslik" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <input className="w-full rounded-md border border-white/20 bg-background px-3 py-2" placeholder="Kategori" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
          <input className="w-full rounded-md border border-white/20 bg-background px-3 py-2" placeholder="Yazar" value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} />
          <input className="w-full rounded-md border border-white/20 bg-background px-3 py-2" placeholder="Kapak gorsel URL" value={form.coverImage} onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))} />
          <textarea className="w-full rounded-md border border-white/20 bg-background px-3 py-2 min-h-24" placeholder="Kisa ozet" value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} />
          <textarea className="w-full rounded-md border border-white/20 bg-background px-3 py-2 min-h-48" placeholder="Haber icerigi (paragraflari satir satir yazin)" value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))} />
            Mansete cikar (Featured)
          </label>
          <div className="flex gap-2">
            <button className="rounded-md bg-primary text-black font-semibold px-4 py-2" onClick={() => saveMutation.mutate()}>
              {saveMutation.isPending ? "Kaydediliyor..." : editingId ? "Guncelle" : "Olustur"}
            </button>
            {editingId && (
              <button
                className="rounded-md border border-white/20 px-4 py-2"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Iptal
              </button>
            )}
          </div>
        </section>
        <section className="xl:col-span-3 border border-white/10 rounded-xl p-5 bg-card/40 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-xl font-semibold">Mevcut Haberler ({filteredArticles.length})</h2>
            <input
              className="rounded-md border border-white/20 bg-background px-3 py-2 md:w-72"
              placeholder="Baslik, slug, kategori ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-2 max-h-[70vh] overflow-auto pr-1">
            {filteredArticles.map((a) => (
              <article key={a.id} className="rounded-lg border border-white/10 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    /{a.slug} • {a.category} • {a.author} {a.isFeatured ? "• Manset" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-md border border-white/20 px-3 py-1.5"
                    onClick={() => {
                      setEditingId(a.id);
                      setForm({
                        slug: a.slug,
                        title: a.title,
                        summary: a.summary,
                        content: a.content,
                        category: a.category,
                        author: a.author,
                        coverImage: a.coverImage,
                        isFeatured: a.isFeatured,
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Duzenle
                  </button>
                  <button className="rounded-md border border-red-400/40 text-red-300 px-3 py-1.5" onClick={() => deleteMutation.mutate(a.id)}>
                    Sil
                  </button>
                </div>
              </article>
            ))}
            {filteredArticles.length === 0 && <p className="text-sm text-muted-foreground">Kayit bulunamadi.</p>}
          </div>
        </section>
      </div>
      </div>
    </main>
  );
}
