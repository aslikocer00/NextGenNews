import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArticleSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/articles", async (req, res) => {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const rows = await storage.listArticles({ q, category });
    res.json(rows);
  });

  app.get("/api/articles/:slug", async (req, res) => {
    const row = await storage.getArticleBySlug(req.params.slug);
    if (!row) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(row);
  });

  app.post("/api/admin/articles", async (req, res) => {
    const parsed = insertArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid payload", issues: parsed.error.issues });
    }
    const created = await storage.createArticle(parsed.data);
    res.status(201).json(created);
  });

  app.patch("/api/admin/articles/:id", async (req, res) => {
    const parsed = insertArticleSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid payload", issues: parsed.error.issues });
    }
    const updated = await storage.updateArticle(req.params.id, parsed.data);
    if (!updated) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updated);
  });

  app.delete("/api/admin/articles/:id", async (req, res) => {
    const deleted = await storage.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(204).send();
  });

  return httpServer;
}
