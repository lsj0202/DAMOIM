import { useEffect } from 'react';

interface MarkerProps {
  map: any;
  location: {
    C_NAME: string;
    X_CNTS: number;
    Y_DNTS: number;
  };
}

const SportsClubMarkers = ({ map, location }: MarkerProps) => {
  useEffect(() => {
    if (map && location) {
      var markerPosition = new window.kakao.maps.LatLng(
        location.X_CNTS, // 위도
        location.Y_DNTS, // 경도
      );

      // 기본 마커 생성
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      var customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        customOverlay.setMap(map);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        customOverlay.setMap(null);
      });

      // 마커에 클릭 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', function () {
        // Add click event logic here if needed
      });
    }
  }, [map, location]);

  return <div></div>;
};

export default SportsClubMarkers;
