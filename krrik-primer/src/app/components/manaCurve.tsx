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
  totalLands: number;
}

function comb(n: number, k: number): number {
  if (k > n) return 0;
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res *= (n - (k - i)) / i;
  }
  return res;
}

function hypergeometric(successes: number, population: number, draws: number, needed: number): number {
  const totalComb = comb(population, draws);
  let probability = 0;

  for (let i = needed; i <= successes && i <= draws; i++) {
    probability += (comb(successes, i) * comb(population - successes, draws - i)) / totalComb;
  }

  return probability;
}

const DECK_SIZE = 99;

export default function ManaCurve() {
  const [manaCurveData, setManaCurveData] = useState<ManaCurveItem[]>([]);
  const [deckStats, setDeckStats] = useState<DeckStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCmc, setSelectedCmc] = useState<number | null>(null);
  const [onCurveChance, setOnCurveChance] = useState<number | null>(null);

  useEffect(() => {
    async function calculateManaCurve() {
      try {
        const cardDetails = await Promise.all(
          cardData.map(card => fetchCardDetails(card))
        );

        const curveMap: { [cmc: number]: ManaCurveItem } = {};
        const typeCounts: { [type: string]: number } = {};

        cardDetails.forEach((card) => {
          const cmc = card.cmc;
          const cardType = determineCardType(card.type_line);

          if (!curveMap[cmc]) {
            curveMap[cmc] = { cmc, count: 0, cards: [], typeBreakdown: {} };
          }
          curveMap[cmc].count++;
          curveMap[cmc].cards.push(card.name);
          curveMap[cmc].typeBreakdown[cardType] =
            (curveMap[cmc].typeBreakdown[cardType] || 0) + 1;

          typeCounts[cardType] = (typeCounts[cardType] || 0) + 1;
        });

        const curveData = Object.values(curveMap).sort((a, b) => a.cmc - b.cmc);

        const explicitCount = cardDetails.length;

        const inferredSwamps = DECK_SIZE - explicitCount;

        const explicitLands = cardDetails.filter(
          (c) => determineCardType(c.type_line) === "Land"
        ).length;
        const totalLands = explicitLands + inferredSwamps;

        const totalCards = DECK_SIZE; // Always 99 after inferring
        const totalCmc = cardDetails.reduce((sum, card) => sum + card.cmc, 0);
        const averageCmc = totalCmc / explicitCount;

        setManaCurveData(curveData);
        setDeckStats({
          totalCards,
          averageCmc: parseFloat(averageCmc.toFixed(2)),
          typeDistribution: typeCounts,
          totalLands,
        });

        const highestCmcWithCards = curveData.reduce((max, item) =>
          item.count > 0 ? Math.max(max, item.cmc) : max, 0
        );
        if (highestCmcWithCards > 0) {
          setSelectedCmc(highestCmcWithCards);
        }

      } catch (error) {
        console.error("Error calculating mana curve:", error);
      } finally {
        setLoading(false);
      }
    }

    calculateManaCurve();
  }, []);

  useEffect(() => {
    if (selectedCmc !== null && deckStats) {
      const turn = selectedCmc;
      const draws = 7 + (turn - 1);
      const neededLands = turn;

      const chance = hypergeometric(
        deckStats.totalLands,
        DECK_SIZE,
        draws,
        neededLands
      ) * 100;

      setOnCurveChance(parseFloat(chance.toFixed(2)));
    }
  }, [selectedCmc, deckStats]);

  const handleCmcClick = (cmc: number) => {
    setSelectedCmc(cmc);
  };

  if (loading) {
    return (
      <div className="bg-[#3D3D3D] p-6 rounded-lg shadow-lg text-center">
        <div className="text-white">Loading mana curve data...</div>
      </div>
    );
  }

  if (!deckStats) {
    return (
      <div className="bg-[#3D3D3D] p-6 rounded-lg shadow-lg text-center">
        <div className="text-white">Error loading mana curve data</div>
      </div>
    );
  }

  const maxCount = Math.max(...manaCurveData.map(item => item.count));

  return (
    <div className="bg-[#0A0A0A] p-6 rounded-2xl shadow-lg">
      <div className="flex items-end justify-between h-48 mb-6 px-4">
        {manaCurveData.map((item) => (
          <div key={item.cmc} className="flex flex-col items-center flex-1">
            <div className="flex flex-col items-center justify-end h-40 w-full">
              <div
                className={`rounded-t w-full max-w-8 transition-all duration-300 cursor-pointer ${selectedCmc === item.cmc
                  ? 'bg-[#4B0082]'
                  : 'bg-white hover:bg-[#4B0082]'
                  }`}
                style={{ height: `${(item.count / maxCount) * 100}%` }}
                title={`${item.count} cards (CMC ${item.cmc}): ${item.cards.join(', ')}`}
                onClick={() => handleCmcClick(item.cmc)}
              >
                <div className="text-white text-xs font-bold text-center -mt-5">
                  {item.count}
                </div>
              </div>
            </div>
            <div className="text-white text-sm mt-2">{item.cmc}</div>
          </div>
        ))}
      </div>

      {/* On Curve Chance Display */}
      {selectedCmc !== null && onCurveChance !== null && (
        <div className="mb-6 p-4 bg-[#2D2D2D] rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            On Curve Chance for {selectedCmc}-drop
          </h3>
          <div className="text-3xl font-bold text-white">
            {onCurveChance}%
          </div>
          <p className="text-gray-300 text-sm mt-2">
            Probability of having {selectedCmc} lands by turn {selectedCmc}
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        <div className="text-center p-3 bg-[#2D2D2D] rounded">
          <div className="text-2xl font-bold">{deckStats.totalCards}</div>
          <div className="text-sm">Total Cards</div>
        </div>

        <div className="text-center p-3 bg-[#2D2D2D] rounded">
          <div className="text-2xl font-bold">{deckStats.averageCmc}</div>
          <div className="text-sm">Average CMC</div>
        </div>

        <div className="text-center p-3 bg-[#2D2D2D] rounded">
          <div className="text-2xl font-bold">{deckStats.totalLands}</div>
          <div className="text-sm">Total Lands</div>
        </div>
      </div>

      {/* Card Type Breakdown */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Card Type Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(deckStats.typeDistribution).map(([type, count]) => (
            <div key={type} className="bg-[#2D2D2D] p-2 rounded text-center">
              <div className="text-white font-bold">{count}</div>
              <div className="text-white text-xs">{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
