import {
  type Article,
  articles,
  type InsertArticle,
  type InsertUser,
  type User,
} from "@shared/schema";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "./db";

type ArticleFilters = {
  q?: string;
  category?: string;
};

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  listArticles(filters?: ArticleFilters): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
}

class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private articlesMap: Map<string, Article> = new Map();

  async getUser(id: string) {
    return this.users.get(id);
  }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser: InsertUser) {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async listArticles(filters?: ArticleFilters) {
    const rows = Array.from(this.articlesMap.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    return rows.filter((row) => {
      if (filters?.category && row.category !== filters.category) return false;
      if (filters?.q) {
        const q = filters.q.toLowerCase();
        return (
          row.title.toLowerCase().includes(q) ||
          row.summary.toLowerCase().includes(q) ||
          row.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }
  async getArticleBySlug(slug: string) {
    return Array.from(this.articlesMap.values()).find((a) => a.slug === slug);
  }
  async createArticle(insertArticle: InsertArticle) {
    const now = new Date();
    const article: Article = {
      id: randomUUID(),
      slug: insertArticle.slug,
      title: insertArticle.title,
      summary: insertArticle.summary,
      content: insertArticle.content,
      category: insertArticle.category,
      author: insertArticle.author,
      coverImage: insertArticle.coverImage,
      isFeatured: insertArticle.isFeatured ?? false,
      publishedAt: insertArticle.publishedAt ?? now,
      createdAt: now,
      updatedAt: now,
    };
    this.articlesMap.set(article.id, article);
    return article;
  }
  async updateArticle(id: string, patch: Partial<InsertArticle>) {
    const existing = this.articlesMap.get(id);
    if (!existing) return undefined;
    const next: Article = { ...existing, ...patch, updatedAt: new Date() };
    this.articlesMap.set(id, next);
    return next;
  }
  async deleteArticle(id: string) {
    return this.articlesMap.delete(id);
  }
}

class DatabaseStorage implements IStorage {
  async getUser(_id: string) {
    return undefined;
  }
  async getUserByUsername(_username: string) {
    return undefined;
  }
  async createUser(_user: InsertUser) {
    throw new Error("Not implemented");
  }
  async listArticles(filters?: ArticleFilters) {
    if (!db) return [];
    const conditions = [];
    if (filters?.category) conditions.push(eq(articles.category, filters.category));
    if (filters?.q) {
      const term = `%${filters.q}%`;
      conditions.push(
        or(ilike(articles.title, term), ilike(articles.summary, term), ilike(articles.content, term))!,
      );
    }
    if (conditions.length) {
      return db.select().from(articles).where(and(...conditions)).orderBy(desc(articles.publishedAt));
    }
    return db.select().from(articles).orderBy(desc(articles.publishedAt));
  }
  async getArticleBySlug(slug: string) {
    if (!db) return undefined;
    const [row] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    return row;
  }
  async createArticle(insertArticle: InsertArticle) {
    if (!db) throw new Error("DATABASE_URL is not configured");
    const [row] = await db.insert(articles).values(insertArticle).returning();
    return row;
  }
  async updateArticle(id: string, patch: Partial<InsertArticle>) {
    if (!db) throw new Error("DATABASE_URL is not configured");
    const [row] = await db
      .update(articles)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return row;
  }
  async deleteArticle(id: string) {
    if (!db) throw new Error("DATABASE_URL is not configured");
    const result = await db.delete(articles).where(eq(articles.id, id)).returning({ id: articles.id });
    return result.length > 0;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemStorage();
