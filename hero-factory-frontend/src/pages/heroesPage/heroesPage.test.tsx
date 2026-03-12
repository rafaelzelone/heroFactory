import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HeroesPage from './heroesPage';
import * as heroService from '../../service/heros';

vi.mock('../../service/heros', () => ({
  listHeroes: vi.fn(),
  createHero: vi.fn(),
  updateHero: vi.fn(),
  toggleHeroStatus: vi.fn(),
  deleteHero: vi.fn(),
}));

describe('HeroesPage', () => {
  const mockHeroesResponse = {
    heroes: [
      {
        id: '1',
        name: 'Bruce Wayne',
        heroName: 'Batman',
        universe: 'DC',
        skill: 'Money',
        avatarUrl: '',
        birthDate: '1939-05-01',
        active: true
      }
    ],
    total: 1,
    pages: 1,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (heroService.listHeroes as any).mockResolvedValue(mockHeroesResponse);
  });

  it('should load and list heroes when mounting the page', async () => {
    render(<HeroesPage />);
    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    expect(heroService.listHeroes).toHaveBeenCalled();
  });

  it('should open the CreateHeroModal when clicking the Criar button', async () => {
    render(<HeroesPage />);
    const btnCreate = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(btnCreate);
    expect(screen.getByText(/Criar herói/i)).toBeInTheDocument();
  });

  it('should show error state if the API fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => { });
    (heroService.listHeroes as any).mockRejectedValue(new Error('API Failure'));

    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.getByText(/Erro de Conexão/i)).toBeInTheDocument();
    });
  });
});