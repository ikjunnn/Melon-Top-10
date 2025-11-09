import React, { useState, useEffect, useCallback } from 'react';
import { Song } from './types';
import { fetchTop10Chart } from './services/chartService';
import ChartList from './components/ChartList';
import Player from './components/Player';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getChartData = async () => {
    try {
      setIsLoading(true);
      const chartData = await fetchTop10Chart();
      setSongs(chartData);
    } catch (error) {
      console.error("Failed to fetch chart data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  const handleSelectSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const handleNextSong = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentSongIndex(prevIndex => {
        if (prevIndex === null) return 0;
        const nextIndex = (prevIndex + 1) % songs.length;
        setIsPlaying(true);
        return nextIndex;
    });
  }, [songs.length]);

  const handlePrevSong = useCallback(() => {
    if (songs.length === 0) return;
     setCurrentSongIndex(prevIndex => {
        if (prevIndex === null) return songs.length - 1;
        const nextIndex = (prevIndex - 1 + songs.length) % songs.length;
        setIsPlaying(true);
        return nextIndex;
    });
  }, [songs.length]);

  const handleRefresh = useCallback(() => {
    setCurrentSongIndex(null);
    setIsPlaying(false);
    getChartData();
  }, []);

  const handleDownload = useCallback(() => {
    if (songs.length === 0) return;

    const playlistContent = songs
      .map(song => {
        // Create a YouTube search query URL, which works well with players like VLC for streaming
        const query = encodeURIComponent(`${song.artist} - ${song.title}`);
        return `https://www.youtube.com/watch?v=${query}`;
      })
      .join('\n');

    const blob = new Blob([playlistContent], { type: 'audio/x-mpegurl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    a.download = `멜론 TOP 10 (${dateString}).m3u`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [songs]);


  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans flex flex-col p-4 lg:p-8">
       <header className="flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18 3a1 1 0 00-1.196-.98l-15 2A1 1 0 001 5v11a1 1 0 001.196.98l15-2A1 1 0 0019 14V4a1 1 0 00-1-1zm-3.804 11.28L5 15.28V6.72l9.196-1.226v9.786z" />
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <h1 className="text-3xl font-bold ml-3">
          <span className="text-white">TuneChart</span>
          <span className="text-green-400"> Player</span>
        </h1>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row gap-8 h-[calc(100vh-120px)]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl text-gray-400">Loading Chart...</p>
          </div>
        ) : (
          <>
            <ChartList 
              songs={songs} 
              currentSongIndex={currentSongIndex}
              onSelectSong={handleSelectSong}
              isPlaying={isPlaying && currentSongIndex !== null}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
            />
            <Player 
              currentSong={currentSong}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;