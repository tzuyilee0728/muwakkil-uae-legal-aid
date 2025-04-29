
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Bookmark {
  id: string;
  title: string;
  date: string;
  content: string;
  documentPath?: string;
  documentName?: string;
}

const BookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
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
  ]);

  const [expandedBookmarkId, setExpandedBookmarkId] = useState<string | null>('2');

  const toggleExpand = (id: string) => {
    if (expandedBookmarkId === id) {
      setExpandedBookmarkId(null);
    } else {
      setExpandedBookmarkId(id);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Bookmarks</h1>
          <p className="text-gray-500">Conversation that isn't bookmarked will be removed in 7 days</p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => (
              <div 
                key={bookmark.id} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{bookmark.title}</h3>
                      <p className="text-sm text-gray-500">{bookmark.date}</p>
                    </div>
                    <button 
                      onClick={() => removeBookmark(bookmark.id)}
                      className="p-1 text-gray-400 hover:text-muwakkil-purple"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>

                  {expandedBookmarkId === bookmark.id ? (
                    <div className="mt-3">
                      <div className="whitespace-pre-line text-gray-700">
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
                        <div className="mt-4 border rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                            </div>
                            <span className="text-sm">{bookmark.documentName}</span>
                          </div>
                          <a 
                            href={bookmark.documentPath} 
                            download
                            className="text-gray-500 hover:text-muwakkil-purple"
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
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {bookmark.content.split('\n')[0]}
                    </p>
                  )}
                  
                  <button 
                    onClick={() => toggleExpand(bookmark.id)}
                    className="mt-3 text-sm text-gray-500 hover:text-muwakkil-purple"
                  >
                    {expandedBookmarkId === bookmark.id ? 'Show less' : 'Show more'}
                  </button>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-2 flex space-x-2">
                  <Link
                    to={`/chat/${bookmark.id}`}
                    className="text-gray-500 hover:text-muwakkil-purple"
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
          <div className="text-center py-12 text-gray-500">
            No bookmarks yet. Bookmark conversations to keep them for future reference.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
