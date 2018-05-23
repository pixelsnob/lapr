/**
 * product form
 * 
 */
import BaseForm from 'forms/base';
import MultiSelectEditor from './editors/multi_select';
import ProductCategoriesEditor from './editors/product_categories';
import MakersEditor from './editors/makers';
import TagsEditor from './editors/tags';
import YoutubeVideosEditor from './editors/youtube_videos';
import ProductImagesEditor from './editors/product_images';

export default BaseForm.extend({

  initialize: function(opts) {
    BaseForm.prototype.initialize.apply(this, arguments);
    this.fields.categories.schema.options = opts.refs.product_categories;
    this.fields.makers.schema.options = opts.refs.makers;
    this.fields.tags.schema.options = opts.refs.tags;
    this.fields.tags.schema.tag_categories = opts.refs.tag_categories;
    this.fields.youtube_videos.schema.options = opts.refs.youtube_videos;
    this.fields.images.schema.options = opts.refs.images;
  },

  schema: {
    name: {
      type: 'Text',
      validators: ['required']
    },
    slug: {
      type: 'Text'
    },
    images: {
      options: [],
      type: ProductImagesEditor,
      //help: '<em>Image must be < 250KB in size, and < 1000px wide. Thumbnails generated automatically</em>'
    },
    description: {
      type: 'TextArea',
      help: '<em>Markdown enabled</em>'
    },
    more_info: {
      type: 'TextArea',
      title: 'More Info',
      help: '<em>Markdown enabled</em>'
    },
    alt_names: {
      type: 'Text',
      title: 'Alternate Names'
    },
    categories: {
      type: ProductCategoriesEditor,
      validators: ['requiredArray'],
      options: []
    },
    model_no: {
      title: 'Model No.',
      type: 'Text'
    },
    makers: {
      type: MakersEditor,
      options: []
    },
    tags: {
      title: 'Tags',
      type: TagsEditor,
      options: []
    },
    price: {
      type: 'Text'
    },
    price_label: {
      type: 'Select',
      title: 'Price Label',
      options: ['Day', 'Week']
    },
    range: {
      type: 'Text',
      validators: ['musicNotation'],
      help: '<em>Comma-separated list of notes and note ranges. Valid example: C#2, Bb3-C7</em>'
    },
    octave_shift: {
      type: 'Text',
      validators: ['number'],
      title: 'Octave Shift'
    },
    sizes: {
      type: 'TextArea',
      help: '<em>Markdown enabled</em>'
    },
    youtube_videos: {
      type: YoutubeVideosEditor,
      title: 'Youtube Videos',
      options: []
    },
    hide_sizes_in_lists: {
      type: 'Checkbox',
      title: 'Hide Sizes in List Views'
    },
    hide_sounds_disclaimer: {
      type: 'Checkbox',
      title: 'Hide Sounds Disclaimer',
      help: '<em>Applies only if product has videos attached</em>'
    }
  }
});


