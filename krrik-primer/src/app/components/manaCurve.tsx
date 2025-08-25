'use client';
import React, { useEffect, useState } from "react";
import { cardData } from "../../../data/cards";
import { fetchCardDetails, determineCardType, type ScryfallCard } from "../../../lib/scryfall";

interface ManaCurveItem {
  cmc: number;
  count: number;
  cards: string[];
  typeBreakdown: { [type: string]: number };
}

interface DeckStats {
  totalCards: number;
  averageCmc: number;
  typeDistribution: { [type: string]: number };
}

export default function ManaCurve() {
  const [manaCurveData, setManaCurveData] = useState<ManaCurveItem[]>([]);
  const [deckStats, setDeckStats] = useState<DeckStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function calculateManaCurve() {
      try {
        // Fetch details for all cards
        const cardDetails = await Promise.all(
          cardData.map(card => fetchCardDetails(card))
        );

        // Calculate mana curve
        const curveMap: { [cmc: number]: ManaCurveItem } = {};
        const typeCounts: { [type: string]: number } = {};

        cardDetails.forEach((card) => {
          const cmc = card.cmc;
          const cardType = determineCardType(card.type_line);

          // Update mana curve
          if (!curveMap[cmc]) {
            curveMap[cmc] = { cmc, count: 0, cards: [], typeBreakdown: {} };
          }
          curveMap[cmc].count++;
          curveMap[cmc].cards.push(card.name);
          curveMap[cmc].typeBreakdown[cardType] = (curveMap[cmc].typeBreakdown[cardType] || 0) + 1;

          // Update type distribution
          typeCounts[cardType] = (typeCounts[cardType] || 0) + 1;
        });

        // Convert to array and sort by CMC
        const curveData = Object.values(curveMap).sort((a, b) => a.cmc - b.cmc);

        // Calculate statistics
        const totalCards = cardDetails.length;
        const totalCmc = cardDetails.reduce((sum, card) => sum + card.cmc, 0);
        const averageCmc = totalCmc / totalCards;

        setManaCurveData(curveData);
        setDeckStats({
          totalCards,
          averageCmc: parseFloat(averageCmc.toFixed(2)),
          typeDistribution: typeCounts
        });

      } catch (error) {
        console.error("Error calculating mana curve:", error);
      } finally {
        setLoading(false);
      }
    }

    calculateManaCurve();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <div className="text-white">Loading mana curve data...</div>
      </div>
    );
  }

  if (!deckStats) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <div className="text-white">Error loading mana curve data</div>
      </div>
    );
  }

  const maxCount = Math.max(...manaCurveData.map(item => item.count));

  return (
    <div className="p-6 rounded-lg shadow-lg">
      {/* Curve Visualization */}
      <div className="flex items-end justify-between h-48 mb-6 px-4">
        {manaCurveData.map((item) => (
          <div key={item.cmc} className="flex flex-col items-center flex-1">
            {/* Bar */}
            <div className="flex flex-col items-center justify-end h-40 w-full">
              <div
                className="bg-white rounded-t w-full max-w-8 transition-all duration-300 hover:bg-amber-500 cursor-pointer"
                style={{ height: `${(item.count / maxCount) * 100}%` }}
                title={`${item.count} cards (CMC ${item.cmc}): ${item.cards.join(', ')}`}
              >
                {/* Count label inside bar */}
                <div className="text-white text-xs font-bold text-center -mt-5">
                  {item.count}
                </div>
              </div>
            </div>

            {/* CMC label */}
            <div className="text-white text-sm mt-2">
              {item.cmc}
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        <div className="text-center p-3 bg-[#3D3D3D] rounded">
          <div className="text-2xl font-bold">{deckStats.totalCards}</div>
          <div className="text-sm">Total Cards</div>
        </div>

        <div className="text-center p-3 bg-[#3D3D3D] rounded">
          <div className="text-2xl font-bold">97.05%</div>
          <div className="text-sm">On Curve Chance</div>
        </div>

        <div className="text-center p-3 bg-[#3D3D3D] rounded">
          <div className="text-2xl font-bold">{deckStats.averageCmc}</div>
          <div className="text-sm">Average CMC</div>
        </div>
      </div>

      {/* Card Type Breakdown */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Card Type Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(deckStats.typeDistribution).map(([type, count]) => (
            <div key={type} className="bg-[#3D3D3D] p-2 rounded text-center">
              <div className="text-white font-bold">{count}</div>
              <div className="text-white text-xs">{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
