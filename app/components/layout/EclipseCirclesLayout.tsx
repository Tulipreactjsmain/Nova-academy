import EclipseCircle from "@/app/components/svgs/EclipseCircle";

export default function EclipseCirclesLayout({
  children,
  midLeftEclipse1,
  midRightEclipse1,
  midRightEclipse2,
  lastLeftEclipse,
  lastRightEclipse,
}: {
  children: React.ReactNode;
  midLeftEclipse1?: boolean;
  midRightEclipse1?: boolean;
  midRightEclipse2?: boolean;
  lastLeftEclipse?: boolean;
  lastRightEclipse?: boolean;
}) {
  return (
    <div className="relative  w-full h-full">
      {midLeftEclipse1 && (
        <div className="max-w-[115px] md:max-w-[215px] lg:max-w-[315px]] absolute top-[105vh] left-[-100px] md:left-[-140px] opacity-50 md:opacity-50">
          <EclipseCircle
            blueEclipseClassName="max-w-[136px] top-[-50px] md:top-[-100px]"
            yellowEclipseClassName="max-w-[224px]"
          />
        </div>
      )}
      {midRightEclipse2 && (
        <div className="max-w-[115px] md:max-w-[215px] lg:max-w-[315px] absolute top-[1572px] right-[-100px] md:right-[-140px] opacity-100 md:opacity-100">
          <EclipseCircle
            blueEclipseClassName="max-w-[136px] top-[-100px] left-[0]"
            yellowEclipseClassName="max-w-[224px]"
          />
        </div>
      )}
      {lastLeftEclipse && (
        <div className="max-w-[315px] absolute bottom-0 left-[-140px] opacity-50">
          <EclipseCircle
            blueEclipseClassName="max-w-[136px] top-[-100px] "
            yellowEclipseClassName="max-w-[224px]"
          />
        </div>
      )}
       {lastRightEclipse && (
        <div className="max-w-[115px] md:max-w-[215px] lg:max-w-[315px] absolute bottom-[0] right-[-100px] md:right-[-140px] opacity-100 md:opacity-100">
          <EclipseCircle
            blueEclipseClassName="max-w-[136px] top-[-100px] left-[0]"
            yellowEclipseClassName="max-w-[224px]"
          />
        </div>
      )}
      {children}
    </div>
  );
}
