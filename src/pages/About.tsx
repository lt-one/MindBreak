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
                <p className="text-lg text-gray-700 leading-relaxed">
                  我热衷于通过自动化技术提升工作效率，曾通过开发自动化工具将团队效率提升60%。我善于设计智能化的数据处理流程，利用AI大模型提升数据分析效率达65%。持续探索创新方法，推动工作流程优化。
                </p>
              </div>
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