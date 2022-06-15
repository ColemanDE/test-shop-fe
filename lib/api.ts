import {BoundlessClient} from 'boundless-api-client';

const apiClient = new BoundlessClient(process.env.BOUNDLESS_API_PERMANENT_TOKEN);
apiClient.setInstanceId(process.env.BOUNDLESS_INSTANCE_ID as unknown as number);

//fetch products:
apiClient.catalog.getProducts().then(data => console.log(data));

export {apiClient};