
import React from 'react';
import { Song } from '../types';
import PreviousIcon from './icons/PreviousIcon';
import NextIcon from './icons/NextIcon';
import PlayIcon from './icons/PlayIcon';

interface PlayerProps {
  currentSong: Song | null;
  onNext: () => void;
  onPrev: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, onNext, onPrev }) => {
  const videoSearchUrl = currentSong 
    ? `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(currentSong.artist + ' ' + currentSong.title)}&autoplay=1`
    : '';

  return (
    <div className="w-full lg:w-3/5 xl:w-2/3 p-4 flex flex-col items-center justify-center text-white h-full">
      {currentSong ? (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 w-full max-w-2xl flex flex-col items-center shadow-2xl shadow-green-500/10">
          <p className="text-sm text-green-400 font-semibold tracking-widest">NOW PLAYING</p>
          <img src={`${currentSong.albumArtUrl.replace('/200', '/400')}`} alt={currentSong.title} className="w-64 h-64 rounded-lg my-6 shadow-lg" />
          <h3 className="text-3xl font-bold">{currentSong.title}</h3>
          <p className="text-lg text-gray-400 mt-2">{currentSong.artist}</p>
          <div className="w-full h-16 bg-black/50 mt-8 rounded-lg overflow-hidden">
             <iframe
                width="100%"
                height="100%"
                src={videoSearchUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="opacity-0"
              ></iframe>
          </div>
          <div className="flex items-center space-x-8 mt-6">
            <button onClick={onPrev} className="text-gray-400 hover:text-white transition-colors"><PreviousIcon className="w-8 h-8" /></button>
            <button className="p-4 bg-green-500 rounded-full text-black hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30">
              <PlayIcon className="w-10 h-10" />
            </button>
            <button onClick={onNext} className="text-gray-400 hover:text-white transition-colors"><NextIcon className="w-8 h-8" /></button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-gray-400">Select a song to play</h2>
          <p className="text-gray-500 mt-2">The player will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Player;
