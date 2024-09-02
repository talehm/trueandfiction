
const { permalink_structure, category_base, tag_base, definition_permalink } = __VUE_WORDPRESS__.routing
console.log(__VUE_WORDPRESS__.routing);
const tagToParam = {
  author: ':author',
  postname: ':slug',
  post_id: ':id(\\d+)',
  category: ':cat1/:cat2?/:cat3?',
  year: ':year(\\d{4})',
  monthnum: ':month(\\d{2})',
  day: ':day(\\d{2})',
  hour: ':hour(\\d{2})',
  minute: ':min(\\d{2})',
  second: ':sec(\\d{2})',
  // definition: ':definition'
}

// If no category/tag base set WP uses base of singlePost permalink structure excluding tags
const defaultTaxonomyBase = permalink_structure.slice(0, permalink_structure.indexOf('%'))
// Appended to route paths with pagination
console.log("AA",`/definition${permalink_structure.replace(/\%[a-z_]+\%/g, match => tagToParam[match.slice(1,-1)]).slice(0,-1)}`);
const paginateParam = ':page(page\/\\d+)?'
export default {
  languages:'/languages/',
  definition: `/definition${permalink_structure.replace(/\%[a-z_]+\%/g, match => tagToParam[match.slice(1,-1)]).slice(0,-1)}`,
  authorArchive: `${defaultTaxonomyBase}author/:slug/${paginateParam}`,
  categoryArchive: category_base ? `/${category_base}/${tagToParam.category}/${paginateParam}` : `/stories/${tagToParam.category}/${paginateParam}`,
  dateArchive: `${defaultTaxonomyBase}:year(\\d{4})/:month(\\d{2})?/:day(\\d{2})?/${paginateParam}`,
  single: `${permalink_structure.replace(/\%[a-z_]+\%/g, match => tagToParam[match.slice(1,-1)]).slice(0,-1)}`,
  tagArchive: tag_base ? `/${tag_base}/:slug/${paginateParam}` : `${defaultTaxonomyBase}tag/:slug/${paginateParam}`,
	postsPage: (slug) => slug ? `/${slug}/${paginateParam}` : `/${paginateParam}`,
    catchAll: '*',

}