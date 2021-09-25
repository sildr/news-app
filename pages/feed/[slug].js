import router from "next/router";
import styles from "../../styles/feed.module.css";
import { useRouter } from "next/router";
import { Toolbar } from "../../components/toolbar";
export const Feed = ({ pageNumber, articles }) => {
  // console.log(pageNumber,articles)
  const router = useRouter();
  return (
    <div className="page-container">
        <Toolbar/>
      <div className={styles["main"]}>
        {articles.map((article, index) => (
          <div key={index} className={styles["post"]}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0,0))
            }
          }}
          className={pageNumber === 1 ? styles.disable : styles.active}
        >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber <5) {
              router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0,0))
            }
          }}
          className={pageNumber === 5 ? styles.disable : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (pageContext) => {
  // because of fileName query.slug
  const pageNumber = pageContext.query.slug;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
  const apiResponse = await fetch(
    `
        https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70991f5c237649d69a1cedc52509d259&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );
  const apiJson = await apiResponse.json();
  const { articles } = apiJson;
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
export default Feed;
