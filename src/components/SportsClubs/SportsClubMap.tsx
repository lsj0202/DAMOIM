import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';

const DEFAULT_LAT = 36.5040736;
const DEFAULT_LNG = 127.2494855;

declare global {
  interface Window {
    kakao: any;
  }
}

type MapProps = {
  setMap: Dispatch<SetStateAction<any>>;
};

const LoadKakaoMap = ({ setMap }: MapProps) => {
  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 13,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" style={{ width: '100%', height: '44vh' }}></div>
    </>
  );
};

export default LoadKakaoMap;
