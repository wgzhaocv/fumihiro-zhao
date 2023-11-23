export const emailConfig = {
  from: "wgzhaocv@gmail.com",
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://wgzhaocv.me"
      : "http://localhost:3000",
};
