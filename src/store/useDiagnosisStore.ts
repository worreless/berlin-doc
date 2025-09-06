import { create } from 'zustand';

interface DiagnosisState {
  isLoading: boolean;
  diagnosisResponse: string;
  error: string | null;
  submitDiagnosis: (diagnosis: string) => Promise<void>;
}

export const useDiagnosisStore = create<DiagnosisState>((set) => ({
    isLoading: false,
    diagnosisResponse: '',
    error: null,
    submitDiagnosis: async(diagnosis: string) => {
        set({ isLoading: true, error: null });
        try {
            const baseUrl = import.meta.env.VITE_N8N_DOMAIN;
            console.log('fetchPosts: VITE_N8N_DOMAIN:', baseUrl); // Добавлено для отладки

            if (!baseUrl) {
                throw new Error("VITE_N8N_DOMAIN is not defined in your .env file or does not start with VITE_.");
            }

            const url = `${baseUrl}/diagnosis?diagnosis=${encodeURIComponent(diagnosis)}`;
            console.log('fetchDiagnosis: Fetching URL:', url);

            const response = await fetch(url, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Response:', response);
            set({ isLoading: false, diagnosisResponse: await response.text() } );
        }
        catch (error: any) {
            console.error('fetchPosts: Error during fetch:', error);
            set({ error: error?.message || 'An unknown error occurred', isLoading: false });
        }
    },
}));