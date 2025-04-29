
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarkStore } from '../services/bookmarkService';
import { BookmarkCheck, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const [expandedBookmarkId, setExpandedBookmarkId] = useState<string | null>('2');
  const { toast } = useToast();

  const toggleExpand = (id: string) => {
    if (expandedBookmarkId === id) {
      setExpandedBookmarkId(null);
    } else {
      setExpandedBookmarkId(id);
    }
  };

  const handleDeleteBookmark = (id: string) => {
    removeBookmark(id);
    toast({
      title: "Bookmark Deleted",
      description: "The bookmark has been successfully removed.",
    });
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Bookmarks</h1>
          <p className="text-gray-500 dark:text-gray-400">Conversation that isn't bookmarked will be removed in 7 days</p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => (
              <div 
                key={bookmark.id} 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium dark:text-gray-200">{bookmark.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{bookmark.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDeleteBookmark(bookmark.id)}
                        className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        title="Delete bookmark"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button 
                        onClick={() => toggleExpand(bookmark.id)}
                        className="p-1 text-gray-400 hover:text-muwakkil-purple dark:text-gray-500 dark:hover:text-muwakkil-purple"
                        title="Toggle bookmark"
                      >
                        <BookmarkCheck size={20} />
                      </button>
                    </div>
                  </div>

                  {expandedBookmarkId === bookmark.id ? (
                    <div className="mt-3">
                      <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {bookmark.content.split('\n\n').map((paragraph, i) => (
                          <p key={i} className={i > 0 ? 'mt-4' : ''}>
                            {paragraph.split('\n').map((line, j) => (
                              <React.Fragment key={j}>
                                {line.startsWith('•') ? (
                                  <div className="flex">
                                    <span className="mr-2">•</span>
                                    <span>{line.substring(1).trim()}</span>
                                  </div>
                                ) : (
                                  line
                                )}
                                {j < paragraph.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </p>
                        ))}
                      </div>
                      
                      {bookmark.documentPath && (
                        <div className="mt-4 border rounded-lg p-3 flex items-center justify-between dark:border-gray-700">
                          <div className="flex items-center">
                            <div className="w-10 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                            </div>
                            <span className="text-sm dark:text-gray-300">{bookmark.documentName}</span>
                          </div>
                          <a 
                            href={bookmark.documentPath} 
                            download
                            className="text-gray-500 hover:text-muwakkil-purple dark:text-gray-400 dark:hover:text-muwakkil-purple"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {bookmark.content.split('\n')[0]}
                    </p>
                  )}
                  
                  <button 
                    onClick={() => toggleExpand(bookmark.id)}
                    className="mt-3 text-sm text-gray-500 hover:text-muwakkil-purple dark:text-gray-400 dark:hover:text-muwakkil-purple"
                  >
                    {expandedBookmarkId === bookmark.id ? 'Show less' : 'Show more'}
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex space-x-2">
                  <Link
                    to={`/chat/${bookmark.id}`}
                    className="text-gray-500 hover:text-muwakkil-purple dark:text-gray-400 dark:hover:text-muwakkil-purple"
                  >
                    <button className="p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No bookmarks yet. Bookmark conversations to keep them for future reference.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
