import { useEffect, useState } from "react";
import { DATA } from "./data";
import { PiLightbulb } from "react-icons/pi";

const alphabet = [
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];
function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [resultQuestion, setResultQuestion] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [clas, setClas] = useState("");
  const [hınt, setHınt] = useState(false);
  const handleClıck = (e) => {
    setHınt(!hınt);
    console.log(hınt);
  };

  function refreshPage() {
    window.location.reload(false);
  }
  // Harfleri karıştırma
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  // cevabın uzunluğu kadar harf ekleme ve cevabın doğruluk kontrolü
  const setKeyword = (keyword) => {
    if (keywords.length < answer.length) {
      keywords.push(keyword);
      setKeywords([...keywords]);
    }
    if (keywords.length === answer.length) {
      if (answer === keywords.join("")) {
        setIndex(index + 1);
        setKeywords([]);
        setResultQuestion(true);
      } else {
        setWrong(true);
      }
    }
  };

  useEffect(() => {
    if (keywords.length === 0) {
      setWrong(false);
    }
    if (keywords.length === answer.length) {
      setClas("bg-orange-800");
    } else {
      setClas("");
    }
  });

  useEffect(() => {
    setAnswer("");
    setWrong(false);
    setResultQuestion(false);
    if (typeof DATA[index] !== "undefined") {
      const answer = DATA[index].answer.toLowerCase();
      setAnswer(answer);
      setQuestion(DATA[index].question);
      const stringToArray = answer.split("");
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      const alphabetLowerData = stringToArray.map((answer) =>
        answer.toLowerCase()
      );
      setAnswerArray(shuffle(alphabetLowerData));
    }
  }, [resultQuestion]);

  // yanlış girilen harfi silme
  const remoweKeyword = (index) => {
    keywords.splice(index, 1);
    setKeywords([...keywords]);
  };
  return (
    <div className="text-center bg-orange-400 h-[100vh] flex justify-center items-center">
      {answer !== "" && (
        <div>
          <div className="flex flex-col items-end ">
            <div className="flex justify-center text-white">
              <PiLightbulb
                onClick={handleClıck}
                size={"25px"}
                className="cursor-pointer fixed animate-pulse  "
              />
              {hınt ? (
                <div className="absolute my-7 ">
                  {answer[0].toUpperCase() + answer.slice(1)}
                </div>
              ) : null}
            </div>
          </div>

          <div className="">
            <span className="text-3xl text-white font-bold">
              {question}({answer.length})
            </span>
          </div>
          <div className="my-12 text-white max-[768px]:mb-16 h-[60px]">
            {keywords.map((item, index) => (
              <span
                className={`cursor-pointer w-10 h-10 inline-block ${clas} hover:bg-red-200 text-3xl border-b-4 m-3    ${
                  wrong && "border-orange-800"
                }`}
                onClick={() => remoweKeyword(index)}
                key={index}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10 max-[768px]:w-[70%],flex ">
            {answerArray.map((item, index) => (
              <button
                className="w-10 h-10 mb-5 mx-1 rounded-md  hover:bg-zinc-200 text-xl bg-zinc-100"
                key={index}
                onClick={() => setKeyword(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      {answer == "" && (
        <div className="m-5 text-white text-2xl">
          Tebrikler :) <br /> Tüm Sorular Tamamlandı
          <div>
            <button
              className="bg-zinc-300 rounded-md w-60 mt-3 text-gray-600 hover:opacity-80 h-16"
              onClick={refreshPage}>
              Başa Dön
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
