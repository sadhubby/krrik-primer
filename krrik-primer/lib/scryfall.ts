import { Card } from '../data/cards';

export interface ScryfallCard {
  id: string;
  name: string;
  cmc: number;
  type_line: string;
  colors: string[];
  color_identity: string[];
  mana_cost: string;
}

export async function fetchCardDetails(card: Card): Promise<ScryfallCard> {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(card.scryfallQuery)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${card.scryfallQuery}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      cmc: data.cmc,
      type_line: data.type_line,
      colors: data.colors || [],
      color_identity: data.color_identity || [],
      mana_cost: data.mana_cost || ''
    };
  } catch (error) {
    console.error(`Error fetching details for ${card.scryfallQuery}:`, error);
    throw error;
  }
}

export function determineCardType(typeLine: string): string {
  if (typeLine.includes('Creature')) return 'Creature';
  if (typeLine.includes('Instant')) return 'Instant';
  if (typeLine.includes('Sorcery')) return 'Sorcery';
  if (typeLine.includes('Enchantment')) return 'Enchantment';
  if (typeLine.includes('Artifact')) return 'Artifact';
  if (typeLine.includes('Planeswalker')) return 'Planeswalker';
  if (typeLine.includes('Land')) return 'Land';
  return 'Other';
}
