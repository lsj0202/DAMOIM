import { type CreateSportsClub } from './SportsClubs/CreateSportsClub';

export const shareKakao = (sportsClub: CreateSportsClub) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: sportsClub?.title,
        description: sportsClub?.subTitle,
        imageUrl: sportsClub?.clubPoster || '',
        link: {
          webUrl: window.location.href,
          mobileWebUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '스포츠 클럽 보러가기',
          link: {
            webUrl: window.location.href,
            mobileWebUrl: window.location.href,
          },
        },
      ],
    });
  }
};
