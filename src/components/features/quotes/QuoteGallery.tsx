import React, { useState, useEffect } from 'react';
import AddQuote from './AddQuote';
import { motion } from 'framer-motion';
import YinYangLogo from '../philosophy/YinYangLogo';

// 语录数据类型
export interface Quote {
  quote: string;
  author: string;
  source?: string;
  category?: string;
  id?: string; // 添加可选的ID字段，用于唯一标识
}

// 语录数据库
export const quoteDatabase: Quote[] = [
  // 王阳明心学
  { quote: "知是行的主意，行是知的功夫；知是行之始，行是知之成。", author: "王阳明", source: "《传习录》", category: "心学", id: "ym1" },
  { quote: "心外无物，心外无事，心外无理，心外无义。", author: "王阳明", source: "《传习录》", category: "心学", id: "ym2" },
  { quote: "致良知是一生工夫，此外别无工夫。", author: "王阳明", source: "《传习录》", category: "心学", id: "ym3" },
  { quote: "破山中贼易，破心中贼难。", author: "王阳明", source: "《传习录》", category: "心学", id: "ym4" },
  { quote: "圣人之道，吾性自足，不假外求。", author: "王阳明", source: "《传习录》", category: "心学", id: "ym5" },
  
  // 道家思想
  { quote: "道可道，非常道；名可名，非常名。", author: "老子", source: "《道德经》", category: "道家", id: "dao1" },
  { quote: "上善若水，水善利万物而不争。", author: "老子", source: "《道德经》", category: "道家", id: "dao2" },
  { quote: "人法地，地法天，天法道，道法自然。", author: "老子", source: "《道德经》", category: "道家", id: "dao3" },
  { quote: "天地与我并生，而万物与我为一。", author: "庄子", source: "《齐物论》", category: "道家", id: "dao4" },
  { quote: "知人者智，自知者明。胜人者有力，自胜者强。", author: "老子", source: "《道德经》", category: "道家", id: "dao5" },
  
  // 儒家思想
  { quote: "己所不欲，勿施于人。", author: "孔子", source: "《论语》", category: "儒家", id: "ru1" },
  { quote: "吾日三省吾身。", author: "孔子", source: "《论语》", category: "儒家", id: "ru2" },
  { quote: "学而不思则罔，思而不学则殆。", author: "孔子", source: "《论语》", category: "儒家", id: "ru3" },
  { quote: "君子坦荡荡，小人长戚戚。", author: "孔子", source: "《论语》", category: "儒家", id: "ru4" },
  { quote: "三人行，必有我师焉。", author: "孔子", source: "《论语》", category: "儒家", id: "ru5" },
  
  // 中国古代文学
  { quote: "不以物喜，不以己悲。", author: "范仲淹", source: "《岳阳楼记》", category: "文学", id: "lit1" },
  { quote: "天行健，君子以自强不息。", author: "《周易》", source: "乾卦", category: "哲学", id: "phi1" },
  { quote: "宁可枝头抱香死，何曾吹落北风中。", author: "郑思肖", source: "《画菊》", category: "文学", id: "lit2" },
  { quote: "人生自古谁无死，留取丹心照汗青。", author: "文天祥", source: "《过零丁洋》", category: "文学", id: "lit3" },
  { quote: "采菊东篱下，悠然见南山。", author: "陶渊明", source: "《饮酒》", category: "文学", id: "lit4" }
];

// 生成唯一ID - 修改为内部函数，不再导出
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// 装饰性背景元素组件
const BackgroundDecorations = () => (
  <>
    {/* 左上角装饰 */}
    <div className="fixed top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-900 dark:text-blue-200">
        <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,80 Q25,30 50,80 T100,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,90 Q25,40 50,90 T100,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
    
    {/* 右下角装饰 */}
    <div className="fixed bottom-0 right-0 w-64 h-64 opacity-10 transform rotate-180 pointer-events-none">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-900 dark:text-blue-200">
        <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,80 Q25,30 50,80 T100,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0,90 Q25,40 50,90 T100,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
    
    {/* 右上角云纹装饰 */}
    <div className="fixed top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-800 dark:text-blue-300">
        <path d="M20,20 Q30,5 40,20 T60,20 T80,20" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20,30 Q30,15 40,30 T60,30 T80,30" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20,40 Q30,25 40,40 T60,40 T80,40" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20,50 Q30,35 40,50 T60,50 T80,50" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
    
    {/* 左下角山水装饰 */}
    <div className="fixed bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-800 dark:text-blue-300">
        <path d="M0,80 L20,50 L30,60 L40,30 L60,70 L70,50 L80,60 L100,20" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0,90 Q30,80 50,85 T100,80" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
    
    {/* 中间漂浮元素 */}
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-full h-full max-w-6xl mx-auto relative">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-3 h-3 bg-blue-500/10 dark:bg-blue-300/10 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  </>
);

// 简洁卡片包装组件
const SimpleCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100 dark:border-blue-950/30 p-5 ${className}`}>
      {children}
    </div>
  );
};

// 语录卡片组件
export const QuoteCard: React.FC<{ 
  quote: Quote; 
  className?: string;
  onDelete?: (id: string) => void;
  onEdit?: (quote: Quote) => void;
  editable?: boolean;
}> = ({ 
  quote, 
  className = '', 
  onDelete, 
  onEdit,
  editable = false 
}) => (
  <motion.div 
    className="h-full"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`bg-white/90 dark:bg-gray-800/80 rounded-xl border-blue-100 dark:border-blue-900/30 border shadow-sm p-6 transition-all ${className} relative group h-full flex flex-col`}>
      {/* 左上角装饰引号 */}
      <div className="absolute top-3 left-4 text-5xl text-indigo-200 dark:text-indigo-700 opacity-40 font-serif leading-none">
        "
      </div>
      
      {/* 右下角装饰引号 */}
      <div className="absolute bottom-10 right-4 text-5xl text-indigo-200 dark:text-indigo-700 opacity-40 font-serif leading-none">
        "
      </div>
      
      {/* 卡片主体内容 */}
      <div className="relative z-10 flex-grow">
        <div className="flex flex-col">
          <p className="text-gray-800 dark:text-blue-100/90 text-lg font-kai mb-4 pt-3 pl-4 pr-28 leading-relaxed tracking-wider">
            {quote.quote}
          </p>
          
          {/* 作者信息 - 移到右上角 */}
          <div className="absolute top-0 right-0 pt-3 pr-4">
            <p className="text-indigo-600 dark:text-indigo-400 text-base font-bold border-l-2 border-indigo-200 dark:border-indigo-700 pl-2 py-0.5 whitespace-nowrap">
              {quote.author}
            </p>
          </div>
        </div>
      </div>
      
      {/* 底部区域 */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            {quote.source && (
              <p className="text-sm text-gray-500 dark:text-gray-400 font-song">
                {quote.source}
              </p>
            )}
          </div>
          
          {quote.category && (
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-full shadow-sm">
              {quote.category}
            </span>
          )}
        </div>
      </div>
      
      {/* 编辑和删除按钮 */}
      {editable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {onEdit && (
            <button 
              onClick={() => quote.id && onEdit(quote)}
              className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              title="编辑"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && quote.id && (
            <button 
              onClick={() => onDelete(quote.id as string)}
              className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
              title="删除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  </motion.div>
);

// 确认删除模态框组件
const DeleteConfirmModal: React.FC<{
  isOpen: boolean;
  quoteToDelete?: Quote;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ isOpen, quoteToDelete, onCancel, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 border border-blue-100 dark:border-blue-900/30 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          确认删除
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 font-kai">
          你确定要删除这条语录吗？此操作无法撤销。
          {quoteToDelete && (
            <span className="block mt-2 italic text-gray-500 dark:text-gray-400 border-l-2 border-gray-200 dark:border-gray-700 pl-3 py-1">
              "{quoteToDelete.quote.length > 50 ? quoteToDelete.quote.substring(0, 50) + '...' : quoteToDelete.quote}"
              <span className="block mt-1 text-right">—— {quoteToDelete.author}</span>
            </span>
          )}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            删除
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// 导出功能组件
const ExportQuotesButton: React.FC<{ quotes: Quote[] }> = ({ quotes }) => {
  const handleExport = () => {
    // 创建要导出的数据
    const exportData = JSON.stringify(quotes, null, 2);
    
    // 创建Blob对象
    const blob = new Blob([exportData], { type: 'application/json' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `东方智慧语录库_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
      title="导出所有语录"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
      </svg>
      <span>导出语录</span>
    </button>
  );
};

// 语录库展示组件
const QuoteGallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quoteDatabase);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // 删除相关状态
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | undefined>(undefined);
  
  // 编辑相关状态
  const [quoteToEdit, setQuoteToEdit] = useState<Quote | undefined>(undefined);
  
  // 获取所有类别
  const categories = ['全部', ...Array.from(new Set(quoteDatabase.map(q => q.category || '其他')))];
  
  // 添加ID到没有ID的语录
  useEffect(() => {
    quoteDatabase.forEach(quote => {
      if (!quote.id) {
        quote.id = generateUniqueId();
      }
    });
  }, []);
  
  // 过滤语录
  useEffect(() => {
    updateFilteredQuotes();
  }, [filter, searchTerm]);
  
  // 处理添加新语录
  const handleQuoteAdded = (newQuote: Quote) => {
    // 确保新语录有ID
    if (!newQuote.id) {
      newQuote.id = generateUniqueId();
    }
    
    // 更新过滤结果
    updateFilteredQuotes();
    
    // 如果是编辑模式，则重置编辑状态
    if (quoteToEdit) {
      setQuoteToEdit(undefined);
    }
  };

  // 处理编辑语录
  const handleEditClick = (quote: Quote) => {
    setQuoteToEdit(quote);
    setShowAddForm(true);
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setQuoteToEdit(undefined);
    setShowAddForm(false);
  };
  
  // 处理删除语录
  const handleDeleteClick = (id: string) => {
    const quoteToDelete = quoteDatabase.find(q => q.id === id);
    if (quoteToDelete) {
      setQuoteToDelete(quoteToDelete);
      setIsDeleteModalOpen(true);
    }
  };
  
  const confirmDelete = () => {
    if (quoteToDelete && quoteToDelete.id) {
      // 从数组中移除语录
      const index = quoteDatabase.findIndex(q => q.id === quoteToDelete.id);
      if (index !== -1) {
        quoteDatabase.splice(index, 1);
        updateFilteredQuotes();
      }
    }
    
    // 关闭模态框
    setIsDeleteModalOpen(false);
    setQuoteToDelete(undefined);
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setQuoteToDelete(undefined);
  };
  
  // 更新过滤后的语录列表
  const updateFilteredQuotes = () => {
    let result = quoteDatabase;
    
    // 按类别过滤
    if (filter !== '全部') {
      result = result.filter(quote => quote.category === filter);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(quote => 
        quote.quote.toLowerCase().includes(term) || 
        quote.author.toLowerCase().includes(term) ||
        (quote.source && quote.source.toLowerCase().includes(term))
      );
    }
    
    setFilteredQuotes([...result]);
  };
  
  // 导入语录功能
  const handleImportQuotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedQuotes = JSON.parse(e.target?.result as string) as Quote[];
        
        // 验证导入的数据
        if (!Array.isArray(importedQuotes)) {
          alert('导入失败：无效的数据格式');
          return;
        }
        
        // 确保每个语录都有ID
        importedQuotes.forEach(quote => {
          if (!quote.id) {
            quote.id = generateUniqueId();
          }
        });
        
        // 添加到数据库（避免重复）
        let addedCount = 0;
        importedQuotes.forEach(importedQuote => {
          const exists = quoteDatabase.some(q => q.id === importedQuote.id || 
            (q.quote === importedQuote.quote && q.author === importedQuote.author));
          
          if (!exists) {
            quoteDatabase.push(importedQuote);
            addedCount++;
          }
        });
        
        // 更新UI
        updateFilteredQuotes();
        
        // 提示用户
        alert(`导入成功！已添加 ${addedCount} 条语录，忽略了 ${importedQuotes.length - addedCount} 条重复语录。`);
      } catch (error) {
        alert('导入失败：文件格式错误');
        console.error(error);
      }
    };
    
    reader.readAsText(file);
    
    // 重置文件输入
    event.target.value = '';
  };
  
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/60 to-blue-100/40 dark:from-blue-950/10 dark:to-blue-900/5 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <BackgroundDecorations />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* 标题和太极图标 */}
          <div className="text-center mb-12">
            <YinYangLogo size={160} className="mx-auto" />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">东方智慧语录库</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-kai">
                探索中国古代哲人的智慧箴言，感受千年文化的深邃思想
              </p>
            </motion.div>
          </div>
          
          {/* 过滤器和搜索区 */}
          <SimpleCard className="mb-8 backdrop-blur-md relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-auto flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filter === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="w-full md:w-64 relative">
                <input
                  type="text"
                  placeholder="搜索语录或作者..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </SimpleCard>
          
          {/* 操作按钮区 */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <button
              onClick={() => {
                if (quoteToEdit) {
                  setQuoteToEdit(undefined);
                }
                setShowAddForm(!showAddForm);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {showAddForm ? '取消添加' : '添加语录'}
            </button>
            <ExportQuotesButton quotes={filteredQuotes} />
            
            {/* 导入按钮 */}
            <div className="relative">
              <input
                type="file"
                id="import-quotes"
                accept=".json"
                onChange={handleImportQuotes}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
                title="导入语录"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <span>导入</span>
              </button>
            </div>
          </div>
          
          {/* 添加语录表单 */}
          {showAddForm && (
            <SimpleCard className="mb-8 backdrop-blur-md">
              <AddQuote 
                onQuoteAdded={handleQuoteAdded} 
                quoteToEdit={quoteToEdit}
                onCancel={handleCancelEdit}
              />
            </SimpleCard>
          )}
          
          {/* 语录统计信息 */}
          {filteredQuotes.length > 0 && (
            <motion.div 
              className="mb-6 bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/30 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-300 font-kai">
                <span className="font-medium">总计: </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredQuotes.length}</span> 条语录
                {filter !== '全部' && (
                  <span className="ml-2">
                    (分类: <span className="text-blue-600 dark:text-blue-400 font-bold">{filter}</span>)
                  </span>
                )}
                {searchTerm && (
                  <span className="ml-2">
                    (搜索: <span className="text-blue-600 dark:text-blue-400 font-bold">"{searchTerm}"</span>)
                  </span>
                )}
              </p>
            </motion.div>
          )}
          
          {/* 语录展示 */}
          {filteredQuotes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredQuotes.map((quote, index) => (
                <motion.div 
                  key={quote.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <QuoteCard 
                    quote={quote} 
                    editable={true}
                    onDelete={handleDeleteClick}
                    onEdit={handleEditClick}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-kai">
              没有找到符合条件的语录
            </div>
          )}
          
          {/* 页脚信息 */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-kai">
              收录古代智慧语录，传承中华文化精髓
            </p>
          </div>
        </div>
      </div>
      
      {/* 确认删除模态框 */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        quoteToDelete={quoteToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default QuoteGallery; 