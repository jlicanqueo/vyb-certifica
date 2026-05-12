import "./globals.css";
import Navbar from "../components/Navbar";
import Andinita from "../components/Andinita";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
        <Andinita />
      </body>
    </html>
  );
}