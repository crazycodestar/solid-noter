import { Editor } from "@tiptap/core";
import { JSX } from "solid-js/jsx-runtime";
import { Control } from "./Control";
import { BlockquoteIcon } from "./icons/BlockquoteIcon";
import { BulletListIcon } from "./icons/BulletListIcon";
import { CodeBlockIcon } from "./icons/CodeBlockIcon";
import { CodeIcon } from "./icons/CodeIcon";
import { OrderedListIcon } from "./icons/OrderedListIcon";
import { ParagraphIcon } from "./icons/ParagraphIcon";
import { Separator } from "./Separator";

interface ToolbarProps {
	editor: Editor;
}

export function ToolbarContents(props: ToolbarProps): JSX.Element {
	return (
		<div class="p-2 flex space-x-1">
			<div class="flex space-x-1">
				<Control
					key="paragraph"
					class="font-bold"
					editor={props.editor}
					onChange={() => props.editor.chain().focus().setParagraph().run()}
					title="Paragraph"
				>
					<ParagraphIcon class="w-full h-full m-1" />
				</Control>
				<Control
					key="heading-1"
					class="font-bold"
					editor={props.editor}
					onChange={() =>
						props.editor.chain().focus().setHeading({ level: 1 }).run()
					}
					isActive={(editor) => editor.isActive("heading", { level: 1 })}
					title="Heading 1"
				>
					H1
				</Control>
				<Control
					key="heading-2"
					class="font-bold"
					editor={props.editor}
					onChange={() =>
						props.editor.chain().focus().setHeading({ level: 2 }).run()
					}
					isActive={(editor) => editor.isActive("heading", { level: 2 })}
					title="Heading 2"
				>
					H2
				</Control>
			</div>
			<Separator />
			<div class="flex space-x-1">
				<Control
					key="bold"
					class="font-bold"
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleBold().run()}
					title="Bold"
				>
					B
				</Control>
				<Control
					key="italic"
					class="italic"
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleItalic().run()}
					title="Italic"
				>
					I
				</Control>
				<Control
					key="strike"
					class="line-through"
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleStrike().run()}
					title="Strike Through"
				>
					S
				</Control>
				<Control
					key="code"
					class=""
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleCode().run()}
					title="Code"
				>
					<CodeIcon class="w-full h-full m-1" />
				</Control>
			</div>
			<Separator />
			<div class="flex space-x-1">
				<Control
					key="bulletList"
					class=""
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleBulletList().run()}
					title="Bullet List"
				>
					<BulletListIcon class="w-full h-full m-1" />
				</Control>
				<Control
					key="orderedList"
					class=""
					editor={props.editor}
					onChange={() =>
						props.editor.chain().focus().toggleOrderedList().run()
					}
					title="Ordered List"
				>
					<OrderedListIcon class="w-full h-full m-1" />
				</Control>
				<Control
					key="blockquote"
					class=""
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleBlockquote().run()}
					title="Blockquote"
				>
					<BlockquoteIcon class="w-full h-full m-1" />
				</Control>
				<Control
					key="codeBlock"
					class=""
					editor={props.editor}
					onChange={() => props.editor.chain().focus().toggleCodeBlock().run()}
					title="Code Block"
				>
					<CodeBlockIcon class="w-full h-full m-1" />
				</Control>
			</div>
		</div>
	);
}
