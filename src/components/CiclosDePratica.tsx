import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GIROS_DATA } from '../data/girosData';
import { Activity, Calendar, Clock, Flame, Award, BarChart2 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type TimeFrame = '7d' | '30d' | 'giros';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  unitLabel?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f172a]/95 border border-[#c5a059]/60 rounded-lg p-3 shadow-2xl text-xs space-y-1 font-sans backdrop-blur-md">
        <p className="font-serif font-bold text-[#f3e3a2] text-sm border-b border-[#c5a059]/30 pb-1">
          {label}
        </p>
        <div className="flex items-center justify-between gap-4 text-neutral-200 pt-1">
          <span className="flex items-center gap-1 text-amber-300">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Tempo Praticado:</span>
          </span>
          <strong className="text-white font-mono">{data.minutos} min</strong>
        </div>
        <div className="flex items-center justify-between gap-4 text-neutral-200">
          <span className="flex items-center gap-1 text-amber-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sessões / Práticas:</span>
          </span>
          <strong className="text-white font-mono">{data.sessoes}</strong>
        </div>
      </div>
    );
  }
  return null;
};

export const CiclosDePratica: React.FC = () => {
  const { practiceLogs, completedPractices } = useApp();
  const [timeframe, setTimeframe] = useState<TimeFrame>('7d');
  const [metric, setMetric] = useState<'minutos' | 'sessoes'>('minutos');

  // Compute aggregated data for 7 days, 30 days, or by Giro
  const { chartData, totalMinutes, totalSessions, currentStreak, avgMinutesPerDay } = useMemo(() => {
    const now = new Date();

    if (timeframe === 'giros') {
      // Aggregate by Giro I to X
      const giroMap: Record<number, { minutos: number; sessoes: number }> = {};
      for (let i = 1; i <= 10; i++) {
        giroMap[i] = { minutos: 0, sessoes: 0 };
      }

      practiceLogs.forEach((log) => {
        const gId = log.giroId || 1;
        if (giroMap[gId]) {
          giroMap[gId].minutos += log.durationMinutes || 5;
          giroMap[gId].sessoes += 1;
        }
      });

      const data = GIROS_DATA.map((giro) => {
        const stats = giroMap[giro.id] || { minutos: 0, sessoes: 0 };
        return {
          label: giro.numberRoman,
          fullLabel: `${giro.numberRoman} - ${giro.title}`,
          minutos: stats.minutos,
          sessoes: stats.sessoes
        };
      });

      const totMin = practiceLogs.reduce((acc, l) => acc + (l.durationMinutes || 5), 0);
      const totSess = practiceLogs.length;

      return {
        chartData: data,
        totalMinutes: totMin,
        totalSessions: totSess,
        currentStreak: calculateStreak(practiceLogs),
        avgMinutesPerDay: totSess > 0 ? Math.round(totMin / Math.max(1, totSess)) : 0
      };
    }

    // Days calculation (7d or 30d)
    const numDays = timeframe === '7d' ? 7 : 30;
    const daysArray: { dateStr: string; label: string; minutos: number; sessoes: number; rawDate: Date }[] = [];

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      
      let label = '';
      if (numDays === 7) {
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        label = daysOfWeek[d.getDay()];
      } else {
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        label = `${d.getDate()} ${months[d.getMonth()]}`;
      }

      daysArray.push({
        dateStr,
        label,
        minutos: 0,
        sessoes: 0,
        rawDate: d
      });
    }

    // Fill with actual logs
    let totMin = 0;
    let totSess = 0;

    practiceLogs.forEach((log) => {
      if (!log.completedAt) return;
      const logDateStr = log.completedAt.split('T')[0];
      const foundDay = daysArray.find((item) => item.dateStr === logDateStr);
      if (foundDay) {
        const mins = log.durationMinutes || 5;
        foundDay.minutos += mins;
        foundDay.sessoes += 1;
        totMin += mins;
        totSess += 1;
      }
    });

    const streak = calculateStreak(practiceLogs);
    const activeDaysCount = daysArray.filter((d) => d.sessoes > 0).length;

    return {
      chartData: daysArray,
      totalMinutes: totMin,
      totalSessions: totSess,
      currentStreak: streak,
      avgMinutesPerDay: activeDaysCount > 0 ? Math.round(totMin / activeDaysCount) : 0
    };
  }, [practiceLogs, timeframe]);

  // Helper function to calculate active daily streak
  function calculateStreak(logs: typeof practiceLogs): number {
    if (!logs || logs.length === 0) return 0;
    
    const rawDates = logs
      .map((l) => (l.completedAt ? l.completedAt.split('T')[0] : ''))
      .filter((d): d is string => Boolean(d));
    const uniqueDates: string[] = Array.from(new Set<string>(rawDates)).sort().reverse();

    if (uniqueDates.length === 0) return 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if the latest log was today or yesterday
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
      return 0; // streak broken
    }

    let streak = 0;
    let checkDate = new Date(uniqueDates[0]);

    for (const dateStr of uniqueDates) {
      const current = new Date(dateStr as string);
      const diffTime = Math.abs(checkDate.getTime() - current.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        streak++;
        checkDate = current;
      } else {
        break;
      }
    }

    return streak;
  }

  return (
    <div className="bg-[#0b0f19] border border-[#c5a059]/30 rounded-xl p-4 sm:p-6 space-y-5 shadow-xl relative overflow-hidden">
      {/* Decorative gradient highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#c5a059]/20 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#f3e3a2]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#f3e3a2] tracking-wide">
              Ciclos de Prática
            </h3>
          </div>
          <p className="text-xs text-neutral-400">
            Frequência contemplativa e tempo de meditação ao longo dos giros.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#121826] border border-neutral-800 rounded-lg p-0.5 text-xs">
            {(['7d', '30d', 'giros'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  timeframe === tf
                    ? 'bg-[#c5a059] text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tf === '7d' ? '7 Dias' : tf === '30d' ? '30 Dias' : 'Por Giro'}
              </button>
            ))}
          </div>

          {/* Metric Selector Toggle */}
          <div className="flex items-center bg-[#121826] border border-neutral-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setMetric('minutos')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                metric === 'minutos'
                  ? 'bg-amber-900/60 text-[#f3e3a2] border border-[#c5a059]/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Minutos
            </button>
            <button
              onClick={() => setMetric('sessoes')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                metric === 'sessoes'
                  ? 'bg-amber-900/60 text-[#f3e3a2] border border-[#c5a059]/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Sessões
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#07090e] border border-[#c5a059]/20 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Tempo No Ciclo</span>
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-white">
            {totalMinutes} <span className="text-xs font-sans text-[#c5a059] font-normal">min</span>
          </p>
        </div>

        <div className="p-3 bg-[#07090e] border border-[#c5a059]/20 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Práticas Concluídas</span>
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-white">
            {completedPractices.length} <span className="text-xs font-sans text-emerald-400 font-normal">totais</span>
          </p>
        </div>

        <div className="p-3 bg-[#07090e] border border-[#c5a059]/20 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Sequência Ativa</span>
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-[#f3e3a2]">
            {currentStreak} <span className="text-xs font-sans text-neutral-400 font-normal">{currentStreak === 1 ? 'dia' : 'dias'}</span>
          </p>
        </div>

        <div className="p-3 bg-[#07090e] border border-[#c5a059]/20 rounded-lg space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Média por Sessão</span>
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-white">
            {avgMinutesPerDay} <span className="text-xs font-sans text-purple-300 font-normal">min</span>
          </p>
        </div>
      </div>

      {/* Main Visual Recharts Chart */}
      <div className="w-full h-56 sm:h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {timeframe === 'giros' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGiroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3e3a2" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#c5a059" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={{ stroke: '#334155' }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={metric}
                fill="url(#barGiroGrad)"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c5a059" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#c5a059" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={{ stroke: '#334155' }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#f3e3a2"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#areaGrad)"
                activeDot={{ r: 5, fill: '#f3e3a2', stroke: '#c5a059', strokeWidth: 2 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {practiceLogs.length === 0 && (
        <p className="text-[11px] text-neutral-400 text-center italic pt-1 font-serif">
          Suas sessões concluídas aparecerão aqui automaticamente conforme você praticar.
        </p>
      )}
    </div>
  );
};
