import { Song } from '../types';

const mockSongs: Song[] = [
  { id: 1, rank: 1, title: "Supernova", artist: "aespa", albumArtUrl: "https://picsum.photos/seed/Supernova/200" },
  { id: 2, rank: 2, title: "Magnetic", artist: "ILLIT", albumArtUrl: "https://picsum.photos/seed/Magnetic/200" },
  { id: 3, rank: 3, title: "Spot! (feat. JENNIE)", artist: "ZICO", albumArtUrl: "https://picsum.photos/seed/Spot/200" },
  { id: 4, rank: 4, title: "Heya", artist: "IVE", albumArtUrl: "https://picsum.photos/seed/Heya/200" },
  { id: 5, rank: 5, title: "Come back to me", artist: "RM", albumArtUrl: "https://picsum.photos/seed/Comebacktome/200" },
  { id: 6, rank: 6, title: "Fate", artist: "(G)I-DLE", albumArtUrl: "https://picsum.photos/seed/Fate/200" },
  { id: 7, rank: 7, title: "SHEESH", artist: "BABYMONSTER", albumArtUrl: "https://picsum.photos/seed/SHEESH/200" },
  { id: 8, rank: 8, title: "I am...", artist: "QWER", albumArtUrl: "https://picsum.photos/seed/Iam/200" },
  { id: 9, rank: 9, title: "Sudden Shower", artist: "ECLIPSE", albumArtUrl: "https://picsum.photos/seed/SuddenShower/200" },
  { id: 10, rank: 10, title: "Like Crazy", artist: "Jimin", albumArtUrl: "https://picsum.photos/seed/LikeCrazy/200" },
];

// Fisher-Yates shuffle algorithm to randomize the array
const shuffleArray = (array: Song[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const fetchTop10Chart = (): Promise<Song[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Shuffle a copy of the mock songs and re-assign ranks
      const shuffledSongs = shuffleArray([...mockSongs]).map((song, index) => ({
        ...song,
        rank: index + 1,
      }));
      resolve(shuffledSongs);
    }, 500);
  });
};