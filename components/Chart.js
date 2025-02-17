import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Analytics = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [stats, setStats] = useState({
    today: 0,
    yesterday: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    lastYear: 0,
  });

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Replace with your Umami API credentials
        const WEBSITE_ID = '853575ea-883c-4ef1-bf1b-d9db57e8453a';
        const API_TOKEN = 'api_DhfgMKtJKQC7mnspx4XbFr334nADaMZi';
    
        const response = await fetch(`https://api.umami.is/api/websites/${WEBSITE_ID}/stats`, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
    
        const data = await response.json();

        setStats({
          today: data.pageviews.value,
          yesterday: data.pageviews.change,
          thisWeek: data.uniques.value,
          lastWeek: data.uniques.change,
          thisMonth: data.bounces.value,
          thisYear: data.totaltime.value,
          lastYear: data.totaltime.change,
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchVisitorData();
    const interval = setInterval(fetchVisitorData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Today",
            "Yesterday",
            "This Week",
            "Last Week",
            "This Month",
            "This Year",
            "Last Year",
          ],
          datasets: [
            {
              label: "Views",
              data: [
                stats.today,
                stats.yesterday,
                stats.thisWeek,
                stats.lastWeek,
                stats.thisMonth,
                stats.thisYear,
                stats.lastYear,
              ],
              fill: true,
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              borderColor: "rgb(99, 102, 241)",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 5,
              pointBackgroundColor: "rgb(99, 102, 241)",
              pointBorderColor: "rgb(255, 255, 255)",
            },
          ],
        },
        options: {
          layout: {
            padding: 20,
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "nearest",
          },
          maintainAspectRatio: false,
        },
      });
    }
  }, [stats]);

  return (
    <section className="mt-16 bg-black/20 rounded-3xl p-12 shadow-2xl">
      <h2 className="text-center text-4xl font-bold mb-10 text-white/80">
        Explorer Analytics
      </h2>
      <div className="h-[400px] w-full">
        <canvas
          id="analytics-card-01"
          ref={chartRef}
          width="800"
          height="300"
        ></canvas>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {Object.entries(stats).map(([period, count]) => (
          <div 
            key={period} 
            className="bg-white/10 rounded-3xl p-8 text-center shadow-xl hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <h5 className="text-white/50 font-semibold mb-2 capitalize">
              {period.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </h5>
            <div className="text-[#b667f9] font-bold text-4xl transform transition-transform hover:scale-110">
              {count}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Analytics;