import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import NewsService from '../../services/NewsService'
import NewsMain from '../News/NewsMain';
import config from "../../settings/settings";
import styled from 'styled-components';


const NewsTeaser = () => {

  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews()
  }, [])
  


  async function getNews() {
    try {
      const response = await NewsService.fetchNews(1, 3);
      // console.log(response.data)
      setNews(response?.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Body>
      <h1>
        Новости
      </h1>
      <NewsSection>
        {news.map((p, index) => (
          <NewsMain
            key={p._id}
            id={"/news/1/" + p._id}
            img={
              `${config?.baseUrlUpload}/uploads/news/` +
              p.news_url[0]?.filename
            }
            title={p.title}
          />
        ))}
      </NewsSection>
      <div className="text-center pt-12">
        <Link
          to="/news"
          className="link"
          // className="inline-block py-2 px-4 underline hover:text-red-700 text-red-500 font-semibold cursor-pointer"
        >
          Перейти ко всем новостям
        </Link>
      </div>
    </Body>
  )
}

export default NewsTeaser

const Body = styled.section`
  display: flex;
  padding: 64px 12px;
  flex-direction: column;
  text-decoration: underline;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  h1 {
    margin-bottom: 70px;
    text-align: center;
    font-family: 'Ubuntu', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 128.69%;
    text-align: center;
    letter-spacing: 0.1em;
    color: #000000;
  }

  .link{
    color: #333333;  
  }
`;

const NewsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px;
  flex-wrap: wrap;

`;