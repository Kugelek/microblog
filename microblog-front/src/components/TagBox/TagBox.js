import React, {useState, useRef} from 'react';
import {TagInput} from './TagInput';
import './Tag.modules.scss';
import axios from 'axios';

const TagBox = (props) => {
    const [tagName, setTagName] = useState("");
    
    const tagInput = useRef(null);
    return ( <section className="tagbox">
        {props.entityEditable ? <>
            <TagInput 
                initialValue={tagName}
                placeholder={"#yourCustomTag"} 
                onChange={(e) => {
                    e.preventDefault(); setTagName(e.target.value)}}
                    // inputRef={handleReset}
                    ref={tagInput}
                />
            <button className="tagobox__confirm btn-small" onClick={e =>props.handleAdd(e, tagName)}>Add</button>
         
            </> : null}
                    
            {props.tagList.map(tag => <div className="tagbox__tag">
                <span>{tag}</span>
                <span></span>
            </div>)}
        
    </section>);
}
 
export default TagBox;