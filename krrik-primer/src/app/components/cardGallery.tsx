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
  card_faces?: Array<{
    image_uris?: {
      normal: string;
      large: string;
    };
  }>;
  scryfall_uri: string;
  _localType: string;
}

export default function CardGallery() {
  const [cards, setCards] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    async function fetchCards() {
      const results = await Promise.all(
        cardData.map(async (card: Card) => {
          try {
            const res = await fetch(
              `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
                card.scryfallQuery
              )}`
            );

            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("API Response for", card.scryfallQuery, ":", data);

            // Check if the card has multiple faces (like Transformers cards)
            let imageUrl = data.image_uris?.normal;

            // If no main image, check card_faces (for double-faced cards)
            if (!imageUrl && data.card_faces && data.card_faces.length > 0) {
              imageUrl = data.card_faces[0].image_uris?.normal;
            }

            return {
              ...data,
              _localType: card.type,
              // Ensure we always have image_uris for consistent structure
              image_uris: imageUrl ? { normal: imageUrl } : undefined
            };
          } catch (error) {
            console.error(`Error fetching ${card.scryfallQuery}:`, error);
            return {
              id: Math.random().toString(),
              name: card.scryfallQuery,
              type_line: card.type,
              scryfall_uri: "#",
              _localType: card.type,
            };
          }
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
            {group.map((card, idx) => {
              // Get the image URL - check both locations
              const imageUrl = card.image_uris?.normal ||
                (card.card_faces && card.card_faces[0]?.image_uris?.normal);

              return (
                <div
                  key={card.id}
                  className={`relative transition-transform duration-300 hover:scale-125 hover:z-20 ${idx > 0 ? "-ml-16" : ""}`}
                >
                  <a
                    href={card.scryfall_uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={card.name}
                        width={200}
                        height={280}
                        className="rounded-lg shadow-lg"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-[200px] h-[280px] bg-gray-700 rounded-lg shadow-lg flex items-center justify-center p-4">
                              <span class="text-white text-sm text-center">${card.name}</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-[200px] h-[280px] bg-gray-700 rounded-lg shadow-lg flex items-center justify-center p-4">
                        <span className="text-white text-sm text-center">
                          {card.name}
                        </span>
                      </div>
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
