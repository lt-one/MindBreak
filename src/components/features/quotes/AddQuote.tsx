import React, { useState } from 'react';
import { Quote, quoteDatabase } from './QuoteGallery';

// 生成唯一ID
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

interface AddQuoteProps {
  onQuoteAdded?: (quote: Quote) => void;
  quoteToEdit?: Quote; // 添加编辑模式支持
  onCancel?: () => void; // 取消编辑回调
}

const AddQuote: React.FC<AddQuoteProps> = ({ onQuoteAdded, quoteToEdit, onCancel }) => {
  const [newQuote, setNewQuote] = useState<Quote>(
    quoteToEdit || {
      quote: '',
      author: '',
      source: '',
      category: '',
      id: generateUniqueId() // 生成新ID
    }
  );
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const categories = ['心学', '道家', '儒家', '文学', '哲学', '其他'];
  const isEditMode = Boolean(quoteToEdit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewQuote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!newQuote.quote.trim() || !newQuote.author.trim()) {
      setError('语录内容和作者为必填项');
      return;
    }
    
    // 添加到语录库
    const quoteToAdd = {
      ...newQuote,
      quote: newQuote.quote.trim(),
      author: newQuote.author.trim(),
      source: newQuote.source?.trim() || undefined,
      category: newQuote.category || undefined,
      id: newQuote.id || generateUniqueId() // 确保有ID
    };
    
    if (isEditMode) {
      // 编辑模式：更新现有语录
      const index = quoteDatabase.findIndex(q => q.id === quoteToAdd.id);
      if (index !== -1) {
        quoteDatabase[index] = quoteToAdd;
      }
    } else {
      // 添加模式：将新语录添加到数据库
      quoteDatabase.push(quoteToAdd);
    }
    
    // 调用回调函数（如果提供）
    if (onQuoteAdded) {
      onQuoteAdded(quoteToAdd);
    }
    
    if (isEditMode && onCancel) {
      // 编辑模式：显示成功后关闭表单
      setSuccess('语录已成功更新！');
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      // 添加模式：重置表单
      setNewQuote({
        quote: '',
        author: '',
        source: '',
        category: '',
        id: generateUniqueId() // 生成新ID
      });
      
      // 显示成功消息
      setSuccess('语录已成功添加！');
      setError('');
      
      // 3秒后清除成功消息
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const Divider = () => (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="relative">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {isEditMode ? '编辑语录' : '添加新语录'}
        </h3>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 border border-red-200">
            <div className="flex">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 border border-green-200">
            <div className="flex">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quote" className="block text-gray-700 dark:text-gray-300 mb-2 font-kai">
              语录内容 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="quote"
                name="quote"
                value={newQuote.quote}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-kai"
                placeholder="请输入语录内容..."
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 dark:text-gray-300 mb-2 font-kai">
              作者 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="author"
                name="author"
                value={newQuote.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-kai"
                placeholder="请输入作者姓名..."
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="source" className="block text-gray-700 dark:text-gray-300 mb-2 font-kai">
              出处
            </label>
            <div className="relative">
              <input
                type="text"
                id="source"
                name="source"
                value={newQuote.source}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-kai"
                placeholder="例如：《传习录》"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 mb-2 font-kai">
              分类
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={newQuote.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-kai appearance-none"
              >
                <option value="">-- 选择分类 --</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <Divider />
          
          <div className="flex gap-3 justify-end">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
            )}
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditMode ? '保存修改' : '添加语录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuote; 