"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function CurateApp() {
  const [currentPage, setCurrentPage] = useState<"landing" | "input">("landing")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setCurrentTime(timeString)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle keyboard input on landing page
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isLandingVisible = currentPage === "landing"
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
      const isAtTop = window.scrollY < 100

      if (isLandingVisible && isAtTop && !isMobileMenuOpen && event.key.length === 1 && !isModifierKey) {
        event.preventDefault()
        setSearchValue(event.key)
        setCurrentPage("input")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, isMobileMenuOpen])

  const handleSearch = () => {
    if (searchValue.trim() === "") return

    setShowResults(false)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSearch()
    }
  }

  const goToLandingPage = () => {
    setCurrentPage("landing")
    setSearchValue("")
    setIsLoading(false)
    setShowResults(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const dummyData = [
    { title: "Neon Dreams", artist: "J. Harrison", match: 94 },
    { title: "Solitude in Blue", artist: "Maria Petrova", match: 91 },
    { title: "Concrete Jungle", artist: "Kenji Tanaka", match: 89 },
    { title: "First Light", artist: "Chloe Davis", match: 88 },
    { title: "Metropolis Glow", artist: "Leo Rivera", match: 85 },
    { title: "Rainy Reflections", artist: "Anya Sharma", match: 82 },
    { title: "Steel & Glass", artist: "Omar Fadel", match: 80 },
    { title: "Dusk Overdrive", artist: "Sam Taylor", match: 78 },
  ]

  const aspects = ["aspect-square", "aspect-[3/4]", "aspect-[4/3]"]

  return (
    <div className="select-none">
      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu fixed top-0 right-0 w-80 h-full bg-stone-900/95 backdrop-blur-sm z-50 p-8 ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="flex justify-end mb-12">
          <button
            onClick={closeMobileMenu}
            className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5f5f4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="space-y-8">
          <a
            href="#features"
            onClick={closeMobileMenu}
            className="block text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={closeMobileMenu}
            className="block text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#gallery"
            onClick={closeMobileMenu}
            className="block text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            Gallery
          </a>
        </nav>
      </div>

      {currentPage === "landing" && (
        <>
          {/* Landing Page */}
          <div className="main-container flex flex-col p-4 sm:p-6 md:p-8 relative transition-opacity duration-500">
            {/* Header Section */}
            <header className="w-full flex justify-between items-center z-10">
              {/* Logo */}
              <div className="w-10 h-10">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L7.41 13 9 11.41l2 2 4-4L16.59 11 11 16.59z"
                    fill="#f5f5f4"
                  />
                </svg>
              </div>
              {/* Menu Icon */}
              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f5f5f4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center relative">
              {/* Central Heading */}
              <h1
                className="font-brand text-[18vw] sm:text-[15vw] md:text-[180px] lg:text-[250px] absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none select-none"
                style={{ color: "#222" }}
              >
                CURATE
              </h1>
              {/* Prompt to start typing */}
              <div className="prompt-container absolute bottom-24 text-gray-500 text-sm tracking-widest">
                START TYPING
              </div>
            </main>

            {/* Side Text */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 z-10 max-w-[200px]">
              <p className="font-bold text-lg leading-tight">THE AI CURATOR THAT HELPS YOU DISCOVER A THING OR TWO.</p>
              <p className="mt-4 text-lg leading-tight">STARTING WITH YOUR TASTE.</p>
            </div>

            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-8 lg:right-16 z-10 max-w-[200px] text-right">
              <p className="font-bold text-lg leading-tight">FIND THE BEST HUMAN-MADE ART FOR YOU.</p>
            </div>

            {/* Footer Section */}
            <footer className="w-full flex justify-between items-center z-10 text-sm">
              <div>
                <span className="font-bold">SOCIALS:</span>
                <span>@CURATE_AI</span>
              </div>
              <div className="font-mono text-right">{currentTime}</div>
            </footer>
          </div>

          {/* Main Content Sections */}
          <div className="transition-opacity duration-500">
            {/* Features Section */}
            <section id="features" className="min-h-screen bg-stone-900 p-4 sm:p-6 md:p-8 flex items-center">
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="font-brand text-6xl md:text-8xl lg:text-9xl mb-16 text-center" style={{ color: "#333" }}>
                  FEATURES
                </h2>
                <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f5f5f4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 12l2 2 4-4" />
                        <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1" />
                        <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4">AI-POWERED CURATION</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Advanced algorithms analyze your preferences to discover art that matches your unique taste
                      profile.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f5f5f4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4">HUMAN-MADE FOCUS</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Exclusively featuring authentic human-created artwork from talented artists around the world.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f5f5f4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4">PERSONALIZED DISCOVERY</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Every recommendation is tailored to your evolving artistic preferences and discovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="min-h-screen bg-black p-4 sm:p-6 md:p-8 flex items-center">
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="font-brand text-6xl md:text-8xl lg:text-9xl mb-16 text-center" style={{ color: "#222" }}>
                  HOW IT WORKS
                </h2>
                <div className="space-y-20">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                      <div className="text-6xl font-brand mb-4" style={{ color: "#333" }}>
                        01
                      </div>
                      <h3 className="font-bold text-2xl mb-4">DESCRIBE YOUR VISION</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        Start by typing what you're looking for. Whether it's a mood, style, or specific subject matter,
                        our AI understands your creative language.
                      </p>
                    </div>
                    <div className="md:w-1/2 bg-stone-900/50 rounded-lg p-8 text-center">
                      <div className="text-gray-500 text-sm mb-2">EXAMPLE INPUT</div>
                      <div className="text-xl italic">"Moody urban landscapes with warm lighting"</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="md:w-1/2">
                      <div className="text-6xl font-brand mb-4" style={{ color: "#333" }}>
                        02
                      </div>
                      <h3 className="font-bold text-2xl mb-4">AI ANALYSIS</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        Our sophisticated algorithms analyze thousands of artworks, matching style, composition, color
                        palette, and emotional resonance to your request.
                      </p>
                    </div>
                    <div className="md:w-1/2 bg-stone-900/50 rounded-lg p-8 flex justify-center">
                      <div className="w-16 h-16 border-2 border-gray-600 rounded-full animate-spin border-t-white"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                      <div className="text-6xl font-brand mb-4" style={{ color: "#333" }}>
                        03
                      </div>
                      <h3 className="font-bold text-2xl mb-4">CURATED RESULTS</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        Receive a carefully curated selection of human-made artworks that perfectly match your aesthetic
                        preferences and creative vision.
                      </p>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                      <div className="bg-stone-800 rounded-lg h-24"></div>
                      <div className="bg-stone-700 rounded-lg h-24"></div>
                      <div className="bg-stone-600 rounded-lg h-24"></div>
                      <div className="bg-stone-800 rounded-lg h-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="min-h-screen bg-stone-900 p-4 sm:p-6 md:p-8 flex items-center">
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="font-brand text-6xl md:text-8xl lg:text-9xl mb-16 text-center" style={{ color: "#333" }}>
                  GALLERY
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-stone-800 rounded-lg aspect-square"></div>
                  <div className="bg-stone-700 rounded-lg aspect-[3/4]"></div>
                  <div className="bg-stone-600 rounded-lg aspect-square"></div>
                  <div className="bg-stone-800 rounded-lg aspect-[4/3]"></div>
                  <div className="bg-stone-700 rounded-lg aspect-[4/3]"></div>
                  <div className="bg-stone-600 rounded-lg aspect-square"></div>
                  <div className="bg-stone-800 rounded-lg aspect-[3/4]"></div>
                  <div className="bg-stone-700 rounded-lg aspect-square"></div>
                  <div className="bg-stone-600 rounded-lg aspect-[4/3] md:col-span-2"></div>
                  <div className="bg-stone-800 rounded-lg aspect-square"></div>
                  <div className="bg-stone-700 rounded-lg aspect-[3/4]"></div>
                </div>
                <div className="text-center mt-16">
                  <p className="text-gray-400 text-lg mb-8">
                    Discover thousands of curated artworks from talented artists worldwide
                  </p>
                  <button className="bg-stone-800/50 hover:bg-stone-700/50 transition-colors px-8 py-3 rounded-full font-bold">
                    EXPLORE MORE
                  </button>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      {currentPage === "input" && (
        <div className="main-container flex-col p-4 sm:p-6 md:p-8 relative transition-opacity duration-500">
          <header className="w-full flex justify-start items-center z-10">
            <button
              onClick={goToLandingPage}
              className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f5f5f4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          </header>

          <main className="flex-grow flex flex-col items-center justify-start w-full max-w-6xl mx-auto pt-16">
            {/* Search Input Section */}
            <div className="w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="A futuristic city skyline at dusk, impressionist style..."
                className="w-full bg-transparent border-b border-gray-600 text-2xl md:text-4xl text-center text-stone-100 focus:outline-none focus:border-stone-100 transition-colors py-4"
                autoFocus
              />
              <p className="text-center text-gray-500 text-sm mt-4">Press Enter to curate</p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center mt-16">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full animate-spin border-t-white mx-auto"></div>
                <p className="mt-6 text-lg text-gray-400">Curating your results...</p>
              </div>
            )}

            {/* Results Section */}
            {showResults && (
              <div className="w-full mt-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {dummyData.map((item, index) => (
                    <div
                      key={index}
                      className="art-card group relative overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={`https://picsum.photos/800/600?random=${index}`}
                        alt={item.title}
                        className={`w-full h-full object-cover ${aspects[index % aspects.length]}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "https://placehold.co/800x600/1c1917/f5f5f4?text=Art+Not+Found"
                        }}
                      />
                      <div className="overlay absolute inset-0 bg-black/70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-300">by {item.artist}</p>
                        <div className="mt-2 text-xs font-bold bg-stone-800/80 text-white py-1 px-2 rounded-full self-start">
                          {item.match}% Match
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          <footer className="w-full flex justify-end items-center z-10 text-sm">
            <div className="font-mono text-right">{currentTime}</div>
          </footer>
        </div>
      )}
    </div>
  )
}
