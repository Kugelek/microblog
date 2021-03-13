import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import './CommentsSection.modules.scss';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Create from '@material-ui/icons/Create';
import axios from 'axios';
import { Input } from '@material-ui/core';

import {AuthorInput} from './AuthorInput';
import {ContentInput} from './ContentInput';

const CommentsSection = (props) => {
    const [comments, setComments] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    //TODO: refac to useForm albo formik
    //TODO: rozdrobnij bo syf
    const [newCommentAuthor, setNewCommentAuthor] = useState("");
    const [newCommentContent, setNewCommentContent] = useState("");

    const [editedCommentAuthor, setEditedCommentAuthor] = useState("");
    const [editedCommentContent, setEditedCommentContent] = useState("");

    const [activeUpdatedCommentId, setActiveUpdatedCommentId] = useState(null);
    const [searchWord, setSearchWord] = useState("");

    const [updateErr, setUpdateErr] = useState(false);
    const [createErr, setCreateErr] = useState(false);
    const { id } = useParams();

    const handleSubmitComment = () => {
        if(newCommentContent === "" ||
        newCommentAuthor === ""  ){
            setCreateErr(true);
            return;
        }
        axios
        .post(`/api/comments/posts/${id}`, {
            username: newCommentAuthor,
            content: newCommentContent
        })
        .then(res => {
            console.log(res);
            reloadCommentsFromAPI();
            setCreateErr(false);
        })
        .catch(err => console.log(err));
    }
    const reloadCommentsFromAPI = () => {
        
        axios
        .get(`/api/comments/posts/${id}`)
        .then(res => {
            console.log(res);
            setComments(state => res.data);
            setFilteredComments(state => res.data);
            
        })
        .catch(err => console.log(err));
    }

    const handleDeleteComment = (id, event) => {
     
        axios
        .delete(`/api/comments/${id}`)
        .then(res => {
            console.log(res);
            reloadCommentsFromAPI();
        })
        .catch(err => console.log(err));
    }
  
    const handleEditComment = (id, event) => {
        console.log(id);
        console.log(editedCommentContent);
        if(editedCommentContent === "" ){
            setUpdateErr(true);
            return;
        }
        axios
        .put(`/api/comments/${id}`, {
            // username: editedCommentAuthor,
            content: editedCommentContent
        })
        .then(res => {
            console.log(res);
            setActiveUpdatedCommentId(null);
            reloadCommentsFromAPI();
        })
        .catch(err => console.log(err));
    }


    useEffect(()=> {
        reloadCommentsFromAPI();
    },[])

    const renderCommentData = (comment) => {
        if(!comment || !comment.id) return;

        return comment.id === activeUpdatedCommentId ? 
        <>
            <span className="comment__username">{comment.username}</span>
            <ContentInput 
                defaultValue={comment.content}
                placeholder={comment.content} 
                onChange={(e) => {
                    e.preventDefault(); setEditedCommentContent(e.target.value)}}
                />
                <div className="update-err">{updateErr ? "Wprowadź dane poprawnie":""}</div>
            <button className="btn-small" onClick={handleEditComment.bind(this,comment.id)}>Submit</button>
            <button className="btn-small--red" onClick={(e) => { setActiveUpdatedCommentId(null);
            setUpdateErr(false)}}>Abort</button>
        </> 
        : 
        <>
            <span className="comment__username">{comment.username}</span>
            <p className="comment__content">{comment.content}</p>
        </>;
    }

      const handleSetNewCommentAuthor = (e) => {
        e.preventDefault();
        setNewCommentAuthor(e.target.value);
      }

      const handleSearch = () => {
        const filteredComs =  comments.filter(comm => comm.username.includes(searchWord));
        setFilteredComments(filteredComs);
      }
      const handleReset = () => {
        setSearchWord("");
        setFilteredComments(comments);
    }
    return ( 
    <section className="comments">
        <h3 className="comments__header">Comments</h3>
        <AuthorInput required error={newCommentContent === ""} placeholder="Your name..." onChange={handleSetNewCommentAuthor}/>
        <ContentInput  required error={newCommentContent === ""} placeholder="Add a public comment..." onChange={(e) => {
            e.preventDefault(); setNewCommentContent(e.target.value)}}/>
        <button className="btn-small" onClick={handleSubmitComment}>Submit</button>
        <div className="create-err">{createErr ? "Wprowadź dane poprawnie":""}</div>
        <input className="input-small" type="text" value={searchWord} placeholder="Username..." onChange={e => setSearchWord(e.target.value)}/>
        <div className="btns">
        <button className="btn-small" onClick={handleSearch}>Szukaj </button>
        <button className="btn-small" onClick={handleReset}>Reset </button>
        </div>
        <ul className="comments__list">
        {filteredComments.map(comment => <div className="comment">
                    <div className="comment__data">
                    {renderCommentData(comment)}
                    </div>
                    <div className="comment__actions">
                        <button className="comment__delete" onClick={handleDeleteComment.bind(this, comment.id)}><DeleteForever/></button>
                        <button className="comment__update" onClick={(e) => {setActiveUpdatedCommentId(comment.id);
                        setUpdateErr(false)}}><Create/></button>
                    </div>
                </div>)}
        </ul>
    </section> );
}
 
export default CommentsSection;