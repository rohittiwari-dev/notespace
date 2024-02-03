export default function HomePageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<div
				className="
				overflow-hidden
				px-4
				sm:px-6mt-10
				flex
				sm:flex-col
				gap-4
				md:justify-center
				md:item-center"
			>
				{children}
			</div>
		</section>
	);
}
