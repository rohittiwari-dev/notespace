'use client';
import React from 'react';
import {
	BlockTypeSelectItem,
	blockTypeSelectItems,
	FormattingToolbar,
	FormattingToolbarController,
	getDefaultReactSlashMenuItems,
	SuggestionMenuController,
	useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import * as locales from '@blocknote/core/locales';
import {
	multiColumnDropCursor,
	locales as multiColumnLocales,
	withMultiColumn,
} from '@blocknote/xl-multi-column';
import { useTheme } from 'next-themes';
import {
	BlockNoteSchema,
	defaultBlockSpecs,
	defaultStyleSpecs,
	filterSuggestionItems,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { codeBlock } from '@blocknote/code-block';
import { Alert, insertAlert } from './note-ui/alert';
import { Font } from './note-ui/font';
import { MdInfo } from 'react-icons/md';

function NotespaceEditor() {
	const [mounted, setMounted] = React.useState(false);
	const { resolvedTheme } = useTheme();

	const editor = useCreateBlockNote({
		dropCursor: multiColumnDropCursor,
		codeBlock: {
			...codeBlock,
			indentLineWithTab: true,
		},

		schema: withMultiColumn(
			BlockNoteSchema.create({
				blockSpecs: {
					...defaultBlockSpecs,
					alert: Alert,
				},
				styleSpecs: {
					...defaultStyleSpecs,
					font: Font,
				},
			}),
		),
		dictionary: {
			...locales.en,
			multi_column: multiColumnLocales.en,
		},
		tables: {
			splitCells: true,
			cellBackgroundColor: true,
			cellTextColor: true,
			headers: true,
		},
		domAttributes: {
			editor: {
				class: '!bg-transparent',
			},
		},
		animations: true,
	});

	React.useEffect(() => {
		setMounted(true);
	}, []);
	// Renders the editor instance using a React component.
	return (
		mounted && (
			<BlockNoteView
				data-theming-css-demo
				editor={editor}
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
				className="bg-transparent w-full h-full overflow-hidden "
				slashMenu={false}
			>
				<FormattingToolbarController
					formattingToolbar={() => (
						// Uses the default Formatting Toolbar.
						<FormattingToolbar
							// Sets the items in the Block Type Select.
							blockTypeSelectItems={[
								// Gets the default Block Type Select items.
								...blockTypeSelectItems(editor.dictionary),
								// Adds an item for the Alert block.
								{
									name: 'Notice',
									type: 'alert',
									icon: MdInfo,
									isSelected: (block: any) =>
										block.type === 'alert',
								} satisfies BlockTypeSelectItem,
							]}
						/>
					)}
				/>
				<SuggestionMenuController
					triggerCharacter="/"
					getItems={async (query) => {
						// Gets all default slash menu items.
						const defaultItems =
							getDefaultReactSlashMenuItems(editor);
						// Finds index of last item in "Basic blocks" group.
						const lastBasicBlockIndex = defaultItems.findLastIndex(
							(item) => item.group === 'Basic blocks',
						);
						// Inserts the Alert item as the last item in the "Basic blocks" group.
						defaultItems.splice(
							lastBasicBlockIndex + 1,
							0,
							insertAlert(editor),
						);

						// Returns filtered items based on the query.
						return filterSuggestionItems(defaultItems, query);
					}}
				/>
			</BlockNoteView>
		)
	);
}

export default NotespaceEditor;
