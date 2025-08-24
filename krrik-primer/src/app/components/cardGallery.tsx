'use client';
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cardData, Card } from "../../../data/cards";

interface ScryfallCard {
  id: string;
  name: string;
  type_line: string;
  image_uris?: {
    normal: string;
    large: string;
  };
  scryfall_uri: string;
  _localType: string;
}

export default function CardGallery() {
  const [cards, setCards] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    async function fetchCards() {
      const results = await Promise.all(
        cardData.map(async (card: Card) => {
          const res = await fetch(
            `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
              card.scryfallQuery
            )}`
          );
          const data = await res.json();
          return { ...data, _localType: card.type };
        })
      );
      setCards(results);
    }
    fetchCards();
  }, []);

  // Group cards by type
  const grouped = cards.reduce((acc: Record<string, ScryfallCard[]>, card) => {
    if (!acc[card._localType]) acc[card._localType] = [];
    acc[card._localType].push(card);
    return acc;
  }, {});

  return (
    <div className="space-y-16 mt-10">
      {Object.entries(grouped).map(([type, group]) => (
        <div key={type} className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{type}</h2>
          <div className="flex justify-center">
            {group.map((card, idx) => (
              <div
                key={card.id}
                className={`relative transition-transform duration-300 hover:scale-125 hover:z-20 ${idx > 0 ? "-ml-16" : ""
                  }`}
              >
                <a
                  href={card.scryfall_uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={card.image_uris?.normal || "/fallback.jpg"}
                    alt={card.name}
                    width={200}
                    height={280}
                    className="rounded-lg shadow-lg"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
