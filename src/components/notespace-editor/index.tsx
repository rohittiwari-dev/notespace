'use client';
import React, { useEffect } from 'react';
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
import useAppStore from '@/store';
import trpc from '@/lib/trpc/client';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

function NotespaceEditor({ noteId }: { noteId: string }) {
	const [isLoadingSimulation, setIsLoadingSimulation] = React.useState(true);
	const trpcUtils = trpc.useUtils();
	const { resolvedTheme } = useTheme();
	const { updateFile, module } = useAppStore();
	const { mutate: updateFileBackend } = trpc.modules.updateFile.useMutation({
		onSuccess: (data) => {
			trpcUtils.modules.getModule.invalidate({ moduleId: data.module });
		},
	});
	const debouncedUpdate = useDebouncedCallback(() => {
		const file = module?.files?.find((f) => f.id === noteId);
		if (file) {
			updateFileBackend({
				file: { ...file, cover: undefined },
				fileId: noteId,
				moduleId: module?.id as string,
			});
		}
	}, 1500);
	const editor = useCreateBlockNote({
		initialContent: module?.files?.find((f) => f.id === noteId)?.data || [
			{
				type: 'paragraph',
				content: 'Welcome to this demo!',
			},
		],
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

	useEffect(() => {
		if (isLoadingSimulation) {
			const timer = setTimeout(() => {
				setIsLoadingSimulation(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isLoadingSimulation]);

	// Renders the editor instance using a React component.
	return (
		<BlockNoteView
			data-theming-css-demo
			onChange={(editor) => {
				setTimeout(() => {
					updateFile(noteId, { data: editor.document });
					debouncedUpdate();
				}, 0);
			}}
			editor={editor}
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			className={cn('bg-transparent w-full h-full overflow-hidden', {
				'animate-pulse duration-1000 pointer-events-none':
					isLoadingSimulation &&
					!module?.files?.find((f) => f.id === noteId)?.data,
			})}
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
					const defaultItems = getDefaultReactSlashMenuItems(editor);
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
	);
}

export default NotespaceEditor;
