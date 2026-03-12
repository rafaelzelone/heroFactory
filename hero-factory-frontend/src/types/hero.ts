export interface Hero {
  id: string;
  name: string;
  heroName: string;
  dateBirth: string;
  universe: string;
  mainPower: string;
  avatarUrl: string;
  active: boolean;
}

export type HeroesResponse = {
  heroes: Hero[];
  total: number;
  pages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
};