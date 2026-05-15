export interface BlogSource {
  id: string;
  name: string;
  url: string;
  rss: string;
  category: "independent" | "big-tech" | "community";
  paywalled: boolean;
  tags: string[];
}

export const SOURCES: Record<string, BlogSource> = {
  // Independent writers
  "pragmatic-engineer": {
    id: "pragmatic-engineer",
    name: "The Pragmatic Engineer",
    url: "https://newsletter.pragmaticengineer.com",
    rss: "https://newsletter.pragmaticengineer.com/feed",
    category: "independent",
    paywalled: true,
    tags: ["engineering", "career", "architecture", "management"],
  },
  "bytebytego": {
    id: "bytebytego",
    name: "ByteByteGo",
    url: "https://blog.bytebytego.com",
    rss: "https://blog.bytebytego.com/feed",
    category: "independent",
    paywalled: false,
    tags: ["system-design", "architecture", "distributed-systems"],
  },

  // Community platforms
  "towards-data-science": {
    id: "towards-data-science",
    name: "Towards Data Science",
    url: "https://towardsdatascience.com",
    rss: "https://towardsdatascience.com/feed",
    category: "community",
    paywalled: false,
    tags: ["data-science", "ml", "ai", "python"],
  },
  "freecodecamp": {
    id: "freecodecamp",
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news",
    rss: "https://www.freecodecamp.org/news/rss/",
    category: "community",
    paywalled: false,
    tags: ["web-dev", "tutorials", "beginners", "javascript"],
  },
  "hackernoon": {
    id: "hackernoon",
    name: "Hackernoon",
    url: "https://hackernoon.com",
    rss: "https://hackernoon.com/feed",
    category: "community",
    paywalled: false,
    tags: ["tech", "startups", "blockchain", "ai", "dev"],
  },

  // Big Tech
  "aws": {
    id: "aws",
    name: "AWS Blog",
    url: "https://aws.amazon.com/blogs/aws",
    rss: "https://aws.amazon.com/blogs/aws/feed/",
    category: "big-tech",
    paywalled: false,
    tags: ["cloud", "infrastructure", "aws", "amazon"],
  },
  "amazon-science": {
    id: "amazon-science",
    name: "Amazon Science",
    url: "https://www.amazon.science/blog",
    rss: "https://www.amazon.science/index.rss",
    category: "big-tech",
    paywalled: false,
    tags: ["research", "ml", "nlp", "robotics", "amazon"],
  },
  "meta-engineering": {
    id: "meta-engineering",
    name: "Meta Engineering",
    url: "https://engineering.fb.com",
    rss: "https://engineering.fb.com/feed/",
    category: "big-tech",
    paywalled: false,
    tags: ["infrastructure", "ai", "mobile", "open-source", "meta"],
  },
  "google-ai": {
    id: "google-ai",
    name: "Google AI Blog",
    url: "https://blog.research.google",
    rss: "https://blog.research.google/feeds/posts/default",
    category: "big-tech",
    paywalled: false,
    tags: ["ai", "research", "ml", "google"],
  },
  "google-developers": {
    id: "google-developers",
    name: "Google Developers Blog",
    url: "https://developers.googleblog.com",
    rss: "https://developers.googleblog.com/feeds/posts/default",
    category: "big-tech",
    paywalled: false,
    tags: ["web", "android", "cloud", "dev-tools", "google"],
  },
  "deepmind": {
    id: "deepmind",
    name: "DeepMind Blog",
    url: "https://deepmind.google/discover/blog",
    rss: "https://deepmind.google/blog/rss.xml",
    category: "big-tech",
    paywalled: false,
    tags: ["ai", "research", "reinforcement-learning", "science"],
  },
  "netflix-tech": {
    id: "netflix-tech",
    name: "Netflix Tech Blog",
    url: "https://netflixtechblog.com",
    rss: "https://netflixtechblog.com/feed",
    category: "big-tech",
    paywalled: false,
    tags: ["streaming", "infrastructure", "java", "data", "netflix"],
  },
};

export const ALL_SOURCE_IDS = Object.keys(SOURCES);

export function getSourcesByCategory(category: BlogSource["category"]): BlogSource[] {
  return Object.values(SOURCES).filter((s) => s.category === category);
}

export function getSourcesByTag(tag: string): BlogSource[] {
  return Object.values(SOURCES).filter((s) => s.tags.includes(tag));
}
