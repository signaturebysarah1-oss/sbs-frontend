"use client";

import { useState } from "react";
import { Copy, Check, Ruler, Footprints } from "lucide-react";

const GuidePage = () => {
  const [copied, setCopied] = useState(false);

  const [measurements, setMeasurements] = useState({
    leftFront: "",
    leftBack: "",
    rightFront: "",
    rightBack: "",
  });

  const updateMeasurement = (
    field: keyof typeof measurements,
    value: string
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const measurementText = `
SBS Foot Measurement Profile

Left Foot:
Front Width: ${measurements.leftFront || "-"} cm
Back Width: ${measurements.leftBack || "-"} cm

Right Foot:
Front Width: ${measurements.rightFront || "-"} cm
Back Width: ${measurements.rightBack || "-"} cm
`;

  const copyMeasurements = () => {
    navigator.clipboard.writeText(measurementText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="bg-off-white py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">
            Bespoke Fitting
          </p>

          <h1 className="font-display text-5xl font-bold text-[#111]">
            Foot Measurement Guide
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[#666]">
            Accurate measurements help our craftsmen create footwear that fits
            your feet perfectly. Please measure both feet as one foot may be
            slightly larger than the other.
          </p>
        </div>


        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">

          {[
            {
              title:"Step 1",
              icon:Ruler,
              text:"Measure your feet carefully using a measuring tape. Record all measurements in centimeters (cm)."
            },
            {
              title:"Step 2",
              icon:Footprints,
              text:"Repeat the process for both your left and right foot for the most accurate bespoke fit."
            },
            {
              title:"Step 3",
              icon:Copy,
              text:"Copy your measurement profile and paste it into your custom footwear request."
            }
          ].map((item)=>(
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <item.icon className="mb-6 h-8 w-8 text-[#C9A227]" />

              <h3 className="mb-3 font-display text-xl font-bold">
                {item.title}
              </h3>

              <p className="leading-7 text-[#666]">
                {item.text}
              </p>

            </div>
          ))}

        </div>


        {/* Measurement Instructions */}
        <div className="space-y-10">


          <MeasurementCard
            step="01"
            title="Front Width Measurement"
            image="/front-width-guide.png"
            description="
            Wrap the measuring tape around the widest part of your forefoot.
            Measure from the first metatarsal joint to the fifth metatarsal joint.
            Record the measurement in centimeters.
            "
          />


          <MeasurementCard
            step="02"
            title="Back Width Measurement"
            image="/back-width-guide.png"
            description="
            Wrap the measuring tape around the midfoot area,
            passing around the deepest part of your arch and navicular bone.
            Record the measurement in centimeters.
            "
          />

        </div>



        {/* Input Section */}

        <div className="mt-20 rounded-[32px] bg-[#111] p-10">

          <h2 className="mb-3 font-display text-3xl font-bold text-white">
            Enter Your Measurements
          </h2>

          <p className="mb-10 text-white/60">
            Enter measurements for both feet. When completed, copy your profile
            and paste it when requesting your bespoke footwear.
          </p>


          <div className="grid gap-6 md:grid-cols-2">


          {[
            ["leftFront","Left Foot Front Width"],
            ["leftBack","Left Foot Back Width"],
            ["rightFront","Right Foot Front Width"],
            ["rightBack","Right Foot Back Width"],
          ].map(([key,label])=>(
            <div key={key}>

              <label className="mb-2 block text-sm text-white/70">
                {label}
              </label>

              <input
                value={measurements[key as keyof typeof measurements]}
                onChange={(e)=>
                  updateMeasurement(
                    key as keyof typeof measurements,
                    e.target.value
                  )
                }
                placeholder="Example: 9.5 cm"
                className="
                w-full rounded-xl border border-white/10
                bg-white/5 px-5 py-4 text-white
                outline-none focus:border-[#C9A227]
                "
              />

            </div>
          ))}


          </div>


          {/* Copy Box */}

          <div className="mt-10 rounded-2xl bg-white/5 p-6">

            <p className="mb-4 text-sm text-white/60">
              Your Measurement Profile
            </p>


            <pre className="whitespace-pre-wrap text-sm text-white">
              {measurementText}
            </pre>


            <button
              onClick={copyMeasurements}
              className="
              mt-6 flex items-center gap-3
              rounded-xl bg-[#C9A227]
              px-6 py-3 font-bold text-black
              "
            >
              {copied ? (
                <>
                <Check size={18}/>
                Copied
                </>
              ):(
                <>
                <Copy size={18}/>
                Copy Measurements
                </>
              )}
            </button>

          </div>


        </div>

      </div>
    </section>
  );
};



const MeasurementCard = ({
  step,
  title,
  description,
  image
}:{
 step:string;
 title:string;
 description:string;
 image:string;
})=>{

return (

<div className="
grid gap-10 rounded-[32px]
bg-white p-8 shadow-sm
md:grid-cols-2
">


<div>

<div className="mb-4 text-sm font-bold text-[#C9A227]">
STEP {step}
</div>

<h3 className="
mb-5 font-display text-3xl font-bold
">
{title}
</h3>


<p className="
leading-8 text-[#666]
">
{description}
</p>


</div>


<div className="
flex min-h-[300px]
items-center justify-center
rounded-2xl bg-off-white
">

{/* Replace with your illustration */}

<img
src={image}
alt={title}
className="h-full w-full object-contain"
/>


</div>


</div>

)

}



export default GuidePage;