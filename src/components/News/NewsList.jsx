import News from "./News";
import './news.css'
import config from "../../settings/settings";

const NewsList = ({ data }) => {
  // console.log(data)
  // const sorteData = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  // console.log(sorteData)
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 text-white 
      max-w-2xl md:max-w-3xl lg:px-0 
      lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto"
    >
      {data.map((p, index) => (
        <News
          key={p?._id}
          img={
            `${config?.baseUrlUpload}/uploads/news/${p?.news_url[0]?.filename}`
          }
          title={p?.title}
          index={index}
          id={p?._id}
          date={p?.date}
        />
      ))}
    </div>
  );
};

export default NewsList;
