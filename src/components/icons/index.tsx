import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Diamond = ({ className }: ComponentProps<"svg">) => {
	return (
		<svg
			viewBox="0 0 30 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("w-[30px] h-[28px]", className)}
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
			className={cn("w-[28px] h-[25px]", className)}
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
