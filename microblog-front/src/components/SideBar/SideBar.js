import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './SideBar.modules.scss';
import QueueIcon from '@material-ui/icons/Queue';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import axios from 'axios';


const styles = {
  fontSize: '3rem',
  marginRight: '.5rem'
};

const handleExport = e => {
  axios
  .post(`/api/export`)
  .then(res => {
      console.log(res);
  })
  .catch(err => console.log(err));
}
const SideBar = () => {

  const [auth, setAuth] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [myMail, setMyMail] = useState("");
  const [myRole, setMyRole] = useState("");

  useEffect(()=> {
      const role = localStorage.getItem("role");
      role ? setAuth(role) : setAuth("");
      let mail;
      if(role != ""){
        mail = localStorage.getItem("mail");
      
        setMyMail(state => mail);
        setMyRole(state => role);
        axios
        .get(`/api/posts/user/${mail}`)
        .then(res => {
            console.log(res);
            setMyPosts(res.data);
        })
        .catch(err => {
            console.log(err);
        });
      }
  }, []);

    return (  
    <aside className="side-bar">
        <section className="side-bar__menu">
        {auth === "" ? <div>Login to create an article</div> : 
        <>
          <Link className="side-bar__link" to="/add-post"><div className="side-bar__item"><QueueIcon style={styles}/>Add article</div></Link>
          <div onClick={handleExport} className="side-bar__item"><ImportExportIcon style={styles}/>Export database</div>
          <div className="side-bar__export-state"></div>
        </>}
    
        
        </section>
        <nav className="side-bar__nav">
          {
            auth === "" ? <p> Other articles</p> : <>
            <p className="mypost__mail">Hello {myMail}</p>
            <p className="mypost__role">You're logged in as {myRole}</p>
            <p className="mypost__heading">Posts written by you:</p>
            <div className="mypost__list">
              {myPosts.map(post => <div className="mypost">
              <Link to={`/article/${post.id}`}>
                <h5 className="mypost__title">{post.postTitle}</h5>
                <p>view details...</p>
                </Link>
              </div>)}</div></>
          }
         
          </nav>
    </aside>);
}
 
export default SideBar;