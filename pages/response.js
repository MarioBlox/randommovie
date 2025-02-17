import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, RadarChart, Radar, PolarGrid,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Cell
} from 'recharts';

const ResponsePage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [hoveredCard, setHoveredCard] = useState(null);

  const ratingMap = {
    'น้อยที่สุด': 1,
    'น้อย': 2,
    'ปานกลาง': 3,
    'มาก': 4,
    'มากที่สุด': 5
  };

  const categories = [
    { key: 'convenience', label: 'ความสะดวกในการใช้งาน', icon: '🚀', color: '#FF6B6B' },
    { key: 'clarity', label: 'ข้อมูลชัดเจนครบถ้วน', icon: '📊', color: '#4ECDC4' },
    { key: 'interest', label: 'เนื้อหาน่าสนใจ', icon: '✨', color: '#45B7D1' },
    { key: 'aesthetics', label: 'ความสวยงาม', icon: '🎨', color: '#96CEB4' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://sheets.googleapis.com/v4/spreadsheets/1Q-A-2AGJB7ZXsOiXLl5fqszQTrdHy6Sq6KUBSQIZDM4/values/Form Responses 1?key=AIzaSyBlgVYRDwlcqSoHaIWLC6ASHB--bMl28ns'
        );
        const data = await response.json();
        
        const formattedResponses = data.values.slice(1).map(row => ({
          timestamp: row[0],
          gender: row[1],
          convenience: row[2],
          clarity: row[3],
          interest: row[4],
          aesthetics: row[5],
          feedback: row[6] || ''
        }));
        
        setResponses(formattedResponses);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    const data = categories.map(cat => ({
      subject: cat.label,
      A: getAverageRating(cat.key),
      fullMark: 5,
      color: cat.color
    }));
    return data;
  };

  const getAverageRating = (key) => {
    if (!responses.length) return 0;
    return responses.reduce((acc, curr) => acc + ratingMap[curr[key]], 0) / responses.length;
  };

  const getGenderData = () => {
    const distribution = responses.reduce((acc, curr) => {
      acc[curr.gender] = (acc[curr.gender] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
      color: name === 'ชาย' ? '#7CB9E8' : '#F0A6CA'
    }));
  };

  const getTrendData = () => {
    const dailyData = responses.reduce((acc, curr) => {
      const date = curr.timestamp.split(' ')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          convenience: 0,
          clarity: 0,
          interest: 0,
          aesthetics: 0,
          count: 0
        };
      }
      acc[date].convenience += ratingMap[curr.convenience];
      acc[date].clarity += ratingMap[curr.clarity];
      acc[date].interest += ratingMap[curr.interest];
      acc[date].aesthetics += ratingMap[curr.aesthetics];
      acc[date].count += 1;
      return acc;
    }, {});

    return Object.values(dailyData).map(day => ({
      date: day.date,
      convenience: day.convenience / day.count,
      clarity: day.clarity / day.count,
      interest: day.interest / day.count,
      aesthetics: day.aesthetics / day.count
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin relative w-24 h-24">
            <div className="absolute w-full h-full border-8 border-white border-opacity-20 rounded-full"></div>
            <div className="absolute w-full h-full border-8 border-white border-opacity-80 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-white text-xl font-light">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            📊 แดชบอร์ดการประเมิน
          </h1>
          <p className="text-white/80">อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}</p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center gap-4 mb-12">
          {['overview', 'trends', 'details', 'feedback'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                ${activeSection === section 
                  ? 'bg-white text-purple-900 shadow-lg translate-y-0' 
                  : 'bg-white/10 text-white hover:bg-white/20 translate-y-0 hover:-translate-y-1'}`}
            >
              {section === 'overview' && '📈 ภาพรวม'}
              {section === 'trends' && '📊 แนวโน้ม'}
              {section === 'details' && '🔍 รายละเอียด'}
              {section === 'feedback' && '💬 ความคิดเห็น'}
            </button>
          ))}
        </nav>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-102 transition-all duration-300">
              <h3 className="text-white text-xl font-semibold mb-6">คะแนนความพึงพอใจ</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={getChartData()}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis dataKey="subject" stroke="white" />
                    <PolarRadiusAxis stroke="white" />
                    <Radar
                      name="คะแนน"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-102 transition-all duration-300">
              <h3 className="text-white text-xl font-semibold mb-6">สัดส่วนเพศ</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getGenderData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {getGenderData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Trends Section */}
        {activeSection === 'trends' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-white text-xl font-semibold mb-6">แนวโน้มคะแนน</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Legend />
                  {categories.map(cat => (
                    <Line
                      key={cat.key}
                      type="monotone"
                      dataKey={cat.key}
                      stroke={cat.color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Details Section */}
        {activeSection === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map(cat => (
              <div
                key={cat.key}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-102 transition-all duration-300"
                onMouseEnter={() => setHoveredCard(cat.key)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-xl font-semibold">{cat.icon} {cat.label}</h3>
                  <span className="text-3xl font-bold text-white">
                    {getAverageRating(cat.key).toFixed(2)}
                  </span>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getTrendData()}>
                      <defs>
                        <linearGradient id={`gradient-${cat.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={cat.color} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={cat.color} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey={cat.key}
                        stroke={cat.color}
                        fill={`url(#gradient-${cat.key})`}
                        strokeWidth={hoveredCard === cat.key ? 3 : 2}
                      />
                      <XAxis dataKey="date" stroke="white" />
                      <YAxis stroke="white" />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Section */}
        {activeSection === 'feedback' && (
          <div className="space-y-4">
            {responses
              .filter(r => r.feedback?.trim().length > 0)
              .map((response, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-102 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/80">{response.timestamp}</div>
                    <div className="text-white bg-white/10 px-4 py-1 rounded-full">
                      {response.gender === 'ชาย' ? '👨' : '👩'} {response.gender}
                    </div>
                  </div>
                  <p className="text-white text-lg">{response.feedback}</p>
                </div>
            ))}
          </div>
        )}

        {/* Live Update Indicator */}
        <div className="fixed bottom-4 right-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm">Live Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;