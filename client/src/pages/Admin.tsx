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
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  if (meLoading) return <main className="container mx-auto p-6">Loading...</main>;
  if (!me?.isAdmin) {
    return (
      <main className="container mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <input className="border p-2 text-black" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <input
          className="border p-2 text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="border p-2" onClick={() => loginMutation.mutate()}>
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin - Articles</h1>
        <button className="border px-3 py-1" onClick={() => logoutMutation.mutate()}>
          Logout
        </button>
      </div>
      <div className="grid gap-2">
        {Object.entries(form).map(([key, value]) =>
          key === "isFeatured" ? (
            <label key={key}>
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
              />{" "}
              Featured
            </label>
          ) : key === "content" ? (
            <textarea
              key={key}
              placeholder={key}
              className="border p-2 text-black"
              value={String(value)}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
          ) : (
            <input
              key={key}
              placeholder={key}
              className="border p-2 text-black"
              value={String(value)}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
          ),
        )}
        <button className="border p-2" onClick={() => saveMutation.mutate()}>
          {editingId ? "Update" : "Create"}
        </button>
      </div>
      <div className="space-y-2">
        {articles.map((a) => (
          <div key={a.id} className="border p-3 flex items-center justify-between gap-3">
            <div>
              <div className="font-bold">{a.title}</div>
              <div className="text-sm text-muted-foreground">/{a.slug}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="border px-3 py-1"
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
                }}
              >
                Edit
              </button>
              <button className="border px-3 py-1" onClick={() => deleteMutation.mutate(a.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
