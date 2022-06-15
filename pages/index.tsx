import {IProduct} from 'boundless-api-client';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
import {IMenuItem} from '../@types/components';
import starryNight from '../assets/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpeg';
import CoverTextInCenter from '../components/CoverTextInCenter';
import ProductsSliderByQuery from '../components/ProductsSliderByQuery';

export default function IndexPage({products, mainMenu, footerMenu}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu} classes={{layoutMain: 'pt-0'}}>
			<CoverTextInCenter
				showChevronDown
				img={starryNight.src}
				imgPortrait={starryNight.src}
				content={{
					intro: 'Vincent Van Gogh', // Here we can change the content. 
					head: 'Courage',
					subHead: 'What would life be if we had no courage to attempt anything?'
				}}
				shadow={{
					opacity: 0.5,
					backgroundColor: '#000'
				}}
				link={'/bio'}
			/>
			<div className='container'>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Boundless store</h1>
				<ProductsList products={products} query={{}}/>
				<h2 className='page-heading page-heading_h1  page-heading_m-h1'>Products carousel:</h2>
				<ProductsSliderByQuery
					query={{collection: ['main-page'], sort: 'in_collection'}}
					wrapperClassName='page-block'
				/>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IIndexPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});
	const {products} = await apiClient.catalog.getProducts({collection: ['main-page'], sort: 'in_collection'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			products,
			...menus
		}
	};
};

interface IIndexPageProps {
	products: IProduct[];
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}