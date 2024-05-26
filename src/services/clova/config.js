/*
  네이버 API는 JavaScript환경에서 보안상의 이유로 CORS를 허용하지 않습니다.
  따라서 서버에서 API를 호출하는 방식으로 구현해야 합니다.
*/

const clovaConfig = {
  clientID: import.meta.env.VITE_CLOVA_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLOVA_CLIENT_SECRET,
};

export default clovaConfig;