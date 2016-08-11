
import data from '../../var/data.json';

data.products = data.products.map(product => {
  if (Array.isArray(product.makers)) {
    product.makers = product.makers.map(product_maker_id => 
      data.makers.find(maker => maker._id == product_maker_id)
    );
  }
  if (Array.isArray(product.categories)) {
    product.categories = product.categories.map(product_category_id =>
      data.product_categories.find(product_category =>
        product_category._id == product_category_id
      )
    );
  }
  if (Array.isArray(product.youtube_videos)) {
    product.youtube_videos = product.youtube_videos.map(youtube_video_id =>
      data.youtube_videos.find(youtube_video =>
        youtube_video._id == youtube_video_id
      )
    );
  }
  product.url = '/instruments/' + product.slug + '/' + product._id
  return product;
});

export { data };
