import { useState } from "react";

function MultiSelectInputProject({
  content,
  contentList,
  setContentList,
  fieldKey,
  label,
  index,
}) {
  const [input, setInput] = useState("");

  const updateContentList = (newContentList) => {
    setContentList(newContentList);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (input) {
      const newContentList = [...contentList];
      newContentList[index][fieldKey].push(input);
      updateContentList(newContentList);
      setInput("");
    }
  };

  const removeItem = (item) => {
    const newContentList = [...contentList];
    newContentList[index][fieldKey] = newContentList[index][fieldKey].filter(
      (i) => i !== item
    );
    updateContentList(newContentList);
  };

  return (
    <div className="">
      <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <div className="bg-gray-50 border border-gray-300 p-2 mb-2 rounded-lg flex flex-wrap">
          {content[fieldKey].map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="inline-flex items-center p-1 ml-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300"
                aria-label="Remove">
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
          ))}
        </div>
        <div>
          <div className="relative">
            <form>
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Enter ${label}`}
                required
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(e);
                }}
                className="text-white absolute right-2.5 bottom-2 text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MultiSelectInputSkills({
  content,
  contentList,
  setContentList,
  fieldKey,
  label,
}) {
  // console.log(content, fieldKey, label);

  // contentList[fieldKey].map((item) => console.log(item));
  const [input, setInput] = useState("");

  const updateContentList = (newContentList) => {
    setContentList(newContentList);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (input) {
      const newContentList = { ...contentList };
      newContentList[fieldKey].push(input);
      updateContentList(newContentList);
      setInput("");
    }
  };

  const removeItem = (item) => {
    const newContentList = { ...contentList };
    newContentList[fieldKey] = newContentList[fieldKey].filter(
      (i) => i !== item
    );
    updateContentList(newContentList);
  };

  return (
    <div className="">
      <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <div className="bg-gray-50 border border-gray-300 p-2 mb-2 rounded-lg flex flex-wrap">
          {content.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="inline-flex items-center p-1 ml-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300"
                aria-label="Remove">
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
          ))}
        </div>
        <div>
          <div className="relative">
            <form>
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Enter ${label}`}
                required
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(e);
                }}
                className="text-white absolute right-2.5 bottom-2 text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MultiSelectInputProject, MultiSelectInputSkills };
