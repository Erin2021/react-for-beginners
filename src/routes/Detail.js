import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //제공받은 함수 값을 반환

function DetailPage(props){
  const {title,rating,imageCover,description,genres}=props;
  return(
    <div>
      <img src={imageCover} alt={title}/>
      <h2>{title}</h2>
      <p>{rating}</p>
      <p>{description}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  )
}



function Detail() {
  const [loading,setLoading]=useState(true);
  const [des, setDes] = useState([]);


  const {id} =useParams();
  //console.log(id)
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setDes(json.data.movie);
    setLoading(false);

  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(des)
  return(
    <div>
      {loading ? (<h1>"Loading..."</h1>):
      (<DetailPage
        title={des.title}
        rating={des.rating}
        imageCover={des.medium_cover_image}
        description={des.description_full}
        genres={des.genres}
      />)}
    </div>
  )
}
export default Detail;