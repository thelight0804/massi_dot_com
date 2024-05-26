import clovaConfig from './config';
import axios from 'axios';

class Clova {
  constructor() {
    this.headers = {
      'X-NCP-APIGW-API-KEY-ID': clovaConfig.clientID,
      'X-NCP-APIGW-API-KEY': clovaConfig.clientSecret,
      'Content-Type': 'application/json'
    };
  }

  // CLOVA Sentiment Actions --------------

  sentimentAnalysis = async (text) => {
    await axios.post(
      "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
      text,
      { headers: this.headers }
    ).then((response) => {
      console.log(response.data);
      return response.data;
    }).catch((error) => {
      console.log(error);
    }
    );
  }
}

const clovaInstance = new Clova();
export default clovaInstance;