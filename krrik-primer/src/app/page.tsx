import Image from "next/image";
// import { useEffect, useState } from "react";
import ScrollIndicator from "./scrollIndicator";

export default function Home() {
  return (
    <div className="font-sans min-h-screen gap-16 overflow-x-hidden">
      <main className="flex flex-col ">
        <section id="hero" className="relative w-full">
          <div className="h-screen w-full relative">
            <Image
              src="/krrik.webp"
              alt="Krrik"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/100 via-[#0A0A0A]/70 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-[120px] font-bold px-4">
                PHYREXIAN PERFECTION
              </h1>
              <p className="italic text-base md:text-xl mt-4 max-w-2xl">
                A primer for K&apos;rrik Son of Yawgmoth, by: moonberry
              </p>
            </div>
          </div>
          <ScrollIndicator />
        </section>
        <section id="Introduction" className="py-16 md:py-24 lg:py-32 px-5 flex flex-col items-center justify-center mt-80">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">
              INTRODUCTION
            </h2>
            <p className="text-lg md:text-xl lg:text-xl text-gray-300 text-justify">
              K&apos;rrik is a one of the most well known mono-black commanders, maybe even the strongest within the mono-black color.
              He allows you to have one more resource - <span className="font-bold">life</span>. This primer will delve into that playstyle and my specific flavor for K&apos;rrik. He is a very good commander and there are a lot of ways to play him, but I welcome you to mine, where its spell slinging, sacrificing and paying with life to gain life.
              This primer will also discuss <span className="font-bold">must have cards, gameplay and strategies, combo lines and statistics</span> on my deck for K&apos;rrik, Son of Yawgmoth.
            </p>
          </div>
        </section>
        <section id="WhyK'rrik" className="py-16 md:py-24 lg:py-32 px-5 flex flex-col md:flex-row items-start mt-80 gap-8">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">WHY K&apos;RRIK?</h2>
            <p className="text-lg md:text-xl text-gray-300 text-justify">
              I have many reasons as to why I had wanted and love to play K&apos;rrik. Firstly, its that core mechanic of Phyrexian mana which is <span className="font-bold">paying life</span> instead.
              That mechanic cheats out so much mana for me. Paying life for black pips frees up your lands and rocks to be used for <span className="font-bold">ONLY</span> generic mana. Meaning, should we get our constant land drop by turn 5, bring K&apos;rrik into play, we essentially have manipulated our mana curve to be way ahead over our base, and our opponents.
              <br></br><br></br>
              Secondly, and more personally, I have always considered myself as someone that understands the weight of sacrifice. I understand that life is simply a resource to be spent. It is something I can neglect if it means I can get what I want, capture what I want. That has been true for my academic life, so much so that people know I am frontrunning a carry job, they also know that it comes at a cost. I have understood that cost, and I live with it.
              <br></br><br></br>
              Life is something one will have to sacrifice.

            </p>
          </div>
          <div className="flex-1 relative h-120 md:h-120">
            <Image
              src="/post.jpg" // Replace with your actual image path
              alt="Why choose K'rrik"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
