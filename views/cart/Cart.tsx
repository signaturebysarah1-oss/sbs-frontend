"use client";

import { Edit, Minus, Plus, Trash } from "lucide-react";
import { QuoteItem } from "@/types/website";

interface Props {
  item: QuoteItem;
  editingItem: string | null;
  measurements: string;
  customNotes: string;
  fmt: (value: number) => string;

  onUpdateQuantity: (item: QuoteItem, amount: number) => void;
  onRemove: (item: QuoteItem) => void;
  onEdit: (item: QuoteItem) => void;
  onSaveCustomization: (item: QuoteItem) => void;

  setMeasurements: (value: string) => void;
  setCustomNotes: (value: string) => void;
}

const QuoteItemCard = ({
  item,
  editingItem,
  measurements,
  customNotes,
  fmt,
  onUpdateQuantity,
  onRemove,
  onEdit,
  onSaveCustomization,
  setMeasurements,
  setCustomNotes,
}: Props) => {
  return (
    <div
      key={`${item.productId}-${item.colorNameSnapshot}`}
      className="overflow-hidden rounded-2xl border border-border bg-white"
    >
      <div className="flex">
        <img
          src={item.imageUrlSnapshot}
          alt={item.productNameSnapshot}
          className="w-50 object-cover"
        />

        <div className="flex flex-1 justify-between gap-6 p-6">
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold">
              {item.productNameSnapshot}
            </h3>

            <div className="mt-3 flex gap-2">
              {item.materialNameSnapshot && (
                <span className="rounded bg-off-white px-3 py-1 text-xs">
                  {item.materialNameSnapshot}
                </span>
              )}

              {item.colorNameSnapshot && (
                <span className="flex items-center justify-center gap-1 rounded bg-off-white px-3 py-1 text-xs">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: item.colorNameSnapshot,
                    }}
                  />

                  {item.colorNameSnapshot}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => onUpdateQuantity(item, -1)}
                className="flex h-8 w-8 items-center justify-center rounded border"
              >
                <Minus size={14} />
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => onUpdateQuantity(item, 1)}
                className="flex h-8 w-8 items-center justify-center rounded border"
              >
                <Plus size={14} />
              </button>
            </div>

            {editingItem === item.productId && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase">
                      Measurements
                    </label>

                    <textarea
                      rows={4}
                      value={measurements}
                      onChange={(e) => setMeasurements(e.target.value)}
                      placeholder="Example: Width: 2cm, Length: 5cm"
                      className="w-full rounded-lg border border-border bg-off-white p-3 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase">
                      Custom Notes
                    </label>

                    <textarea
                      rows={4}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Special requests..."
                      className="w-full rounded-lg border border-border bg-off-white p-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => onSaveCustomization(item)}
                  className="rounded bg-near-black px-5 py-3 text-xs font-bold uppercase  text-gold"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end justify-between">
            <p className="font-display text-2xl font-bold">
              {fmt(item.unitPriceSnapshot * item.quantity)}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-1 rounded border px-3 py-2 text-xs"
              >
                <Edit size={13} />
                Edit
              </button>

              <button
                onClick={() => onRemove(item)}
                className="flex items-center gap-1 rounded border px-3 py-2 text-xs text-red-600"
              >
                <Trash size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteItemCard;