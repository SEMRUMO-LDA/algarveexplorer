
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import { generateMotivation, suggestTasks } from './services/geminiService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finalizar projeto React', completed: false, priority: 'alta' },
    { id: '2', title: 'Estudar Gemini API', completed: true, priority: 'média' },
    { id: '3', title: 'Ir à academia', completed: false, priority: 'baixa' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [motivation, setMotivation] = useState<string>('Carregando inspiração...');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchMotivation = useCallback(async () => {
    const quote = await generateMotivation();
    setMotivation(quote);
  }, []);

  useEffect(() => {
    fetchMotivation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'média',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAiSuggestions = async () => {
    setIsAiLoading(true);
    const suggestions = await suggestTasks(tasks.map(t => t.title));
    const newTasks: Task[] = suggestions.map((title, index) => ({
      id: `ai-${Date.now()}-${index}`,
      title,
      completed: false,
      priority: 'média'
    }));
    setTasks(prev => [...prev, ...newTasks]);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              S
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">SmartHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: AI & Info */}
        <div className="md:col-span-1 space-y-6">
          <section className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2">Insight do Dia</h2>
              <p className="text-lg font-medium leading-relaxed italic">
                "{motivation}"
              </p>
              <button 
                onClick={fetchMotivation}
                className="mt-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Atualizar
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
              Assistente IA
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Deixe a IA analisar suas tarefas e sugerir os próximos passos para maximizar sua produtividade.
            </p>
            <button 
              onClick={handleAiSuggestions}
              disabled={isAiLoading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAiLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              )}
              Sugerir Tarefas
            </button>
          </section>
        </div>

        {/* Right Column: Tasks */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Minhas Tarefas</h2>
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                {tasks.filter(t => !t.completed).length} Pendentes
              </span>
            </div>

            <form onSubmit={addTask} className="mb-8 flex gap-2">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="O que precisa ser feito?"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Adicionar
              </button>
            </form>

            <div className="space-y-3 flex-1">
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  <p>Nenhuma tarefa por enquanto.</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      task.completed ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 hover:border-indigo-400'
                        }`}
                      >
                        {task.completed && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                      <span className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md ${
                        task.priority === 'alta' ? 'bg-rose-50 text-rose-600' : 
                        task.priority === 'média' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {task.priority}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="max-w-5xl mx-auto px-4 py-8 mt-auto">
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2024 SmartHub - Criado com Gemini AI</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Privacidade</a>
            <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Configurações</a>
            <a href="#" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Ajuda</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
