"use client";
import React, { useState } from "react";
import PlaygroundEditorTheme from "@/lexical_Lib/theme/EditorTheme";
import PlaygroundNodes from "@nodes/PlaygroundNodes";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import HTMLSerializerPlugin from "@plugins/HtmlSerializerPlugin";

import AutoLinkPlugin from "@plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "@plugins/CodeHighlightPlugin";
import YouTubePlugin from "@plugins/YouTubePlugin";
import TwitterPlugin from "@plugins/TwitterPlugin";
import FigmaPlugin from "@plugins/FigmaPlugin";
import AutoEmbedPlugin from "@plugins/AutoEmbedPlugin";
import Placeholder from "@ui/Placeholder";
import ToolbarPlugin from "@plugins/ToolbarNormalPlugin";

import DomToLexicalPlugin from "@/lexical_Lib/plugins/DomToLexicalPlugin";
import EditorSaveButtonPlugin from "@plugins/EditorSaveButtonPlugin";
import FloatingTextFormatToolbarPlugin from "@/lexical_Lib/plugins/FloatingTextFormatToolbarPlugin";

const editorConfig = {
  onError(error: Error) {
    throw error;
  },
  theme: PlaygroundEditorTheme,
  namespace: "FU-BLOG",
  nodes: [...PlaygroundNodes],
};

type TProps = {
  htmlString: string;
  setHtmlString: React.Dispatch<React.SetStateAction<string>>;
  isNeedSave: boolean;
  useEditorFor: string;
};

function BioEditor({
  htmlString,
  setHtmlString,
  isNeedSave,
  useEditorFor,
}: TProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="editor-shell">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="shadow-primary rounded-[10px] overflow-hidden">
          <div>
            <ToolbarPlugin></ToolbarPlugin>
          </div>
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller-normal">
                  <div className="editor" ref={onRef}>
                    <ContentEditable className="editor-input-normal" />
                  </div>
                </div>
              }
              placeholder={
                <Placeholder className="absolute top-[15px] left-[12px] text-[14px] text-gray-500">
                  {"Write your content here..."}
                </Placeholder>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            {isNeedSave ? <DomToLexicalPlugin html={htmlString} /> : null}
            {/* <TreeViewPlugin/> */}
            {floatingAnchorElem && (
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
              />
            )}
            <HistoryPlugin />
            <AutoFocusPlugin />
            <HashtagPlugin />
            <AutoLinkPlugin />
            <AutoEmbedPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <CodeHighlightPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            <TwitterPlugin />
          </div>
        </div>
        {isNeedSave ? (
          <EditorSaveButtonPlugin
            setHtmlString={setHtmlString}
            useFor={useEditorFor}
          />
        ) : (
          <HTMLSerializerPlugin setHtmlString={setHtmlString} />
        )}
      </LexicalComposer>
    </div>
  );
}

export default BioEditor;
