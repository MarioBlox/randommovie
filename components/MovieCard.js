import { useState } from "react";
import Link from 'next/link';

export default function MovieCard({ movie, type }) {
  const [overview, setoverview] = useState(true);
  const [cast, setcast] = useState(false);
  const [trailer, settrailer] = useState(false);

  const movielinks = [
    { link: movie?.streamingInfo?.prime?.us?.link, platform: "Prime" },
    { link: movie?.streamingInfo?.netflix?.us?.link, platform: "Netflix" },
    { link: movie?.streamingInfo?.disney?.us?.link, platform: "Disney" },
    { link: movie?.streamingInfo?.apple?.us?.link, platform: "Apple" },
    { link: movie?.streamingInfo?.paramount?.us?.link, platform: "Paramount" },
    { link: movie?.streamingInfo?.mubi?.us?.link, platform: "Mubi" },
    { link: movie?.streamingInfo?.hulu?.us?.link, platform: "HULU" },
    { link: movie?.streamingInfo?.hbo?.us?.link, platform: "HBO" },
    { link: movie?.streamingInfo?.starz?.us?.link, platform: "Starz" },
    { link: movie?.streamingInfo?.peacock?.us?.link, platform: "Peacock" },
    { link: movie?.streamingInfo?.showtime?.us?.link, platform: "Showtime" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a0b2e] via-[#2c1b4a] to-[#3a2d5d] p-8 rounded-lg shadow-2xl max-w-md mx-auto text-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-bl">
      {/* Header Section */}
      <div className="title-wrapper flex justify-between items-center mb-6">
        <div>
          <div className="text-3xl font-extrabold">{movie?.title}</div>
          <div className="text-sm text-gray-400 flex items-center space-x-3 mt-2">
            <div>{movie?.year}</div>
            {movie?.runtime && (
              <div className="flex items-center">
                <span>{Math.floor(movie?.runtime / 60)}h</span>
                <span>{movie?.runtime % 60}m</span>
              </div>
            )}
          </div>
        </div>
        <div
          className="poster-header w-24 h-36 bg-cover bg-center rounded-lg shadow-lg border-4 border-white transition-transform transform hover:scale-110"
          style={{ backgroundImage: `url(${movie?.posterURLs?.original})` }}
        ></div>
      </div>

      {/* Tabs for navigation */}
      <div className="tabs mb-6 flex justify-between text-sm font-medium cursor-pointer">
        <div 
          onClick={() => { setoverview(true); settrailer(false); setcast(false); }}
          className={`py-2 px-4 rounded-full transition-all duration-300 ${overview ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-gray-300'}`}
        >
          Overview
        </div>
        <div 
          onClick={() => { setoverview(false); settrailer(false); setcast(true); }}
          className={`py-2 px-4 rounded-full transition-all duration-300 ${cast ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-gray-300'}`}
        >
          Cast
        </div>
        <div 
          onClick={() => { setoverview(false); settrailer(true); setcast(false); }}
          className={`py-2 px-4 rounded-full transition-all duration-300 ${trailer ? 'bg-blue-700 text-white' : 'hover:bg-blue-600 text-gray-300'}`}
        >
          Trailer & Links
        </div>
      </div>

      {/* Overview Section */}
      {overview && (
        <div>
          <div className="text-xl font-semibold mb-4">About</div>
          {movie?.video && (
            <Link
              href={"https://www.youtube.com/watch?v=" + movie?.video}
              target="_blank"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-300 mb-6"
            >
              <div className="w-24 h-14 bg-cover bg-center rounded-lg shadow-md transition-transform transform hover:scale-110" style={{ backgroundImage: `url(${movie?.backdropURLs?.original})` }}></div>
              <div className="font-semibold">Watch Official Trailer</div>
            </Link>
          )}
          
          <div className="flex space-x-6 text-sm mb-6">
            {movie?.imdbRating && (
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{(movie?.imdbRating / 10).toFixed(1)} /10</span>
                <span className="text-xs text-gray-400">IMDB</span>
              </div>
            )}
            <div className="border-l border-gray-400 h-12"></div>
            {movie?.tmdbRating && (
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{(movie?.tmdbRating / 10).toFixed(1)} /10</span>
                <span className="text-xs text-gray-400">TMDB</span>
              </div>
            )}
          </div>

          {type === "series" && (
            <div className="space-y-2 text-sm mb-6">
              <div>Seasons: {movie?.seasons}</div>
              <div>Episodes: {movie?.episodes}</div>
            </div>
          )}

          {movie?.tagline && <div className="italic text-lg mb-6">{movie?.tagline}</div>}
          <div className="text-sm">{movie?.overview}</div>
        </div>
      )}

      {/* Trailer and Links Section */}
      <div className="link-wrapper mt-8">
        {trailer && movielinks.map((link) => (
          link.link && (
            <Link key={link.link} href={link.link} target="_blank" className="flex items-center space-x-3 text-blue-500 hover:text-blue-300 mb-6">
              <div className="w-20 h-12 bg-cover bg-center rounded-md shadow-md transition-transform transform hover:scale-110" style={{ backgroundImage: `url(${movie?.backdropURLs?.original})` }}></div>
              <div className="font-semibold">{movie?.title} : Watch on {link.platform}</div>
            </Link>
          )
        ))}

        {trailer && movie?.video && (
          <Link
            href={"https://www.youtube.com/watch?v=" + movie?.video}
            target="_blank"
            className="flex items-center space-x-3 text-blue-500 hover:text-blue-300 mb-6"
          >
            <div className="w-20 h-12 bg-cover bg-center rounded-md shadow-md transition-transform transform hover:scale-110" style={{ backgroundImage: `url(${movie?.backdropURLs?.original})` }}></div>
            <div className="font-semibold">Watch Official Trailer</div>
          </Link>
        )}
      </div>

      {/* Cast Section */}
      {cast && (
        <div className="mt-8">
          {movie?.cast.map((name) => (
            <Link
              key={name}
              href={`https://www.google.com/search?q=${name.split(" ")[0]}+${name.split(" ")[1]}`}
              target="_blank"
              className="block text-blue-500 hover:text-blue-300 mb-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
