import { useState, useRef, useEffect } from "react";
import countriesData from "../data/phoneCodes.json";

type Country = {
  name: string;
  region: string;
  timezones: Record<string, string>;
  iso: {
    "alpha-2": string;
    "alpha-3": string;
    numeric: string;
  };
  phone: string[];
  emoji: string;
  image: string;
};

type PhoneSelectorProps = {
  value?: string;
  onChange: (value: string) => void;
};

const PhoneSelector = ({ value = "+91", onChange }: PhoneSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = Object.values(countriesData);

  const selectedCountry = countries.find((c) => c.phone[0] === value);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.phone[0].includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={dropdownRef} className="relative w-32 mr-2">
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 border border-gray-400 p-3 rounded-lg mt-1 transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedCountry && (
            <img
              src={selectedCountry.image}
              alt={selectedCountry.name}
              className="w-5 h-4 object-cover"
            />
          )}
          <span className="font-medium">{value}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-72 sm:w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-40">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.iso["alpha-2"]}
                  type="button"
                  onClick={() => handleSelect(country.phone[0])}
                  className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-orange-50 transition-colors text-left ${
                    country.phone[0] === value ? "bg-orange-100" : ""
                  }`}
                >
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-6 h-4 object-cover flex-shrink-0"
                  />
                  <span className="flex-1 truncate text-sm">
                    {country.name}
                  </span>
                  <span className="font-medium text-gray-600 text-sm flex-shrink-0">
                    {country.phone[0]}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSelector;
