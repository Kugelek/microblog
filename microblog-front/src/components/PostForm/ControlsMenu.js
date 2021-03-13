import React from 'react';
import ControlButton from './ControlButton';

const ControlsMenu = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const currentStyle = props.editorState.getCurrentInlineStyle();

    const activeCondition = (type) => props.featuresType === 'block' ? (type.style === blockType) : currentStyle.has(type.style);
    return (
      <div className="customEditor__controls">
        {props.featuresList.map((type) =>
          <ControlButton
            key={type.label}
            active={activeCondition(type)}
            icon={type.icon}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };
 
export default ControlsMenu;