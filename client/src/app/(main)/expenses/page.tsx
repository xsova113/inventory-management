"use client";

import { useGetExpensesByCategoryQuery } from "@/app/lib/state/api";
import Header from "@/components/Header";
import { useAppSelector } from "@/providers/StoreProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

export default function ExpensesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  function parseDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
          };
          acc[data.category].color =
            `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          acc[data.category].amount += amount;
        }

        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 bg-gray-100 py-2 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of your expenses over time.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="w-full rounded-lg bg-white p-6 shadow md:w-1/3">
          <h3 className="mb-4 text-lg font-semibold">
            Filter by Category and Date
          </h3>

          <div className="space-y-4">
            {/* category */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                defaultValue={"All"}
                id="category"
                name="category"
                className={classNames.selectInput}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            <div className="!mt-8 flex flex-col gap-4">
              {/* start date */}
              <DatePicker
                className="!rounded !bg-gray-100"
                sx={{
                  "label.MuiInputLabel-root": {
                    color: isDarkMode ? "gray" : "gray",
                  },
                }}
                label="Start Date"
                slotProps={{ textField: { size: "small" } }}
                name="startDate"
                onChange={(date) =>
                  setStartDate(dayjs(date).format("YYYY-MM-DD"))
                }
              />

              {/* end date */}
              <DatePicker
                sx={{
                  "label.MuiInputLabel-root": {
                    color: isDarkMode ? "gray" : "gray",
                  },
                }}
                className="!rounded !bg-gray-100"
                label="End Date"
                name="endDate"
                onChange={(date) =>
                  setEndDate(dayjs(date).format("YYYY-MM-DD"))
                }
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
          </div>
        </div>

        {/* pie chart */}
        <div className="flex-grow rounded-lg bg-white p-4 shadow md:p-6">
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                dataKey="amount"
                label
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === activeIndex ? "#8884d8" : entry.color}
                    />
                  ),
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
