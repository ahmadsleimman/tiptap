import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

Modal.setAppElement('#root');
console.log(noteId);
const Editor = ({ noteId }) => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
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
            Placeholder.configure({ placeholder: 'Start typing...', className: 'custom-placeholder' }),
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
        content,
        onUpdate: ({ editor }) => {
            // Autosave on every update
            const title = document.getElementById('title').value;
            const content = editor.getHTML();
            handleAutosave(title, content);
        },
    });

    // Fetch the existing note if `noteId` is provided
    useEffect(() => {
        if (noteId) {
            axios
                .get(`/get-notes/${noteId}`)
                .then((response) => {
                    setNote(response.data.content);
                    setTitle(response.data.title);
                })
                .catch((error) => console.error('Error fetching note:', error));
        }
    }, [noteId]);

    // Function to handle autosave
    const handleAutosave = (title, content) => {
        if (!isSaving) {
            setIsSaving(true);
            axios
                .put(`/notes/${noteId}`, { title, content })
                .then(() => setIsSaving(false))
                .catch((error) => {
                    console.error('Error saving note:', error);
                    setIsSaving(false);
                });
        }
    };

    const saveNote = async () => {
        if (!title.trim()) {
            alert('Please enter a title for the note.');
            return;
        }

        try {
            const content = editor.getHTML();
            const response = await axios.post('/notes', { title, content });
            console.log('Note saved:', response.data);
            setNote(response.data.note); // Update with the new note
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleUpdate = () => {
        const content = editor.getHTML();
        axios
            .put(`/notes/${noteId}`, { title, content })
            .then((response) => {
                alert('Note updated successfully!');
                setNote(response.data.note); // Update the state with the updated note
            })
            .catch((error) => console.error('Error updating note:', error));
    };

    // Table insertion modal
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

    // Handle dropdown toggle for color and highlight
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
           
           
            {/* Title Input */}
            {/* <div className="subtitle-area"> */}
            <div className="logo-container">
            <img src="/logo.png" alt="Logo" />
            </div>
            <input
                id="title"
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => { const newTitle = e.target.value;
                    setTitle(newTitle);  // Update the state with the new title
                    const content = editor.getHTML();  // Get the content from the editor
                    handleAutosave(newTitle, content);  // Trigger autosave with updated title and content
                }}
                style={{
                    width: '50%',
                    padding: '10px',
                    border: 'none',
                    fontSize: '1rem',
                }}
            />
             {/* </div> */}

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
  {/* Editor Container */}
  <div className="editor-container">
                <EditorContent editor={editor} className="tiptap-editor" />
            </div>
            {/* Modal for Table Insertion */}
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
