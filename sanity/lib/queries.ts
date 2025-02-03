import { defineQuery } from "next-sanity";

export const Startup_Query = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> { _id, name, image, bio },
    views,
    description,
    category,
    image,
  }`);

export const Startup_id_query = defineQuery(`*[_type == "startup" && _id==$id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> { _id, name, image, bio,username },
  views,
  description,
  category,
  image,
    pitch
}`);

export const Startup_views_query = defineQuery(`*[_type=="startup" && _id==$id][0]{
  _id,views
}`)


export const Author_by_id_query = defineQuery(`*[_type == "author" && _id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`)

export const Author_id_by_github_id_query = defineQuery(`*[_type == "author" && id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`)

export const Startup_by_author = defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> { _id, name, image, bio },
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);