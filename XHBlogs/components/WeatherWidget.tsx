// components/WeatherWidget.tsx
"use client";

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning, Loader2, CloudFog, CloudDrizzle } from 'lucide-react';

// WMO Weather interpretation codes -> 中文描述
function getWeatherText(code: number): string {
  if (code === 0) return '晴';
  if (code === 1) return '大致晴朗';
  if (code === 2) return '多云';
  if (code === 3) return '阴';
  if (code === 45 || code === 48) return '雾';
  if (code >= 51 && code <= 57) return '毛毛雨';
  if (code >= 61 && code <= 67) return '雨';
  if (code >= 71 && code <= 77) return '雪';
  if (code >= 80 && code <= 82) return '阵雨';
  if (code >= 85 && code <= 86) return '阵雪';
  if (code === 95) return '雷雨';
  if (code >= 96 && code <= 99) return '雷雨冰雹';
  return '未知';
}

function getWeatherIcon(code: number) {
  if (code === 0) return <Sun className="text-amber-400" size={38} />;
  if (code === 1 || code === 2 || code === 3) return <Cloud className="text-slate-300" size={38} />;
  if (code === 45 || code === 48) return <CloudFog className="text-slate-300" size={38} />;
  if (code >= 51 && code <= 67) return <CloudRain className="text-blue-400" size={38} />;
  if (code >= 71 && code <= 77) return <Snowflake className="text-indigo-200" size={38} />;
  if (code >= 80 && code <= 86) return <CloudDrizzle className="text-blue-400" size={38} />;
  if (code >= 95) return <CloudLightning className="text-amber-400" size={38} />;
  return <Cloud className="text-slate-400" size={38} />;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ city: string; temp: number; text: string; code: number; isMock: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // 反向地理编码：免费、无需 key、支持 CORS
        let city = '';
        try {
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=zh`);
          const geo = await geoRes.json();
          city = geo.city || geo.locality || geo.principalSubdivision || '';
        } catch (e) { /* 城市名获取失败不阻塞 */ }

        // Open-Meteo：免费、无需 key、支持 CORS
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FShanghai`);
        const data = await res.json();
        const current = data?.current;
        if (current && typeof current.temperature_2m === 'number') {
          setWeather({
            city: city || '当前城市',
            temp: Math.round(current.temperature_2m),
            text: getWeatherText(current.weather_code),
            code: current.weather_code,
            isMock: false,
          });
        } else {
          throw new Error('No weather data');
        }
      } catch (err) {
        // 兜底：赛博模拟模式
        setWeather({ city: '气候模拟', temp: 22, text: '气候模拟', code: 2, isMock: true });
      } finally {
        setLoading(false);
      }
    };

    // 尝试浏览器定位；失败则回退到默认坐标（合肥）
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(31.94462, 117.33883),
        { timeout: 8000, maximumAge: 600000 }
      );
    } else {
      fetchWeather(31.94462, 117.33883);
    }
  }, []);

  return (
    <div className="w-full h-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col justify-center transition-all duration-700 hover:scale-[1.02] group relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 w-32 h-32 blur-3xl rounded-full transition-colors duration-700 ${weather?.isMock ? 'bg-amber-500/20 group-hover:bg-amber-500/40' : 'bg-indigo-500/20 group-hover:bg-indigo-500/40'}`}></div>
      {loading ? (
         <div className="flex flex-col items-center gap-3 text-slate-500 w-full justify-center relative z-10">
           <Loader2 className="animate-spin text-indigo-400" size={28} />
           <span className="text-[10px] font-black tracking-widest uppercase">同步气象云...</span>
         </div>
      ) : weather && (
        <div className="flex items-center justify-between relative z-10 w-full">
          <div className="flex flex-col flex-1 pr-2">
            <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${weather.isMock ? 'text-amber-500' : 'text-indigo-500 dark:text-indigo-400'}`}>
              {weather.isMock ? 'SIMULATED' : 'LIVE WEATHER'}
            </span>
            <span className="text-base font-bold text-slate-800 dark:text-white line-clamp-1">{weather.city}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">{weather.temp}°</span>
              <span className="text-xs font-bold text-slate-500">{weather.text}</span>
            </div>
          </div>
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
            {getWeatherIcon(weather.code)}
          </div>
        </div>
      )}
    </div>
  );
}
