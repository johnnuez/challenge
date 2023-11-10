import { useState } from "react";
import { arr } from "../data/MobyDick";
import Highlighter from "react-highlight-words";

type Book = {
  chapter: string;
  paragraphs: string[];
}

export default function BookPage({ data }: { data: Book[] }) {
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  const handleClick = () => {
    if (search === '') return setFilteredData(data)

    for (const chapter of data) {
      for (const paragraph of chapter.paragraphs) {
        if (paragraph.includes(search)) {
          setFilteredData([
            {
              chapter: chapter.chapter,
              paragraphs: [paragraph]
            }
          ])
        }
      }
    }
  }
  
  return (
    <>
    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}  />
    <button type="button" onClick={handleClick}>Search</button>
    <div>
      {
        filteredData.map((item: any) => {
          return (
            <div key={item.chapter}>
              <p>{item.chapter}</p>
              {
                item.paragraphs.map((paragraph: string, index: number) => {
                  return (
                    <p key={index}>
                      <Highlighter
                        searchWords={[search]}
                        textToHighlight={paragraph}
                      />
                    </p>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: arr,
    }
  };
}
