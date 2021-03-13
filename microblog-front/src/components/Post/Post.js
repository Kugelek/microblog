import React from 'react';
import {Link} from 'react-router-dom';
import './Post.modules.scss';
import TagBox from '../TagBox/TagBox';
import AuthorBox from '../AuthorBox/AuthorBox';

// const trimHeadingFromContent = (content) => {
//     if(!content)
//     return '';
//     const potentialHeading = content.split('.')[0];
//     return potentialHeading.length < 30 ? potentialHeading : `${potentialHeading.substring(0,27)}...`;
// }

const Post = ({postData, postAuthors, postTags}) => {
    return(
        <article className="post">
            <Link to={`/article/${postData.id}`}><div className="img-placeholder"></div></Link>
            <Link to={`/article/${postData.id}`}> <h3 className="post__heading">{postData.postTitle}</h3></Link>
            <p className="post__content">{postData.postContent}</p>

            <div className="post__box-container">
                <AuthorBox entityEditable={false} authorList={postAuthors} />
                <TagBox entityEditable={false} tagList={postTags}  />
            </div>
            
        </article>
    );
}

export default Post;