import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee } from "lucide-react";

const FilterBuyedCar = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    km: "",
    price: "",
  });

  // React Query Fetch Function
  const fetchCarData = async () => {
    const res = await fetch("/LoanFormsData/AutoBuyData.json");
    const result = await res.json();
    return result[0]; // returning final data
  };

  // Use React Query
  const { data: carData, isLoading } = useQuery({
    queryKey: ["carData"],
    queryFn: fetchCarData,

    // cache enabled (default)
    staleTime: Infinity, // never refetch unless reload
    cacheTime: Infinity,
  });

  // Once api loads → set all cars
  useEffect(() => {
    if (carData) {
      setFilteredCars(carData.cars);
    }
  }, [carData]);

  // Handle Change
  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };

    if (key === "brand") {
      updated.model = "";
    }

    setFilters(updated);
    applyFilters(updated);
  };

  // Filter Logic
  const applyFilters = (obj) => {
    setLoading(true);

    setTimeout(() => {
      const filtered = carData?.cars.filter((car) => {
        return (
          (!obj.brand || car.brand === obj.brand) &&
          (!obj.model || car.model === obj.model) &&
          (!obj.year || car.year === Number(obj.year)) &&
          (!obj.fuel || car.fuel === obj.fuel) &&
          (!obj.km ||
            Number(car.km.replace(/[^0-9]/g, "")) <= Number(obj.km)) &&
          (!obj.price ||
            Number(car.price.replace(/[^0-9]/g, "")) <= Number(obj.price))
        );
      });

      setFilteredCars(filtered ?? []);
      setLoading(false);
    }, 300);
  };

  const selectedBrand = carData?.brands?.find((b) => b.name === filters.brand);
  const availableModels = selectedBrand?.models || [];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row p-2">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-full lg:w-80 bg-gray-100 p-4 rounded-md space-y-4 shadow">
        <h2 className="text-gray-900 font-bold text-[14px]">Price Range</h2>

        {/* Brand Dropdown */}
        <select
          value={filters.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="w-full cursor-pointer border  p-2 rounded"
        >
          <option value="" className="cursor-pointer">
            Select Brand
          </option>
          {carData?.brands?.map((b) => (
            <option key={b.name} value={b.name} className="cursor-pointer">
              {b.name}
            </option>
          ))}
        </select>

        {/* Model Dropdown */}
        <select
          value={filters.model}
          disabled={!filters.brand}
          onChange={(e) => handleChange("model", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Model</option>
          {availableModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Year Radio */}
        <div className="text-[14px] cursor-pointer">
          <p className="font-semibold text-gray-950 text-[15px]">Year</p>
          {[2024, 2023, 2022, 2021, 2020].map((yr) => (
            <label
              key={yr}
              className="flex items-center gap-3 my-2 cursor-pointer"
            >
              <input
                type="radio"
                name="year"
                value={yr}
                checked={filters.year == yr}
                className="cursor-pointer accent-green-600 transform scale-135 "
                onChange={(e) => handleChange("year", e.target.value)}
              />
              {yr}
            </label>
          ))}
        </div>

        {/* Fuel Radio */}
        <div className="text-[14px] cursor-pointer mt-5">
          <p className="font-semibold text-gray-950 text-[15px]">Fuel Type</p>
          {["Petrol", "Diesel", "Electric"].map((f) => (
            <label
              key={f}
              className="flex items-center gap-5 my-2 cursor-pointer"
            >
              <input
                type="radio"
                name="fuel"
                value={f}
                checked={filters.fuel == f}
                className="cursor-pointer accent-green-600 transform scale-135 "
                onChange={(e) => handleChange("fuel", e.target.value)}
              />
              {f}
            </label>
          ))}
        </div>

        {/* KM Radio */}
        <div className="text-[14px] cursor-pointer mt-5">
          <p className="font-semibold text-gray-950 text-[15px]">KM Driven</p>
          {[20000, 40000, 60000].map((km) => (
            <label
              key={km}
              className="flex items-center gap-3 my-2 cursor-pointer"
            >
              <input
                type="radio"
                name="km"
                value={km}
                checked={filters.km == km}
                className="cursor-pointer accent-green-600 transform scale-135"
                onChange={(e) => handleChange("km", e.target.value)}
              />
              Under {km.toLocaleString()} KM
            </label>
          ))}
        </div>

        {/* Price Radio */}
        <div className="text-[14px] cursor-pointer mt-8">
          <p className="font-semibold text-gray-950 text-[15px]">Price</p>
          {[600000, 800000, 1000000].map((p) => (
            <label
              key={p}
              className="flex items-center gap-3 my-2 cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                value={p}
                checked={filters.price == p}
                className="cursor-pointer accent-green-600 transform scale-135 "
                onChange={(e) => handleChange("price", e.target.value)}
              />
              Under {(p / 100000).toFixed(0)} Lakh
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE CAR LIST */}
      <div className="w-full">
        <h3 className="font-bold text-xl mb-3">Available Cars</h3>

        {/* React Query Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Manual Filter Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2     ">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className=" h-[265px] w-[320px]  rounded-xl  bg-white shadow-md  cursor-pointer hover:border-green-400 transition p-5 ml-2 border border-gray-200  "
              >
             <img src={car.image} className="object-cover h-[150px] w-[320px] bg-gray-50 shadow-2xs rounded-md" />
                <div className="flex items-center ">
                  <div className="flex w-full items-center justify-between ">
                    <h3 className="text-[14px] font-bold">{car.model}</h3>
                    <p className="text-gray-900 font-semibold text-[15px] flex  items-center">
                      <IndianRupee size={12} /> {car.price}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 text-[14px]">{car.brand}</p>

                <div className="flex  items-center text-gray-600 text-sm  gap-5 mb-2">
                  <p className="rounded-xl bg-gray-100 text-sm p-0 w-15 text-center  ">
                    {car.km}
                  </p>
                  <p className="rounded-xl bg-gray-100 text-sm p-0 w-15 text-center ">
                    {car.fuel}
                  </p>
                  <p className="rounded-xl bg-gray-100 text-sm p-0 w-15 text-center">
                    {" "}
                    {car.year}
                  </p>
                </div>
              </div>
            ))}
            {!loading && filteredCars.length === 0 && (
              <p className="mt-4 text-gray-500 text-center">No cars found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBuyedCar;
