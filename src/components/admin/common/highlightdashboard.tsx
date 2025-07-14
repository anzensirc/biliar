"use client";

import {
  ArrowUpRight,
  Target,
  ShoppingCart,
  DollarSign,
  Calendar,
  X,
} from "lucide-react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";

// Dummy stats
const stats = [
  {
    title: "Total Booking",
    value: "300",
    icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    change: "+0.43%",
    changeColor: "text-green-500",
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
  {
    title: "Total Profit",
    value: "Rp 420.000.000,00",
    icon: <DollarSign className="w-6 h-6 text-orange-400" />,
    change: "+3249,19%",
    changeColor: "text-green-500",
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
  {
    title: "Total Meja",
    value: "4",
    icon: <Target className="w-6 h-6 text-purple-500" />,
    change: "+0%",
    changeColor: "text-green-500",
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
];

// Dummy chart data
const chartData = [
  { name: "Jan", booking: 30, revenue: 40000000 },
  { name: "Feb", booking: 45, revenue: 55000000 },
  { name: "Mar", booking: 60, revenue: 80000000 },
  { name: "Apr", booking: 50, revenue: 75000000 },
  { name: "May", booking: 70, revenue: 100000000 },
  { name: "Jun", booking: 80, revenue: 120000000 },
  { name: "Jul", booking: 90, revenue: 140000000 },
];

const filterOptions = [
  "3 Hari Terakhir",
  "7 Hari Terakhir",
  "2 Minggu Terakhir",
  "1 Bulan Terakhir",
  "1 Tahun Terakhir",
  "All Time",
  "Custom Range",
];

export default function HighlightDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("7 Hari Terakhir");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-1 pb-4 px-4">
      {/* Filter trigger */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-[#0d1b2a] border border-gray-700 rounded-md text-sm font-medium text-white hover:bg-[#1b263b]"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {selectedFilter}
        </button>
      </div>

      {/* Bar highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-between bg-[#0d1b2a] rounded-xl p-6 shadow-md"
          >
            <div className="mb-4">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.title}</div>
            <div className="flex items-center mt-2">
              <span className={`${stat.changeColor} text-xs mr-1`}>
                {stat.change}
              </span>
              {stat.arrow}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#0d1b2a] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">
          Pergerakan Booking & Pendapatan
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis yAxisId="left" stroke="#22c55e" />
            <YAxis yAxisId="right" orientation="right" stroke="#facc15" />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="booking"
              stroke="#22c55e"
              strokeWidth={2}
              name="Booking"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#facc15"
              strokeWidth={2}
              name="Pendapatan"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4">Pilih Rentang Waktu</h2>

            <div className="flex flex-col gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    setIsModalOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded hover:bg-gray-100 text-left"
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedFilter === "Custom Range" && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Date range picker placeholder
                </p>
                {/* Bisa diisi react-datepicker nanti */}
                <div className="p-4 border rounded bg-gray-50 text-center text-gray-500">
                  [Date Range Picker Here]
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
