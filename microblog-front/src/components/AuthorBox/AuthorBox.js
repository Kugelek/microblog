import React, {useState, useRef, useEffect} from 'react';
import {AuthorInput} from './AuthorInput';
import './AuthorBox.modules.scss';
import axios from 'axios';


const AuthorBox = (props) => {
    const [authorName, setAuthorName] = useState("");
    const [authorsAvailable, setAuthorsAvailable] = useState([]);

    useEffect(()=> {
        axios
        .get("/api/authors")
        .then(res => {
            console.log(res);
            setAuthorsAvailable(state => res.data);
        })
        .catch(err => console.log(err));
    },[])
   
//TODO: Refac coz similar to TagBox, refac to TileBox or sth
   // const tagInput = useRef(null);
    return ( <section className="authorbox">
        {props.entityEditable ? <>
            <select value={authorName} onChange={e => setAuthorName(state => e.target.value)}>
                {authorsAvailable.map(author => <option value={author.mail} key={author.id}>{author.mail}</option>)}
          
          </select>
        {/* <AuthorInput 
                initialValue={authorName}
                placeholder={"Author username..."} 
                onChange={(e) => {
                    e.preventDefault(); setAuthorName(e.target.value)}}
                    // inputRef={handleReset}
                    // ref={tagInput}
                /> */}
            <button className="authorbox__confirm btn-small" onClick={e =>props.handleAdd(e, authorName)}>Add</button>
            </> : null }
            <p className="authorbox__prefix">Posted by</p>
            {props.authorList.map(author => <div className="authorbox__author">
                <span>{`${author}`}</span>
                <span></span>
            </div>)}
        
    </section>);
}
 
export default AuthorBox;