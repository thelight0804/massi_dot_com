import geminiConfig from "./config"; // Gemini 설정 가져오기
import { GoogleGenerativeAI } from "@google/generative-ai";

class Gemini {
  constructor() {
    this.genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) // 모델 설정
  }

  // AI Actions --------------

  /**
   * 텍스트 생성
   * @param {String} prompt Gemini에 전달할 텍스트
   * @returns {String} 생성된 텍스트
   */
  generateText = async (prompt) => {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

}

const geminiInstance = new Gemini();
export default geminiInstance;