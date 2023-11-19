export const firstName = "fumihiro" as const;

export const lastName = "zhao" as const;
export const fullname = `${firstName} ${lastName}` as const;

export const seo = {
  title: ` ${fullname} | front-end developer`,
  description: `I'm ${lastName}, a front-end developer based in Tokyo, Japan.`,
  url: new URL(
    process.env.NODE_ENV === "production"
      ? "https://wgzhao.me"
      : "http://localhost:3000"
  ),
  keywords: "fumihiro zhao, wgzhao, zhao wenguang, developer",
} as const;
