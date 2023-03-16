import Image from "next/image"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import { staticRequest } from "tinacms";
import Layout from "../../components/Layout"
import styles from "../../styles/Blog.module.css"
import { useTina } from 'tinacms/dist/react'

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toDateString().slice(4)
}



export default function BlogTemplate({data, variables, siteTitle }) {
  const { relativePath } = variables;
  const { post } = data || {}
  const {date, author, title, hero_image, body} = post || {}
  return (
    <Layout siteTitle={`${siteTitle}: ${title}`}>
      <article className={styles.blog}>
        <figure className={styles.blog__hero}>
          <Image
            width="1920"
            height="1080"
            src={hero_image}
            alt={`blog_hero_${title}`}
          />
        </figure>
        <div className={styles.blog__info}>
          <h1>{title}</h1>
          <h3>{reformatDate(date)}</h3>
        </div>
        <div className={styles.blog__body}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
        <h2 className={styles.blog__footer}>Written By: {author}</h2>
      </article>
    </Layout>
  )
}



export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const config = await import(`../../data/config.json`)
  const query = `query BlogPostQuery($relativePath: String!) {
    post(relativePath: $relativePath) {
      title
      date
      hero_image
      author
      body
    }
  }`
  const data = await staticRequest({
    query,
    variables : {
      relativePath : `${slug}.md`, // updated line
    },
  })
  console.log("data",data)
  return {
    props: {
      data,
      variables: { relativePath: `${slug}.md` }, // updated line
      siteTitle: config.title,
    },
  }
}


export async function getStaticPaths() {
  const postsListData = await staticRequest({
    query: `
      query {
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }
    `,
    variables: {},
  })
  return {
    paths: postsListData.postConnection.edges.map(edge => ({
      params: { slug: edge.node._sys.filename },
    })),
    fallback: false,
  }
}


