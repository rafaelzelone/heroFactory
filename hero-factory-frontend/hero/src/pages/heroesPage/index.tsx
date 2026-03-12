import React, { useState, useEffect } from 'react';
import './styles.css';
import type { Hero } from '../../types/hero';
import MainLayout from '../../layouts/mainLayout';
import TopBar from '../../components/topBar';
import Card from '../../components/card';
import ViewHeroModal from '../../components/modal/viewHeroModal';
import CreateHeroModal from '../../components/modal/createHeroModal';
import ConfirmModal from '../../components/modal/confirmModal';
import AlertModal from '../../components/modal/alertModal'; 
import {
  createHero,
  listHeroes,
  updateHero,
  toggleHeroStatus
} from '../../service/heros';

const HeroesPage: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHeroForView, setSelectedHeroForView] = useState<Hero | null>(null);
  const [selectedHeroForEdit, setSelectedHeroForEdit] = useState<Hero | null>(null);
  const [heroIdToDelete, setHeroIdToDelete] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error'
  } | null>(null);

  const showAlert = (title: string, message: string, type: 'success' | 'error') => {
    setAlertConfig({ title, message, type });
  };

  const loadHeroes = async () => {
    try {
      setLoading(true);
      const data = await listHeroes(searchTerm);
      setHeroes(data);
    } catch (error) {
      console.error("Erro ao buscar heróis:", error);
      showAlert("Erro de Conexão", "Não foi possível carregar a lista de heróis.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadHeroes();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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

  const handleConfirmDelete = async () => {
    if (heroIdToDelete) {
      try {
        await toggleHeroStatus(heroIdToDelete);
        setHeroes(prev => prev.filter(hero => hero.id !== heroIdToDelete));
        showAlert("Excluído", "O herói foi removido com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao deletar:", error);
        showAlert("Erro ao Deletar", "Não foi possível remover o herói.", "error");
      } finally {
        setHeroIdToDelete(null);
      }
    }
  };


  return (
    <MainLayout>
      <TopBar
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onCreateClick={() => setShowCreateModal(true)}
      />

      {loading && <div className="loading-state">Carregando heróis...</div>}

      <div className="heroes-grid">
        {!loading && heroes.map(hero => (
          <Card
            key={hero.id}
            hero={hero}
            onView={() => setSelectedHeroForView(hero)}
            onEdit={() => setSelectedHeroForEdit(hero)}
            onDelete={() => setHeroIdToDelete(hero.id)}
          />
        ))}
      </div>

      {!loading && heroes.length === 0 && (
        <div className="empty-state">Nenhum herói encontrado.</div>
      )}

      {/* --- Renderização de Modais --- */}

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