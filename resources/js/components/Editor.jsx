import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Modal from 'react-modal';
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from 'react-icons/ai';
import { BiHighlight, BiListUl, BiListOl, BiLinkAlt, BiUnlink } from 'react-icons/bi';
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from 'react-icons/fi';
import { MdOutlineTableChart } from 'react-icons/md';
import './style.css';

// Accessibility configuration for React Modal
Modal.setAppElement('#root');

const Editor = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(2);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start typing...' }),
            Link.configure({ openOnClick: true, HTMLAttributes: { target: '_blank' } }),
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({ levels: [1, 2, 3] }),
            Highlight.configure({ multicolor: true }),
            TextStyle,
            Color,
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const handleInsertTable = () => {
        if (rows > 0 && cols > 0) {
            editor.chain().focus().insertTable({ rows, cols }).run();
            closeModal();
        } else {
            alert('Please enter valid numbers for rows and columns.');
        }
    };
    const handleDropdownToggle = (type) => {
        if (type === 'color') {
          setShowColorPicker(!showColorPicker);
          setShowHighlightPicker(false);
        } else if (type === 'highlight') {
          setShowHighlightPicker(!showHighlightPicker);
          setShowColorPicker(false);
        }
      };
      const handleHighlightSelection = (highlightColor) => {
      editor.chain().focus().toggleHighlight({ color: highlightColor }).run();
      setShowHighlightPicker(false); // Close the dropdown after selection
    };
     

    if (!editor) return <p>Loading editor...</p>;

    return (
        <div>
            <h1>Enhanced TipTap Editor</h1>

            {editor && (
                <BubbleMenu editor={editor} className="bubble-menu" tippyOptions={{ duration: 100 }}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <AiOutlineBold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <AiOutlineItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'is-active' : ''}
                    >
                        <AiOutlineUnderline />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <BiListUl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <BiListOl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                    >
                        <FiAlignLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                    >
                        <FiAlignCenter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                    >
                        <FiAlignRight />
                    </button>
                    
          {/* Font Color Picker */}
          <button onClick={() => handleDropdownToggle('color')}>
            <span>A</span>
          </button>
          {showColorPicker && (
            <div className="dropdown">
              {['black', 'red', 'orange', 'blue', 'green', 'yellow'].map((color) => (
                <button
                  key={color}
                  onClick={() => editor.chain().focus().setColor(color).run()}
                  style={{
                    backgroundColor: color,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    margin: '2px',
                  }}
                ></button>
              ))}
            </div>
          )}
          {/* Highlight Picker */}
          <button onClick={() => handleDropdownToggle('highlight')}>
            <BiHighlight />
          </button>
          {showHighlightPicker && (
          <div className="dropdown">
            {['#FFF2CC', '#DDEFFF', '#F8CECC', '#D4E6CC'].map((highlight) => (
              <button
                key={highlight}
                onClick={() => handleHighlightSelection(highlight)}
                style={{
                  backgroundColor: highlight,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  margin: '2px',
                }}
              ></button>
            ))}
          </div>
        )}
          
          
          {/* Links */}
          <button
            onClick={() => {
              const url = prompt('Enter the URL:');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
          >
            <BiLinkAlt />
          </button>
          <button onClick={() => editor.chain().focus().unsetLink().run()}>
            <BiUnlink />
          </button>
    
                </BubbleMenu>
            )}

            <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}>
                <EditorContent editor={editor} />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
            >
                <h2>Insert Table</h2>
                <label>
                    Rows:
                    <input
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <label>
                    Columns:
                    <input
                        type="number"
                        value={cols}
                        onChange={(e) => setCols(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <button onClick={handleInsertTable}>Insert</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default Editor;
