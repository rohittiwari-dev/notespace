'use client';
import React from 'react';
import DarkModeIcon from '@/assets/system/dark-theme-mode.png';
import SystemModeIcon from '@/assets/system/system-theme-mode.png';
import LightModeIcon from '@/assets/system/light-theme-mode.png';
import CheckStateButton from '../../app-ui/custom-radio-btn';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const ThemeSelectorSetting = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div className="flex  w-full items-center gap-5">
			<CheckStateButton
				containerClassName="w-30 h-20"
				checked={theme === 'dark'}
				label="Dark"
				showBottomLabel
				onChecked={() => {
					setTheme('dark');
				}}
				body={
					<Image
						src={DarkModeIcon}
						width={100}
						height={100}
						alt="Theme Dark mode"
						className="w-full h-full object-cover"
					/>
				}
			/>
			<CheckStateButton
				containerClassName="w-30 h-20"
				checked={theme === 'light'}
				label="Light"
				showBottomLabel
				onChecked={() => {
					setTheme('light');
				}}
				body={
					<Image
						src={LightModeIcon}
						width={100}
						height={100}
						alt="Theme Dark mode"
						className="w-full h-full object-cover"
					/>
				}
			/>
			<CheckStateButton
				containerClassName="w-30 h-20"
				checked={theme === 'system'}
				label="System"
				showBottomLabel
				onChecked={() => {
					setTheme('system');
				}}
				body={
					<Image
						src={SystemModeIcon}
						width={100}
						height={100}
						alt="Theme Dark mode"
						className="w-full h-full object-cover"
					/>
				}
			/>
		</div>
	);
};

export default ThemeSelectorSetting;
