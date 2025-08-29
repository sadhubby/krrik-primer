import type { Metadata } from 'next';
import Image from "next/image";
import ScrollIndicator from "./components/scrollIndicator";
import CardGallery from "./components/cardGallery";
import ManaCurve from "./components/manaCurve";
import CardGetter from "./components/cardGetter";

export const metadata: Metadata = { title: "K'rrik Primer" };

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
        <section id="Introduction" className="py-16 md:py-24 lg:py-32 px-5 flex flex-col items-center justify-center mt-80 gap-8">
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
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl lg:text-xl text-gray-300 text-justify font-bold">TAGS: Bracket 3, cEDH, Budget, Self-Damage, Life Gain</p>
          </div>
        </section>
        <section id="WhyK'rrik" className="py-16 md:py-24 lg:py-32 px-5 flex flex-col md:flex-row items-start mt-40 gap-8">
          <div className="flex-1 pl-5">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">WHY K&apos;RRIK?</h2>
            <p className="text-lg md:text-xl text-gray-300 text-justify">
              I have many reasons as to why I had wanted and love to play K&apos;rrik. Firstly, its that core mechanic of Phyrexian mana which is <span className="font-bold">paying life</span> instead.
              That mechanic cheats out so much mana for me. Paying life for black pips frees up your lands and rocks to be used for <span className="font-bold">ONLY</span> generic mana. Meaning, should we get our constant land drop by turn 5, bring K&apos;rrik into play, we essentially have manipulated our mana curve to be way ahead over our base, and our opponents.
              <br></br><br></br>
              Secondly, and more personally, I have always considered myself as someone that understands the weight of sacrifice. I understand that life is simply a resource to be spent. It is something I can neglect if it means I can get what I want, capture what I want. That has been true for my academic life, so much so that people know I am frontrunning a carry job, they also know that it comes at a cost. I have understood that cost, and I live with it.
              <br></br><br></br>
              <span className="italic">For business, I&apos;ve learned you have to pay a high price. Sometimes that price is everything. <br></br>Tommy Shelby</span>

            </p>
          </div>
          <div className="flex-1 relative h-120 md:h-120">
            <Image
              src="/post.jpg"
              alt="Why choose K'rrik"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </section>
        <section id="gameplan" className="py-16 md:py-24 lg:py-32 px-5 flex flex-col md:flex-row items-start mt-40 gap-8">
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">GOAL OF THE DECK</h2>
            <p className="text-lg md:text-xl text-gray-300 pr-30 pl-30 text-justify">
              The deck has a simple goal: <span className="font-bold">PAY LIFE</span>. To be more specific, you will damage yourself to gain advantages over opponents. That self-damage may lead to more spells being brought out or punishing your opponents for allowing you to go so low ( <span className="italic">ahem, Repay in Kind </span>).
              <br></br><br></br>
              Not only that but this deck allow you to gain life and then some. Many combo lines allow you to gain life, and if that is not possible, well then many creatures and singular instants and sorceries allow you to either gain life or punish others for not allowing to do so ( <span className="italic"> Repay in Kind, again </span>).
              <br></br><br></br>
              Essentially, you will play as quite literally the most mono-black way. You will sacrifice creatures and even yourself to come out with a win. It is simplistic perfection: pay life, gain life, kill all that stands in your way.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">GOAL IN PODS</h2>
            <p className="text-lg md:text-xl text-gray-300 pr-30 pl-30 text-justify">
              There is something that you must first tell yourself should you ever want to play a deck like this, or any K&apos;rrik deck for that matter, and it is that <span className="font-bold">you are the villain.</span> Whether you like it or not, the moment you sit down for a game of commander, you are the threat.
              <br></br><br></br>
              With that being said, your primary goal early game is to make sure you are healthy. They will attack you first and make sure you are limited in the amount of life you can pay. After that, once they feel like they have curbed you enough, they will likely not target you anymore.
              As much as it sucks though, you have to make sure you are healthy enough to be able to do combo lines to gain life. Stay in the game by utlizing K&apos;rrik&apos;s lifelink with his counters as well as other&apos;s lifelinks.
              <br></br><br></br>
              Once you have more than enough life, you can now enact your combos. Find your cards, draw or tutor them out, then do your combos. You will have your time, you just simply have to buy enough of it for yourself and they will rue the day they even let you live.
            </p>
          </div>
        </section>
        <section id="deck" className="py-16 pr-20 pl-20 mt-40">
          <h2 className="text-4xl md:text-6xl font-bold mb-18 text-center">
            THE DECK
          </h2>
          <CardGallery />
        </section>
        <section id="curve" className="py-16 mt-40">
          <h2 className="text-4xl md:text-6xl font-bold mb-18 text-center">
            MANA CURVE
          </h2>
          <ManaCurve />

        </section>
        <section id="setupscombosstrats" className="py-16 px-12 mt-40">
          <h2 className="text-4xl md:text-6xl font-bold mb-18 text-center">
            SETUPS, COMBOS, & STRATEGIES
          </h2>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col md:flex-row items-start gap-8 p-6 rounded-2xl shadow-lg">

              <p className="text-lg md:text-xl flex-1 leading-relaxed text-justify">
                There are many strategies available with this deck. But the main idea
                you need to remember is that K&apos;rrik is the most important piece to
                have. Make sure that you get K&apos;rrik out when possible. Be careful,
                because as soon as he&apos;s on the battlefield, you become the table&apos;s
                biggest threat.
              </p>

              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start flex-1">
                <CardGetter query="K'rrik, Son of Yawgmoth" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-8 p-6 rounded-2xl shadow-lg">

              <p className="text-lg md:text-xl flex-1 leading-relaxed text-justify">
                Though K&apos;rrik cheats out so much mana, he still cannot cheat out generic mana. To reiterate, K&apos;rrik can only cheat black mana on spells and abilities. As such, we need a way to cheat out ALL mana. Thankfully, we have a someone for that job, Blood Celebrant.
                More than that, we also have one more artifact besides Sol Ring and Arcane Signet that will make sure we can lessen the amount of mana we need to cheat, making all spells be earlier on the curve, Jet Medallion.
                Bolas&apos;s Citadel also provides more cheating power into this deck because you can just play topdeck and pay with life instead.
              </p>
              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start flex-1">
                <CardGetter query="Blood Celebrant" />
                <CardGetter query="Jet Medallion" />
                <CardGetter query="Bolas's Citadel" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 p-6 rounded-2xl shadow-lg">

              <p className="text-lg md:text-xl flex-1 leading-relaxed text-justify">
                Should you need to protect K&apos;rrik, or make sure he is constantly in the battlefield, you can use these cards to make sure constant uptime.
                <br></br><br></br>
                <span className="font-bold">Note: Swiftfoot Boots is currently NOT in the deck</span>
                <br></br>
                Whispersilk Cloak and Swiftfoot Boots gives K&apos;rrik permanent protection as they are artifacts. However, do note the difference between Hexproof and Shroud. Shroud protects the creature even from yourself. Meaning K&apos;rrik cannot be the target of any spells or abilities from you.
                Which by all means, is not really anything bad. Another good thing about Whispersilk Cloak is the fact that K&apos;rrik cannot be blocked. This is very good to gain back some life with his lifelink and also to stack commander damage as the game goes on.
                <br></br><br></br>
                The other three are spells that you can use SHOULD both artifacts not be available at a time of need. Though they are better used later for better strategies, making sure K&apos;rrik is constantly on the battlefield is still a net positive even with the loss of a spell.
              </p>

              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start flex-1">
                <CardGetter query="Whispersilk Cloak" />
                <CardGetter query="Swiftfoot Boots" />
                <CardGetter query="Undying Malice" />
                <CardGetter query="Not Dead After All" />
                <CardGetter query="Offer Immortality" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 p-6 rounded-2xl shadow-lg">
              <p className="text-lg md:text-xl flex-1 leading-relaxed text-justify">
                Now here is our prime finisher, Gray, Merchant of Asphodel. Gray takes life dependent on the amount of black pips in total that are present on our board. In a 1v1, this card is really strong to drain and get that life advantage when you get to late game.
                But in a full pod commander, this card is broken.

                <br></br><br></br>
                You gain <span className="font-bold">THRICE</span> the healing, then suddenly, you are back at full health. Let&apos;s say you have 12 black pips (including Gray). You gain a total of 36 life. You have not gotten to your combat yet but you essentially have a new turn because of the amount of life you&apos;ve gained.
                <br></br><br></br>
                With that, you always want ways for your Gray ETB to trigger. The best possible scenario is also have Ayara, First of Lochtwain in the battlefield to serve as your sac outlet.
                This way, Gray will die and enter the graveyard zone. However, we will use Undying Malice or Not Dead After All so that instead of it entering graveyard, it goes back instantly into the battlefield, triggering the ETB.

                <br></br><br></br>
                When we do not have those cards anymore, though, which is quite likely, we can instead use Chainer, Dementia Master to bring back Gray. The good thing about it is that you can trigger Chainer&apos;s ability. The better thing about it is that we can pay the abililty cost with K&apos;rrik. THe best thing about it is that when you do have at least 5 pips, you gain a net positive and can keep killing Gray and reviving with Chainer.
              </p>
              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start flex-1">
                <CardGetter query="Gray Merchant of Asphodel" />
                <CardGetter query="Ayara, First of Locthwain" />
                <CardGetter query="Chainer, Dementia Master" />
                <CardGetter query="Undying Malice" />
                <CardGetter query="Not Dead After All" />
                <CardGetter query="Power Word Kill" />
                <CardGetter query="Murder" />
                <CardGetter query="Diabolic Edict" />
                <CardGetter query="Kaya's Ghostform" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-8 p-6 rounded-2xl shadow-lg">
              <p className="text-lg md:text-xl flex-1 leading-relaxed text-justify">
                This is a very funny combo. Note that Lich&apos;s Mastery is not needed till lategame due to its third sentence.
                The funny combo is that you keep paying life for Greed&apos;s ability because of K&apos;rrik. So you keep calling out <span className="italic">1A! 1A! 1A! 1A! 1A!1A!1A!1A!</span> to the entire table until you are low in life. Then bring out Repay in Kind. Make them pay for not allowing you to heal up. Now, it simply is a matter of playing your hand with the cards you have pulled with Greed. More likely than not, you will have some immediate life gains available to you.
              </p>
              <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-start flex-1">
                <CardGetter query="Repay in Kind" />
                <CardGetter query="Greed" />
                <CardGetter query="Lich's Mastery" />
              </div>
            </div>
          </div>
        </section>
        <section id="cardupgrades" className="py-16 px-12 mt-40">
          <h2 className="text-4xl md:text-6xl font-bold mb-18 text-center">
            CARD UPGRADES
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl lg:text-xl text-gray-300 text-center">
              Currently, to be filled as there are no possible upgrades yet in sight and in budget
            </p>
          </div>
        </section>
        <section id="cardupgrades" className="py-16 px-12 mt-40">
          <h2 className="text-4xl md:text-6xl font-bold mb-18 text-center">
            FUTURE BUILDS
          </h2>
          <div className="flex flex-row gap-8 mt-40 p-16 flex-wrap justify-center md:justify-ceter flex-1 scale-150">
            <CardGetter query="Flubs, the Fool" />
            <CardGetter query="Giada, Font of Hope" />
            <CardGetter query="Yshtola, Night's Blessed" />
            <CardGetter query="Kellan the Kid" />
          </div>
        </section>

      </main>
    </div >
  );
}
