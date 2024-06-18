import { useState } from 'react';
import { SportsClubMap } from '..';
import { Button, Flex, Text } from '../common';
import { type Schedule } from './CreateSportsClub';
import SportsClubMarkers from './SportsClubMarker';

type SportsClubScheduleProps = {
  location: string;
  latitude: number;
  longitude: number;
  schedules?: Schedule[];
};

const SportsClubSchedule = ({
  location,
  latitude,
  longitude,
  schedules,
}: SportsClubScheduleProps) => {
  const [map, setMap] = useState(null);

  const clubLocation = {
    C_NAME: '스포츠 클럽 위치',
    X_CNTS: latitude,
    Y_DNTS: longitude,
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
          ⚓️ {location}
        </Text>
      </Flex>
      <Flex
        className="h-full w-1/2 px-10"
        items="center"
        justify="center"
        direction="col"
        gap={10}
      >
        {schedules?.map(({ day, start, end }) => (
          <Flex key={day} className="w-full" justify="between" items="center">
            <Button size="md">{day}</Button> :
            <Text>
              <Button size="md" bgColor="gray">
                {start}
              </Button>
              <Text className="mx-2">-</Text>
              <Button size="md" bgColor="gray">
                {end}
              </Button>
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SportsClubSchedule;
