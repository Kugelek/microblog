import React, {useState, useEffect} from 'react';
import PostForm from '../PostForm/PostForm';
import {useParams, Link, Redirect} from 'react-router-dom';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import axios from 'axios';
import {stateFromHTML} from 'draft-js-import-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';

const BigPostEdit = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [cont, setCont] = useState({});
    const [error, setError] = useState(false);
   const [xd, setXd] = useState("");
   const [tags, setTags] = useState([]);
   const [title, setTitle] = useState("");
   const [authors, setAuthors] = useState([]);
    
   //TODO: hard refac, cleaning up mess
   // deep cloning of props issue fix asap
    useEffect(()=>{
        axios
        .get(`/api/posts/${id}`)
        .then(res => {
        
            //fixne jak bedzie typescript i czas do debugowania
            setXd(`${res.data.postRichContent}`);
            setPost(state => res.data);
            setTags(state => res.data.tags.map(tag=> tag.tagName));
            setTitle(state => res.data.postTitle);
            setAuthors(state => res.data.authors.map(el =>el.mail));
            console.log(res.data.authors.map(author => author.mail));
        // const processedHTML = DraftPasteProcessor.processHTML(h);
        // const contentState = ContentState.createFromBlockArray(processedHTML);
        // const editorState = EditorState.createWithContent(contentState);
        // console.log('fstate',editorState);
     
     // setCont(editorState);
   

        })
        .catch(err => {
            console.log(err);
            setError(true);
        });

     
    },[])

    return ( <div>
      {/* // error ? <Redirect to="/"/> :  <>  */}
      {/* TODO: serio refac bo to jest tragiczne 
        1. debugnąć zeby nie było undefined 2. passuj obiekt 3. kwestia re-renderów 4. przepisz postform na fc
      */}
      {xd === '' || tags===[] || title==='' || authors === []? <div></div> : <PostForm test="XD" actionType="edit" initState={cont} 
      xd={xd} postId={id} post={post} tags={tags} title={title} 
      authors={authors}/> }
        
      {/* </> */}
    </div> );
}
 
export default BigPostEdit;