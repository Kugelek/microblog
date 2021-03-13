import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './Stats.modules.scss';

const Stats = () => {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        axios
        .get("/api/posts")
        .then(res => {
            console.log(res);
            setPosts(state => res.data);
        })
        .catch(err => console.log(err));

        axios.get("/api/comments")
        .then(res => {
            console.log(res);
            setComments(state => res.data);
        })
        .catch(err => console.log(err));
    },[])

    const getMaxPostLength = () => {
     
        return posts.length ? Math.max(...posts.map(post => post.postContent.length *1)) : null;
    }
    const getAvgPostLength = () => {
     
        const sum = posts
            .map(post => post.postContent.length *1)
            .reduce((a, b) => a+b, 0);
        return sum/posts.length;
    }
    return ( <section className="stats">
        <div className="stats__allposts stats__circle">
            <span>Napisano</span>
            <span className="stats__highlight">{posts.length}</span>
            <span>postów</span>
        </div>
        <div className="stats__allposts stats__circle">
            <span>Skomentowano</span>
            <span className="stats__highlight">{comments.length}</span>
            <span>razy</span>
        </div>
        <div className="stats__longestpost stats__circle">
            <span>Najdłuższy post</span>
            <span className="stats__highlight">{getMaxPostLength()}</span>
            <span>miał tyle znaków</span>
        </div>
        <div className="stats__longestpost stats__circle">
            <span>Średnio post ma</span>
            <span className="stats__highlight">{comments.length/posts.length}</span>
            <span>komentarza</span>
        </div>
        <div className="stats__longestpost stats__circle">
            <span>Średnio post to</span>
            <span className="stats__highlight">{getAvgPostLength()}</span>
            <span>znaków</span>
        </div>
    </section> );
}
 
export default Stats;