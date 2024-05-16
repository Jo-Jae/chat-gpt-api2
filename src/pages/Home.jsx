import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CgOpenCollective } from "react-icons/cg";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      setLoading(true);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content, //같으면 생략가능. content: content
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      const newChat = {
        question: content,
        answer: response.data.choices[0].message.content,
      };

      // 1. 기존 로컬스토리지를 불러온다
      // 1-5. 문자열 -> 배열 (parse)
      // if) 기존 로컬스토리지가 없다면 새 배열 생성
      // 2.  기존 or 새 배열에 newChat 추가
      // 3. 배열을 문자열화 해서 저장

      let savedChatlist = localStorage.getItem("savedChatlist"); //1번

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      } //if

      savedChatlist.push(newChat); //2번

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist)); //3번

      setChatlist([newChat, ...chatlist]);

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <form className="flex" onSubmit={onSubmitChat}>
        <input
          className="text-2xl p-2 focus:outline rounded-lg border-2 border-black-700 focus:border-black-400"
          type="text"
          value={content}
          disabled={isLoading}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="ml-4 flex items-center bg-pink-400 text-2xl text-white px-4 py-[10px] rounded-lg shadow-md shadow-pink-200 hover:bg-pink-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgOpenCollective className="mr-2 animate-spin" />
          ) : (
            <FiSearch className="mr-2" />
          )}
          검색
        </button>
      </form>
      <ul className="mt-8 px-4 flex flex-col gap-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;

//2.번
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FiSearch } from "react-icons/fi";
// import ChatlistCard from "../components/ChatlistCard";

// const Home = () => {
//   const [content, setContent] = useState("");
//   const [chatlist, setChatlist] = useState([]);

//   const onSubmitChat = async (e) => {
//     try {
//       e.preventDefault();

//       if (!content) return;

//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "user",
//               content,
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//           },
//         }
//       );

//       setChatlist([
//         {
//           question: content,
//           answer: response.data.choices[0].message.content,
//         },
//         ...chatlist,
//       ]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // const onClickSave = () => {
//   //   // localStorage.setItem("test2", JSON.stringify(["banana", "kiwi", "apple"]));

//   //   const test2 = localStorage.getItem("test2");

//   //   const parsedTest2 = JSON.parse(test2);
//   //   //스토리지 저장, stringify로 배열을 문자열로 저장, parse로 문자열로 저장 된 것을 배열로 복구 후 사용.
//   //   console.log(parsedTest2);
//   //   console.log(typeof parsedTest2);
//   // };

//   useEffect(() => {
//     console.log(chatlist);
//   }, [chatlist]);

//   return (
//     <div className="mt-8 flex flex-col items-center">
//       <form className="flex" onSubmit={onSubmitChat}>
//         <input
//           className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-pink-200 focus:border-pink-400"
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button
//           className="ml-4 flex items-center bg-pink-400 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-pink-200 hover:bg-pink-500"
//           type="submit"
//         >
//           <FiSearch className="mr-2" />
//           검색
//         </button>
//       </form>
//       <ul className="mt-8 px-4 flex flex-col gap-4">
//         {chatlist.map((v, i) => (
//           <ChatlistCard key={i} question={v.question} answer={v.answer} />
//         ))}
//       </ul>
//       <button onClick={onClickSave}>저장</button>
//     </div>
//   );
// };

// export default Home;

//1.번
// import { useState } from "react";

// const Home = () => {
//   const [content, setContent] = useState("초기값");

//   const onSubmitChat = (e) => {
//     e.preventDefault();
//   };

//   const onChangeContent = (e) => {
//     setContent(e.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmitChat}>
//         <input type="text" value={content} onChange={onChangeContent} />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// };

// export default Home;
