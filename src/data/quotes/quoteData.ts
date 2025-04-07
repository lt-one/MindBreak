// 语录数据类型
export interface Quote {
  quote: string;
  author: string;
  source?: string;
  category?: string;
  id?: string; // 添加可选的ID字段，用于唯一标识
}

// 生成唯一ID的辅助函数
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

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