"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import chartPlugin from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell';
import umlPlugin from '@toast-ui/editor-plugin-uml';
import colorPlugin from '@toast-ui/editor-plugin-color-syntax';

// Dynamically import the Editor with server-side rendering disabled
const Editor = dynamic(() => import('@toast-ui/react-editor').then((moddule) => moddule.Editor), { ssr: false });

const BlogPostEditor = ({ setPostContent, initial_value = '' }) => {
    const editorRef = useRef(null);

    const plugins = [
        chartPlugin, // Chart plugin
        codeSyntaxHighlightPlugin, // Code Syntax Highlight
        colorPlugin, // Color Syntax
        tableMergedCellPlugin, // Table Merged Cell
        umlPlugin, // UML plugin
    ];

    return (
        <Editor
            ref={editorRef}
            theme='dark'
            initialValue={
                !!initial_value ?
                    initial_value :
                    "Write your blog post content here..."
            }
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            useCommandShortcut={true}
            plugins={plugins}
            onChange={(e) => {
                const editorInstance = editorRef.current?.getInstance();

                if (editorInstance) {
                    const html_content = editorInstance?.getHTML();
                    const md_content = editorInstance?.getMarkdown();

                    setPostContent({
                        html_content,
                        md_content
                    });
                }
            }}
        />
    );
};

export default BlogPostEditor;
