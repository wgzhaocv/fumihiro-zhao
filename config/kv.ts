export const keyValues = {
  totalPageViews: "totalPageViews",
  lastVisitor: "lastVisitor",
  currentVisitor: "currentVisitor",
  postViews: (id: string) => `postViews:${id}`,
  postReactions: (id: string) => `postReactions:${id}`,
} as const;
