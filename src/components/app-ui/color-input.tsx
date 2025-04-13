import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const ColorInput = ({
	onChange = () => {},
	color,
	inputEditable = true,
	disabled = false,
}: {
	onChange?: (color: string) => void;
	color?: string;
	inputEditable?: boolean;
	disabled?: boolean;
}) => {
	const [selectedColor, setSelectedColor] = useState(color || '#FFFFFF');

	useEffect(() => {
		if (color) {
			setSelectedColor(color);
			onChange?.(color);
		}
	}, [color, onChange]);

	return (
		<label
			htmlFor="color-chooser"
			className="flex w-fit gap-2 items-center"
		>
			<input
				id="color-chooser"
				type="color"
				disabled={disabled}
				readOnly={!inputEditable}
				defaultValue={selectedColor}
				onChange={(e) => {
					setSelectedColor(e.currentTarget.value);
					onChange?.(e.currentTarget.value);
				}}
				className="w-7 cursor-pointer !rounded-full bg-transparent !outline-transparent !border-transparent appearance-none p-0 h-8"
			/>
			<Input
				value={selectedColor}
				readOnly={!inputEditable}
				disabled={!inputEditable || disabled}
				onChange={(e) => {
					setSelectedColor(e.currentTarget.value);
					onChange?.(e.currentTarget.value);
				}}
				className="w-fit disabled:opacity-80 bg-secondary-10 dark:bg-secondary-700/40"
			/>
		</label>
	);
};

export default ColorInput;
