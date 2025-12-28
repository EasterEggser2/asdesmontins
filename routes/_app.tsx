// routes/_app.tsx
import { define } from "../utils.ts";
import { Head, Partial } from "fresh/runtime";
import Navbar from "@/islands/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export default define.page(function App(props) {
  const { Component, url } = props;

  const pathName = url.pathname === "/"
    ? "Inicio"
    : url.pathname.split("/").filter(Boolean)[0];

  const formattedPath = pathName.charAt(0).toUpperCase() + pathName.slice(1);
  const fullTitle = `BTOQ | ${formattedPath}`;

  return (
    <html lang="es">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{fullTitle}</title>

        <link
          f-permanent
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico?v=2025"
        />
        <link rel="preload"
        href="/img/Hero.webp"
        as="image" />

        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <body className="flex flex-col min-h-screen bg-Azul" f-client-nav>
        <Navbar url={url} />

        <main className="grow">
          <Partial name="main-content">
            <Component {...props} />
          </Partial>
        </main>

        <Footer />
      </body>
    </html>
  );
});