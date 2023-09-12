import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'iconoir-react';
import {Button} from "@nextui-org/react";

const VersionInput = ({ index, version, updateVersion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#333",
    outline: "none",
    resize: "none",
    width: "330px",
    height: "90px",
    padding: "10px 20px",
  };

  const expandedStyle = {
    ...defaultStyle,
    height: "300px",
  };

  const copyButtonStyle = {
    position: 'absolute',
    top: '30px',
    right: '30px',
    color: '#1B3672',
  };
  // indexが0（一番上）の場合だけ、marginTopを80に設定
  const containerStyle = index === 0 ? { position: 'relative', marginTop: '80px' } : { position: 'relative', marginBottom: '10px' };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'left', marginLeft: '30px' }}>
        <label style={{ fontWeight: 'bold', color: '#1B3672' }}>{`Ver.${index + 1}`}</label>
      </div>
      <textarea
        style={ isExpanded ? expandedStyle : defaultStyle}
        onClick={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        value={version.value}
        onChange={(e) => updateVersion(index, e.target.value, false)}
      />
      <CopyToClipboard text={version.value} onCopy={() => updateVersion(index, version.value, true)}>
        <button style={copyButtonStyle}>
          <Copy />
        </button>
      </CopyToClipboard>
      <div style={{ marginTop: '1px' }}>
        {version.copied ? <span style={{ color: '#F39459' }}>コピーしました！</span> : null}
      </div>
    </div>
  );
};

const Clipboard = () => {
  const [versions, setVersions] = useState([
    { value: '', copied: false },
    { value: '', copied: false },
    { value: '', copied: false },
    { value: '', copied: false },
    { value: '', copied: false }
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
