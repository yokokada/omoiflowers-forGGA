import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'iconoir-react';
import {Button} from "@nextui-org/react";
import './Addmember.css'

const VersionInput = ({ index, version, updateVersion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "17px",
    color: "#333",
    outline: "none",
    resize: "none",
    width: "330px",
    height: "80px",
    padding: "10px 20px",
  };

  const expandedStyle = {
    ...defaultStyle,
    height: "300px",
  };

  return (
    <div>
      <div className="version-input-container"> {/* この行を変更 */}
          <div className="version-label"> {/* この行を変更 */}
          <label>{`Ver.${index + 1}`}</label>
        </div>
        <div className="textarea-wrapper">  {/* このdivを追加 */}
            <textarea
              style={ isExpanded ? expandedStyle : defaultStyle}
              onClick={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              value={version.value}
              onChange={(e) => updateVersion(index, e.target.value, false)}
            />
            <CopyToClipboard text={version.value} onCopy={() => updateVersion(index, version.value, true)}>
                <button className="copy-button"> {/* この行を変更 */}
                <Copy />
              </button>
            </CopyToClipboard>
        </div>
            <div className="copy-message"> {/* この行を変更 */}
              {version.copied ? <span>コピーしました！</span> : null}
            </div>
      </div>
    </div>
  );
};

const Clipboard = () => {
  const [versions, setVersions] = useState([
    { value: '', copied: false },
    { value: '', copied: false },
    { value: '', copied: false },
  
  ]);

  const addVersion = () => {
    setVersions([...versions, { value: '', copied: false }]);
  };

  const updateVersion = (index, value, copied) => {
    const newVersions = [...versions];
    newVersions[index] = { value, copied };
    setVersions(newVersions);
  };

  return (
    <div style={{ overflowY: 'auto' ,marginBottom:'80px'}}>
      {versions.map((version, index) => (
        <VersionInput
          key={index}
          index={index}
          version={version}
          updateVersion={updateVersion}
        />
      ))}
      <Button color='main' variant="ghost"  onClick={addVersion}>追加</Button>
    </div>
  );
};

export default Clipboard;
