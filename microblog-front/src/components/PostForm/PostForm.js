import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './PostForm.modules.scss';
import ControlButton from './ControlButton';
import ControlsMenu from './ControlsMenu';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import TagBox from '../TagBox/TagBox';
import AuthorBox from '../AuthorBox/AuthorBox';
import {TitleInput} from './TitleInput';
let HtmlToReactParser = require('html-to-react').Parser;



class PostForm extends React.Component {
    constructor(props) {
      super(props);
      console.log("test",this.props.initState);
      console.log("testcc",this.props.test);
      if(this.props.initState){
      
      const blocksFromHTML = convertFromHTML(this.props.xd);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.state = {
        editorState: EditorState.createWithContent(state),
        title: this.props.title,
        tags: this.props.tags,
        authors: this.props.authors,
        errors: "",
        createSuccess: false,
        updateSuccess: false

      };
        console.log("stateful",this.state.editorState);
     
      }
      else{
        this.state = {editorState: EditorState.createEmpty(),
          title: "",
          tags: [],
          authors: [],
          errors: "",
          createSuccess: false,
          updateSuccess: false
          };
      }
      
    
      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => this.setState({editorState});
    }

    
    handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (!newState) return false;
      this.onChange(newState);
      return true;
    }

    toggleBlockType = (blockType) => this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    toggleInlineStyle = (inlineStyle) => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,inlineStyle));
    
 
    render() {
      const {editorState} = this.state;
      const classes = 'customEditor__textfield';
  
      const handleSubmitPost = (e) => {
        e.preventDefault();
        console.log(editorState.getCurrentContent().getPlainText());
        axios
        .post("/api/posts", {
          postContent: editorState.getCurrentContent().getPlainText().replace(/(\r\n|\n|\r)/gm,""),
          tags: this.state.tags.map(tag => {
            return {
              tagName: tag
            }
          }) || [],
          postRichContent: stateToHTML(editorState.getCurrentContent()).replace(/(\r\n|\n|\r)/gm,""),
          postTitle: this.state.title || "",
          authors: this.state.authors.map(author => {
            return {
              mail: author
            }
          }) || [],
        })
        .then(res => {
            this.setState({createSuccess:true});
            console.log(res);
        })
        .catch(err => console.log(err));
      }

      const handleSubmitUpdate = (e) => {
        e.preventDefault();
        // if(this.state.tags === "" || this.state.tags === " ")
        //   this.setState({errors: this.state.errors + " " + "Atleast 1 #tag required"});
        // if(this.state.tags === "" || this.state.tags === " ")

        axios
        .patch(`/api/posts/${this.props.postId}`, {
          postContent: editorState.getCurrentContent().getPlainText().replace(/(\r\n|\n|\r)/gm,""),
          tags: this.state.tags.map(tag => {
            return {
              tagName: tag
            }
          }) || [],
          postRichContent: stateToHTML(editorState.getCurrentContent()).replace(/(\r\n|\n|\r)/gm,""),
          postTitle: this.state.title || "empty",
        })
        .then(res => {
            console.log(res);
            this.setState({updateSuccess:true});
        })
        .catch(err => console.log(err));
      }

      const handleAddTag = (event, tag) => {
        event.preventDefault();
        const prev = [...this.state.tags];
        console.log("stare",prev);
        prev.push(tag);
        console.log("nowe",prev);
        //console.log("nowe",newTags);
        this.setState({tags: prev});
      }
      const handleAddAuthor = (event, author) => {
        event.preventDefault();
        const prev = [...this.state.authors];
        prev.push(author);
        ///const newAuthors = prev.push(author);

        this.setState({authors: prev});
 
      }

      return (
      <section>
      {this.state.createSuccess === true 
         ? <Redirect to="/" /> : null}
      {this.state.updateSuccess === true 
         ? <Redirect to={`/article/${this.props.postId}`}/> : null}
      <div className="title__box">
      <h5 className="title__label">Tytuł</h5>
        <TitleInput 
                defaultValue={this.state.title || ""}
                placeholder={this.state.title || "tytuł"} 
                onChange={(e) => {
                    e.preventDefault(); this.setState({title: e.target.value});
                  }}
                  required
                  error={this.state.title === ""}
                  helperText={ "You have to type title!"}
                />
        </div>
        <div className="details__container">
  
        {this.props.actionType === 'edit' ?
    <AuthorBox entityEditable={false} authorList={this.props.authors || this.state.authors} handleAdd={handleAddAuthor}/>
    :
    <AuthorBox entityEditable={true} authorList={this.props.authors || this.state.authors} handleAdd={handleAddAuthor}/>
        
        
        }
       <TagBox entityEditable={true} tagList={this.state.tags} handleAdd={handleAddTag}  />
                <div className="errorbox">{this.state.errors}</div>
        </div>
        <div className="customEditor__root">
          <ControlsMenu
            featuresType="block"
            featuresList={EDITOR_FEATURES}
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <ControlsMenu
            featuresType="inline"
            featuresList={EDITOR_FEATURES_INLINE}
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={classes} onClick={this.focus}>
            <Editor
              blockStyleFn={block => block.getType() ==='blockquote' ? 'customEditor__blockquote' : null}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={(e) => getDefaultKeyBinding(e)}
              onChange={this.onChange}
              placeholder="Start an article..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        {this.props.actionType === 'edit' && this.props.postId ? <div className="btns"> 
      
        <button className="submit__update btn-small" onClick={handleSubmitUpdate}>Submit</button>
        <Link to={`/article/${this.props.postId}`}><button className="submit__abort btn-small" >Abort</button></Link>
        </div> : 
        <button className="submit-post" onClick={handleSubmitPost}>Publish</button>}
        
        <div className="htmlbox">
            <span>{editorState ? stateToHTML(this.state.editorState.getCurrentContent()): "fail"}</span>
        </div>
        </section>
      );
    }
  }

  const EDITOR_FEATURES = [
    {icon: 'h1', style: 'header-one'},
    {icon: 'h2', style: 'header-two'},
    {icon: 'h3', style: 'header-three'},
    {icon: 'h4', style: 'header-four'},
    {icon: 'h5', style: 'header-five'},
    {icon: 'h6', style: 'header-six'},
    {icon: 'quote', style: 'blockquote'},
    {icon: 'ul icon', style: 'unordered-list-item'},
    {icon: 'olicon', style: 'ordered-list-item'},
    {icon: 'Code', style: 'code-block'},
  ];


  const EDITOR_FEATURES_INLINE = [
    {icon: 'Bold', style: 'BOLD'},
    {icon: 'Italic', style: 'ITALIC'},
    {icon: 'Underline', style: 'UNDERLINE'},
  ];


  export default PostForm;