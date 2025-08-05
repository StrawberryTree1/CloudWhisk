"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Drink data
const drinks = {
  latte: {
    name: "Iced Vanilla Latte",
    prepTime: "5 minutes",
    ingredients: [
      "2 shots espresso or 1/2 cup strong coffee",
      "1 cup cold milk",
      "2 tbsp vanilla syrup",
      "Ice cubes",
      "Whipped cream (optional)",
    ],
    instructions: [
      "Brew espresso or strong coffee and let it cool slightly",
      "Fill a tall glass with ice cubes",
      "Pour the espresso over the ice",
      "Add vanilla syrup and stir gently",
      "Slowly pour cold milk over the back of a spoon to create layers",
      "Top with whipped cream if desired",
      "Serve immediately and enjoy!",
    ],
  },
  tea: {
    name: "Honey Matcha Latte",
    prepTime: "7 minutes",
    ingredients: [
      "1 tsp matcha powder",
      "2 tbsp hot water",
      "1 cup cold milk",
      "2 tbsp honey",
      "Ice cubes",
      "Matcha powder for dusting",
    ],
    instructions: [
      "Sift matcha powder into a small bowl",
      "Add hot water and whisk until smooth paste forms",
      "In a glass, mix honey with a splash of milk",
      "Add the matcha paste and stir well",
      "Fill glass with ice cubes",
      "Pour remaining cold milk slowly",
      "Dust with matcha powder on top",
      "Stir gently before drinking",
    ],
  },
  smoothie: {
    name: "Strawberry Cloud Smoothie",
    prepTime: "3 minutes",
    ingredients: [
      "1 cup frozen strawberries",
      "1/2 banana",
      "1/2 cup vanilla yogurt",
      "1/4 cup milk",
      "1 tbsp honey",
      "1/2 cup ice",
      "Fresh strawberries for garnish",
    ],
    instructions: [
      "Add frozen strawberries and banana to blender",
      "Pour in vanilla yogurt and milk",
      "Add honey for extra sweetness",
      "Add ice cubes for thickness",
      "Blend on high for 60-90 seconds until smooth",
      "Pour into a chilled glass",
      "Garnish with fresh strawberry slices",
      "Serve with a cute straw!",
    ],
  },
  bubble: {
    name: "Brown Sugar Bubble Tea",
    prepTime: "15 minutes",
    ingredients: [
      "1/2 cup tapioca pearls",
      "3 tbsp brown sugar",
      "1 cup strong black tea, cooled",
      "1/2 cup milk",
      "2 tbsp condensed milk",
      "Ice cubes",
    ],
    instructions: [
      "Cook tapioca pearls according to package instructions",
      "Mix cooked pearls with 1 tbsp brown sugar",
      "In a glass, swirl remaining brown sugar on the sides",
      "Add the sweetened tapioca pearls to the bottom",
      "Fill glass with ice cubes",
      "Pour cooled black tea over ice",
      "Add milk and condensed milk",
      "Stir well and serve with a wide straw",
      "Enjoy the chewy pearls!",
    ],
  },
}

export default function CloudWhisk() {
  const [currentView, setCurrentView] = useState<"home" | keyof typeof drinks>("home")

  const playClickSound = () => {
    // Create a soft pop sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const handleDrinkClick = (drinkType: keyof typeof drinks) => {
    playClickSound()
    setCurrentView(drinkType)
  }

  const handleHomeClick = () => {
    playClickSound()
    setCurrentView("home")
  }

  if (currentView !== "home") {
    const drink = drinks[currentView]
    return (
      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(180deg, #FFB6C1 0%, #FFB6C1 120px, #FFF8DC 120px, #FFF8DC 100%)",
        }}
      >
        {/* Pink striped header */}
        <div className="h-32 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #FF69B4 0px,
                #FF69B4 20px,
                #FFB6C1 20px,
                #FFB6C1 40px
              )`,
            }}
          />
        </div>

        {/* Scalloped border */}
        <div className="relative">
          <svg
            viewBox="0 0 400 40"
            className="w-full h-10"
            preserveAspectRatio="none"
            style={{ transform: "translateY(-1px)" }}
          >
            <path
              d="M0,40 C20,10 40,10 60,40 C80,10 100,10 120,40 C140,10 160,10 180,40 C200,10 220,10 240,40 C260,10 280,10 300,40 C320,10 340,10 360,40 C380,10 400,10 400,40 L400,40 L0,40 Z"
              fill="#FFF8DC"
            />
          </svg>
        </div>

        <div className="px-6 py-8 max-w-2xl mx-auto">
          <Button
            onClick={handleHomeClick}
            className="mb-8 bg-pink-200 hover:bg-pink-300 text-pink-800 rounded-full px-8 py-4 text-lg font-bold shadow-lg border-2 border-pink-300"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Home
          </Button>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-200">
            <h1 className="text-4xl font-bold text-pink-800 mb-4 text-center">{drink.name}</h1>

            <div className="text-center mb-10">
              <span className="inline-block bg-pink-100 text-pink-700 px-6 py-3 rounded-full text-lg font-bold">
                Prep Time: {drink.prepTime}
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-pink-800 mb-6 flex items-center justify-center">Ingredients</h2>
              <ul className="space-y-3">
                {drink.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start text-gray-700 bg-pink-50 p-4 rounded-xl text-lg">
                    <span className="text-pink-400 mr-4 mt-1 text-xl">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-pink-800 mb-6 flex items-center justify-center">Instructions</h2>
              <ol className="space-y-4">
                {drink.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start text-gray-700 bg-pink-50 p-5 rounded-xl text-lg">
                    <span className="bg-pink-200 text-pink-800 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-5 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "#FFF8DC" }}>
      {/* Pink striped header */}
      <div className="h-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #FF69B4 0px,
              #FF69B4 20px,
              #FFB6C1 20px,
              #FFB6C1 40px
            )`,
            backgroundColor: "#FFB6C1",
          }}
        />
      </div>

      {/* Scalloped cloud border */}
      <div className="relative">
        <svg
          viewBox="0 0 400 60"
          className="w-full h-15"
          preserveAspectRatio="none"
          style={{ transform: "translateY(-1px)" }}
        >
          <path
            d="M0,60 C25,15 35,15 50,60 C65,15 75,15 90,60 C105,15 115,15 130,60 C145,15 155,15 170,60 C185,15 195,15 210,60 C225,15 235,15 250,60 C265,15 275,15 290,60 C305,15 315,15 330,60 C345,15 355,15 370,60 C385,15 395,15 400,60 L400,60 L0,60 Z"
            fill="#FFF8DC"
          />
        </svg>
      </div>

      {/* CloudWhisk oval badge */}
      <div className="flex justify-center -mt-8 mb-12">
        <div
          className="relative px-12 py-6 rounded-full border-4 shadow-lg"
          style={{
            backgroundColor: "#FFF8DC",
            borderColor: "#FFB6C1",
            boxShadow: "0 0 0 2px #FF69B4",
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center" style={{ color: "#6C4F3D" }}>
            CloudWhisk
          </h1>
        </div>
      </div>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Latte */}
          <Card
            className="p-8 bg-gradient-to-br from-orange-100 to-orange-200 border-3 border-orange-300 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl"
            onClick={() => handleDrinkClick("latte")}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/images/latte.png" alt="Iced Latte" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-orange-800">Latte</h3>
            </div>
          </Card>

          {/* Tea */}
          <Card
            className="p-8 bg-gradient-to-br from-red-100 to-red-200 border-3 border-red-300 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl"
            onClick={() => handleDrinkClick("tea")}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/images/tea.png" alt="Tea Cup" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-red-800">Tea</h3>
            </div>
          </Card>

          {/* Smoothie */}
          <Card
            className="p-8 bg-gradient-to-br from-pink-100 to-pink-200 border-3 border-pink-300 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl"
            onClick={() => handleDrinkClick("smoothie")}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/images/smoothie.png" alt="Strawberry Smoothie" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-pink-800">Smoothie</h3>
            </div>
          </Card>

          {/* Bubble Tea */}
          <Card
            className="p-8 bg-gradient-to-br from-amber-100 to-amber-200 border-3 border-amber-300 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl"
            onClick={() => handleDrinkClick("bubble")}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/images/bubbletea.png" alt="Bubble Tea" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800">Bubble Tea</h3>
            </div>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-pink-600 text-2xl font-bold">Tap a category to discover your perfect drink recipe!</p>
        </div>
      </div>
    </div>
  )
}
