import "./globals.css";

export const metadata = {
  title: "CRUD Data Table",
  description: "Next.js CRUD with JSON Server"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}