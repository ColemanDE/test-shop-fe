import {IMenuItem} from '../@types/components';
import MainLayout from '../layouts/Main';
import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';

export default function BioPage({mainMenu, footerMenu}: IAboutPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className='container'>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>About Van Gogh</h1>
				<h2>Who is Vincent Van Gogh?</h2>
				<p>
                    Vincent Willem van Gogh was a Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. In a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.
				</p>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IAboutPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});
	const {mainMenu, footerMenu} = makeAllMenus({categoryTree});

	return {
		props: {
			mainMenu,
			footerMenu
		}
	};
};

interface IAboutPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}