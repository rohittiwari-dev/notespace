import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Separator } from '@/components/ui/separator';
import { defaultProps, insertOrUpdateBlock } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { RiAlertFill } from 'react-icons/ri';
import { MdCancel, MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

// The types of alerts that users can choose from.
export const alertTypes = [
	{
		title: 'Warning',
		value: 'warning',
		icon: MdError,
		color: '#e69819',
		backgroundColor: {
			light: '#fff6e6',
			dark: '#805d20',
		},
	},
	{
		title: 'Error',
		value: 'error',
		icon: MdCancel,
		color: '#d80d0d',
		backgroundColor: {
			light: '#ffe6e6',
			dark: '#802020',
		},
	},
	{
		title: 'Info',
		value: 'info',
		icon: MdInfo,
		color: '#507aff',
		backgroundColor: {
			light: '#e6ebff',
			dark: '#203380',
		},
	},
	{
		title: 'Success',
		value: 'success',
		icon: MdCheckCircle,
		color: 'var(--color-green-200)',
		backgroundColor: {
			light: 'var(--color-green-100)',
			dark: 'var(--color-green-800)',
		},
	},
] as const;

// The Alert block.
export const Alert = createReactBlockSpec(
	{
		type: 'alert',
		propSchema: {
			textAlignment: defaultProps.textAlignment,
			textColor: defaultProps.textColor,
			type: {
				default: 'warning',
				values: ['warning', 'error', 'info', 'success'],
			},
		},
		content: 'inline',
	},
	{
		render: (props) => {
			const alertType = alertTypes.find(
				(a) => a.value === props.block.props.type,
			)!;
			const Icon = alertType.icon;
			return (
				<div className="alert" data-alert-type={props.block.props.type}>
					{/*Icon which opens a menu to choose the Alert type*/}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Icon
								className="alert-icon mx-1"
								data-alert-icon-type={props.block.props.type}
								size={24}
							/>
						</DropdownMenuTrigger>
						{/*Dropdown to change the Alert type*/}
						<DropdownMenuContent>
							<DropdownMenuLabel>Alert Type</DropdownMenuLabel>
							<Separator />
							{alertTypes.map((type) => {
								const ItemIcon = type.icon;

								return (
									<DropdownMenuItem
										key={type.value}
										onClick={() =>
											props.editor.updateBlock(
												props.block,
												{
													type: 'alert',
													props: { type: type.value },
												},
											)
										}
									>
										<ItemIcon
											className="alert-icon"
											data-alert-icon-type={type.value}
										/>{' '}
										<span>{type.title}</span>
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
					{/*Rich text field for user to type in*/}
					<div className="inline-content" ref={props.contentRef} />
				</div>
			);
		},
	},
);

// Slash menu item to insert an Alert block
export const insertAlert = (editor: any) => ({
	title: 'Notice',
	subtext: 'Alert for emphasizing text',
	onItemClick: () =>
		// If the block containing the text caret is empty, `insertOrUpdateBlock`
		// changes its type to the provided block. Otherwise, it inserts the new
		// block below and moves the text caret to it. We use this function with an
		// Alert block.
		insertOrUpdateBlock(editor, {
			type: 'alert',
		}),
	aliases: [
		'notice',
		'alert',
		'notification',
		'emphasize',
		'warning',
		'error',
		'info',
		'success',
	],
	group: 'Basic blocks',
	icon: <RiAlertFill />,
});
