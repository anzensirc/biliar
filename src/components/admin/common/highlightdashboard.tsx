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
import { useGetDashboard } from "@/components/parts/admin/dashboard/api";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";

const filterOptions = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
  "Semua",
];

export default function HighlightDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapping label ke format bulan data dari BE
  const mapBulanFilter = (bulan: string) => {
    switch (bulan) {
      case "Januari":
        return "Jan";
      case "Februari":
        return "Feb";
      case "Maret":
        return "Mar";
      case "April":
        return "Apr";
      case "Mei":
        return "May";
      case "Juni":
        return "Jun";
      case "Juli":
        return "Jul";
      case "Agustus":
        return "Aug";
      case "September":
        return "Sep";
      case "Oktober":
        return "Oct";
      case "November":
        return "Nov";
      case "Desember":
        return "Dec";
      default:
        return undefined; // "Semua"
    }
  };

  // ✅ Ambil data mentah 12 bulan
  const { data, isLoading } = useGetDashboard();
  const allData = data?.data || [];

  // ✅ Filter data di FE
  const mappedBulan = mapBulanFilter(selectedFilter);

  const filteredData =
    selectedFilter === "Semua"
      ? allData
      : allData.filter((item) => item.bulan === mappedBulan);

  // ✅ Total dan chart pakai hasil filter
  const totalBooking = filteredData.reduce(
    (acc, item) => acc + item.totalBooking,
    0
  );
  const totalPendapatan = filteredData.reduce(
    (acc, item) => acc + item.totalPendapatan,
    0
  );
  const totalMeja = filteredData.length > 0 ? filteredData[0].totalMeja : 0;

  const chartData = filteredData.map((item) => ({
    name: item.bulan,
    booking: item.totalBooking,
    revenue: item.totalPendapatan,
  }));

  return (
    <div className="pt-1 pb-4 px-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Dashboard",
          },
        ]}
      />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-black">Dashboard Admin</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-[#0d1b2a] border border-gray-700 rounded-md text-sm font-medium text-white hover:bg-[#1b263b]"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {selectedFilter}
        </button>
      </div>

      {/* ✅ Debug: Cek hasil filter */}
      {/* <pre className="text-xs">{JSON.stringify(filteredData, null, 2)}</pre> */}

      {/* Highlight Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col bg-[#0d1b2a] rounded-xl p-6 shadow-md">
          <div className="mb-2">
            <ShoppingCart className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-white">{totalBooking}</div>
          <div className="text-sm text-gray-400">Total Booking</div>
        </div>

        <div className="flex flex-col bg-[#0d1b2a] rounded-xl p-6 shadow-md">
          <div className="mb-2">
            <DollarSign className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </div>
          <div className="text-sm text-gray-400">Total Pendapatan</div>
        </div>

        <div className="flex flex-col bg-[#0d1b2a] rounded-xl p-6 shadow-md">
          <div className="mb-2">
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-white">{totalMeja}</div>
          <div className="text-sm text-gray-400">Total Meja</div>
        </div>
      </div>

      {/* ✅ Chart pakai hasil filter */}
      <div className="bg-[#0d1b2a] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">
          Pergerakan Booking & Pendapatan
        </h2>

        {chartData.length === 0 ? (
          <div className="text-white">Data tidak tersedia untuk bulan ini.</div>
        ) : (
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
        )}
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
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
                  className={`w-full px-4 py-2 rounded text-left ${
                    selectedFilter === option
                      ? "bg-gray-200 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
