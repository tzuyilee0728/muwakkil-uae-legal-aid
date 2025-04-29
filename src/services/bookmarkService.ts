
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  title: string;
  date: string;
  content: string;
  documentPath?: string;
  documentName?: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  getBookmarks: () => Bookmark[];
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [
        {
          id: '1',
          title: 'NDA that fits Dubai\'s law',
          date: '4/23/25 19:20',
          content: 'Your custom DIFC-compliant NDA is ready.\n\nPlease note\nWhile this NDA can serve as a legally sound draft, I always recommend that you have a licensed legal professional in the UAE review it before execution, especially for high-stakes or international deals.',
          documentPath: '/path/to/document.pdf',
          documentName: 'Nakhla\'s_DIFC-compliant NDA.pdf'
        },
        {
          id: '2',
          title: 'Eligibility check for DIFC\'s government grants',
          date: '4/23/25 19:20',
          content: 'Thank you for providing the necessary information.\nAfter reviewing your company\'s profile, I am pleased to confirm that your startup appears to meet the general eligibility criteria for DIFC government grants and innovation support programs.\n\nSpecifically:\n• Industry Alignment: Your company operates within a priority sector recognized by DIFC (e.g., FinTech, LegalTech, HealthTech, etc.).\n• Business Stage: Your company\'s growth stage and innovation profile align well with DIFC\'s target demographic for grants and startup support.\n• Registration Status: You either maintain an existing presence within the DIFC or are in the process of formal registration, fulfilling a key prerequisite for grant consideration.\n• Compliance Readiness: Based on the information provided, your company is positioned to meet DIFC\'s regulatory compliance requirements, including data protection, governance standards, and beneficial ownership disclosure.',
        }
      ],
      addBookmark: (bookmark) => {
        const currentBookmarks = get().bookmarks;
        // Check if bookmark with the same ID already exists
        const exists = currentBookmarks.some(bm => bm.id === bookmark.id);
        if (!exists) {
          set({ bookmarks: [...currentBookmarks, bookmark] });
        }
      },
      removeBookmark: (id) => {
        set({ bookmarks: get().bookmarks.filter(bookmark => bookmark.id !== id) });
      },
      getBookmarks: () => get().bookmarks
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);
