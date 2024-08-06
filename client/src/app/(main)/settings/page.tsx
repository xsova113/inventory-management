"use client";

import Header from "@/components/Header";
import { Switch } from "@mui/material";
import { useState } from "react";

type UserSettings = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSettings[] = [
  {
    label: "Username",
    value: "George Change",
    type: "text",
  },
  {
    label: "Email",
    value: "george.change@example.com",
    type: "text",
  },
  {
    label: "Notifications",
    value: true,
    type: "toggle",
  },
  {
    label: "Dark Mode",
    value: false,
    type: "toggle",
  },
  {
    label: "Language",
    value: "English",
    type: "text",
  },
];

export default function SettingsPage() {
  const [userSettings, setUserSettings] =
    useState<UserSettings[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const newSettings = [...userSettings];
    newSettings[index].value = !newSettings[index].value as boolean;
    setUserSettings(newSettings);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="mt-5 overflow-x-auto shadow-md">
        <table className="min-w-full rounded-lg bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Settings
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Value
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {userSettings.map((setting, index) => (
              <tr key={index} className="transition-colors hover:bg-blue-50">
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {setting.label}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {setting.type === "toggle" ? (
                    <Switch
                      checked={setting.value as boolean}
                      onChange={() => handleToggleChange(index)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={setting.value as string}
                      className="rounded-lg border px-4 py-3 text-gray-500 focus:border-blue-500 focus:outline-none"
                      onChange={(e) => {
                        const newSettings = [...userSettings];
                        newSettings[index].value = e.target.value;
                        setUserSettings(newSettings);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
