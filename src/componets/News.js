import React, { useEffect, useState } from 'react'
import Loading from './Loading.js';
import NewsIteam from './NewsIteam.js'
import PropTypes from 'prop-types'



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [key, setKey] = useState('876673caa2b7422fafcbe0c0c4f43e1e')


const update = async()=>{
  props.setProgress(10);
    let url = `https://inshorts.deta.dev/news?category=${props.category}`; // THIS API IS NOW EXPIER , YOU HAVE TO UPDATE IT & KEEP IT IN .env FILE.
    let data = await fetch(url);
    props.setProgress(70);

    let parseData = await data.json();
    setArticles(parseData.data);
    // setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
}

  useEffect(() => {
    update();
  },[])



  // second execute..
  return (
    <>
      <div className="text-center" style={{    marginTop: "65px"}}>

        <h1>NewsBucket - Top News! from <b>{props.category}</b></h1>
        {loading && <Loading></Loading>}
      </div>

        <div className='container my-4'>
          <div className="row">
            {articles.map((element) => {

              return <div className="col-md-4" key={element.url}>
                <NewsIteam source={"Top-News"} author={element.author} date={element.date} title={element.title ? element.title.slice(0, 50) : "There is no title in this news"} description={element.content ? element.content.slice(0, 88) : "there is no description on this news"} imageurl={element.imageUrl ? element.imageUrl : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202305/screenshot_2023-05-20_at_2.43.53_pm_0-sixteen_nine.png?VersionId=NwaNnQdy8PegTucfjzKq5krtOMktr93d"} newsurl={element.readMoreUrl}></NewsIteam>
              </div>

            })}

          </div>
        </div>

    </>
  )

}

export default News;
      

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'business'

}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
};
