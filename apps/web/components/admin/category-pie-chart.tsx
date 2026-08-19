'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface CategoryPieChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ['#e30019', '#f26522', '#3b82f6', '#10b981', '#a855f7', '#eab308']

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return <div className="text-center text-neutral-400 py-12 text-sm">Chưa có dữ liệu</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}