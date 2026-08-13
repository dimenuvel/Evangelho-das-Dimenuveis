import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Sparkles, X, Plus, Check, Trash2, AlertTriangle } from 'lucide-react';

interface ProfileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const {
    isProfileModalOpen,
    closeProfileModal,
    profiles,
    activeProfileId,
    createProfile,
    switchProfile,
    deleteProfile
  } = useApp();

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const modalVisible = isOpen !== undefined ? isOpen : isProfileModalOpen;
  const handleClose = onClose || closeProfileModal;

  if (!modalVisible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome para identificar seu progresso.');
      return;
    }

    setError('');
    createProfile({
      name: name.trim(),
      age: age.trim() || undefined,
      sex: sex.trim() || undefined
    });

    // Reset local form state
    setName('');
    setAge('');
    setSex('');
    setIsCreatingNew(false);
    handleClose();
  };

  const handleDelete = (profileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProfile(profileId);
    setConfirmDeleteId(null);
  };

  const showProfileList = profiles.length > 0 && !isCreatingNew;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b0f19] border border-[#c5a059]/50 rounded-xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative my-8 text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#c5a059]" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a059]">
              {showProfileList ? 'GERENCIAR PRATICANTES' : 'NOVO PERFIL DE PRATICANTE'}
            </h3>
          </div>

          {profiles.length > 0 && (
            <button
              onClick={handleClose}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Existing profiles view */}
        {showProfileList ? (
          <div className="space-y-4">
            <p className="text-xs text-neutral-300">
              Selecione quem está praticando agora ou crie um novo perfil para salvar o progresso individual:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {profiles.map((p) => {
                const isActive = p.id === activeProfileId;
                const isConfirmingDelete = confirmDeleteId === p.id;

                if (isConfirmingDelete) {
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-lg border border-red-800/80 bg-red-950/40 text-neutral-200 space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Excluir perfil de "{p.name}"?</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        Todo o histórico de práticas e progresso na Espiral deste praticante será removido permanentemente.
                      </p>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(null);
                          }}
                          className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(p.id, e)}
                          className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Excluir Perfil</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      switchProfile(p.id);
                      handleClose();
                    }}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#121826] border-[#c5a059] text-white shadow-md'
                        : 'bg-[#07090e] border-neutral-800 text-neutral-300 hover:bg-[#101522] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f3e3a2] font-serif font-bold text-sm shrink-0">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{p.name}</span>
                          {isActive && (
                            <span className="text-[10px] font-mono uppercase bg-[#c5a059]/20 text-[#f3e3a2] px-2 py-0.5 rounded border border-[#c5a059]/40">
                              Ativo
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {p.completedPractices.length} práticas concluídas • {p.completedGiros.length} Giros
                          {p.age ? ` • ${p.age} anos` : ''}
                          {p.sex ? ` • ${p.sex}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && <Check className="w-4 h-4 text-[#c5a059]" />}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(p.id);
                        }}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-400 hover:bg-red-950/60 transition-colors"
                        title={`Excluir perfil de ${p.name}`}
                        id={`delete-profile-${p.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsCreatingNew(true)}
                className="w-full py-2.5 rounded-md bg-[#121826] hover:bg-neutral-800 border border-[#c5a059]/40 text-[#f3e3a2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Criar Novo Praticante</span>
              </button>
            </div>
          </div>
        ) : (
          /* Create Profile Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-neutral-300">
                Informe o nome do praticante para personalizar saudações e acompanhar a jornada individual na Espiral.
              </p>
            </div>

            {error && (
              <div className="p-2.5 bg-red-950/60 border border-red-800/80 rounded text-red-200 text-xs">
                {error}
              </div>
            )}

            {/* Field: Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a059]">
                Nome do Praticante <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Samuel, Maria, O Cara..."
                className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                autoFocus
              />
            </div>

            {/* Field: Age (Optional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                Idade <span className="text-neutral-500 font-normal lowercase">(opcional)</span>
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 33"
                className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
              />
            </div>

            {/* Field: Sex/Gender (Optional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                Sexo / Gênero <span className="text-neutral-500 font-normal lowercase">(opcional)</span>
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
              >
                <option value="">Prefiro não informar</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              {profiles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2.5 rounded-md bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 transition-colors"
                >
                  Voltar
                </button>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#c5a059]/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Salvar Perfil</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
