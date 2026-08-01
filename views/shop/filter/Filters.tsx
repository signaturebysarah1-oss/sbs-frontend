"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ALL_PRODUCTS } from "../data";



export default function ProductFiltersSidebar() {
  const allSizes = ALL_PRODUCTS.flatMap((product) =>
    product.variants.map((item) => item.sizeValue.toString())
  );
  const sizes = [...new Set(allSizes)];
  
  const allCategories = ALL_PRODUCTS.map((item) => item.category);
  const categories = [...new Set(allCategories)];
  
  const genders = [...new Set(ALL_PRODUCTS.map((product) => product.gender))].map(
    (product) => ({
      label: product,
      value: product,
    })
  );
  
  const allcolor = ALL_PRODUCTS.flatMap((products) =>
    products.variants.map((item) => item.color.hexCode)
  );
  const colors = [...new Set(allcolor)];
  
  const allMaterials = ALL_PRODUCTS.flatMap((product) =>
    product.materials.map((items) => ({
      name: items.name,
      slug: items.slug,
    }))
  );
  
  const materials = new Map(allMaterials.map((item) => [item.name, item]));
  const material = Array.from(materials.values());
  
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);

    if (!value || current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`/product?${params.toString()}`, {
      scroll: false,
    });
  };

  const updateRange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`/product?${params.toString()}`, {
      scroll: false,
    });
  };

  const isActive = (key: string, value: string) => {
    return searchParams.get(key) === value;
  };

  const clearFilters = () => {
    router.push("product");
  };

  return (
    <aside className="w-full rounded-xl border h-fit  bg-white p-5 lg:sticky lg:top-20 lg:w-72">
      <div className="h-[90vh] overflow-scroll space-y-6  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </div>
        <Separator />
        <section>
          <h3 className="mb-3 font-medium">Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={isActive("category", category)}
                  onCheckedChange={(checked) =>
                    updateFilter("category", checked ? category : "")
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </section>
        <Separator />
        {/* Gender */}
        <section>
          <h3 className="mb-3 font-medium">Gender</h3>
          <div className="space-y-3">
            {genders.map((gender) => (
              <label
                key={gender.value}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={isActive("gender", gender.value)}
                  onCheckedChange={(checked) =>
                    updateFilter("gender", checked ? gender.value : "")
                  }
                />
                {gender.label}
              </label>
            ))}
          </div>
        </section>
        <Separator />
        {/* Sizes */}
        <section>
          <h3 className="mb-3 font-medium">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={() => updateFilter("size", size)}
                className={`rounded-md border px-3 py-1 text-sm ${
                  isActive("size", size)
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </section>
        <Separator />
        <section>
          <h3 className="mb-3 font-medium">Colors</h3>
          <div className="grid grid-cols-7 gap-1.5">
            {colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => updateFilter("color", color)}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className={`h-5 w-5 rounded-full border ${
                    isActive("color", color) ? "ring-2 ring-[gold]" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </section>
        <Separator />
        <section>
          <h3 className="mb-3 font-medium">Materials</h3>
          <div className="space-y-3">
            {material.map((material, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={isActive("material", material.slug)}
                  onCheckedChange={(checked) =>
                    updateFilter("material", checked ? material.slug : "")
                  }
                />
                {material.name}
              </label>
            ))}
          </div>
        </section>
        <Separator />
        {/* Price */}
        <section>
          <h3 className="mb-3 font-medium">Price Range</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Min"
              defaultValue={searchParams.get("minPrice") ?? ""}
              onBlur={(e) => updateRange("minPrice", e.target.value)}
              className="border border-[gray] rounded-lg px-1.5"
            />
            <input
              placeholder="Max"
              defaultValue={searchParams.get("maxPrice") ?? ""}
              onBlur={(e) => updateRange("maxPrice", e.target.value)}
              className="border border-[gray] focus:border-[gray] rounded-lg px-1.5"
            />
          </div>
        </section>
        <Separator />
      </div>
    </aside>
  );
}
