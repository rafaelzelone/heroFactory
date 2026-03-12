import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HeroesPage from './index';
import * as heroService from '../../service/heros';

// Mockando as funções do serviço
vi.mock('../../service/heros', () => ({
  listHeroes: vi.fn(),
  createHero: vi.fn(),
  updateHero: vi.fn(),
  toggleHeroStatus: vi.fn(),
}));

describe('HeroesPage', () => {
  const mockHeroes = [
    { id: 1, name: 'Bruce Wayne', heroName: 'Batman', universe: 'DC', skill: 'Money', avatarUrl: '', birthDate: '1939-05-01' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Resposta padrão para a listagem
    (heroService.listHeroes as any).mockResolvedValue(mockHeroes);
  });

  it('deve carregar e listar os heróis ao montar a página', async () => {
    render(<HeroesPage />);
    
    // Avança o debounce de 500ms do useEffect
    act(() => { vi.advanceTimersByTime(500); });

    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });
    expect(heroService.listHeroes).toHaveBeenCalled();
  });

  it('deve abrir o CreateHeroModal ao clicar no botão Criar', async () => {
    render(<HeroesPage />);
    
    const btnCriar = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(btnCriar);

    expect(screen.getByText('Criar herói')).toBeInTheDocument();
  });

  it('deve filtrar heróis quando o usuário digita na busca (Debounce)', async () => {
    render(<HeroesPage />);
    
    const searchInput = screen.getByPlaceholderText(/digite o nome do herói/i);
    fireEvent.change(searchInput, { target: { value: 'Superman' } });

    // Antes de 500ms não deve ter chamado a API novamente
    expect(heroService.listHeroes).toHaveBeenCalledTimes(1); 

    // Avança o tempo do debounce
    act(() => { vi.advanceTimersByTime(500); });

    await waitFor(() => {
      expect(heroService.listHeroes).toHaveBeenCalledWith('Superman');
    });
  });

  it('deve abrir o ConfirmModal e excluir um herói', async () => {
    (heroService.toggleHeroStatus as any).mockResolvedValue({});
    render(<HeroesPage />);
    
    act(() => { vi.advanceTimersByTime(500); });

    // Abre o menu de opções do card (os três pontos)
    const optionsBtn = await screen.findByText('⋮');
    fireEvent.click(optionsBtn);

    // Clica no ícone de deletar
    const deleteBtn = screen.getByRole('img', { name: /delete/i });
    fireEvent.click(deleteBtn);

    // Verifica se o modal de confirmação apareceu
    expect(screen.getByText(/você tem certeza/i)).toBeInTheDocument();

    // Confirma a exclusão
    const confirmBtn = screen.getByRole('button', { name: 'Excluir' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(heroService.toggleHeroStatus).toHaveBeenCalledWith(1);
      expect(screen.getByText(/excluído/i)).toBeInTheDocument(); // AlertModal
    });
  });

  it('deve mostrar estado de erro se a API falhar', async () => {
    (heroService.listHeroes as any).mockRejectedValue(new Error('Falha na API'));
    render(<HeroesPage />);
    
    act(() => { vi.advanceTimersByTime(500); });

    await waitFor(() => {
      expect(screen.getByText(/Erro de Conexão/i)).toBeInTheDocument();
    });
  });
});