import HeaderSection from '@/components/site/header-section';
import BoardViewSection from '@/components/site/board-view-section';
import Footer from '@/components/site/footer';

export default function Home() {
	return (
		<div className=" container mx-auto h-fit pb-6">
			<HeaderSection />
			<BoardViewSection />
			<Footer />
		</div>
	);
}
