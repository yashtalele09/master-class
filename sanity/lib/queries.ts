import { groq } from 'next-sanity'

export const LANDING_QUERY = groq`*[_type == "landing"][0]`
