import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // The "Mental Scratchpad" - keeps thoughts safe
      notes: [],
      // The "State History" - tracks your progress for clinical review
      logs: [],

      addNote: (content) => set((state) => ({
        notes: [{ 
          id: Date.now(), 
          content, 
          timestamp: new Date().toLocaleString() 
        }, ...state.notes]
      })),

      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),

      addLog: (stateName, action) => set((state) => ({
        logs: [{ 
          date: new Date().toISOString(), 
          stateName, 
          action 
        }, ...state.logs]
      })),

      clearAll: () => set({ notes: [], logs: [] })
    }),
    {
      name: 'bee-well-sj-junction', // The unique ID for your local storage
    }
  )
);
