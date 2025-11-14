import React from "react";

export default function EclipseCircle({
  blueEclipseClassName,
  yellowEclipseClassName,
  className,
}: {
  blueEclipseClassName?: string;
  yellowEclipseClassName?: string;
  className?: string;
}): React.ReactElement<SVGElement> {
  return (
    <div className={`${className ?? "relative w-full"}`}>
      <svg
        className={`absolute w-full left-1/2 transform ${blueEclipseClassName}`}
        height="auto"
        viewBox="0 0 196 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M65.8063 171.868C22.1422 153.143 2.0447 104.008 19.8241 62.5494C37.6036 21.091 87.0534 1.78149 130.717 20.5068C174.382 39.2321 194.479 88.367 176.7 129.825C158.92 171.284 109.47 190.593 65.8063 171.868Z"
          stroke="#003399"
          stroke-width="25.3633"
        />
      </svg>
      {/* <svg className={`absolute w-full left-1/2 transform ${blueEclipseClassName}`} fill="none" stroke="rgb(0, 51, 153)" stroke-width="2" height="auto" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 363.188 363.188" xmlnsXlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 363.188 363.188">
  <g>
    <path d="m111.667,132.311c-61.574,0-111.667,50.093-111.667,111.666s50.093,111.667 111.667,111.667 111.667-50.094 111.667-111.667-50.094-111.666-111.667-111.666zm0,208.333c-53.303,0-96.667-43.364-96.667-96.667 0-53.302 43.364-96.666 96.667-96.666s96.667,43.364 96.667,96.666c-0.001,53.303-43.365,96.667-96.667,96.667z"/>
    <path d="m111.667,173.977c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5c30.327,0 55,24.673 55,55 0,4.143 3.358,7.5 7.5,7.5s7.5-3.357 7.5-7.5c0-38.598-31.402-70-70-70z"/>
    <path d="m298.333,69.835c-35.761,0-64.855,29.094-64.855,64.855 0,35.761 29.094,64.854 64.855,64.854s64.855-29.094 64.855-64.854c-5.68434e-14-35.761-29.093-64.855-64.855-64.855zm0,114.71c-27.49,0-49.855-22.364-49.855-49.854s22.365-49.855 49.855-49.855 49.855,22.365 49.855,49.855-22.364,49.854-49.855,49.854z"/>
    <path d="m302.012,157.925c-14.84,0-26.913-12.073-26.913-26.913 0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5c0,23.111 18.802,41.913 41.913,41.913 4.142,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
    <path d="m123.358,96.568c24.544,0 44.512-19.968 44.512-44.512s-19.968-44.512-44.512-44.512-44.512,19.968-44.512,44.512 19.968,44.512 44.512,44.512zm0-74.024c16.273,3.55271e-15 29.512,13.239 29.512,29.512s-13.239,29.512-29.512,29.512-29.512-13.239-29.512-29.512 13.239-29.512 29.512-29.512z"/>
  </g>
</svg> */}

      <svg
        className={`w-full ${yellowEclipseClassName}`}
        height="317"
        viewBox="0 0 317 317"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          opacity="0.5"
          cx="158.318"
          cy="158.608"
          r="145.252"
          transform="rotate(113.212 158.318 158.608)"
          stroke="#FFB800"
          stroke-width="25.3633"
        />
      </svg>
    </div>
  );
}
