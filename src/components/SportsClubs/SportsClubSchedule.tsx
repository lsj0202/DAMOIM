import { useState } from 'react';
import { SportsClubMap } from '..';
import { Flex, Text } from '../common';
import SportsClubMarkers from './SportsClubMarker';

const SportsClubSchedule = () => {
  const [map, setMap] = useState(null);

  const clubLocation = {
    C_NAME: '스포츠 클럽 위치',
    X_CNTS: 35.17308711,
    Y_DNTS: 129.12775978,
  };

  return (
    <Flex className="h-[450px] border-b">
      <Flex
        className="h-full w-1/2 bg-slate-200"
        direction="col"
        items="center"
      >
        <Text size="md" weight="semibold" className="my-2">
          주요 활동 지역
        </Text>
        <Flex className="w-[90%]">
          <SportsClubMap setMap={setMap} />
          <SportsClubMarkers location={clubLocation} map={map} />
        </Flex>
        <Text size="md" weight="semibold" className="mt-3.5">
          🫵🏼 부산시 강서구 부산소프트웨어 마이스터고등학교
        </Text>
      </Flex>
      <Flex
        className="h-full w-1/2"
        items="center"
        justify="center"
        direction="col"
        gap={5}
      >
        <Text size="md">월요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">화요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">수요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">목요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">금요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">토요일: 10:00 AM ~ 5:00 PM</Text>
        <Text size="md">일요일: 휴무</Text>
      </Flex>
    </Flex>
  );
};

export default SportsClubSchedule;
