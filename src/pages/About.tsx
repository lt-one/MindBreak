import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  // 技能类别
  const skills = {
    核心技能: ['Python', 'SQL', 'Tableau', 'Excel/PPT'],
    数据分析: ['数据清洗', '数据可视化', '用户行为分析', '市场趋势预测'],
    技术工具: ['Pandas', 'Numpy', 'ETL工具', 'BI报表'],
    开发能力: ['数据库设计', '自动化脚本', '工作流优化', '效能提升']
  };

  // 社交媒体信息
  const socialMedia = [
    {
      name: "GitHub",
      url: "https://github.com/lt-one",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.559 5.482l-2.443 2.396c-2.008 1.972-3.429 3.374-3.429 5.101 0 1.638 1.281 2.774 3.097 2.774.894 0 1.788-.402 2.434-.89l.812 1.337c-.644.521-1.864 1.101-3.278 1.101-2.615 0-4.599-1.802-4.599-4.365 0-2.214 1.708-4.108 4.608-7.003l1.154-1.135v-.037h-5.113v-2.038h8.747v1.764l-1.99 1.995z"/>
        </svg>
      )
    },
    {
      name: "哔哩哔哩",
      url: "https://space.bilibili.com/51125264",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
        </svg>
      )
    },
    {
      name: "微信",
      value: "a190191383",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .165-.054l1.9-1.106a.598.598 0 0 1 .5-.055 9.741 9.741 0 0 0 3.059.478c.079 0 .154-.012.232-.012-.502-.79-.793-1.72-.793-2.713 0-2.799 2.723-5.066 6.075-5.066.115 0 .226.012.34.019C13.737 6.157 11.55 4.03 8.691 4.03c-.176 0-.351.013-.527.025-.824.061-1.366.292-1.366.292-.18.07-.385.069-.553-.037-.168-.105-.289-.29-.313-.499l-.068-.578c-.035-.283.153-.551.424-.63.424-.126 1.259-.345 2.413-.369.182-.004.365-.006.546-.006 4.801 0 8.691 3.288 8.691 7.342 0 2.124-1.071 4.042-2.777 5.368.138.352.312.69.511 1.02 2.033-.589 4.323-2.156 5.095-4.939.055-.198.099-.4.138-.603.855-4.582-3.403-8.708-8.226-9.016a12.056 12.056 0 0 0-.823-.032zm4.827 8.687c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.598 0 1.084.488 1.084 1.09 0 .602-.486 1.09-1.084 1.09zm4.165 0c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.598 0 1.084.488 1.084 1.09 0 .602-.486 1.09-1.084 1.09z"/>
          <path d="M21.155 22.471c.093-.203.146-.421.155-.649l.016-.445a2.06 2.06 0 0 0-1.195-1.936 9.284 9.284 0 0 0-1.847-.609c-1.744 2.975-5.193 4.994-9.136 4.994a11.35 11.35 0 0 1-3.414-.524c-.374.504-.695.838-.695.838-.216.256-.536.351-.84.253s-.527-.395-.527-.722V22.4c-2.061-1.361-3.297-3.402-3.297-5.663 0-4.142 4.026-7.499 8.994-7.499s8.994 3.357 8.994 7.499c0 .58-.078 1.146-.225 1.688 2.32.66 3.586 1.491 3.586 3.256 0 .247-.024.49-.07.727a.52.52 0 0 1-.499.063zm-9.452-3.934c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.599 0 1.084.488 1.084 1.09 0 .602-.485 1.09-1.084 1.09zm-4.507 0c-.598 0-1.084-.488-1.084-1.09 0-.602.486-1.09 1.084-1.09.599 0 1.084.488 1.084 1.09 0 .602-.485 1.09-1.084 1.09z"/>
        </svg>
      )
    },
    {
      name: "手机",
      value: "17520218164",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // 修改SkillIcon组件颜色匹配方法
  const getSkillColor = (name: string) => {
    const colorMap: {[key: string]: string} = {
      'Python': 'bg-blue-100 text-blue-700',
      'SQL': 'bg-green-100 text-green-700',
      'Tableau': 'bg-purple-100 text-purple-700',
      'Excel/PPT': 'bg-pink-100 text-pink-700',
      '数据清洗': 'bg-indigo-100 text-indigo-700',
      '数据可视化': 'bg-yellow-100 text-yellow-700',
      '用户行为分析': 'bg-cyan-100 text-cyan-700',
      '市场趋势预测': 'bg-teal-100 text-teal-700',
      'Pandas': 'bg-blue-100 text-blue-700',
      'Numpy': 'bg-violet-100 text-violet-700',
      'ETL工具': 'bg-orange-100 text-orange-700',
      'BI报表': 'bg-rose-100 text-rose-700',
      '数据库设计': 'bg-emerald-100 text-emerald-700',
      '自动化脚本': 'bg-amber-100 text-amber-700',
      '工作流优化': 'bg-lime-100 text-lime-700',
      '效能提升': 'bg-sky-100 text-sky-700'
    };
    return colorMap[name] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      {/* 页面头部 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">关于我</h1>
            <span className="text-xl text-gray-600">了解</span><span className="text-indigo-600 font-bold text-xl">Leo</span><span className="text-xl text-gray-600">的专业背景、技能和工作经历</span>
          </div>
        </div>
      </section>

      {/* 个人简介 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">个人简介</h2>
            <div className="bg-indigo-50 rounded-xl p-8 shadow-sm">
              <div className="prose prose-indigo max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  我是一名专业的<span className="text-indigo-600 font-medium">数据分析师</span>，拥有<span className="text-indigo-600 font-medium">广东技术师范大学</span>智能科学与技术专业的学术背景和深厚的实践经验。在日常工作中，我能够处理超过5000+条数据，擅长使用Python和SQL进行数据处理与分析。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  在数据可视化方面，我精通使用Excel、PowerPoint和Tableau制作专业的数据报表，已完成100+份产品分析报告，帮助团队更好地理解数据背后的趋势和机会。我相信数据驱动的决策能为企业带来实质性的价值。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  我热衷于通过自动化技术提升工作效率，曾通过开发自动化工具将团队效率提升60%。我善于设计智能化的数据处理流程，利用AI大模型提升数据分析效率达65%。持续探索创新方法，推动工作流程优化。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  非常感谢访问我的个人网站。如果您有任何数据分析、自动化或项目合作的需求，欢迎通过下方的社交媒体或联系页面与我取得联系。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 社交媒体链接 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">关注我</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialMedia.map((social, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center">
                  {social.url ? (
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center hover:text-indigo-600 transition-colors"
                    >
                      <div className="text-gray-700 mb-3">{social.icon}</div>
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 mb-3">{social.icon}</div>
                      <span className="font-medium">{social.name}</span>
                      <span className="text-sm text-gray-500 mt-1">{social.value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 专业技能 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">专业技能</h2>
          <div className="max-w-5xl mx-auto grid gap-8">
            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categorySkills.map(skill => (
                    <div key={skill} className={`rounded-lg p-4 ${getSkillColor(skill)} flex flex-col items-center`}>
                      <span className="text-lg font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作经验 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">工作与项目经验</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3 bg-indigo-50 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">数据分析师</h3>
                  <p className="text-indigo-600 font-medium mb-4">广东数源智汇科技有限公司</p>
                  <p className="text-gray-500 text-sm">2024.07 - 2025.03</p>
                </div>
                <div className="md:w-2/3 p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">华为终端产品舆情监测及分析</h4>
                  <ul className="text-gray-600 space-y-2 list-disc pl-5">
                    <li>监测全网华为品牌相关信息，即时预警潜在风险敏感信息</li>
                    <li>将传播声量数据、存在舆情风险的信息进行汇总分析，总结规律走向及网民发现观点</li>
                    <li>对品牌产品及相关信息的全网声量进行统计分析，输出产品品牌、得出相关产品的市场反馈倾向</li>
                    <li>针对品牌新品及高端产品的网民反馈，输出产品日报、周报、月报，为客户提供客产品全网洞察分析</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h5 className="font-semibold text-indigo-600 mb-2">核心成就</h5>
                    <ul className="text-gray-600 space-y-2 list-disc pl-5">
                      <li>指挥全网监测团队，日均处理品牌相关数据5000+，实现重大情报95%预警响应</li>
                      <li>设计各类定制事件专用prompt提示词，利用AI大模型实现数据智能处理</li>
                      <li>负责输出热门事件汇总3000+份，协助及主导输出产品日报/周报/月报100+份</li>
                      <li>流程优化：建立标准化模板汇总SOP，将热点事件汇总计时间从1小时压缩至30分钟</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3 bg-indigo-50 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">项目负责人</h3>
                  <p className="text-indigo-600 font-medium mb-4">基于脑机接口的注意力灯光控制系统</p>
                  <p className="text-gray-500 text-sm">2024.01 - 2024.05</p>
                </div>
                <div className="md:w-2/3 p-6">
                  <ul className="text-gray-600 space-y-4 list-disc pl-5">
                    <li>设计并开发基于脑机接口的注意力灯光控制系统，通过眼电采集头环实时监控眼电信号变化，实时检测用户注意力水平，根据注意力变化自动调节室内灯光亮度，提升智能家居灯光使用体验</li>
                    <li>开发基于开源硬件系统的手机应用，集成眼电采集头环，实现注意力检测与灯光控制的无缝连接</li>
                    <li>引入舒适度方格法，实现注意力训练功能，为用户提供多维度体验</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3 bg-indigo-50 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">科技站宣传部</h3>
                  <p className="text-indigo-600 font-medium mb-4">校园实践项目</p>
                  <p className="text-gray-500 text-sm">2020.11 - 2021.09</p>
                </div>
                <div className="md:w-2/3 p-6">
                  <ul className="text-gray-600 space-y-3 list-disc pl-5">
                    <li>统筹运营院级新媒体公众号，主导策划15+场科技赛事宣传</li>
                    <li>撰写多维场内容矩阵，原创产出科技赛事推文32篇（最高单篇PV 3000+），设计系列创意海报18套</li>
                    <li>管理4人学生团队，实施AB测试优化制度，使内容产出效率提升60%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">教育背景</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">广东技术师范大学</h3>
                <span className="text-indigo-600 font-medium">2020.09 - 2024.06</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <p className="text-lg text-gray-700">智能科学与技术（本科）</p>
              </div>
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-600 mb-4">主修课程：</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">计算机网络</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">C语言程序设计</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">数据结构</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">操作系统</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">自然语言处理</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">数字图像处理</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">机器学习</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">深度学习</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">大数据</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">数据挖掘</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 兴趣爱好 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">兴趣爱好</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <div className="prose prose-indigo max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                除了数据分析与工作，我还热衷于探索各种领域的知识和体验，丰富自己的人生阅历：
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🏀</span>
                  <span className="text-gray-700"><strong className="text-gray-800">打篮球</strong> — 喜欢篮球运动带来的团队协作感和竞技乐趣，也是我放松身心的重要方式。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">💪</span>
                  <span className="text-gray-700"><strong className="text-gray-800">健身</strong> — 坚持锻炼保持身体健康，享受锻炼过程中的自我挑战与成长。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🎬</span>
                  <span className="text-gray-700"><strong className="text-gray-800">看电影</strong> — 热爱电影艺术，通过不同类型的电影探索不同的人生故事和世界观。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🎮</span>
                  <span className="text-gray-700"><strong className="text-gray-800">游戏</strong> — 曾经痴迷于英雄联盟和云顶之弈，如今更倾向于欣赏职业选手的精彩表现。随着年龄增长，游戏从参与变为了一种欣赏。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🍜</span>
                  <span className="text-gray-700"><strong className="text-gray-800">美食探索</strong> — 对美食充满热情，希望能够品尝中国各地乃至世界各国的特色美食，通过味蕾了解不同的文化。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">📚</span>
                  <span className="text-gray-700"><strong className="text-gray-800">中国哲学</strong> — 对王阳明心学和道家思想特别感兴趣，喜欢通过阅读古典哲学探索生活的智慧。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🏛️</span>
                  <span className="text-gray-700"><strong className="text-gray-800">历史探索</strong> — 喜欢了解历史，从过去的事件中汲取经验和智慧，思考人类文明的演进。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">💻</span>
                  <span className="text-gray-700"><strong className="text-gray-800">编程学习</strong> — 持续学习编程知识和新技术，享受用代码创造解决方案的过程。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">🔭</span>
                  <span className="text-gray-700"><strong className="text-gray-800">科技关注</strong> — 热衷于了解最新的科技发展，尤其是人工智能和未来科技领域的突破。</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">✈️</span>
                  <span className="text-gray-700"><strong className="text-gray-800">旅行冒险</strong> — 渴望探索世界各地，登上雪山，潜入海底，甚至到达南极，体验地球的壮丽与多样。</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                这些兴趣不仅丰富了我的生活，也为我的工作提供了多元的视角和创意灵感。我相信，广泛的兴趣爱好和持续的探索精神，能够让我在技术和生活中不断成长。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页面底部按钮 */}
      <div className="container mx-auto px-4 py-8 flex gap-4 justify-center">
        <Link to="/resume" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md">
          查看完整简历
        </Link>
        <Link to="/contact" className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition">
          联系我
        </Link>
      </div>
    </>
  );
};

export default About; 