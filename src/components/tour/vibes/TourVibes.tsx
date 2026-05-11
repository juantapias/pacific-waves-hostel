import type { PackageVibesProps } from "../../../types";

export default function PackageVibes({
  title = "Vibras del Paquete",
  photos,
}: PackageVibesProps) {
  return (
    <div>
      <h2 className="text-2xl font-medium text-primary mb-4">{title}</h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
        {/* Left: large image spanning 2 rows */}
        <div className="row-span-2 rounded-2xl overflow-hidden">
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top right: two small images side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={photos[2].src}
              alt={photos[2].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom right: wide image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={photos[3].src}
            alt={photos[3].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
