import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Diamond = ({ className }: ComponentProps<"svg">) => {
	return (
		<svg
			viewBox="0 0 30 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("h-[28px] w-[30px]", className)}
		>
			<g filter="url(#filter0_bdi_17_2032)">
				<path
					d="M25.3319 8.50166L22.1176 4.80297C21.6737 4.29222 21.0375 4 20.3694 4H9.47594C8.80785 4 8.17164 4.29222 7.72779 4.80297L4.51349 8.50166V8.50166C4.14296 8.92802 4.55034 9.48038 5.1152 9.48038H24.7302C25.295 9.48038 25.7024 8.92802 25.3319 8.50166V8.50166Z"
					fill="#CFCBFC"
					shapeRendering="crispEdges"
				/>
				<path
					d="M4.00505 10.2488C3.97579 9.79357 4.39616 9.48038 4.85238 9.48038H25.1476C25.6038 9.48038 26.0242 9.79357 25.9949 10.2488C25.9654 10.7087 25.8061 11.1626 25.515 11.5497L16.8539 23.0663C15.9176 24.3112 14.0824 24.3112 13.1461 23.0663L4.48505 11.5497C4.19391 11.1626 4.03462 10.7087 4.00505 10.2488Z"
					fill="url(#paint0_linear_17_2032)"
					fillOpacity="0.9"
					shapeRendering="crispEdges"
				/>
				<path
					d="M22.0232 4.88496L25.2375 8.58365C25.3832 8.75126 25.3751 8.93386 25.2774 9.08211C25.1757 9.23646 24.973 9.35538 24.7302 9.35538H5.1152C4.87241 9.35538 4.66967 9.23646 4.56794 9.08211C4.47023 8.93386 4.46218 8.75126 4.60784 8.58365L7.82214 4.88496C8.2426 4.40113 8.84457 4.125 9.47594 4.125H20.3694C21.0008 4.125 21.6028 4.40113 22.0232 4.88496ZM4.85238 9.60538H5.1152H24.7302H25.1476C25.5601 9.60538 25.8932 9.88315 25.8702 10.2408C25.8421 10.6773 25.691 11.1077 25.4151 11.4746L16.754 22.9911C15.8677 24.1696 14.1323 24.1696 13.246 22.9911L4.58495 11.4746C4.30899 11.1077 4.15785 10.6773 4.1298 10.2408C4.10681 9.88315 4.43993 9.60538 4.85238 9.60538Z"
					stroke="white"
					strokeOpacity="0.15"
					strokeWidth="0.25"
					strokeLinecap="round"
					strokeLinejoin="round"
					shapeRendering="crispEdges"
				/>
			</g>
			<defs>
				<filter
					id="filter0_bdi_17_2032"
					x="0.00366211"
					y="0"
					width="29.9927"
					height="28"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_17_2032"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_backgroundBlur_17_2032"
						result="effect2_dropShadow_17_2032"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_17_2032"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite
						in2="hardAlpha"
						operator="arithmetic"
						k2="-1"
						k3="1"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect3_innerShadow_17_2032"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_17_2032"
					x1="4"
					y1="9.48038"
					x2="20.8396"
					y2="21.1953"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#9533F9" />
					<stop offset="1" stopColor="#1B68F9" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const Wallet = ({ className }: ComponentProps<"svg">) => {
	return (
		<svg
			viewBox="0 0 28 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("h-[25px] w-[28px]", className)}
		>
			<g filter="url(#filter0_bdi_96_1042)">
				<rect
					x="4"
					y="4.47998"
					width="20"
					height="16"
					rx="5"
					fill="url(#paint0_linear_96_1042)"
					shapeRendering="crispEdges"
				/>
				<rect
					x="4.125"
					y="4.60498"
					width="19.75"
					height="15.75"
					rx="4.875"
					stroke="url(#paint1_linear_96_1042)"
					strokeOpacity="0.7"
					strokeWidth="0.25"
					shapeRendering="crispEdges"
				/>
			</g>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.12067 5.39184C6.93477 4.81733 7.92812 4.47986 9.0003 4.47986H19.0003C20.2925 4.47986 21.4703 4.97007 22.3577 5.77468L21.6743 4.10622C20.6277 1.55083 17.7077 0.32774 15.1523 1.37437L7.57744 4.47686C7.02688 4.70235 6.53816 5.01481 6.12067 5.39184Z"
				fill="#D3B0FF"
			/>
			<g filter="url(#filter1_d_96_1042)">
				<path
					d="M8 14.5648H14"
					stroke="#D3B0FF"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					shapeRendering="crispEdges"
				/>
			</g>
			<g filter="url(#filter2_d_96_1042)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M19.5 9.97998H23.7539V14.98H19.5C18.1193 14.98 17 13.8607 17 12.48C17 11.0993 18.1193 9.97998 19.5 9.97998ZM19.5 10.6691C19.0858 10.6691 18.75 10.977 18.75 11.3566C18.75 11.7363 19.0858 12.0441 19.5 12.0441H19.7C20.1142 12.0441 20.45 11.7363 20.45 11.3566C20.45 10.977 20.1142 10.6691 19.7 10.6691H19.5Z"
					fill="#D3B0FF"
				/>
			</g>
			<defs>
				<filter
					id="filter0_bdi_96_1042"
					x="0"
					y="0.47998"
					width="28"
					height="24"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_96_1042"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_backgroundBlur_96_1042"
						result="effect2_dropShadow_96_1042"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_96_1042"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite
						in2="hardAlpha"
						operator="arithmetic"
						k2="-1"
						k3="1"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.38 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect3_innerShadow_96_1042"
					/>
				</filter>
				<filter
					id="filter1_d_96_1042"
					x="5.25"
					y="11.8147"
					width="11.5"
					height="5.5"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_96_1042"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_96_1042"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_d_96_1042"
					x="15"
					y="7.97998"
					width="10.7539"
					height="9"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_96_1042"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_96_1042"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_96_1042"
					x1="-2.5"
					y1="-1.92002"
					x2="27.1187"
					y2="31.1008"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#9533F9" />
					<stop offset="0.9999" stopColor="#1B68F9" />
					<stop offset="1" stopColor="#829EFF" stopOpacity="0.04" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_96_1042"
					x1="4.5"
					y1="6.87998"
					x2="18.633"
					y2="22.0225"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.15" />
					<stop offset="1" stopColor="white" stopOpacity="0.44" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const Spinner = ({ className }: ComponentProps<"svg">) => {
	return (
		<svg
			viewBox="0 0 26 26"
			fill="none"
			className={cn("h-[26px] w-[26px]", className)}
		>
			<g filter="url(#filter0_bdi_5_23908)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.0201 5.75003C11.5994 5.74607 10.2088 6.15965 9.02109 6.93936C7.83341 7.71908 6.90101 8.83056 6.33971 10.1357C6.17607 10.5163 5.73494 10.6921 5.35442 10.5284C4.9739 10.3648 4.79809 9.92365 4.96174 9.54313C5.63916 7.96792 6.76448 6.62647 8.19788 5.68544C9.63128 4.7444 11.3096 4.24526 13.0243 4.25003C14.739 4.2548 16.4145 4.76327 17.8426 5.71226C19.2707 6.66126 20.3886 8.00895 21.0572 9.5879C21.2188 9.96932 21.0405 10.4095 20.6591 10.571C20.2776 10.7325 19.8375 10.5543 19.676 10.1728C19.122 8.86456 18.1957 7.7479 17.0124 6.96159C15.8291 6.17528 14.4408 5.75398 13.0201 5.75003Z"
					fill="url(#paint0_linear_5_23908)"
				/>
				<path
					d="M13.0204 5.62503C11.5752 5.62101 10.1606 6.04171 8.95249 6.83487C7.74434 7.62803 6.79585 8.75868 6.22488 10.0864C6.08851 10.4034 5.7209 10.55 5.40381 10.4136C5.08671 10.2772 4.9402 9.90961 5.07657 9.59251C5.74432 8.03981 6.85356 6.71752 8.26648 5.78993C9.6794 4.86234 11.3337 4.37033 13.0239 4.37503C14.7141 4.37973 16.3657 4.88094 17.7734 5.81637C19.1812 6.75181 20.283 8.08025 20.9421 9.63664C21.0767 9.9545 20.9282 10.3213 20.6103 10.4559C20.2925 10.5905 19.9257 10.4419 19.7911 10.1241C19.2275 8.79326 18.2853 7.65735 17.0816 6.85748C15.8779 6.05761 14.4657 5.62905 13.0204 5.62503Z"
					stroke="url(#paint1_linear_5_23908)"
					strokeOpacity="0.7"
					strokeWidth="0.25"
					strokeLinecap="round"
				/>
			</g>
			<g filter="url(#filter1_d_5_23908)">
				<path
					d="M4.23162 6.51544L4.96103 9.67497C5.08527 10.2131 5.62222 10.5486 6.16035 10.4244L9.31989 9.69499"
					stroke="#D3B0FF"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</g>
			<g filter="url(#filter2_bdi_5_23908)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.0401 20.2498C14.474 20.2418 15.8733 19.8089 17.0611 19.0056C18.2489 18.2024 19.1719 17.065 19.7133 15.7372C19.8697 15.3536 20.3074 15.1695 20.691 15.3259C21.0745 15.4823 21.2587 15.92 21.1023 16.3035C20.4489 17.906 19.335 19.2788 17.9014 20.2482C16.4678 21.2176 14.7789 21.7402 13.0484 21.7497C11.3178 21.7593 9.62327 21.2555 8.17904 20.3021C6.73481 19.3486 5.60574 17.9882 4.93463 16.3931C4.774 16.0113 4.95329 15.5716 5.33509 15.4109C5.71689 15.2503 6.15662 15.4296 6.31725 15.8114C6.87331 17.1331 7.80882 18.2602 9.00547 19.0503C10.2021 19.8403 11.6062 20.2577 13.0401 20.2498Z"
					fill="url(#paint2_linear_5_23908)"
				/>
				<path
					d="M13.0408 20.3748C14.4994 20.3667 15.9228 19.9263 17.1311 19.1092C18.3394 18.2921 19.2783 17.1351 19.829 15.7844C19.9594 15.4648 20.3241 15.3113 20.6438 15.4416C20.9634 15.5719 21.1169 15.9367 20.9865 16.2563C20.3425 17.8359 19.2445 19.1891 17.8313 20.1446C16.4182 21.1002 14.7535 21.6153 13.0477 21.6247C11.3418 21.6342 9.67151 21.1376 8.24791 20.1977C6.82431 19.2579 5.71137 17.917 5.04985 16.3446C4.91599 16.0264 5.0654 15.66 5.38357 15.5261C5.70173 15.3923 6.06817 15.5417 6.20203 15.8599C6.76768 17.2044 7.71932 18.3509 8.9366 19.1546C10.1539 19.9582 11.5821 20.3828 13.0408 20.3748Z"
					stroke="url(#paint3_linear_5_23908)"
					strokeOpacity="0.7"
					strokeWidth="0.25"
					strokeLinecap="round"
				/>
			</g>
			<g filter="url(#filter3_d_5_23908)">
				<path
					d="M21.7681 19.4846L21.0387 16.325C20.9145 15.7869 20.3775 15.4514 19.8394 15.5756L16.6799 16.305"
					stroke="#D3B0FF"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</g>
			<defs>
				<filter
					id="filter0_bdi_5_23908"
					x="0.900635"
					y="0.25"
					width="24.2161"
					height="14.3806"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_5_23908"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_backgroundBlur_5_23908"
						result="effect2_dropShadow_5_23908"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_5_23908"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite
						in2="hardAlpha"
						operator="arithmetic"
						k2="-1"
						k3="1"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.38 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect3_innerShadow_5_23908"
					/>
				</filter>
				<filter
					id="filter1_d_5_23908"
					x="1.48145"
					y="3.76538"
					width="10.5886"
					height="9.43506"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_5_23908"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_5_23908"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_bdi_5_23908"
					x="0.875732"
					y="11.2703"
					width="24.2822"
					height="14.4797"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_5_23908"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_backgroundBlur_5_23908"
						result="effect2_dropShadow_5_23908"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_5_23908"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite
						in2="hardAlpha"
						operator="arithmetic"
						k2="-1"
						k3="1"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.38 0"
					/>
					<feBlend
						mode="normal"
						in2="shape"
						result="effect3_innerShadow_5_23908"
					/>
				</filter>
				<filter
					id="filter3_d_5_23908"
					x="13.9297"
					y="12.7996"
					width="10.5886"
					height="9.43506"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.35 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_5_23908"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_5_23908"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_5_23908"
					x1="-2.28477"
					y1="6.87968"
					x2="25.9413"
					y2="17.4637"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#9533F9" />
					<stop offset="0.9999" stopColor="#1B68F9" />
					<stop offset="1" stopColor="#1B68F9" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_5_23908"
					x1="4.92743"
					y1="9.37252"
					x2="18.2243"
					y2="14.0638"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.15" />
					<stop offset="1" stopColor="white" stopOpacity="0.44" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_5_23908"
					x1="28.427"
					y1="19.0466"
					x2="0.109894"
					y2="8.32298"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#9533F9" />
					<stop offset="0.9999" stopColor="#1B68F9" />
					<stop offset="1" stopColor="#1B68F9" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_5_23908"
					x1="21.1731"
					y1="16.566"
					x2="7.83073"
					y2="11.8093"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0.15" />
					<stop offset="1" stopColor="white" stopOpacity="0.44" />
				</linearGradient>
			</defs>
		</svg>
	);
};
