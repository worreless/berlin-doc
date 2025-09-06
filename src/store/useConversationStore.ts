import { create } from 'zustand';

interface ConversationState {
  isLoading: boolean;
  mainImageSrc: string | null;
  conversation: [];
  error: string | null;
  reset: () => void;
  fetchPosts: (params: { conversation: string, action: string }) => Promise<void>;
}

export const useConversationStore = create<ConversationState>((set) => ({
  isLoading: false,
  mainImageSrc: null,
  conversation: [],
  error: null,
  reset() {
    set({
      isLoading: false,
      mainImageSrc: null,
      conversation: [],
      error: null
    });
  },

  fetchPosts: async (params: { conversation: string, action: string }) => {
    console.log('fetchPosts: Function entered with params:', params); // Добавлено для отладки
    set({ isLoading: true, error: null });
    try {
      const baseUrl = import.meta.env.VITE_N8N_DOMAIN;
      console.log('fetchPosts: VITE_N8N_DOMAIN:', baseUrl); // Добавлено для отладки

      if (!baseUrl) {
        throw new Error("VITE_N8N_DOMAIN is not defined in your .env file or does not start with VITE_.");
      }

      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}/webhook-test/do_action?${queryParams}`;
      console.log('fetchPosts: Fetching URL:', url); // Добавлено для отладки

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response:', response);
      set({ isLoading: false });
    }
    catch ( error: any) {
      console.error('fetchPosts: Error during fetch:', error); // Добавлено для отладки
      set({ error: error?.message || 'An unknown error occurred', isLoading: false });
    }
  }
}));