import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type TSettingSectionProps = {
	settingName: string;
	description: string;
	body?: ReactNode;
	settingTitleClassName?: string;
	settingBodyClassName?: string;
	settingContainerClassName?: string;
	settingDescriptionClassName?: string;
};

export const SettingSectionItem = ({
	settingName,
	body,
	description,
	settingContainerClassName,
	settingTitleClassName,
	settingDescriptionClassName,
	settingBodyClassName,
}: TSettingSectionProps) => {
	return (
		<div
			className={cn(
				'flex text-muted dark:text-foreground/60 w-full justify-between p-2',
				settingContainerClassName,
			)}
		>
			<div className={settingBodyClassName}>
				<h1 className={cn('text-base', settingTitleClassName)}>
					{settingName}
				</h1>
				<p className={cn('text-xs', settingDescriptionClassName)}>
					{description}
				</p>
			</div>
			{body && body}
		</div>
	);
};

const SettingSection = ({
	settingName,
	body,
	description,
	SettingContent,
	settingBodyClassName,
	settingDescriptionClassName,
	settingTitleClassName,
	settingContainerClassName,
}: TSettingSectionProps & { SettingContent: ReactNode }) => {
	return (
		<>
			<SettingSectionItem
				settingName={settingName}
				description={description}
				body={body}
				settingBodyClassName={settingBodyClassName}
				settingDescriptionClassName={settingDescriptionClassName}
				settingTitleClassName={settingTitleClassName}
				settingContainerClassName={settingContainerClassName}
			/>
			<div className="p-2 w-full border-t">{SettingContent}</div>
		</>
	);
};

export default SettingSection;
