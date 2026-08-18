import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Sparkles,
  X,
  Plus,
  Trash2,
  AlertTriangle,
  Download,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

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
    deleteProfile,
    exportProfile,
    importProfilesFromJSON,
    language
  } = useApp();

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [importFeedback, setImportFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const modalVisible = isOpen !== undefined ? isOpen : isProfileModalOpen;
  const handleClose = onClose || closeProfileModal;

  if (!modalVisible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(
        language === 'en'
          ? 'Please enter your name to identify your progress.'
          : 'Por favor, informe seu nome para identificar seu progresso.'
      );
      return;
    }

    setError('');
    createProfile({
      name: name.trim(),
      age: age.trim() || undefined,
      sex: sex.trim() || undefined
    });

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

  const handleExport = (profileId?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    exportProfile(profileId);
  };

  const handleFileProcess = (file: File) => {
    if (!file) return;

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setImportFeedback({
        type: 'error',
        message:
          language === 'en'
            ? 'Please select a valid JSON file (.json).'
            : 'Por favor, selecione um arquivo válido no formato JSON (.json).'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        setImportFeedback({
          type: 'error',
          message:
            language === 'en'
              ? 'The selected file is empty.'
              : 'O arquivo selecionado está vazio.'
        });
        return;
      }

      const res = importProfilesFromJSON(content);
      if (res.success) {
        setImportFeedback({
          type: 'success',
          message: res.message
        });
        setIsCreatingNew(false);
        setTimeout(() => {
          setImportFeedback(null);
          handleClose();
        }, 1800);
      } else {
        setImportFeedback({
          type: 'error',
          message: res.message
        });
      }
    };

    reader.onerror = () => {
      setImportFeedback({
        type: 'error',
        message:
          language === 'en'
            ? 'Failed to read the selected file.'
            : 'Falha ao ler o arquivo selecionado.'
      });
    };

    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const showProfileList = profiles.length > 0 && !isCreatingNew;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json,application/json"
        onChange={handleFileInputChange}
        className="hidden"
        id="profile-import-file-input"
      />

      <div className="bg-[#0b0f19] border border-[#c5a059]/50 rounded-xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative my-8 text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#c5a059]" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#c5a059]">
              {showProfileList
                ? (language === 'en' ? 'MANAGE PRACTITIONERS' : 'GERENCIAR PRATICANTES')
                : (language === 'en' ? 'PRACTITIONER PROFILE' : 'PERFIL DO PRATICANTE')}
            </h3>
          </div>

          {profiles.length > 0 && (
            <button
              onClick={handleClose}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title={language === 'en' ? 'Close' : 'Fechar'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Global Import Feedback Alert */}
        {importFeedback && (
          <div
            className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 shadow-md ${
              importFeedback.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-700/80 text-emerald-200'
                : 'bg-red-950/70 border-red-700/80 text-red-200'
            }`}
          >
            {importFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="font-bold block">
                {importFeedback.type === 'success'
                  ? (language === 'en' ? 'Restoration Completed' : 'Restauração Concluída')
                  : (language === 'en' ? 'Import Error' : 'Erro na Importação')}
              </span>
              <p className="text-[11px] leading-relaxed opacity-90">{importFeedback.message}</p>
            </div>
          </div>
        )}

        {/* Existing profiles view */}
        {showProfileList ? (
          <div className="space-y-4">
            <p className="text-xs text-neutral-300">
              {language === 'en'
                ? 'Select the active practitioner, create a new profile, or export your backups to migrate between devices:'
                : 'Selecione o praticante ativo, crie um novo perfil ou exporte seus backups para migrar entre dispositivos:'}
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
                        <span>
                          {language === 'en'
                            ? `Delete profile for "${p.name}"?`
                            : `Excluir perfil de "${p.name}"?`}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        {language === 'en'
                          ? 'All practice history and Spiral progress for this practitioner will be permanently removed.'
                          : 'Todo o histórico de práticas e progresso na Espiral deste praticante será removido permanentemente.'}
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
                          {language === 'en' ? 'Cancel' : 'Cancelar'}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(p.id, e)}
                          className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Delete Profile' : 'Excluir Perfil'}</span>
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
                              {language === 'en' ? 'Active' : 'Ativo'}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {language === 'en'
                            ? `${p.completedPractices?.length || 0} practices • ${p.completedGiros?.length || 0} Turns${
                                p.age ? ` • ${p.age} years old` : ''
                              }`
                            : `${p.completedPractices?.length || 0} práticas • ${p.completedGiros?.length || 0} Giros${
                                p.age ? ` • ${p.age} anos` : ''
                              }`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Export Profile Button */}
                      <button
                        type="button"
                        onClick={(e) => handleExport(p.id, e)}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-[#f3e3a2] hover:bg-[#c5a059]/20 transition-colors"
                        title={
                          language === 'en'
                            ? `Export backup for ${p.name} (.json)`
                            : `Exportar backup de ${p.name} (.json)`
                        }
                        id={`export-profile-${p.id}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Delete Profile Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(p.id);
                        }}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-400 hover:bg-red-950/60 transition-colors"
                        title={
                          language === 'en'
                            ? `Delete profile for ${p.name}`
                            : `Excluir perfil de ${p.name}`
                        }
                        id={`delete-profile-${p.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profile Actions: New + Import */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(true)}
                className="py-2.5 px-3 rounded-md bg-[#121826] hover:bg-neutral-800 border border-[#c5a059]/40 text-[#f3e3a2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'en' ? 'New Profile' : 'Novo Perfil'}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                title={
                  language === 'en'
                    ? 'Restore practitioner JSON backup'
                    : 'Restaurar backup JSON do praticante'
                }
              >
                <Upload className="w-4 h-4 text-[#c5a059]" />
                <span>{language === 'en' ? 'Import (.json)' : 'Importar (.json)'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Create Profile Form with Integrated Import Option */
          <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-neutral-300">
                  {language === 'en'
                    ? 'Enter the practitioner name to customize greetings and track individual progress in the Spiral.'
                    : 'Informe o nome do praticante para personalizar saudações e acompanhar a jornada individual na Espiral.'}
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
                  {language === 'en' ? 'Practitioner Name' : 'Nome do Praticante'}{' '}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'E.g., Samuel, Maria, The Traveler...'
                      : 'Ex: Samuel, Maria, O Cara...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                  autoFocus
                />
              </div>

              {/* Field: Age (Optional) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {language === 'en' ? 'Age' : 'Idade'}{' '}
                  <span className="text-neutral-500 font-normal lowercase">
                    {language === 'en' ? '(optional)' : '(opcional)'}
                  </span>
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={language === 'en' ? 'E.g., 33' : 'Ex: 33'}
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                />
              </div>

              {/* Field: Sex/Gender (Optional) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {language === 'en' ? 'Sex / Gender' : 'Sexo / Gênero'}{' '}
                  <span className="text-neutral-500 font-normal lowercase">
                    {language === 'en' ? '(optional)' : '(opcional)'}
                  </span>
                </label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#07090e] border border-neutral-800 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  <option value="">
                    {language === 'en' ? 'Prefer not to say' : 'Prefiro não informar'}
                  </option>
                  <option value="Feminino">
                    {language === 'en' ? 'Female' : 'Feminino'}
                  </option>
                  <option value="Masculino">
                    {language === 'en' ? 'Male' : 'Masculino'}
                  </option>
                  <option value="Outro">
                    {language === 'en' ? 'Other' : 'Outro'}
                  </option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                {profiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-4 py-2.5 rounded-md bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 transition-colors"
                  >
                    {language === 'en' ? 'Back' : 'Voltar'}
                  </button>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#e5c158] hover:from-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#c5a059]/20 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'en' ? 'Save Profile' : 'Salvar Perfil'}</span>
                </button>
              </div>
            </form>

            {/* Import Backup Section on Creation Dialog */}
            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
                <FileText className="w-4 h-4 text-[#c5a059]" />
                <span>
                  {language === 'en'
                    ? 'Already have a saved profile?'
                    : 'Já possui um perfil salvo?'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                {language === 'en'
                  ? 'When updating or reinstalling the app, you can restore your history and progress from a .json backup file.'
                  : 'Ao atualizar ou reinstalar o aplicativo, você pode restaurar seu histórico e progresso a partir de um arquivo de backup .json.'}
              </p>

              {/* Drag and Drop Zone / File Input Trigger */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-lg border-2 border-dashed text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                    : 'border-neutral-800 bg-[#07090e] hover:border-[#c5a059]/50 hover:bg-[#101522] text-neutral-300'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="w-6 h-6 text-[#c5a059]" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#f3e3a2]">
                      {language === 'en'
                        ? 'Click to select or drag and drop the .json file'
                        : 'Clique para selecionar ou arraste o arquivo .json'}
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      {language === 'en'
                        ? 'Supports Dimenuous backup files (*.json)'
                        : 'Suporta arquivos de backup do Dimenúveis (*.json)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
