import React,{useState, useEffect} from 'react';

import Header from '../components/Header/Header';
import BigPostEdit from '../components/BigPostEdit/BigPostEdit';
import {convertFromHTML, ContentState} from 'draft-js';



const EditPostPage = () => {
   

   
    return ( 
        <>
        <Header/>
        <BigPostEdit/>
        </>
     );
}
 
export default EditPostPage;