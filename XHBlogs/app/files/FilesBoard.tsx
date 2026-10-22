"use client";

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../components/BackButton';
import { filesData } from '../../data/files';

export default function FilesBoard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = useMemo(() => {
    if (searchQuery.trim() === "") return filesData;
    const query = searchQuery.trim().toLowerCase();
    return filesData.filter(file =>
      file.name.toLowerCase().includes(query) ||
      file.description.toLowerCase().includes(query) ||
      file.source.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-10 py-10 relative z-10">
      {/* 顶部返回按钮与标题 */}
      <div className="mb-8 flex flex-col items-center md:items-start">
        <div className="w-full flex justify-start mb-6">
          <BackButton />
        </div>
        <div className="text-center md:text-left w-full">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-widest drop-shadow-sm uppercase">
            File Garden
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-serif">
            分享一些文件、工具与资源。点击即可跳转下载。
          </p>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="mb-12 flex justify-center w-full">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="搜索文件名称或来源..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-full px-6 py-3 pl-12 text-slate-800 dark:text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500 font-serif"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 文件列表 */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <AnimatePresence>
          {filteredFiles.map((file) => (
            <motion.a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/40 transition-colors duration-500"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="text-4xl">{file.icon || '📄'}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate mb-1">
                    {file.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                    {file.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-indigo-500 dark:text-indigo-400 bg-white/50 dark:bg-slate-900/50 px-2 py-0.5 rounded-full">
                      {file.source}
                    </span>
                    {file.size && (
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">
                        {file.size}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-slate-400 group-hover:text-indigo-500 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400 font-serif">
          没有找到相关文件~
        </div>
      )}
    </div>
  );
}
