import React,{useState, useEffect} from 'react';
import Post from '../Post/Post';
import './Wall.modules.scss';
import SideBar from '../SideBar/SideBar';
import axios from 'axios';

const Wall = (props) => {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [searchType, setSearchType] = useState("id");
    const [sortType, setSortType] = useState("oldest")
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(()=>{
        axios
        .get("/api/posts")
        .then(res => {
            console.log(res);
            setPosts(state => res.data);
            setFilteredPosts(state => res.data);
            setSortedPosts(state => res.data);
        })
        .catch(err => console.log(err));
    },[])

    const handleSearch = () => {
        let result;
        switch(searchType){
            case 'tag': 
                result = posts.filter(post => post.tags.indexOf(searchWord) > -1);
                break;
            case 'id':
                result = posts.filter(post => post.id == searchWord);
                break;
            case 'content':
                result = posts.filter(post => post.postContent.includes(searchWord));
                break;
            default:
                return;
        }
        
       setFilteredPosts(result);
       setSortedPosts(result);
    }
    const handleReset = () => {
        setSearchWord("");
        setFilteredPosts(posts);
        setSortedPosts(posts);
    }
    const handleSort = () => {
     
        const customStringSorter = (el, otherEl) => {
            if(el.toLowerCase() < otherEl.toLowerCase())  return -1; 
            if(el.toLowerCase() < otherEl.toLowerCase())  return 1; 
            return 0;
        }
        const postArr = [...filteredPosts];
        console.log(sortType);
        let result;
        switch(sortType){
             case 'newest':
                 result = postArr.reverse();
                 break;
                 // return postArr.reverse();
            case 'oldest': 
            result = postArr;
                break;
            case 'title-alph': 
            result = postArr.sort( (post1, post2) => customStringSorter(post1.postTitle, post2.postTitle));
            break;
            case 'content-alph': 
            result = postArr.sort( (post1, post2) => customStringSorter(post1.postContent, post2.postContent));
            break
            default:
                return [];
        }
       // return result
       console.log(result);
       setSortedPosts(result);
       
    }
    return(
        <div className="bg">
            <div className="layout">
                <div className="actionbar">
             
             <div className="search-container">
             <h3>Sort options</h3>
                <input type="radio" 
                    id="id"  
                    value="id" 
                    checked={searchType === "id"}
                    onClick={() => setSearchType("id")}/>
                <label for="id">by ID</label>

                <input type="radio"
                    id="tag"  
                    value="tag"
                    checked={searchType === "tag"}
                    onClick={() => setSearchType("tag")}/>
                <label for="tag">by TAG</label>

                <input type="radio" 
                    id="content" 
                    value="content"
                    checked={searchType === "content"}
                    onClick={() => setSearchType("content")}/>
                <label for="content">by CONTENT</label>

                 <input type="text" id="fname" name="fname" value={searchWord} onChange={e => setSearchWord(e.target.value)}/>
                 <button onClick={handleSearch} className="btn-small">Szukaj </button>
                 <button onClick={handleReset} className="btn-small">Reset </button>
                 </div>
                 <div className="sort-container">
                     <h3>Sort options</h3>
                    <input type="radio" 
                        id="newest" 
                        value="newest"
                        checked={sortType === "newest"}
                        onClick={() => setSortType("newest")}/>
                    <label for="newest">Newest first</label>

                    <input type="radio" 
                        id="oldest" 
                        value="oldest"
                        checked={sortType === "oldest"}
                        onClick={() => setSortType("oldest")}/>
                    <label for="oldest">Oldest first</label>

                    <input type="radio" 
                        id="title-alph" 
                        value="title-alph"
                        checked={sortType === "title-alph"}
                        onClick={() => setSortType("title-alph")}/>
                    <label for="title-alph">Alphabetically by title</label>

                    
                    <input type="radio" 
                        id="content-alph" 
                        value="content-alph"
                        checked={sortType === "content-alph"}
                        onClick={() => setSortType("content-alph")}/>
                    <label for="content-alph">Alphabetically by content</label>
                    <button onClick={handleSort} className="btn-small">Sortuj </button>
                 </div>
                </div>
            <div className="main-container">
                <main className="wall">
                  
                    {sortedPosts.length ? sortedPosts.map(post => 
                    <Post 
                        postData={{
                            ...post,
                            authors: [],
                            tags: []
                    }} postAuthors={post.authors.map(author => author.mail)}
                    postTags={post.tags.map(tag => tag.tagName)}/>): <h1>Brak wyników. Spróbuj ponownie</h1>}
                </main>
                <SideBar/>
            </div>
            </div>
        </div>
    );
}


export default Wall;