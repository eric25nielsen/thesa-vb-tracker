'use client';

import { formatTime } from '@/lib/utils';

interface HeaderProps {
  lastUpdated: string;
  isFallback: boolean;
  onRefresh: () => void;
  onShare: () => void;
}

export default function Header({ lastUpdated, isFallback, onRefresh, onShare }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
              THESA Volleyball
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Dallas Angels Classic
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              Fri Oct 2 – Sat Oct 3, 2026
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Fieldhouse+USA+Grapevine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
            >
              📍 Fieldhouse USA Grapevine
            </a>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <button
                onClick={onRefresh}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Refresh"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={onShare}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                aria-label="Share"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 dark:text-gray-500 text-right">
                Updated {formatTime(lastUpdated)}
                {isFallback && (
                  <span className="block text-amber-600 dark:text-amber-400 mt-0.5">
                    (Offline mode)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
