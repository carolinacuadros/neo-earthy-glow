import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getInstagramThumbnail = createServerFn({ method: "GET" })
  .validator((data) =>
    z.object({ url: z.string().url() }).parse(data)
  )
  .handler(async ({ data }) => {
    const reelUrl = data.url.replace(/\/$/, "");
    const res = await fetch(`${reelUrl}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
    });

    if (!res.ok) {
      throw new Error(`No se pudo obtener la portada de Instagram`);
    }

    const html = await res.text();
    const match = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i
    );

    if (!match?.[1]) {
      throw new Error("No se encontró la imagen de portada");
    }

    return {
      thumbnailUrl: match[1].replace(/&amp;/g, "&"),
    };
  });
