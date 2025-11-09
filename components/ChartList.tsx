import React from 'react';
import { Song } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import RefreshIcon from './icons/RefreshIcon';
import DownloadIcon from './icons/DownloadIcon';

interface ChartListProps {
  songs: Song[];
  currentSongIndex: number | null;
  onSelectSong: (index: number) => void;
  isPlaying: boolean;
  onRefresh: () => void;
  onDownload: () => void;
}

const ChartListItem: React.FC<{ song: Song; isActive: boolean; onClick: () => void; isPlaying: boolean }> = ({ song, isActive, onClick, isPlaying }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
        isActive ? 'bg-green-500/20' : 'hover:bg-gray-800'
      }`}
    >
      <div className="flex-shrink-0 w-12 text-center">
        <span className={`text-xl font-bold ${isActive ? 'text-green-400' : 'text-gray-400'}`}>{song.rank}</span>
      </div>
      <img src={song.albumArtUrl} alt={song.title} className="w-12 h-12 rounded-md ml-4" />
      <div className="ml-4 flex-grow">
        <p className={`font-semibold ${isActive ? 'text-white' : 'text-gray-200'}`}>{song.title}</p>
        <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>{song.artist}</p>
      </div>
      {isActive && (
        <div className="w-6 h-6 text-green-400">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
      )}
    </li>
  );
};

const ChartList: React.FC<ChartListProps> = ({ songs, currentSongIndex, onSelectSong, isPlaying, onRefresh, onDownload }) => {
  return (
    <div className="w-full lg:w-2/5 xl:w-1/3 bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pl-3">
        <h2 className="text-2xl font-bold text-white">Top 10 Chart</h2>
        <div className="flex items-center space-x-3">
            <button onClick={onRefresh} className="text-gray-400 hover:text-white transition-colors" aria-label="Refresh Chart">
                <RefreshIcon className="w-6 h-6" />
            </button>
            <button onClick={onDownload} className="text-gray-400 hover:text-white transition-colors" aria-label="Download Playlist">
                <DownloadIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
      <ul className="overflow-y-auto">
        {songs.map((song, index) => (
          <ChartListItem
            key={song.id}
            song={song}
            isActive={index === currentSongIndex}
            onClick={() => onSelectSong(index)}
            isPlaying={isPlaying}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChartList;