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
import { BlockNoteView } from '@blocknote/shadcn';
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
import '@blocknote/shadcn/style.css';
import { codeBlock } from '@blocknote/code-block';
import { Alert, insertAlert } from './note-ui/alert';
import { Font } from './note-ui/font';
import { RiAlertFill } from 'react-icons/ri';

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
			placeholders: {
				...locales.en.placeholders,
				emptyDocument: 'Start typing..',
			},
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
			<div className="relative w-full h-full bg-sidebar/60 backdrop-blur-md rounded-lg shadow transition-colors duration-300">
				<BlockNoteView
					data-theming-css-demo
					editor={editor}
					theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
					className="bg-transparent h-full w-full overflow-hidden rounded-lg border border-secondary-200/60 dark:border-secondary-700/80"
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
										icon: RiAlertFill,
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
							const lastBasicBlockIndex =
								defaultItems.findLastIndex(
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
			</div>
		)
	);
}

export default NotespaceEditor;
