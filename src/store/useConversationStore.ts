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
    set({ isLoading: true, error: null, mainImageSrc: null });
    try {
      const baseUrl = import.meta.env.VITE_N8N_DOMAIN;
      console.log('fetchPosts: VITE_N8N_DOMAIN:', baseUrl); // Добавлено для отладки

      if (!baseUrl) {
        throw new Error("VITE_N8N_DOMAIN is not defined in your .env file or does not start with VITE_.");
      }

      const url = `${baseUrl}/webhook/do_action`;
      console.log('fetchPosts: Fetching URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
      set({ isLoading: false, mainImageSrc: responseData?.url });
    }
    catch (error: any) {
      console.error('fetchPosts: Error during fetch:', error);
      set({ error: error?.message || 'An unknown error occurred', isLoading: false });
    }
  }
}));