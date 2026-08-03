

"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/api";

async function getMyQuotes() {
  const res = await authFetch("/api/quotes/my");

  if (!res.ok) {
    throw new Error("Failed to fetch quote history");
  }

  return res.json();
}

export default function QuoteHistoryPage() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-quotes"],
    queryFn: getMyQuotes,
  });


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-[#777]">
          Loading quote history...
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load quotes
        </p>
      </div>
    );
  }


  const quotes = data?.data || [];

  return (
    <div className="min-h-screen  pt-30 bg-[#F8F6F2] px-6 py-12">

      <div className="mx-auto max-w-5xl">

        <div>
          <h1 className="font-display text-3xl font-bold text-[#0B0B0B]">
            Quote History
          </h1>

          <p className="mt-2 text-sm text-[#777]">
            Track your previous quote requests and order progress.
          </p>
        </div>


        <div className="mt-10 space-y-8">

          {quotes.length === 0 && (
            <div className="rounded-2xl border border-[#EAE6DD] bg-white p-8 text-center">
              <p className="text-sm text-[#777]">
                You haven't submitted any quotes yet.
              </p>
            </div>
          )}



          {quotes.map((quote:any)=>{

            const total = quote.items?.reduce(
              (sum:number,item:any)=>
                sum + item.unitPriceSnapshot * item.quantity,
              0
            );


            return (

              <div
                key={quote.id}
                className="rounded-3xl border border-[#EAE6DD] bg-white p-8 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#999]">
                      Quote ID
                    </p>

                    <p className="mt-1 font-semibold text-[#0B0B0B]">
                      #{quote.id.slice(0,8)}
                    </p>


                    <p className="mt-3 text-sm text-[#777]">
                      Submitted{" "}
                      {new Date(
                        quote.created_at
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  <div
                    className="
                    inline-flex h-fit rounded-full 
                    bg-[#FAD90C]/20 px-5 py-2
                    text-xs font-bold uppercase
                    tracking-wider text-[#0B0B0B]
                    "
                  >
                    {quote.status}
                  </div>

                </div>



                {quote.customerNotes && (
                  <div className="mt-6 rounded-xl bg-[#F8F6F2] p-4">

                    <p className="text-xs font-bold uppercase tracking-wider text-[#999]">
                      Notes
                    </p>

                    <p className="mt-2 text-sm text-[#444]">
                      {quote.customerNotes}
                    </p>

                  </div>
                )}



                <div className="mt-8 space-y-5">

                  {quote.items?.map((item:any)=>(
                    <div
                      key={item.id}
                      className="
                      rounded-2xl border border-[#EAE6DD]
                      p-5
                      "
                    >

                      <div className="flex flex-col justify-between gap-4 md:flex-row">


                        <div>

                          <h3 className="font-semibold text-[#0B0B0B]">
                            {item.productNameSnapshot}
                          </h3>


                          <div className="mt-2 space-y-1 text-sm text-[#777]">

                            <p>
                              Color: {item.colorNameSnapshot}
                            </p>

                            <p>
                              Material: {item.materialNameSnapshot}
                            </p>

                            <p>
                              Quantity: {item.quantity}
                            </p>

                          </div>


                          {item.customNotes && (
                            <p className="mt-3 text-sm text-[#555]">
                              Note: {item.customNotes}
                            </p>
                          )}


                          {item.customMeasurements && (
                            <p className="mt-2 text-sm text-[#555]">
                              Measurements:{" "}
                              {
                                typeof item.customMeasurements === "string"
                                ? item.customMeasurements
                                : JSON.stringify(item.customMeasurements)
                              }
                            </p>
                          )}

                        </div>



                        <div className="text-right">

                          <p className="text-xs uppercase tracking-wider text-[#999]">
                            Price
                          </p>

                          <p className="mt-1 text-lg font-bold text-[#FAD90C]">
                            ₦{
                              (
                                item.unitPriceSnapshot *
                                item.quantity
                              ).toLocaleString()
                            }
                          </p>

                        </div>


                      </div>

                    </div>
                  ))}


                </div>



                <div className="mt-8 flex items-center justify-between border-t border-[#EAE6DD] pt-6">

                  <span className="text-xs font-bold uppercase tracking-wider text-[#777]">
                    Estimated Total
                  </span>


                  <span className="font-display text-2xl font-bold text-[#0B0B0B]">
                    ₦{total?.toLocaleString()}
                  </span>

                </div>


              </div>

            );

          })}


        </div>


      </div>

    </div>
  );
}