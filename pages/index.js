import { useState, useEffect, useCallback } from "react";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import Script from "next/script";
import Chart from "../components/Chart";
import axios from "axios";
const categories = ["prime", "netflix", "disney", "hbo", "apple"];
const types = ["movie", "series"];

export default function Home() {
  const [filter, setFilter] = useState("prime");
  const [type, setType] = useState("movie");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [shownMovie, setShownMovie] = useState(null);
  const [usedMovieIndices, setUsedMovieIndices] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [stats, setStats] = useState({
    today: 0,
    yesterday: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    lastYear: 0,
  });

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get("https://streaming-availability.p.rapidapi.com/search/basic", {
        params: {
          country: "us",
          service: filter,
          type: type,
          genre: "18",
          page: page,
        },
        headers: {
          "X-RapidAPI-Key": "5d49265088msh6b983bed1315af1p14dfcbjsnaf5a9469ed5a",
          "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
        },
      });
      setData(response.data);
      setUsedMovieIndices([]);

      if (response.data.results && response.data.results.length > 0) {
        const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
        setShownMovie(randomMovie);
        setUsedMovieIndices([response.data.results.indexOf(randomMovie)]);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }, [filter, type, page]);

  useEffect(() => {
    fetchMovies();
  }, [type, filter]);

  const handleShuffle = () => {
    if (!data || !data.results) return;

    const availableIndices = data.results
      .map((_, index) => index)
      .filter((index) => !usedMovieIndices.includes(index));

    if (availableIndices.length > 0) {
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setShownMovie(data.results[randomIndex]);
      setUsedMovieIndices((prev) => [...prev, randomIndex]);
    } else {
      if (usedMovieIndices.length >= 8) {
        setUsedMovieIndices([]);
        setPage((prev) => prev + 1);
        fetchMovies();
      }
    }
  };

  const updateVisitorStats = () => {
    const today = new Date().toLocaleDateString();
    const statsFromStorage = JSON.parse(localStorage.getItem("visitorStats")) || {};

    if (!statsFromStorage[today]) {
      statsFromStorage[today] = { count: 1 };
    } else {
      statsFromStorage[today].count += 1;
    }

    localStorage.setItem("visitorStats", JSON.stringify(statsFromStorage));

    setStats({
      today: statsFromStorage[today]?.count || 0,
      yesterday: statsFromStorage[new Date(Date.now() - 86400000).toLocaleDateString()]?.count || 0,
      thisWeek: 0,
      lastWeek: 0,
      thisMonth: 0,
      thisYear: 0,
      lastYear: 0,
    });
  };

  useEffect(() => {
    updateVisitorStats();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="animated-bg-element bg-purple-600 w-[500px] h-[500px] -top-60 -left-40"></div>
        <div className="animated-bg-element bg-indigo-700 w-[400px] h-[400px] top-1/2 -right-40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-10">
        <header className="navbar flex justify-between items-center mb-16">
          <div 
            className="burger w-16 h-16 cursor-pointer transition-transform hover:rotate-90"
            onClick={() => setOpenMenu(true)}
          />
          <nav className="btn flex flex-wrap sm:justify-start justify-center space-x-6">
            {/* Movie และ Series buttons */}
            {["movie", "series"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setType(item);
                  setPage(1);
                }}
                className={`elegant-button ${
                  item === type ? 'opacity-100' : 'opacity-60'
                } transition-all duration-300`}
              >
                {item}
              </button>
            ))}
            
            {/* Charts Forms button */}
            <a
              href="/response"
              className="elegant-button charts-button bg-gradient-to-r from-purple-600 to-blue-500 
                px-8 py-3 rounded-full text-white font-bold shadow-lg
                transform hover:scale-110 transition-all duration-300
                animate-pulse hover:animate-none
                border-2 border-white/20 hover:border-white/40
                relative overflow-hidden
                group"
            >
              <span className="relative z-10">Charts Forms</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full 
                blur opacity-30 group-hover:opacity-100 transition-all duration-300"></div>
            </a>
          </nav>
        </header>

        {openMenu && (
          <div className="menu-overlay animate__animated animate__fadeIn">
            <div className="menu-container text-center">
              {categories.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setOpenMenu(false);
                  }}
                  className="menu-item transition-transform transform hover:scale-110"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <main>
          <h1 className="text-center mb-12 text-6xl font-bold tracking-wide">
            Cinematic <span className="text-[#b667f9]">Discoveries</span>
          </h1>

          <div className="flex justify-center mb-12">
            <button 
              onClick={handleShuffle} 
              className="elegant-button text-2xl transition-all duration-300"
            >
              Discover {type}
            </button>
          </div>

          <div className="max-w-2xl mx-auto">
            {shownMovie ? <MovieCard movie={shownMovie} type={type} /> : <Loader />}
          </div>

          <section className="mt-16 bg-black/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-center text-4xl font-bold mb-10 text-white/80">
              Explorer Analytics
            </h2>
            <Chart />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
              {Object.entries(stats).map(([period, count]) => (
                <div 
                  key={period} 
                  className="bg-white/10 rounded-3xl p-8 text-center shadow-xl hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  <h5 className="text-white/50 font-semibold mb-2 capitalize">
                    {period.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </h5>
                  <div className="text-[#b667f9] font-bold text-4xl transform transition-transform hover:scale-110">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}