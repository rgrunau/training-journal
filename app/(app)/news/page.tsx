import Link from 'next/link'

interface Article {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

async function getNewsHeadlines(sources: string[] = []): Promise<Article[]> {
  const params = new URLSearchParams({
    sources: sources.join(','),
  })
  const res = await fetch(
    `http://127.0.0.1:8000/api/newsfeed?${params.toString()}`,
    {
      cache: 'no-cache',
    }
  )
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await res.json()
  return data
}
export default async function NewsPage() {
  const sources = [
    'bbc-news',
    'cnn',
    'fox-news',
    'the-washington-post',
    'the-new-york-times',
  ]
  const headlines = await getNewsHeadlines(sources)
  console.log(headlines)
  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        <div className="p-4 text-2xl flex flex-col">
          <div className="w-full">Top Headlines from your sources</div>
          <div className="text-lg w-full">
            <Link className="text-sky-700/80" href="/user-preferences">
              Manage Sources in your preferences
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          {headlines?.map((article) => (
            <Link
              href={article.url}
              key={article.title}
              className="flex flex-col rounded-md my-2 p-4"
            >
              <div className="w-full">
                <h1 className="text-black">{article.title}</h1>
              </div>
              <div className="w-full">
                <p className="text-black">{`from: ${
                  article.source.name ?? ''
                }`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
