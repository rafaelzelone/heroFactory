import React, { useState, useEffect } from 'react';
import './heroesPage.style.css';
import type { Hero } from '../../types/hero';
import MainLayout from '../../layouts/mainLayout/mainLayout';
import TopBar from '../../components/topBar/topBar';
import Card from '../../components/card/card';
import ViewHeroModal from '../../components/modal/viewHeroModal/viewHeroModal';
import CreateHeroModal from '../../components/modal/createHeroModal/createHeroModal';
import ConfirmModal from '../../components/modal/confirmModal/confirmModal';
import AlertModal from '../../components/modal/alertModal/alertModal';
import {
  createHero,
  listHeroes,
  updateHero,
  toggleHeroStatus,
  deleteHero
} from '../../service/heros';
import Pagination from '../../components/pagination/pagination';

const HeroesPage: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHeroForView, setSelectedHeroForView] = useState<Hero | null>(null);
  const [selectedHeroForEdit, setSelectedHeroForEdit] = useState<Hero | null>(null);
  const [heroIdToDelete, setHeroIdToDelete] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error'
  } | null>(null);

  useEffect(() => {
    loadHeroes()
  }, [])

  
  const showAlert = (title: string, message: string, type: 'success' | 'error') => {
    setAlertConfig({ title, message, type });
  };

  const loadHeroes = async (page: number = 1) => {
    try {
      setLoading(true);
        console.log(page)
      const data = await listHeroes(searchTerm, page);

      setHeroes(data.heroes);

      setTotalPages(data.pages || 1);
      setCurrentPage(data.currentPage || page);

    } catch (error) {
      console.error("Erro ao buscar heróis:", error);
      showAlert("Erro de Conexão", "Não foi possível carregar a lista de heróis.", "error");
    } finally {
      setLoading(false);
    }
  };



  const handleSaveHero = async (heroData: Omit<Hero, 'id'>) => {
    try {
      if (selectedHeroForEdit) {
        await updateHero(selectedHeroForEdit.id, heroData);
        showAlert("Sucesso!", "Herói atualizado com sucesso.", "success");
      } else {
        await createHero(heroData);
        showAlert("Sucesso!", "Novo herói adicionado à equipe.", "success");
      }
      loadHeroes();
      setShowCreateModal(false);
      setSelectedHeroForEdit(null);
    } catch (error) {
      console.error("Erro ao salvar herói:", error);
      showAlert("Falha ao Salvar", "Verifique os dados e tente novamente.", "error");
    }
  };

  const handleToggleHer = async (id: string) => {
    if (id) {
      try {
        await toggleHeroStatus(id);
        showAlert("Atualizado", "O herói foi desativado com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao atualizado:", error);
        showAlert("Erro ao Atualizar", "Não foi possível atualizar o herói.", "error");
      } finally {
        setHeroIdToDelete(null);
        loadHeroes();
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (heroIdToDelete) {
      try {
        await deleteHero(heroIdToDelete);
        showAlert("Excluído", "O herói foi removido com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao deletar:", error);
        showAlert("Erro ao Deletar", "Não foi possível remover o herói.", "error");
      } finally {
        setHeroIdToDelete(null);
        loadHeroes();
      }
    }
  };


  return (
    <MainLayout>
      <div className="heroes-page">
        <TopBar
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearchClick={loadHeroes}
          onCreateClick={() => setShowCreateModal(true)}
        />

        {loading && <div className="loading-state">Carregando heróis...</div>}
        <div className='heroes-conteiner'>
          <div className="heroes-grid">
            {!loading && heroes.map(hero => (
              <Card
                key={hero.id}
                hero={hero}
                onView={() => setSelectedHeroForView(hero)}
                onEdit={() => setSelectedHeroForEdit(hero)}
                onDelete={() => setHeroIdToDelete(hero.id)}
                onToggleActive={handleToggleHer}
              />
            ))}
          </div>

          {!loading && heroes.length === 0 && (
            <div className="empty-state">Nenhum herói encontrado.</div>
          )}
        </div>
        <div className="pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => loadHeroes(page)}
          />
        </div>
      </div>

      {selectedHeroForView && (
        <ViewHeroModal
          hero={selectedHeroForView}
          onClose={() => setSelectedHeroForView(null)}
        />
      )}

      {(showCreateModal || selectedHeroForEdit) && (
        <CreateHeroModal
          heroToEdit={selectedHeroForEdit || undefined}
          onClose={() => { setShowCreateModal(false); setSelectedHeroForEdit(null); }}
          onSave={handleSaveHero}
        />
      )}

      {heroIdToDelete && (
        <ConfirmModal
          title="Excluir Herói"
          message="Você tem certeza que deseja excluir este herói? Esta ação não pode ser desfeita."
          confirmText="Excluir"
          variant="danger"
          onClose={() => setHeroIdToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {alertConfig && (
        <AlertModal
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => setAlertConfig(null)}
        />
      )}
    </MainLayout>
  );
};

export default HeroesPage;