import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GlobalAnalytics = () => {
  const [stats, setStats] = useState({
    today: 0,
    total: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // สร้าง keys สำหรับแต่ละช่วงเวลา
        const namespace = 'random_m0v1e';
        const today = new Date().toISOString().split('T')[0];
        const month = new Date().toISOString().slice(0, 7);

        // ดึงข้อมูลแบบ parallel
        const [totalRes, todayRes, monthRes] = await Promise.all([
          fetch(`https://api.countapi.xyz/hit/${namespace}/total`),
          fetch(`https://api.countapi.xyz/hit/${namespace}/${today}`),
          fetch(`https://api.countapi.xyz/hit/${namespace}/${month}`)
        ]);

        const [totalData, todayData, monthData] = await Promise.all([
          totalRes.json(),
          todayRes.json(),
          monthRes.json()
        ]);

        setStats({
          today: todayData.value || 0,
          total: totalData.value || 0,
          thisMonth: monthData.value || 0
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // อัพเดททุก 5 นาที
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-16 bg-black/20 rounded-3xl p-12 shadow-2xl text-center">
        <div className="animate-spin relative w-16 h-16 mx-auto mb-4">
          <div className="absolute w-full h-full border-4 border-white border-opacity-20 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <section className="mt-16 bg-black/20 rounded-3xl p-12 shadow-2xl">
      <h2 className="text-center text-4xl font-bold mb-10 text-white/80">
        Explorer Analytics
        <span className="ml-2 text-sm font-normal bg-green-500/20 px-3 py-1 rounded-full">Live</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Visitors */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white/60 text-lg mb-3">ผู้เข้าชมทั้งหมด</h3>
          <div className="text-5xl font-bold text-purple-500">
            {stats.total.toLocaleString()}
          </div>
          <div className="mt-2 text-white/40">ตั้งแต่เริ่มเว็บไซต์</div>
        </div>

        {/* Today's Visitors */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white/60 text-lg mb-3">ผู้เข้าชมวันนี้</h3>
          <div className="text-5xl font-bold text-blue-500">
            {stats.today.toLocaleString()}
          </div>
          <div className="mt-2 text-white/40">อัพเดทแบบเรียลไทม์</div>
        </div>

        {/* Monthly Visitors */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <h3 className="text-white/60 text-lg mb-3">ผู้เข้าชมเดือนนี้</h3>
          <div className="text-5xl font-bold text-green-500">
            {stats.thisMonth.toLocaleString()}
          </div>
          <div className="mt-2 text-white/40">เดือนปัจจุบัน</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-10 bg-white/5 rounded-2xl p-6 backdrop-blur-lg">
        <h3 className="text-white text-xl font-semibold mb-4">สถิติเพิ่มเติม</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-white/60 mb-2">เฉลี่ยต่อวัน (เดือนนี้)</div>
            <div className="text-2xl font-bold text-blue-400">
              {(stats.thisMonth / new Date().getDate()).toFixed(1)}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-white/60 mb-2">อัตราส่วนต่อยอดรวม</div>
            <div className="text-2xl font-bold text-purple-400">
              {((stats.today / stats.total) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm">อัพเดทล่าสุด: {new Date().toLocaleTimeString('th-TH')}</span>
        </div>
      </div>
    </section>
  );
};

export default GlobalAnalytics;