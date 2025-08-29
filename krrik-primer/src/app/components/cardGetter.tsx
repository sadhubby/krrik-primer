
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ScryfallCard {
  id: string;
  name: string;
  scryfall_uri: string;
  image_uris?: { normal: string; large: string };
  card_faces?: Array<{ image_uris?: { normal: string; large: string } }>;
}

export default function CardDisplay({
  query,
  linkOverride
}: {
  query: string;
  linkOverride?: string
}) {
  const [card, setCard] = useState<ScryfallCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const res = await fetch(
          `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let imageUrl = data.image_uris?.normal;
        if (!imageUrl && data.card_faces?.length > 0) {
          imageUrl = data.card_faces[0].image_uris?.normal;
        }

        setCard({
          ...data,
          image_uris: imageUrl ? { normal: imageUrl } : undefined,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to load ${query}: ${err.message}`);
        } else {
          setError(`Failed to load ${query}`);
        }
        console.error(err);
      }
    }

    fetchCard();
  }, [query]);

  if (error) {
    return (
      <div className="w-[200px] h-[280px] bg-gray-700 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm text-center">{query}</span>
      </div>
    );
  }

  if (!card) {
    return (<div className="text-gray-400">Loading {query}...</div>);
  }

  const imageUrl =
    card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;

  const href = linkOverride ?? card.scryfall_uri;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={card.name}
          width={200}
          height={280}
          className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="w-[200px] h-[280px] bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm text-center">{card.name}</span>
        </div>
      )}
    </a>
  );
}


