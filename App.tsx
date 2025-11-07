
import React, { useState, useCallback, useMemo } from 'react';
import { SurveyResponse, View } from './types';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import ResultsDashboard from './components/ResultsDashboard';

const ADMIN_PIN = '1234'; // In a real app, this would not be hardcoded.

export default function App() {
  const [view, setView] = useState<View>(View.Survey);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSurveySubmit = useCallback((response: SurveyResponse) => {
    setResponses(prev => [...prev, response]);
  }, []);

  const handleAdminLogin = useCallback((pin: string) => {
    if (pin === ADMIN_PIN) {
      setView(View.Dashboard);
      setError(null);
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  }, []);

  const navigateToAdmin = useCallback(() => setView(View.AdminLogin), []);
  const navigateToSurvey = useCallback(() => setView(View.Survey), []);

  const header = useMemo(() => (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            <h1 className="ml-3 text-2xl font-bold text-slate-800 dark:text-white">Cleanliness Survey</h1>
          </div>
          <nav>
            {view === View.Survey && (
              <button onClick={navigateToAdmin} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Admin Login
              </button>
            )}
            {view !== View.Survey && (
              <button onClick={navigateToSurvey} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Back to Survey
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  ), [view, navigateToAdmin, navigateToSurvey]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {header}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {view === View.Survey && <SurveyForm onSubmit={handleSurveySubmit} />}
        {view === View.AdminLogin && <AdminLogin onLogin={handleAdminLogin} error={error} />}
        {view === View.Dashboard && <ResultsDashboard responses={responses} />}
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        <p>&copy; 2024 Cleanliness Survey Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
