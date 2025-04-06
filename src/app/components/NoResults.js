import React from "react";
import {
  ExclamationCircleIcon,
  InboxIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const themes = {
  default: {
    icon: <ExclamationCircleIcon className="w-8 h-8 text-gray-400 mb-2" />,
    bg: "bg-gray-100",
    text: "text-gray-500",
  },
  search: {
    icon: <MagnifyingGlassIcon className="w-8 h-8 text-blue-400 mb-2" />,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  empty: {
    icon: <InboxIcon className="w-8 h-8 text-red-400 mb-2" />,
    bg: "bg-red-50",
    text: "text-red-600",
  },
};

const NoResults = ({
  content = "No results found.",
  theme = "default",
  className = "",
}) => {
  const selectedTheme = themes[theme] || themes.default;
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-md shadow-sm ${selectedTheme.bg} ${selectedTheme.text} ${className}`}
    >
      {selectedTheme.icon}
      <span className="text-sm font-medium">{content}</span>
    </div>
  );
};

export default NoResults;
