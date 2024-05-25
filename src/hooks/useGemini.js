import gemini from "@/services/gemini/gemini";

const useGemini = () => {

  const generateText = async () => {
    return gemini.generateText();
  };

  return { generateText };
}

export default useGemini;