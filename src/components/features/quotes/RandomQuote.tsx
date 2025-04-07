import React, { useState, useEffect } from 'react';
import { Quote } from '../../../data/quotes/quoteData';

// 定义组件Props类型
interface RandomQuoteProps {
  quotes: Quote[];
  title?: string;
  refreshInterval?: number;
}

// 随机选择一个语录
const getRandomQuote = (quotes: Quote[]) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// 随机语录组件
const RandomQuote: React.FC<RandomQuoteProps> = ({ quotes, title, refreshInterval = 10000 }) => {
  const [quote, setQuote] = useState(getRandomQuote(quotes));
  const [fade, setFade] = useState(true);

  // 手动刷新语录的函数
  const refreshQuote = () => {
    setFade(false);
    setTimeout(() => {
      setQuote(getRandomQuote(quotes));
      setFade(true);
    }, 500);
  };

  // 每隔一定时间更新一次语录
  useEffect(() => {
    const interval = setInterval(() => {
      refreshQuote();
    }, refreshInterval); // 使用传入的更新间隔
    
    return () => clearInterval(interval);
  }, [quotes, refreshInterval]);

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900/30 p-5 transition-all">
      <div className="flex justify-between items-center mb-4">
        {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
        <button 
          onClick={refreshQuote}
          className="text-indigo-600 hover:text-indigo-800 transition-colors p-2 rounded-full hover:bg-indigo-50"
          title="随机抽取"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-gray-800 dark:text-gray-100 text-lg italic mb-3 font-kai leading-relaxed">
          "{quote.quote}"
        </p>
        <div className="flex justify-between items-end">
          <div className="flex flex-wrap items-baseline">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-1">{quote.author}</span>
            {quote.source && (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                《{quote.source.replace(/[《》]/g, '').replace(/《/g, '').replace(/》/g, '')}》
              </span>
            )}
          </div>
          {quote.category && (
            <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
              {quote.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomQuote; 