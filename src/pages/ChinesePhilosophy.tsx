import React from 'react';
import '../styles/animations.css';
import YinYangLogo from '../components/features/philosophy/YinYangLogo';

// 核心概念组件
const PhilosophyConcept: React.FC<{ title: string; content: string; icon: string }> = ({ title, content, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

// 代表人物组件
const PhilosopherCard: React.FC<{ 
  name: string; 
  years: string; 
  description: string;
  achievements: string[];
  imageUrl: string;
}> = ({ name, years, description, achievements, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="md:flex">
        <div className="md:w-1/3 bg-indigo-50">
          <div className="h-64 md:h-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-40 h-40 rounded-full bg-white shadow-inner flex items-center justify-center overflow-hidden">
              <span className="text-6xl">{imageUrl}</span>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-baseline mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            <span className="ml-2 text-sm text-gray-500">{years}</span>
          </div>
          <p className="text-gray-700 mb-4">{description}</p>
          <h4 className="font-medium text-gray-900 mb-2">主要思想贡献：</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 名言警句组件
const Quote: React.FC<{ text: string; author: string }> = ({ text, author }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl relative">
      <div className="text-5xl text-indigo-300 absolute top-3 left-3 opacity-50">"</div>
      <div className="relative z-10">
        <p className="text-gray-700 text-lg italic mb-4">{text}</p>
        <p className="text-right text-gray-600">— {author}</p>
      </div>
    </div>
  );
};

// 主页面组件
const ChinesePhilosophy: React.FC = () => {
  // 心学核心概念
  const yangmingConcepts = [
    {
      title: "心即理",
      content: "王阳明认为，心中固有的道德本体即是天理，无需外求。心即是理，人的内心本具有明辨是非的能力，这与程朱理学'理在事物之中'的观点不同。",
      icon: "💭"
    },
    {
      title: "知行合一",
      content: "知与行是一体的，真知必然导致实践，知而不行即是不知。真正的知识必定表现在行动中，不付诸行动的知识不是真知。",
      icon: "🚶‍♂️"
    },
    {
      title: "致良知",
      content: "良知是人与生俱来的道德判断能力，能直接明辨善恶。修养工夫在于保持这种良知不被私欲蒙蔽，让它在日常生活中自然发用。",
      icon: "✨"
    },
    {
      title: "万物一体",
      content: "心学强调人与万物本为一体，相互联系。圣人能体认到这一点，因而能推己及人，仁爱天下。",
      icon: "🌍"
    }
  ];

  // 道家核心概念
  const daoismConcepts = [
    {
      title: "道法自然",
      content: "道家强调顺应自然，不妄为。'道'作为宇宙的本原，遵循自然而然的规律，人也应当效法自然，顺应事物的本性。",
      icon: "🌊"
    },
    {
      title: "无为而治",
      content: "治理天下不在于积极干预，而在于减少不必要的干涉，让事物按其本性发展。无为并非什么都不做，而是不妄为、不强为。",
      icon: "☯️"
    },
    {
      title: "守柔去强",
      content: "道家崇尚柔弱的品质，认为柔能克刚。水最柔弱，却能穿石；婴儿最柔弱，却生机盎然。强者必折，柔者长存。",
      icon: "💧"
    },
    {
      title: "清静无欲",
      content: "减少欲望，保持心灵的清净。欲望越多，烦恼越多。真正的自由来自于内心的清净和寡欲。",
      icon: "🧘‍♂️"
    }
  ];

  // 代表人物
  const philosophers = [
    {
      name: "王阳明",
      years: "1472-1529",
      description: "明代哲学家、思想家、军事家、文学家，心学集大成者。他提出`心即理`、`知行合一`、`致良知`等核心思想，对东亚思想产生深远影响。",
      achievements: [
        "创立阳明心学，挑战程朱理学的权威",
        "提出`致良知`修养方法，强调内心良知的重要性",
        "知行合一学说，强调实践的重要性",
        "平定宁王之乱、抚南赣，军政成就卓著"
      ],
      imageUrl: "📚"
    },
    {
      name: "老子",
      years: "约前6世纪",
      description: "道家学派创始人，相传为《道德经》作者。其思想核心在于`道`的概念，以及无为、自然、柔弱的哲学智慧。",
      achievements: [
        "提出`道`的哲学概念，奠定道家思想基础",
        "著《道德经》（又称《老子》），共81章，约5000字",
        "提倡`无为而治`的政治理念",
        "强调`柔弱胜刚强`的处世哲学"
      ],
      imageUrl: "🌠"
    },
    {
      name: "庄子",
      years: "约前369-286",
      description: "战国时期思想家，道家学派代表人物。其思想特点是追求精神自由，超越物质束缚，达到与道合一的境界。",
      achievements: [
        "著《庄子》，内七篇、外篇、杂篇共33篇",
        "提出`逍遥游`的精神境界追求",
        "发展`齐物论`，强调事物的相对性",
        "倡导`心斋坐忘`的修养方法"
      ],
      imageUrl: "🦋"
    }
  ];

  // 经典名言
  const quotes = [
    {
      text: "心外无物，心外无事，心外无理，心外无义。",
      author: "王阳明"
    },
    {
      text: "知是行的主意，行是知的功夫；知是行之始，行是知之成。",
      author: "王阳明"
    },
    {
      text: "道可道，非常道；名可名，非常名。",
      author: "老子"
    },
    {
      text: "上善若水，水善利万物而不争。",
      author: "老子"
    },
    {
      text: "天地与我并生，而万物与我为一。",
      author: "庄子"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white">
      {/* 英雄区域 */}
      <section className="relative py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-100 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-50 to-transparent opacity-60"></div>
          
          {/* 装饰性汉字 */}
          <div className="absolute top-20 right-10 text-9xl font-serif text-indigo-100 opacity-30">道</div>
          <div className="absolute bottom-20 left-10 text-9xl font-serif text-indigo-100 opacity-30">心</div>
          
          {/* 添加更多装饰元素 */}
          <div className="absolute top-1/3 left-10 text-7xl font-serif text-orange-100 opacity-20 rotate-12">德</div>
          <div className="absolute bottom-1/3 right-20 text-7xl font-serif text-blue-100 opacity-20 -rotate-12">静</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mx-auto mb-8 w-32 h-32">
              <YinYangLogo size={128} className="mx-auto animate-breath pause-on-hover" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 float-up">中国传统哲学智慧</h1>
            <p className="text-xl text-gray-700 mb-8 float-up" style={{animationDelay: "0.2s"}}>
              探索王阳明心学与道家思想的精髓，感受东方智慧的永恒魅力
            </p>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mb-8 float-up" style={{animationDelay: "0.3s"}}></div>
          </div>
        </div>
      </section>

      {/* 引言部分 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-in-left">道法自然，心即是理</h2>
                <p className="text-gray-700 leading-relaxed mb-4 slide-in-left" style={{animationDelay: "0.1s"}}>
                  中国传统哲学以其深邃的智慧，为我们提供了理解世界与自我的独特视角。道家思想与王阳明心学，
                  作为东方哲学的两大瑰宝，虽各具特色，却在探索人与自然、心与理的关系上展现出相通之处。
                </p>
                <p className="text-gray-700 leading-relaxed slide-in-left" style={{animationDelay: "0.2s"}}>
                  道家强调"道法自然"，主张无为而治；心学则提出"心即理"，倡导知行合一。
                  它们共同指向一种与自然和谐共处、与内心真诚对话的生活方式，对当代社会仍有重要启示。
                </p>
              </div>
              <div className="md:w-1/2 slide-in-right flex justify-center">
                <YinYangLogo size={240} className="animate-breath pause-on-hover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 王阳明心学 */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">心</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 float-up">王阳明心学</h2>
              <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 mb-6 float-up" style={{animationDelay: "0.1s"}}></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto float-up" style={{animationDelay: "0.2s"}}>
                心学主张"心即理"、"知行合一"、"致良知"，强调内心本具的道德判断能力和实践的重要性
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {yangmingConcepts.map((concept, index) => (
                <div key={concept.title} className="bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <PhilosophyConcept {...concept} />
                </div>
              ))}
            </div>

            <div className="mb-8 slide-in-bottom">
              <PhilosopherCard {...philosophers[0]} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quotes.slice(0, 2).map((quote, index) => (
                <div key={index} className="slide-in-bottom" style={{animationDelay: `${index * 0.1}s`}}>
                  <Quote {...quote} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 道家思想 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">道</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 float-up">道家思想</h2>
              <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 mb-6 float-up" style={{animationDelay: "0.1s"}}></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto float-up" style={{animationDelay: "0.2s"}}>
                道家强调"道法自然"、"无为而治"、"上善若水"，追求人与自然和谐共处的生活智慧
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {daoismConcepts.map((concept, index) => (
                <div key={concept.title} className="bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <PhilosophyConcept {...concept} />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="slide-in-left">
                <PhilosopherCard {...philosophers[1]} />
              </div>
              <div className="slide-in-right">
                <PhilosopherCard {...philosophers[2]} />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {quotes.slice(2).map((quote, index) => (
                <div key={index} className="slide-in-bottom" style={{animationDelay: `${index * 0.1}s`}}>
                  <Quote {...quote} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 现代应用 */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center">
                <YinYangLogo size={80} className="mb-4" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 float-up">现代生活中的应用</h2>
              <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 mb-6 float-up" style={{animationDelay: "0.1s"}}></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto float-up" style={{animationDelay: "0.2s"}}>
                古老的东方智慧如何在当代社会中找到新的表达与应用
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all bounce-in">
                <div className="text-4xl text-indigo-500 mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">心理健康</h3>
                <p className="text-gray-700">心学的"致良知"与道家的"清静无欲"理念，对现代心理健康和压力管理有重要启示，帮助我们保持内心平静。</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all bounce-in" style={{animationDelay: "0.1s"}}>
                <div className="text-4xl text-indigo-500 mb-4">🌱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">环境保护</h3>
                <p className="text-gray-700">道家"万物一体"的生态观念及"道法自然"的理念，为现代环保运动提供了深刻的哲学基础。</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all bounce-in" style={{animationDelay: "0.2s"}}>
                <div className="text-4xl text-indigo-500 mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">领导艺术</h3>
                <p className="text-gray-700">无为而治的管理哲学和知行合一的行动准则，为现代领导力和组织管理提供了独特视角。</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-600 text-white p-8 rounded-xl shadow-md slide-in-bottom">
              <h3 className="text-2xl font-bold mb-4 text-white text-start">将东方智慧融入日常</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-200 mr-2">•</span>
                  <span>每日练习"致良知"，关注自己的内心判断，不被外物所蒙蔽</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-200 mr-2">•</span>
                  <span>在日常生活中实践"知行合一"，让知识转化为实际行动</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-200 mr-2">•</span>
                  <span>学习"道法自然"的处世智慧，顺应事物本性，减少不必要的干预</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-200 mr-2">•</span>
                  <span>体会"守柔去强"的生活艺术，以柔韧的态度面对挑战</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-200 mr-2">•</span>
                  <span>尝试"清静无欲"的心灵修养，减少物质欲望，追求内心平静</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 结语 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <YinYangLogo size={60} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 float-up">心远地自偏，天高云淡</h2>
            <p className="text-lg text-gray-700 mb-8 float-up" style={{animationDelay: "0.1s"}}>
              无论是王阳明心学还是道家思想，都在告诉我们：真正的智慧不在远方，而在于我们自己的内心。
              在这个快节奏的现代社会中，东方哲学的智慧依然能够指引我们找到内心的平静与和谐。
            </p>
            <div className="w-16 h-1 bg-indigo-500 mx-auto float-up" style={{animationDelay: "0.2s"}}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChinesePhilosophy; 