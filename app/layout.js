import "./globals.css";

export const metadata = {
  title: "C-remonie | Magazen Rad Premium",
  description: "Achte ak lwe bèl rad maryaj, kostim, soulye, ak tòj.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ht">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
